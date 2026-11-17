'use client';

import React, { useState, useEffect } from 'react';
import { OIR_QUESTIONS, SRT_QUESTIONS, WAT_WORDS, ALUMNI_PROFILES } from '../data/mockData';
import {
  Shield,
  BookOpen,
  Brain,
  Target,
  Users,
  MessageSquare,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Youtube,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const SsbHubView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'intro' | 'oir' | 'ppdt' | 'psychology' | 'gto' | 'interview' | 'books' | 'success'
  >('intro');

  // OIR Practice Test State
  const [oirCurrentIdx, setOirCurrentIdx] = useState(0);
  const [oirSelectedAnswers, setOirSelectedAnswers] = useState<Record<number, number>>({});
  const [oirSubmitted, setOirSubmitted] = useState(false);

  // WAT Flashcard Drill State
  const [watActiveIdx, setWatActiveIdx] = useState(0);
  const [watRunning, setWatRunning] = useState(false);
  const [watTimer, setWatTimer] = useState(15);

  // PPDT Practice Timer
  const [ppdtPhase, setPpdtPhase] = useState<'idle' | 'observing' | 'writing' | 'completed'>('idle');
  const [ppdtSecondsLeft, setPpdtSecondsLeft] = useState(30);

  // WAT Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (watRunning && watTimer > 0) {
      interval = setInterval(() => setWatTimer((prev) => prev - 1), 1000);
    } else if (watRunning && watTimer === 0) {
      if (watActiveIdx < WAT_WORDS.length - 1) {
        setWatActiveIdx((prev) => prev + 1);
        setWatTimer(15);
      } else {
        setWatRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [watRunning, watTimer, watActiveIdx]);

  // PPDT Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (ppdtPhase === 'observing' && ppdtSecondsLeft > 0) {
      timer = setInterval(() => setPpdtSecondsLeft((prev) => prev - 1), 1000);
    } else if (ppdtPhase === 'observing' && ppdtSecondsLeft === 0) {
      setPpdtPhase('writing');
      setPpdtSecondsLeft(240); // 4 minutes
    } else if (ppdtPhase === 'writing' && ppdtSecondsLeft > 0) {
      timer = setInterval(() => setPpdtSecondsLeft((prev) => prev - 1), 1000);
    } else if (ppdtPhase === 'writing' && ppdtSecondsLeft === 0) {
      setPpdtPhase('completed');
    }
    return () => clearInterval(timer);
  }, [ppdtPhase, ppdtSecondsLeft]);

  // Calculate OIR Score
  const calculateOirScore = () => {
    let score = 0;
    OIR_QUESTIONS.forEach((q, idx) => {
      if (oirSelectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>Services Selection Board Masterclass</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-naval font-bold text-white tracking-tight">
          SSB Preparation Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive testing modules, psychological drills, GTO strategies, personal interview
          question bank, and curated video resources tailored for GCEK Naval NCC aspirants.
        </p>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-500/20 scrollbar-thin">
        {[
          { id: 'intro', label: '1. Introduction to SSB' },
          { id: 'oir', label: '2. OIR Practice Engine' },
          { id: 'ppdt', label: '3. PPDT Simulator' },
          { id: 'psychology', label: '4. Psychology (TAT/WAT/SRT)' },
          { id: 'gto', label: '5. GTO Ground Tasks' },
          { id: 'interview', label: '6. Personal Interview Bank' },
          { id: 'books', label: '7. Recommended Books' },
          { id: 'success', label: '8. Success Stories' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === sec.id
                ? 'bg-amber-500 text-[#001428] font-bold shadow-lg shadow-amber-500/20 border border-amber-300'
                : 'bg-[#001830] hover:bg-[#002244] text-slate-300 border border-white/10'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 1. INTRODUCTION TO SSB */}
      {/* ======================================================== */}
      {activeSection === 'intro' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#001f3f] to-[#001224] border border-amber-500/30 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              The 5-Day Testing Procedure
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              The Services Selection Board (SSB) evaluates candidates across three independent
              techniques: Mansa (Psychology), Vacha (Interview), and Karmana (GTO Ground Tasks). All
              three assessors independently assess whether the candidate possesses the 15
              Officer-Like Qualities (OLQ).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                day: 'Day 0',
                title: 'Reporting',
                items: ['Arrival at Selection Center', 'Document Verification', 'Chest Number Allotment', 'Opening Address'],
              },
              {
                day: 'Day 1',
                title: 'Stage-1 Screening',
                items: ['OIR Test (Verbal & Non-Verbal)', 'PPDT Picture Observation', 'Individual Story Narration', 'Group Discussion & Screen-In'],
              },
              {
                day: 'Day 2',
                title: 'Psychological Tests',
                items: ['TAT (12 Stories)', 'WAT (60 Words, 15s each)', 'SRT (60 Situations, 30 min)', 'Self Description (SD) Test'],
              },
              {
                day: 'Day 3 & 4',
                title: 'GTO Tasks & Interview',
                items: ['GD, GPE, PGT, HGT, IOR', 'Command Task & Snake Race', 'Lecturette', 'Personal Interview with IO'],
              },
              {
                day: 'Day 5',
                title: 'Conference & Results',
                items: ['Closing Address', 'Final Board Conference', 'Declaration of Recommended Candidates', 'Medical Board Briefing'],
              },
            ].map((d, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#001a35] border border-amber-500/20 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    {d.day}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white mb-2">{d.title}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {d.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Core 15 OLQs */}
          <div className="p-8 rounded-3xl bg-[#00172e] border border-sky-400/30 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-sky-400" />
              The 15 Officer-Like Qualities (OLQ)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <span className="font-mono text-amber-400 font-bold">Factor I: Planning & Intellect</span>
                <ul className="space-y-1 text-slate-300">
                  <li>1. Effective Intelligence</li>
                  <li>2. Reasoning Ability</li>
                  <li>3. Organizing Ability</li>
                  <li>4. Power of Expression</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <span className="font-mono text-sky-400 font-bold">Factor II: Social Adjustment</span>
                <ul className="space-y-1 text-slate-300">
                  <li>5. Social Adaptability</li>
                  <li>6. Cooperation</li>
                  <li>7. Sense of Responsibility</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <span className="font-mono text-teal-400 font-bold">Factor III: Social Effectiveness</span>
                <ul className="space-y-1 text-slate-300">
                  <li>8. Initiative</li>
                  <li>9. Self Confidence</li>
                  <li>10. Speed of Decision</li>
                  <li>11. Group Influencing Ability</li>
                  <li>12. Liveliness</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <span className="font-mono text-amber-300 font-bold">Factor IV: Dynamic Qualities</span>
                <ul className="space-y-1 text-slate-300">
                  <li>13. Determination</li>
                  <li>14. Courage</li>
                  <li>15. Stamina</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. OIR PRACTICE ENGINE */}
      {/* ======================================================== */}
      {activeSection === 'oir' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="p-6 rounded-2xl bg-[#001933] border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                Officer Intelligence Rating (OIR) Interactive Test
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Aim for OIR Rating 1 (Top 10 percentile) to guarantee Stage-1 screening clearance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-300 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/30">
                Question {oirCurrentIdx + 1} of {OIR_QUESTIONS.length}
              </span>
              {oirSubmitted && (
                <button
                  onClick={() => {
                    setOirSubmitted(false);
                    setOirSelectedAnswers({});
                    setOirCurrentIdx(0);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs text-white font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Test</span>
                </button>
              )}
            </div>
          </div>

          {!oirSubmitted ? (
            <div className="p-8 rounded-3xl bg-[#001f3f] border border-amber-400/30 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-bold uppercase">
                  Category: {OIR_QUESTIONS[oirCurrentIdx].category}
                </span>
                <span>Single Choice Question</span>
              </div>

              <div className="text-base sm:text-lg font-semibold text-white">
                {OIR_QUESTIONS[oirCurrentIdx].question}
              </div>

              <div className="space-y-2.5">
                {OIR_QUESTIONS[oirCurrentIdx].options.map((option, optIdx) => {
                  const isSelected = oirSelectedAnswers[oirCurrentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() =>
                        setOirSelectedAnswers({
                          ...oirSelectedAnswers,
                          [oirCurrentIdx]: optIdx,
                        })
                      }
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-[#001428] font-bold border-2 border-amber-300 shadow'
                          : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                      }`}
                    >
                      <span>
                        <strong className="mr-2">{String.fromCharCode(65 + optIdx)}.</strong>
                        {option}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#001428]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setOirCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={oirCurrentIdx === 0}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {oirCurrentIdx < OIR_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setOirCurrentIdx((prev) => prev + 1)}
                    className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white cursor-pointer"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => setOirSubmitted(true)}
                    className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-bold text-[#001428] shadow-lg cursor-pointer"
                  >
                    Submit Test & View Results
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#001f3f] border border-emerald-400/40 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Test Completed!</h3>
                <div className="text-3xl font-mono font-bold text-amber-400">
                  Score: {calculateOirScore()} / {OIR_QUESTIONS.length}
                </div>
                <p className="text-xs text-slate-300">
                  {calculateOirScore() >= 5
                    ? 'Excellent! Projected OIR Rating: OIR-1 (Outstanding).'
                    : 'Good attempt. Revise speed math and letter sequencing to reach OIR-1.'}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="font-serif text-base font-bold text-white">Detailed Explanations</h4>
                {OIR_QUESTIONS.map((q, idx) => {
                  const userAnswer = oirSelectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">
                          Question {idx + 1}: {q.question}
                        </span>
                        <span
                          className={`font-mono px-2 py-0.5 rounded font-bold ${
                            isCorrect
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="text-amber-300">
                        Correct Answer: {q.options[q.correctAnswer]}
                      </div>
                      <p className="text-slate-400 italic">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended YouTube for OIR */}
          <div className="p-6 rounded-2xl bg-[#00172e] border border-red-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Youtube className="w-6 h-6 text-red-500" />
              <div>
                <h4 className="font-serif text-sm font-bold text-white">
                  Recommended Channels for OIR Practice
                </h4>
                <p className="text-xs text-slate-400">
                  Defence Direct Education · Major Kalshi Classes (MKC)
                </p>
              </div>
            </div>
            <span className="text-xs text-amber-300 font-mono">Watch Daily 30 mins</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. PPDT SIMULATOR */}
      {/* ======================================================== */}
      {activeSection === 'ppdt' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#001f3f] border border-amber-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  PPDT Simulator (Picture Perception & Discussion Test)
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Stage-1 decisive barrier: 30s picture perception + 1 min box marking + 4 mins
                  story writing.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {ppdtPhase === 'idle' && (
                  <button
                    onClick={() => {
                      setPpdtPhase('observing');
                      setPpdtSecondsLeft(30);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#001428] font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start 30s Picture Perception</span>
                  </button>
                )}
                {ppdtPhase !== 'idle' && (
                  <button
                    onClick={() => {
                      setPpdtPhase('idle');
                      setPpdtSecondsLeft(30);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stimulus Canvas Simulation */}
            <div className="relative aspect-video max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-white/20 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl">
              {ppdtPhase === 'observing' && (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full border-4 border-amber-400 flex items-center justify-center text-amber-300 font-mono text-2xl font-bold animate-pulse mx-auto">
                    {ppdtSecondsLeft}s
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/20 text-slate-200 text-xs sm:text-sm max-w-md">
                    <strong>Sample Blurred Picture:</strong> Three young individuals standing near a
                    rural river embankment with flood markings; one holds a measuring staff and
                    pointing toward a breached culvert.
                  </div>
                </div>
              )}

              {ppdtPhase === 'writing' && (
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                    <span>Story Writing Phase</span>
                    <span className="font-bold text-base">{Math.floor(ppdtSecondsLeft / 60)}:{(ppdtSecondsLeft % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Write your story: 1. What led to the scene? 2. What is currently happening? 3. What is the positive outcome?..."
                    className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {ppdtPhase === 'idle' && (
                <div className="text-slate-400 text-xs sm:text-sm space-y-2">
                  <Brain className="w-12 h-12 text-amber-400 mx-auto opacity-70" />
                  <p>Click &quot;Start 30s Picture Perception&quot; to begin the timed drill.</p>
                </div>
              )}

              {ppdtPhase === 'completed' && (
                <div className="text-emerald-400 space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-white">Time Up! Prepare for Narration</h4>
                  <p className="text-xs text-slate-300">
                    Stand tall, keep the story under 60 seconds, maintain eye contact with the group, and do not look at the assessors.
                  </p>
                </div>
              )}
            </div>

            {/* PPDT Rules & Narration Guidance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs">
              <div className="space-y-2">
                <span className="font-serif text-sm font-bold text-amber-300">
                  Story Writing Golden Rules
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• Choose a central hero close to your own age and gender.</li>
                  <li>• Give the hero an active profession (e.g. 3rd-year engineering student).</li>
                  <li>• Ensure the crisis is realistic and solved through proactive planning.</li>
                  <li>• Conclude with a constructive, tangible social outcome.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-serif text-sm font-bold text-sky-300">
                  1-Minute Narration & GD Tactics
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• Never stammer: speak at a calm, deliberate 110 words/minute.</li>
                  <li>• Do not look at the Psychologists or GTO; look only at your group mates.</li>
                  <li>• In the Group Discussion, do not shout; initiate or support constructive points.</li>
                  <li>• Help the group arrive at a unified common group story.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PSYCHOLOGY TESTS (TAT, WAT, SRT, SD) */}
      {/* ======================================================== */}
      {activeSection === 'psychology' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* WAT Interactive Drill */}
          <div className="p-8 rounded-3xl bg-[#001f3f] border border-amber-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                  Stage-2 Psychology
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Word Association Test (WAT) 15-Second Drill
                </h3>
              </div>
              <button
                onClick={() => {
                  setWatRunning(!watRunning);
                  if (!watRunning) setWatTimer(15);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer ${
                  watRunning
                    ? 'bg-red-500 text-white'
                    : 'bg-amber-500 text-[#001428] hover:bg-amber-400'
                }`}
              >
                {watRunning ? 'Pause Flashcard Drill' : 'Start 15s WAT Drill'}
              </button>
            </div>

            {/* Active Word Card */}
            <div className="p-10 rounded-2xl bg-gradient-to-br from-[#001428] to-[#002244] border-2 border-amber-400/40 text-center space-y-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Word {watActiveIdx + 1} of {WAT_WORDS.length}</span>
                <span className="text-amber-400 font-bold text-sm">{watTimer}s Left</span>
              </div>

              <div className="text-4xl sm:text-6xl font-naval font-bold text-white tracking-widest py-4">
                {WAT_WORDS[watActiveIdx].word}
              </div>

              <div className="text-xs text-slate-300 max-w-md mx-auto pt-2 border-t border-white/10">
                <span className="text-sky-300 font-medium">Model Response Idea: </span>
                <span className="italic">{WAT_WORDS[watActiveIdx].example}</span>
              </div>
            </div>
          </div>

          {/* Situation Reaction Test (SRT) Solver */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-sky-400" />
              Situation Reaction Test (SRT) - Real Scenarios & High-Scoring Actions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SRT_QUESTIONS.map((srt) => (
                <div
                  key={srt.id}
                  className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 space-y-3 shadow-lg"
                >
                  <div className="text-xs font-mono text-amber-400 font-bold">
                    Situation #{srt.id}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {srt.situation}
                  </p>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold block">
                      Recommended Action:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &ldquo;{srt.modelResponse}&rdquo;
                    </p>
                  </div>
                  <div className="text-[11px] text-sky-300/80 font-mono">
                    OLQs Demonstrated: {srt.coreQuality}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. GTO GROUND TASKS */}
      {/* ======================================================== */}
      {activeSection === 'gto' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#001f3f] border border-amber-500/30 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-naval font-bold text-white">
              Group Testing Officer (GTO) Tasks & Ground Physics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              GTO tasks test practical intelligence, team cohesion, and physical endurance. For
              engineering cadets, mastering the structural mechanics of Cantilevers, Fulcrums, and
              Lashings guarantees effortless command over PGT, HGT, and Command Task.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 space-y-3">
              <h4 className="font-serif text-base font-bold text-amber-300">
                1. The Cantilever Rule (Fulcrum & Load)
              </h4>
              <p className="text-slate-300 leading-relaxed">
                When spanning a gap without intermediate supports, place a wooden plank under a
                stanchion crossbar such that the downward weight of teammates acts as the counterweight
                (effort) holding the protruding plank rigid.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#001830] border border-sky-400/20 space-y-3">
              <h4 className="font-serif text-base font-bold text-sky-300">
                2. GTO Color Code Rules
              </h4>
              <ul className="text-slate-300 space-y-1.5">
                <li>• <strong>White:</strong> Usable by candidates and helping materials (Plank, Balli, Rope).</li>
                <li>• <strong>Blue / Yellow:</strong> Usable by candidates only; helping material cannot touch.</li>
                <li>• <strong>Red:</strong> Strictly out of bounds for both men and material.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#001830] border border-emerald-400/20 space-y-3">
              <h4 className="font-serif text-base font-bold text-emerald-300">
                3. Group Planning Exercise (GPE)
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Prioritize multiple crises sequentially: 1. Threat to human life (e.g. bomb on rail
                track), 2. Threat to property, 3. Urgent secondary errands. Divide 8-member squad
                into sub-teams with designated timeframes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. PERSONAL INTERVIEW BANK */}
      {/* ======================================================== */}
      {activeSection === 'interview' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 rounded-2xl bg-[#001933] border border-amber-500/25">
            <h2 className="font-serif text-xl font-bold text-white">
              Personal Interview Question Bank (Rapid Fire CIQ)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Categorized questions frequently posed by the President / Vice President of the Board
              to Naval NCC Cadets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-[#001830] border border-white/10 space-y-3">
              <h4 className="font-serif text-base font-bold text-amber-300">
                A. Naval NCC Specific Questions
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>• Why did you choose Naval NCC over Army or Air Wing at GCEK?</li>
                <li>• Explain the difference between a Bowline knot and a Clove hitch. Where are they used on a warship?</li>
                <li>• What are the four commands given by a Coxswain in a naval whaler boat?</li>
                <li>• What is the displacement and main weapon system of INS Vikrant?</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#001830] border border-white/10 space-y-3">
              <h4 className="font-serif text-base font-bold text-sky-300">
                B. Engineering & Leadership Questions
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>• How will you apply your B.Tech engineering degree to the Executive or Technical branch of the Indian Navy?</li>
                <li>• Tell me about a time you had a severe conflict with your Senior Cadet or team member and how you resolved it.</li>
                <li>• What are your two greatest strengths and two areas of self-improvement?</li>
                <li>• If you are not recommended in this attempt, what is your backup plan?</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. RECOMMENDED BOOKS */}
      {/* ======================================================== */}
      {activeSection === 'books' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#001830] border border-amber-500/20 space-y-3">
              <div className="text-xs font-mono text-amber-400">Essential Guide</div>
              <h3 className="font-serif text-lg font-bold text-white">
                SSB Interview: The Complete Guide
              </h3>
              <p className="text-xs text-slate-400">By Dr. (Cdr) N.K. Natarajan</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                The gold standard handbook by a former naval GTO. Deep explanation of the PIQ form,
                TAT story psychology, and GTO obstacles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#001830] border border-sky-400/20 space-y-3">
              <div className="text-xs font-mono text-sky-400">Psychology & OIR</div>
              <h3 className="font-serif text-lg font-bold text-white">
                Let&apos;s Crack SSB Interview
              </h3>
              <p className="text-xs text-slate-400">By SSBCrack / Arihant Publications</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contains over 2,000 OIR practice questions, 50 sample PPDT pictures, and authentic
                WAT sentences used by recommended candidates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#001830] border border-teal-400/20 space-y-3">
              <div className="text-xs font-mono text-teal-400">Personality & Current Affairs</div>
              <h3 className="font-serif text-lg font-bold text-white">
                India&apos;s Maritime Security
              </h3>
              <p className="text-xs text-slate-400">By Integrated Defence Staff (IDS)</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vital for the Lecturette and Personal Interview to discuss Indo-Pacific strategy,
                AUKUS, and Chinese naval presence in the Indian Ocean.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. SUCCESS STORIES */}
      {/* ======================================================== */}
      {activeSection === 'success' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI_PROFILES.slice(0, 2).map((alum) => (
              <div
                key={alum.id}
                className="p-7 rounded-2xl bg-[#001f3f] border border-amber-500/25 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                    {alum.serviceBranch}
                  </span>
                  <span className="text-slate-400">{alum.batch}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">{alum.name}</h3>
                <p className="text-xs text-sky-300 font-semibold">{alum.currentDesignation}</p>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 italic leading-relaxed">
                  &ldquo;{alum.adviceForCadets}&rdquo;
                </div>
                <div className="text-xs text-amber-300 font-medium">
                  SSB Strategy: {alum.notableAchievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
