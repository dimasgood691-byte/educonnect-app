import React from 'react';
import { Bell, CalendarDays, ArrowRight } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const AnnouncementCard = ({ announcement }) => {
    if (!announcement) return null;

    return (
        <Card className="border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-amber-500" />
                            <CardTitle className="text-base font-bold text-dark">
                                {announcement.title}
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted">
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span>{announcement.date}</span>
                        </div>
                    </div>
                    <Badge variant="primary" size="sm">
                        {announcement.category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
                <p className="text-sm text-slate-600 leading-6">{announcement.content}</p>
                <div className="flex items-center justify-end">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                        <span className="mr-1">Lihat detail</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AnnouncementCard;
