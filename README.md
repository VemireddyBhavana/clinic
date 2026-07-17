# 🏥 MediSlot AI: Smart Clinic Scheduling & Triage System

MediSlot AI is a state-of-the-art multi-specialty clinical scheduling system designed to optimize patient booking flows, load-balance doctors, predict appointment attendance, and provide AI-driven triage advice.

---

## 🌟 Key Features

### 1. 🤖 Dynamic AI Triage Assistant (MediBot)
- **Symptom Checker & Router**: Analyzes user symptoms to recommend the correct medical specialist (e.g., Cardiologist, Dermatologist, Neurologist) and provides instant advice.
- **Independent Language Tabs**: A horizontal scrolling glassmorphic pill tab bar under the header allows users to switch the chatbot's language independently of the main website. Fully supports **English, Telugu (తెలుగు), Hindi (हिन्दी), Marathi (मराठी), and Gujarati (ગુજરાતી)**.
- **Robust Fallback Engine**: Attempts structured JSON outputs. If regional restrictions block JSON endpoints, it retries in standard text mode or falls back to client-side heuristics.
- **Realistic Typing Cadence**: Enforces a minimum `600ms` typing dots delay for bot replies to ensure a natural conversation flow.

### 2. 🕒 Time-Aware Schedule Filtering
- **IST Timeline-Aware**: Automatically filters out and hides booking time slots that have already passed today based on local Indian Standard Time.
- **Empty State Fallback**: Displays a warm alert banner advising the user to select a future date when all slots for today have passed.
- **Timezone Stability**: Bounds date calendar selections to actual local day boundaries to prevent picking past dates across midnight zones.

### 3. 🌐 Premium Page Translation
- **Clean Interface Overrides**: Completely hides the Google Translate toolbar banners, tooltips, and floating watermarks (`.goog-te-gadget-icon`).
- **Smooth Transition Loader**: Renders a glassmorphic overlay loader with localized text for 900ms when switching website languages to hide content rendering shifts.

### 4. 🚨 Emergency SOS System
- **SOS Button**: Renders a pulsing SOS button in the navbar.
- **Ambulance Routing**: Prompts users for a phone number and automatically coordinates with backend notification pathways.

### 5. 🔔 Persistent Notification Alerts
- **State & Database Sync**: Automatically marks alerts as read inside both local React state and remote MongoDB collections when clicking the bell icon.
- **Responsive Click-Outside Closure**: Uses separate refs for mobile and desktop dropdowns to guarantee correct layout closures when clicking outside.

### 6. 🌗 Adaptive Dark Mode
- Full CSS variables styling system supporting transitions between Light and Dark mode on all mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion & GSAP
- **Maps**: React-Leaflet
- **Icons**: Lucide React

### Backend
- **Framework**: Node.js & Express
- **Database**: MongoDB (Mongoose ORM)
- **Messaging**: Twilio (SMS & WhatsApp notifications)
- **Emailing**: Nodemailer

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install packages:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
```

Create a `.env` file in the `frontend/` folder:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Execution
Run both development servers:

```bash
# In backend directory
npm start

# In frontend directory
npm run dev
```
Open `http://localhost:5173` to view the application.
