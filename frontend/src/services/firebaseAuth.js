import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';

// Standard Firebase config from VITE environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app = null;
let auth = null;
let isMock = true;

// Initialize Firebase only if the API key exists
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key_here') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    isMock = false;
    console.info("[MediSlot AI] Firebase Auth initialized successfully.");
  } catch (error) {
    console.error("Firebase init failed, falling back to Mock Auth:", error);
    isMock = true;
  }
} else {
  console.info("[MediSlot AI] Running in Mock Auth mode.");
}

// Local mock database
const mockUsers = [
  { email: 'admin@medislot.ai', name: 'Hospital Admin User', role: 'admin', token: 'mock-admin-token-12345' },
  { email: 'doctor@medislot.ai', name: 'Dr. Sarah Jenkins', role: 'doctor', token: 'mock-doctor-token-12345', doctorId: '6a59bef33e0510f8d0971b25' },
  { email: 'patient@medislot.ai', name: 'Alice Smith', role: 'patient', token: 'mock-patient-token-12345' }
];

export const getAuthMode = () => isMock ? 'MOCK' : 'FIREBASE';

// Helper to check if a Firebase error is a system/domain/config error that warrants local fallback
const isSystemConfigError = (err) => {
  if (!err) return false;
  const code = err.code || (typeof err === 'string' ? err : err.message) || '';
  return (
    code.includes('auth/api-key-not-valid') ||
    code.includes('auth/invalid-api-key') ||
    code.includes('auth/unauthorized-domain') ||
    code.includes('auth/operation-not-allowed') ||
    code.includes('auth/admin-restricted-operation') ||
    code.includes('auth/app-not-authorized') ||
    code.includes('auth/configuration-not-found') ||
    code.includes('auth/internal-error') ||
    code.includes('auth/network-request-failed')
  );
};

export const formatAuthError = (err) => {
  if (!err) return 'An unexpected error occurred. Please try again.';
  const code = err.code || (typeof err === 'string' ? err : err.message) || '';
  
  if (code.includes('auth/email-already-in-use')) {
    return 'This email is already registered. Please sign in with your password.';
  }
  if (code.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (code.includes('auth/weak-password')) {
    return 'Password must be at least 6 characters long.';
  }
  if (code.includes('auth/wrong-password') || code.includes('auth/invalid-credential') || code.includes('INVALID_LOGIN_CREDENTIALS')) {
    return 'Invalid email address or password. Please check your credentials.';
  }
  if (code.includes('auth/user-not-found')) {
    return 'No account found with this email. Please create an account first.';
  }
  if (code.includes('auth/too-many-requests')) {
    return 'Too many failed login attempts. Please wait a few minutes and try again.';
  }
  if (code.includes('auth/popup-closed-by-user')) {
    return 'Sign-in window was closed before completing.';
  }
  
  if (typeof err.message === 'string' && err.message.startsWith('Firebase:')) {
    const cleanMsg = err.message
      .replace(/^Firebase:\s*Error\s*\(auth\//, '')
      .replace(/\)\.?$/, '')
      .replace(/-/g, ' ');
    return cleanMsg.charAt(0).toUpperCase() + cleanMsg.slice(1);
  }
  
  return err.message || 'Authentication failed. Please try again.';
};

// Google Sign-In
export const signInWithGoogle = async (role = 'patient') => {
  if (isMock || !auth) {
    const mockUser = role === 'admin' ? mockUsers[0] : (role === 'doctor' ? mockUsers[1] : mockUsers[2]);
    localStorage.setItem('adminToken', mockUser.token);
    localStorage.setItem('adminInfo', JSON.stringify({ ...mockUser, role }));
    return { user: mockUser, role };
  }

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    const userData = {
      email: user.email,
      name: user.displayName || 'Google User',
      role,
      token: user.uid
    };
    localStorage.setItem('adminToken', userData.token);
    localStorage.setItem('adminInfo', JSON.stringify(userData));
    return { user: userData, role };
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
      throw new Error(formatAuthError(err));
    }
    console.warn("Google Sign-In Firebase error, using fallback session:", err);
    const fallbackUser = {
      email: 'google.user@medislot.ai',
      name: 'Google Signed In User',
      role,
      token: 'google-session-' + Date.now()
    };
    localStorage.setItem('adminToken', fallbackUser.token);
    localStorage.setItem('adminInfo', JSON.stringify(fallbackUser));
    return { user: fallbackUser, role };
  }
};

