# MediSlot AI 🏥
> **Smart Clinic Scheduling & Workforce Optimization Platform**

![MediSlot AI Home](screenshots/home.png)

**Built for Hackathon Theme 6: Booking, Scheduling & Workforce**

## 🚨 The Problem
Clinics often manage appointments manually, leading to double bookings, unoptimized doctor workloads, high no-show rates, and overall inefficient appointment handling. Patients suffer from long wait times, and clinic staff burn out from unevenly distributed workloads.

## 💡 The Solution: MediSlot AI
MediSlot AI is a next-generation healthcare SaaS that eliminates manual scheduling inefficiencies through intelligent, automated workflows and live data integrations.

### ✨ Core Smart Features
- **🤖 AI Symptom Checker Chatbot**: Built with Google Gemini, patients can type their symptoms into the floating chatbot and receive immediate, AI-powered recommendations for the exact medical specialist they need to book.
- **🗺️ Live OpenStreetMap Integration**: Automatically pulls live, real-world hospital data (names, locations, contact info) within a 50km radius using the Overpass API, falling back to a local database to prevent rate-limiting.
- **⚡ Smart Slot Recommendations**: The booking engine dynamically suggests optimal appointment times to balance the daily load across available doctors, actively nudging patients toward the "Fastest Availability".
- **⚖️ Doctor Workload Balancer**: The Admin Dashboard proactively computes which doctors are overloaded and which are under-utilized, offering a live "Workload Distribution" widget to optimize clinic efficiency.
- **📱 Smart Reminders & Follow-ups**: An automated notification pipeline that generates immediate Booking Confirmations, schedules pre-visit Reminders (1-day before), and instantly fires off Follow-up re-engagement messages if a patient is marked as a "No-Show" or "Cancelled".
- **🚨 Priority Booking Triage**: Patients can select urgency levels (Routine, Follow-up, Urgent). Urgent appointments are visually highlighted on the live Admin Control Board in red for immediate staff attention.

![Booking Confirmation & Priority](screenshots/booking.png)

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS (v4) + Framer Motion (for fluid, spring-physics micro-animations) + Lucide Icons
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **AI/External**: Google Gemini API, OpenStreetMap (Overpass API)

## 🚀 Local Setup & Hackathon Demo Guide

### 1. Database & Environment Setup
Ensure you have MongoDB running locally, or replace the `MONGO_URI` in `backend/.env` with your MongoDB Atlas string.
*(Note: A Gemini API key is required in the frontend `.env` for the Chatbot).*

### 2. Install & Seed
```bash
# Install backend dependencies & seed realistic demo data
cd backend
npm install
npm run seed

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Run the Servers (Concurrently)
**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 🎥 Hackathon Evaluation Guide (What to look for)
If you are evaluating this project asynchronously, here is the recommended flow to see the smart features in action:
1. **AI Chatbot**: Open `http://localhost:5173`. Click the floating Chatbot on the bottom right and tell it your symptoms.
2. **Live Map & Booking**: Click "Book Appointment". Notice the fluid Framer Motion animations. Select a hospital (data pulled dynamically).
3. **Smart Slots & Priority**: During the "Patient Details" step, select "Urgent" priority. Complete the booking.
4. **Admin Dashboard**: Go to `http://localhost:5173/admin/login` and login. Notice the **Workload Balancing** widget computing doctor loads, and the **Action Required** queue highlighting your Urgent booking!
5. **Smart Reminders**: Navigate to the "Notifications" tab in the Admin panel to see the automated Confirmation and auto-scheduled Reminder waiting in the queue!
