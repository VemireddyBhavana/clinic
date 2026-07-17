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
  }
} else {
  // Firebase credentials not set — running in demo/hackathon mock mode (fully functional)
  console.info("[MediSlot AI] Running in Mock Auth mode. Login with any @medislot.ai account + password 'medislot'.");
}

// Local mock database to simulate real login behavior
const mockUsers = [
  { email: 'admin@medislot.ai', name: 'Hospital Admin User', role: 'admin', token: 'mock-admin-token-12345' },
  { email: 'doctor@medislot.ai', name: 'Dr. Sarah Jenkins', role: 'doctor', token: 'mock-doctor-token-12345', doctorId: '6a59bef33e0510f8d0971b25' },
  { email: 'patient@medislot.ai', name: 'Alice Smith', role: 'patient', token: 'mock-patient-token-12345' }
];

export const getAuthMode = () => isMock ? 'MOCK' : 'FIREBASE';

// Google Sign-In
export const signInWithGoogle = async (role = 'patient') => {
  if (isMock) {
    // Return a mock patient or custom role signed in
    const mockUser = role === 'admin' ? mockUsers[0] : (role === 'doctor' ? mockUsers[1] : mockUsers[2]);
    localStorage.setItem('adminToken', mockUser.token);
    localStorage.setItem('adminInfo', JSON.stringify({ ...mockUser, role }));
    return { user: mockUser, role };
  }

  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  
  // Package auth user data
  const userData = {
    email: user.email,
    name: user.displayName || 'Google User',
    role,
    token: user.uid
  };
  localStorage.setItem('adminToken', userData.token);
  localStorage.setItem('adminInfo', JSON.stringify(userData));
  return { user: userData, role };
};

// Email Login — auto-creates account if user doesn't exist yet
export const loginWithEmail = async (email, password, role = 'patient') => {
  if (isMock) {
    // In mock mode: accept any credentials
    const matched = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    const activeUser = matched || { email, name: email.split('@')[0], role, token: 'mock-token-' + Date.now() };
    const finalUser = { ...activeUser, role };
    localStorage.setItem('adminToken', finalUser.token);
    localStorage.setItem('adminInfo', JSON.stringify(finalUser));
    return { user: finalUser, role };
  }

  let firebaseUser = null;

  try {
    // 1️⃣ Try signing in with existing account
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    firebaseUser = userCredential.user;
  } catch (signInError) {
    // 2️⃣ If user doesn't exist or credentials invalid, auto-create the account
    const code = signInError.code || '';
    if (
      code === 'auth/user-not-found' ||
      code === 'auth/invalid-credential' ||
      code === 'auth/invalid-email' ||
      code === 'auth/wrong-password' ||
      code === 'auth/INVALID_LOGIN_CREDENTIALS'
    ) {
      try {
        const newCredential = await createUserWithEmailAndPassword(auth, email, password);
        firebaseUser = newCredential.user;
      } catch (createError) {
        // If creation also fails, rethrow the original sign-in error
        throw signInError;
      }
    } else {
      throw signInError;
    }
  }

  const userData = {
    email: firebaseUser.email,
    name:  firebaseUser.displayName || email.split('@')[0],
    role,
    token: firebaseUser.uid
  };
  localStorage.setItem('adminToken', userData.token);
  localStorage.setItem('adminInfo', JSON.stringify(userData));
  return { user: userData, role };
};

// Email Registration
export const registerWithEmail = async (name, email, password, role = 'patient') => {
  if (isMock) {
    const newUser = { email, name, role, token: 'mock-token-' + Date.now() };
    localStorage.setItem('adminToken', newUser.token);
    localStorage.setItem('adminInfo', JSON.stringify(newUser));
    return { user: newUser, role };
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userData = {
    email: user.email,
    name,
    role,
    token: user.uid
  };
  localStorage.setItem('adminToken', userData.token);
  localStorage.setItem('adminInfo', JSON.stringify(userData));
  return { user: userData, role };
};

// Phone OTP Sending
let confirmationResultRef = null;

export const sendOtp = async (phoneNumber, containerId) => {
  // Strip all whitespace, dashes, parentheses
  let cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
  
  // Ensure it starts with '+'
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }

  if (isMock) {
    console.log(`[Mock OTP] Verification code 123456 sent to ${cleanPhone}`);
    return { verificationId: 'mock-verification-id' };
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible'
  });
  const result = await signInWithPhoneNumber(auth, cleanPhone, verifier);
  confirmationResultRef = result;
  return { verificationId: result.verificationId };
};

// Phone OTP Verification
export const verifyOtp = async (code, role = 'patient') => {
  if (isMock) {
    if (code === '123456' || code === '1234') {
      const mockUser = { email: 'phone-auth@medislot.ai', name: 'Verified Phone User', role, token: 'mock-phone-token-' + Date.now() };
      localStorage.setItem('adminToken', mockUser.token);
      localStorage.setItem('adminInfo', JSON.stringify(mockUser));
      return { user: mockUser, role };
    }
    throw new Error('Invalid verification code (use 123456 or 1234 for mock verification)');
  }

  if (!confirmationResultRef) {
    throw new Error('No active verification session. Send OTP code first.');
  }

  const result = await confirmationResultRef.confirm(code);
  const user = result.user;
  const userData = {
    email: user.email || 'phone-auth@medislot.ai',
    name: 'Verified Phone User',
    role,
    token: user.uid
  };
  localStorage.setItem('adminToken', userData.token);
  localStorage.setItem('adminInfo', JSON.stringify(userData));
  return { user: userData, role };
};

// Sign Out
export const logoutUser = async () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  if (!isMock) {
    await signOut(auth);
  }
};
