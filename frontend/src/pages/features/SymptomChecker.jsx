import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Stethoscope, Sparkles, AlertCircle, ShieldAlert, Code, Check } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import CardWrapper from '../../components/layout/CardWrapper';
import { analyzeSymptoms } from '../../services/gemini';

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showDeveloperConsole, setShowDeveloperConsole] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await analyzeSymptoms(symptoms);
      setResult(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-blue-600 dark:bg-blue-700 pt-10 pb-24 text-white relative overflow-hidden">
        <PageContainer>
          <button 
            onClick={() => navigate('/home')} 
            className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 mb-8 transition-all font-bold cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 mb-4">
              <Stethoscope size={12} /> Diagnostic Helper
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">AI Symptom Checker</h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-lg">
              Describe your symptoms in plain English and let our custom Gemini classification model suggest clinical specialties and flag urgent alerts.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: Checker Text Input */}
          <div className="lg:col-span-6 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Describe Your Symptoms</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Detail your onset timeline, pain levels, and associated symptoms for structured triage analysis.
              </p>

              <div className="space-y-4">
                <textarea 
                  rows={5}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. I have a throbbing headache, blurry vision, and feel nauseous when exposed to bright light..."
                  className="w-full text-xs p-3 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 placeholder-slate-400 resize-none font-sans"
                />

                <button 
                  onClick={handleAnalyze}
                  disabled={loading || !symptoms.trim()}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Sparkles size={14} className="animate-spin" /> Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> Run Gemini Diagnostics
                    </>
                  )}
                </button>

                {/* Medical Disclaimer Block */}
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 p-4 rounded-xl text-xs flex gap-3 items-start leading-relaxed">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold mb-1">Medical Disclaimer</h4>
                    <p>
                      MediSlot AI diagnostic helpers provide classification recommendations based on LLM diagnostics. This does not constitute clinical medical advice or substitute professional consultation. Call emergency services in critical cases.
                    </p>
                  </div>
                </div>
              </div>
            </CardWrapper>
          </div>

          {/* RIGHT: Results Display & Developer JSON Output */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* Results Panel */}
                  <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-1.5">
                      <Stethoscope size={18} className="text-blue-500" /> Triage Recommendation
                    </h3>

                    <div className="space-y-4">
                      {/* Specialization Indicator */}
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-150 dark:border-slate-700/60 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Recommended Specialization</p>
                          <p className="text-lg font-extrabold text-slate-900 dark:text-white">{result.specialization}</p>
                        </div>
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {result.confidence}% Match
                        </span>
                      </div>

                      {/* Explanation */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Diagnostic Explanation</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/20 p-3 rounded-xl">
                          {result.explanation}
                        </p>
                      </div>

                      {/* Possible Conditions */}
                      {result.possibleConditions && result.possibleConditions.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Informational Conditions Classified</h4>
                          <div className="flex flex-wrap gap-2">
                            {result.possibleConditions.map((cond, i) => (
                              <span 
                                key={i} 
                                className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-750 font-semibold shadow-sm"
                              >
                                {cond}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Emergency Warning */}
                      {result.emergencyWarning && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 p-4 rounded-xl text-xs flex gap-3 items-start leading-relaxed">
                          <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold mb-1">Emergency Alert Flagged</h4>
                            <p>{result.emergencyWarning}</p>
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => navigate('/hospitals', { state: { specialization: result.specialization.toLowerCase(), symptoms } })}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer text-center block shadow-sm"
                      >
                        Find Specialists & Book Now
                      </button>
                    </div>
                  </CardWrapper>

                  {/* Toggle button for raw JSON response console */}
                  <div className="flex justify-end pr-2">
                    <button 
                      onClick={() => setShowDeveloperConsole(prev => !prev)}
                      className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Code size={14} />
                      {showDeveloperConsole ? 'Hide Developer Details (JSON)' : 'Show Developer Details (JSON)'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showDeveloperConsole && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <CardWrapper className="bg-slate-950 text-white border-slate-800 p-4 relative" noPadding>
                          <div className="px-4 py-3 border-b border-slate-900 flex justify-between items-center">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <Code size={13} /> Structured JSON Response
                            </span>
                            <button 
                              onClick={handleCopyJson}
                              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:text-white px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-bold cursor-pointer"
                            >
                              {copied ? <Check size={11} /> : 'Copy JSON'}
                            </button>
                          </div>
                          <div className="p-4 overflow-x-auto max-h-[220px] font-mono text-[11px] text-blue-300 leading-normal whitespace-pre">
                            {JSON.stringify(result, null, 2)}
                          </div>
                        </CardWrapper>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="bg-slate-100 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl h-[320px] flex flex-col items-center justify-center text-center p-8">
                  <Stethoscope className="text-slate-350 dark:text-slate-700 mb-3" size={48} />
                  <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">Awaiting Symptom Analysis</h4>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Submit your descriptions in the input console to trigger Gemini classification results.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
