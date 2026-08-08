import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, HelpCircle, CheckCircle2, XCircle, Award, Sparkles, ArrowRight, RotateCcw, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import QuizCard from '../components/quiz/QuizCard';

// Dummy data daftar kuis
const dummyQuizzes = [
  {
    id: 'q1',
    title: 'Kuis Evaluasi React Hooks & Component Lifecycle',
    subject: 'Kejuruan RPL',
    questionsCount: 3,
    durationMinutes: 5,
    status: 'available',
    deadline: 'Hari Ini, 23:59',
  },
  {
    id: 'q2',
    title: 'Kuis Basic Fundamentals Tailwind CSS v4',
    subject: 'Kejuruan RPL',
    questionsCount: 15,
    durationMinutes: 20,
    status: 'completed',
    score: 90,
  },
  {
    id: 'q3',
    title: 'Kuis Advanced JavaScript Async & Promise',
    subject: 'Kejuruan RPL',
    questionsCount: 10,
    durationMinutes: 15,
    status: 'expired',
  },
];

// Soal kuis interaktif
const quizQuestions = [
  {
    id: 1,
    question: 'Manakah perintah Hook di React JS yang digunakan untuk menangani efek samping (side effects) seperti data fetching?',
    options: ['useState()', 'useEffect()', 'useContext()', 'useReducer()'],
    correct: 1,
  },
  {
    id: 2,
    question: 'Di bawah ini yang merupakan keunggulan utama dari penggunaan Tailwind CSS v4 adalah...',
    options: [
      'Memerlukan konfigurasi JavaScript terpisah yang rumit',
      'Engine berbasis CSS murni tanpa perlu konfigurasi PostCSS wajib',
      'Menggantikan fungsi logika JavaScript',
      'Hanya bisa dijalankan di React JS',
    ],
    correct: 1,
  },
  {
    id: 3,
    question: 'Sifat dari props pada komponen React JS adalah...',
    options: ['Mutable (dapat diubah langsung)', 'Immutable (read-only)', 'Global State', 'Database Table'],
    correct: 1,
  },
];

export const QuizPage = () => {
  const navigate = useNavigate();
  
  // State manajemen alur kuis
  const [activeQuiz, setActiveQuiz] = useState(null); // Kuis yang sedang dipilih
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 Menit
  const [isFinished, setIsFinished] = useState(false);

  // Timer countdown saat kuis aktif
  useEffect(() => {
    if (!activeQuiz || isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeQuiz, timeLeft, isFinished]);

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(quiz.durationMinutes * 60);
    setIsFinished(false);
  };

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    });
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    return Math.round((score / quizQuestions.length) * 100);
  };

  const renderCorrectionList = () => {
    return quizQuestions.map((q, idx) => {
      const userAnswer = selectedAnswers[idx];
      const isCorrect = userAnswer === q.correct;
      return (
        <div
          key={q.id}
          className={`rounded-2xl border p-4 ${isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[12px] font-bold text-dark">Soal {idx + 1}</h3>
              <p className="text-[11px] text-slate-600 mt-1">{q.question}</p>
            </div>
            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {isCorrect ? 'Benar' : 'Salah'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-3 text-[11px] text-slate-700">
            <div className="rounded-2xl p-3 bg-white border border-slate-200">
              <p className="font-semibold text-slate-900">Jawaban Kamu</p>
              <p className="mt-1">{userAnswer !== undefined ? q.options[userAnswer] : 'Tidak dijawab'}</p>
            </div>
            <div className="rounded-2xl p-3 bg-white border border-slate-200">
              <p className="font-semibold text-slate-900">Jawaban Benar</p>
              <p className="mt-1">{q.options[q.correct]}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <DashboardLayout>
      {/* 1. Tampilan Daftar Kuis jika belum ada kuis yang dipilih */}
      {!activeQuiz ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-dark">Kuis Interaktif</h1>
              <p className="text-xs text-muted">Uji pemahaman materi pembelajaran kamu di sini.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onStartQuiz={handleStartQuiz} />
            ))}
          </div>
        </div>
      ) : (
        /* 2. Tampilan Pengerjaan & Hasil Kuis */
        <div className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setActiveQuiz(null)}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Daftar Kuis
          </Button>

          {!isFinished ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header & Timer */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {activeQuiz.title}
                  </span>
                  <h2 className="text-sm font-bold text-dark">
                    Soal {currentQuestion + 1} dari {quizQuestions.length}
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Sisa Waktu: {formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Question Card */}
              <Card className="border-slate-200/80">
                <CardContent className="p-6 space-y-6">
                  <p className="text-sm sm:text-base font-bold text-dark leading-relaxed">
                    {quizQuestions[currentQuestion].question}
                  </p>

                  {/* Options */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((opt, idx) => {
                      const isSelected = selectedAnswers[currentQuestion] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full p-4 text-left rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    >
                      Sebelumnya
                    </Button>

                    {currentQuestion < quizQuestions.length - 1 ? (
                      <Button
                        size="sm"
                        disabled={selectedAnswers[currentQuestion] === undefined}
                        onClick={() => setCurrentQuestion((prev) => prev + 1)}
                      >
                        Selanjutnya
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled={selectedAnswers[currentQuestion] === undefined}
                        onClick={() => setIsFinished(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Selesaikan Kuis
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Quiz Result Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center space-y-6 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-primary mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <Badge variant="success" size="sm">
                  Kuis Selesai
                </Badge>
                <h2 className="text-xl font-black text-dark">Hasil Kuis Evaluasi</h2>
                <p className="text-xs text-muted">
                  Selamat! Kamu telah menyelesaikan seluruh soal kuis ini.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="text-xs text-muted font-bold uppercase">Skor Perolehan</span>
                <div className="text-4xl font-black text-primary">{calculateScore()} / 100</div>
                <span className="text-[11px] text-emerald-600 font-bold block pt-1">
                  +150 XP Ditambahkan ke Akun
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {renderCorrectionList()}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 gap-1.5"
                    onClick={() => {
                      setIsFinished(false);
                      setCurrentQuestion(0);
                      setSelectedAnswers({});
                      setTimeLeft(activeQuiz.durationMinutes * 60);
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Coba Lagi
                  </Button>
                  <Button className="flex-1 gap-1.5" onClick={() => setActiveQuiz(null)}>
                    Daftar Kuis
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default QuizPage;