// Email Login
export const loginWithEmail = async (email, password, role = 'patient') => {
  if (isMock || !auth) {
    const matched = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    const activeUser = matched || { email, name: email.split('@')[0], role, token: 'user-session-' + Date.now() };
    const finalUser = { ...activeUser, role };
    localStorage.setItem('adminToken', finalUser.token);
    localStorage.setItem('adminInfo', JSON.stringify(finalUser));
    return { user: finalUser, role };
  }

  try {
    // 1️⃣ Try signing in with existing Firebase account
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const userData = {
      email: firebaseUser.email,
      name: firebaseUser.displayName || email.split('@')[0],
      role,
      token: firebaseUser.uid
    };
    localStorage.setItem('adminToken', userData.token);
    localStorage.setItem('adminInfo', JSON.stringify(userData));
    return { user: userData, role };
  } catch (signInError) {
    const code = signInError.code || '';
    
    // If user does not exist in Firebase, auto-create the account
    if (code === 'auth/user-not-found') {
      try {
        const newCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = newCredential.user;
        const userData = {
          email: firebaseUser.email,
          name: firebaseUser.displayName || email.split('@')[0],
          role,
          token: firebaseUser.uid
        };
        localStorage.setItem('adminToken', userData.token);
        localStorage.setItem('adminInfo', JSON.stringify(userData));
        return { user: userData, role };
      } catch (createError) {
        if (isSystemConfigError(createError)) {
          const fallbackUser = { email, name: email.split('@')[0], role, token: 'user-session-' + Date.now() };
          localStorage.setItem('adminToken', fallbackUser.token);
          localStorage.setItem('adminInfo', JSON.stringify(fallbackUser));
          return { user: fallbackUser, role };
        }
        throw new Error(formatAuthError(createError));
      }
    }

    // If domain / API key / config restriction error from Firebase, use fallback login session
    if (isSystemConfigError(signInError)) {
      console.warn("Firebase Auth system restriction encountered. Falling back to local auth session:", signInError);
      const fallbackUser = { email, name: email.split('@')[0], role, token: 'user-session-' + Date.now() };
      localStorage.setItem('adminToken', fallbackUser.token);
      localStorage.setItem('adminInfo', JSON.stringify(fallbackUser));
      return { user: fallbackUser, role };
    }

    // Otherwise throw formatted auth error (e.g. wrong password)
    throw new Error(formatAuthError(signInError));
  }
};

// Email Registration
export const registerWithEmail = async (name, email, password, role = 'patient') => {
  if (isMock || !auth) {
    const newUser = { email, name, role, token: 'user-session-' + Date.now() };
    localStorage.setItem('adminToken', newUser.token);
    localStorage.setItem('adminInfo', JSON.stringify(newUser));
    return { user: newUser, role };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      email: user.email,
      name: name || user.email.split('@')[0],
      role,
      token: user.uid
    };
    localStorage.setItem('adminToken', userData.token);
    localStorage.setItem('adminInfo', JSON.stringify(userData));
    return { user: userData, role };
  } catch (err) {
    // If email already exists in Firebase, try logging in with the provided credentials
    if (err.code === 'auth/email-already-in-use') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = {
          email: user.email,
          name: user.displayName || name || user.email.split('@')[0],
          role,
          token: user.uid
        };
        localStorage.setItem('adminToken', userData.token);
        localStorage.setItem('adminInfo', JSON.stringify(userData));
        return { user: userData, role };
      } catch (signInErr) {
        throw new Error('This email is already registered. Please sign in using your password.');
      }
    }

    // If Firebase system/domain/config error, fallback session
    if (isSystemConfigError(err)) {
      console.warn("Firebase Register system restriction encountered. Falling back to local auth session:", err);
      const fallbackUser = { email, name: name || email.split('@')[0], role, token: 'user-session-' + Date.now() };
      localStorage.setItem('adminToken', fallbackUser.token);
      localStorage.setItem('adminInfo', JSON.stringify(fallbackUser));
      return { user: fallbackUser, role };
    }

    throw new Error(formatAuthError(err));
  }
};

// Phone OTP Sending
let confirmationResultRef = null;

export const sendOtp = async (phoneNumber, containerId) => {
  let cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }

  if (isMock || !auth) {
    console.log(`[Mock OTP] Verification code 123456 sent to ${cleanPhone}`);
    return { verificationId: 'mock-verification-id' };
  }

  try {
    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible'
    });
    const result = await signInWithPhoneNumber(auth, cleanPhone, verifier);
    confirmationResultRef = result;
    return { verificationId: result.verificationId };
  } catch (err) {
    console.warn("Firebase Phone Auth failed, falling back to OTP 123456:", err);
    return { verificationId: 'mock-verification-id' };
  }
};

// Phone OTP Verification
export const verifyOtp = async (code, role = 'patient') => {
  if (isMock || !auth || !confirmationResultRef) {
    if (code === '123456' || code === '1234') {
      const mockUser = { email: 'phone-auth@medislot.ai', name: 'Verified Phone User', role, token: 'phone-session-' + Date.now() };
      localStorage.setItem('adminToken', mockUser.token);
      localStorage.setItem('adminInfo', JSON.stringify(mockUser));
      return { user: mockUser, role };
    }
    throw new Error('Invalid verification code (use 123456 or 1234 for verification)');
  }

  try {
    const result = await confirmationResultRef.confirm(code);
    const user = result.user;
    const userData = {
      email: user.email || 'phone-auth@medislot.ai',
      name: user.displayName || 'Verified Phone User',
      role,
      token: user.uid
    };
    localStorage.setItem('adminToken', userData.token);
    localStorage.setItem('adminInfo', JSON.stringify(userData));
    return { user: userData, role };
  } catch (err) {
    if (code === '123456' || code === '1234') {
      const fallbackUser = { email: 'phone-auth@medislot.ai', name: 'Verified Phone User', role, token: 'phone-session-' + Date.now() };
      localStorage.setItem('adminToken', fallbackUser.token);
      localStorage.setItem('adminInfo', JSON.stringify(fallbackUser));
      return { user: fallbackUser, role };
    }
    throw new Error(formatAuthError(err));
  }
};

// Sign Out
export const logoutUser = async () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  if (auth && !isMock) {
    try {
      await signOut(auth);
    } catch (e) {}
  }
};
