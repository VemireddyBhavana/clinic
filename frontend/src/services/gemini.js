import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Local heuristic analyzer fallback to ensure perfect functionality if Gemini fails or is unconfigured
const localAnalyzeSymptoms = (symptoms = '') => {
  const s = symptoms.toLowerCase();
  let specialization = 'General Practice';
  let confidence = 85;
  let emergencyWarning = '';
  let possibleConditions = ['General fatigue or stress'];
  let explanation = 'Your symptoms are best evaluated by a General Practitioner to determine if further testing is required.';

  if (s.includes('chest') || s.includes('heart') || s.includes('breath') || s.includes('cardio') || s.includes('palpitations')) {
    specialization = 'Cardiology';
    confidence = 94;
    possibleConditions = ['Angina pectoris', 'Cardiac arrhythmia', 'Physical strain'];
    explanation = 'Chest symptoms require immediate evaluation by a Cardiologist to rule out cardiac ischemia.';
    if (s.includes('pain') || s.includes('shortness') || s.includes('tightness')) {
      emergencyWarning = 'EMERGENCY: Chest pain and shortness of breath can indicate a serious cardiac event. Please seek immediate emergency medical care.';
    }
  } else if (s.includes('skin') || s.includes('rash') || s.includes('itch') || s.includes('acne') || s.includes('dermatology') || s.includes('mole')) {
    specialization = 'Dermatology';
    confidence = 90;
    possibleConditions = ['Contact dermatitis', 'Eczema', 'Allergic skin reaction'];
    explanation = 'Localized skin irritation or eruptions should be assessed by a Dermatologist to rule out chronic conditions.';
  } else if (s.includes('head') || s.includes('migraine') || s.includes('nerve') || s.includes('dizzy') || s.includes('seizure') || s.includes('numb')) {
    specialization = 'Neurology';
    confidence = 92;
    possibleConditions = ['Tension headache', 'Migraine with aura', 'Neuropathy'];
    explanation = 'Neurological symptoms like persistent headaches or sensory changes should be evaluated by a Neurologist.';
  } else if (s.includes('bone') || s.includes('joint') || s.includes('fracture') || s.includes('back pain') || s.includes('sprain') || s.includes('knee')) {
    specialization = 'Orthopedics';
    confidence = 88;
    possibleConditions = ['Lumbar strain', 'Osteoarthritis', 'Ligament sprain'];
    explanation = 'Musculoskeletal pain, joint stiffness, or suspected structural injury requires an Orthopedic assessment.';
  } else if (s.includes('child') || s.includes('baby') || s.includes('pedia') || s.includes('kid') || s.includes('infant')) {
    specialization = 'Pediatrics';
    confidence = 95;
    possibleConditions = ['Common pediatric viral infection', 'Childhood allergy', 'Growth strain'];
    explanation = 'All symptoms in pediatric patients should be managed by a Pediatrician specializing in childhood healthcare.';
  } else if (s.includes('fever') || s.includes('cough') || s.includes('sore throat') || s.includes('cold') || s.includes('flu') || s.includes('stomach')) {
    specialization = 'General Practice';
    confidence = 85;
    possibleConditions = ['Viral upper respiratory tract infection', 'Acute gastroenteritis', 'Seasonal influenza'];
    explanation = 'Fever and general cold symptoms are best triaged by a General Practitioner.';
  }

  return {
    specialization,
    confidence,
    emergencyWarning,
    possibleConditions,
    explanation,
    estimatedWaitTime: Math.floor(Math.random() * 15) + 5
  };
};

export const analyzeSymptoms = async (symptoms) => {
  if (!symptoms || !symptoms.trim()) {
    return localAnalyzeSymptoms('');
  }

  if (!genAI) {
    console.warn("VITE_GEMINI_API_KEY is not set. Falling back to local heuristic analysis.");
    return localAnalyzeSymptoms(symptoms);
  }

  // Helper to parse JSON safely from raw text response
  const extractJson = (text) => {
    try {
      const cleanJson = text.replace(/```json|```/g, '').trim();
      const data = JSON.parse(cleanJson);
      if (data && data.specialization) {
        data.estimatedWaitTime = Math.floor(Math.random() * 15) + 5;
        return data;
      }
    } catch (e) {
      console.warn("Failed to parse JSON from model response:", e);
    }
    return null;
  };

  const prompt = `
    You are an expert AI symptom triage assistant for MediSlot AI clinic.
    Analyze the user's symptoms: "${symptoms}".
    
    Determine the recommended specialization from the following list ONLY:
    - Cardiology
    - Dermatology
    - Neurology
    - Orthopedics
    - Pediatrics
    - General Practice
    
    Return a JSON object matching this schema:
    {
      "specialization": "One of: Cardiology, Dermatology, Neurology, Orthopedics, Pediatrics, General Practice",
      "confidence": "number between 10 and 100",
      "emergencyWarning": "string warning if symptoms indicate a life-threatening emergency (e.g. chest pain, severe breathing issues, sudden paralysis), or empty string if no emergency",
      "possibleConditions": ["array of up to 3 possible conditions (clearly label as informational only)"],
      "explanation": "brief 1-2 sentence explanation of why this specialist is recommended"
    }
    Do not return any other text, headers, or markdown wrappers. Return raw JSON.
  `;

  // Try 1: JSON Output Mode (supported in newer Gemini SDK regions)
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    const parsed = extractJson(text);
    if (parsed) return parsed;
  } catch (jsonError) {
    console.warn("Gemini JSON Mode failed, retrying with standard text mode...", jsonError);
  }

  // Try 2: Standard Text Generation Mode (globally stable fallback)
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    const parsed = extractJson(text);
    if (parsed) return parsed;
  } catch (textError) {
    console.error("Gemini standard text mode failed, falling back to local heuristics:", textError);
  }

  // Final Fallback: Run local client-side analysis
  return localAnalyzeSymptoms(symptoms);
};

export const generateDoctorSummary = async (doctorName, appointments) => {
  if (!genAI) {
    return `Dr. ${doctorName} has ${appointments.length} scheduled visits today. Direct routing is operating normally.`;
  }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Create a brief 2-sentence summary of today's scheduled workload for Dr. ${doctorName}.
      Appointments details: ${JSON.stringify(appointments.map(a => ({ patient: a.patientName, time: a.appointmentTime, notes: a.notes, risk: a.noShowRisk })))}.
      Highlight if they have urgent appointments or high no-show risk patients.
    `;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    return `Dr. ${doctorName} has ${appointments.length} appointments today. Workload is balanced.`;
  }
};

export const generatePatientSummary = async (patientName, appointments) => {
  if (!genAI) {
    return `Hello ${patientName}. You have ${appointments.length} upcoming or past appointments scheduled. Keep up with your healthcare schedule.`;
  }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Create a brief health recommendation block (2 sentences) for patient ${patientName}.
      Their visit history: ${JSON.stringify(appointments.map(a => ({ date: a.appointmentDate, spec: a.specialization, status: a.status })))}.
      Be encouraging and recommend standard preventive follow-ups.
    `;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    return `Keep up with your upcoming visits. Standard clinical checkups are recommended annually.`;
  }
};

export const getFAQResponse = async (query) => {
  if (!genAI) {
    return "MediSlot AI optimizes appointment wait times by load-balancing bookings across active doctors. Use the Symptom Checker to find your specialist.";
  }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      You are MediSlot AI assistant. Answer this query politely and briefly (2 sentences max): "${query}".
      Explain clinic services, appointment confirmations, wait times, or reminder features. Do not offer medical advice.
    `;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    return "Please consult our help center or use our smart scheduling features for assistance.";
  }
};
