import React from 'react';
import { Clock, HelpCircle, Trophy, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export const QuizCard = ({ quiz, onStartQuiz }) => {
  const {
    id,
    title,
    subject,
    questionsCount,
    durationMinutes,
    status, // 'available' | 'completed' | 'expired'
    score,
    deadline,
  } = quiz;

  const renderStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="emerald" size="sm" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Selesai
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="rose" size="sm" className="gap-1">
            <AlertCircle className="w-3 h-3" />
            Lewat Tenggat
          </Badge>
        );
      default:
        return (
          <Badge variant="primary" size="sm" className="gap-1">
            <Clock className="w-3 h-3" />
            Siap Dikerjakan
          </Badge>
        );
    }
  };

  return (
    <Card className="border-slate-200/80 hover:border-slate-300 transition-all duration-200">
      <CardContent className="p-5 flex flex-col justify-between space-y-4 h-full">
        <div className="space-y-3">
          {/* Header Card: Subject & Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
              {subject}
            </span>
            {renderStatusBadge()}
          </div>

          {/* Quiz Title */}
          <h3 className="text-sm font-bold text-dark leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Meta Info: Total Soal & Durasi */}
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>{questionsCount} Soal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{durationMinutes} Menit</span>
            </div>
          </div>
        </div>

        {/* Footer Card: Action / Score Result */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {status === 'completed' ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">Nilai Kamu:</span>
              <span className="text-sm font-black text-emerald-600 flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-500" />
                {score} / 100
              </span>
            </div>
          ) : status === 'expired' ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-rose-500 font-medium">Batas waktu telah berakhir</span>
              <Button size="sm" variant="outline" disabled>
                Tutup
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] text-muted">Tenggat: {deadline}</span>
              <Button size="sm" className="gap-1.5" onClick={() => onStartQuiz(quiz)}>
                <Play className="w-3.5 h-3.5 fill-current" />
                Mulai Kuis
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;