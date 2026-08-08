import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AssignmentStatusBadge from './AssignmentStatusBadge';

const AssignmentCard = ({ task, onSubmit }) => {
    return (
        <Card className="border-slate-200/80 hover:border-slate-300 transition-colors">
            <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <Badge variant="primary" size="sm">{task.courseTitle}</Badge>
                        <h3 className="text-sm font-bold text-dark pt-1">{task.title}</h3>
                    </div>
                    {task.status === 'completed' ? (
                        <div className="text-right shrink-0">
                            <span className="text-[10px] text-muted font-semibold block">Nilai Kamu</span>
                            <span className="text-lg font-black text-emerald-600">{task.score} / 100</span>
                        </div>
                    ) : (
                        <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded-lg border border-rose-200 shrink-0 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {task.dueDate}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-muted font-medium flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        Tipe: Project / Slicing
                    </span>
                    {task.status === 'pending' ? (
                        <Button size="sm" onClick={() => onSubmit(task)}>
                            Kumpulkan Tugas
                        </Button>
                    ) : (
                        <AssignmentStatusBadge status={task.status} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AssignmentCard;
