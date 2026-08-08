import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';

const demoUsers = [
  {
    role: 'student',
    label: 'Masuk sebagai Siswa',
    name: 'Demo Siswa',
    email: 'demo.student@educonnect.id',
    icon: User,
    description: 'Langsung cek dashboard siswa dan fitur kursus.',
  },
  {
    role: 'teacher',
    label: 'Masuk sebagai Guru',
    name: 'Demo Guru',
    email: 'demo.teacher@educonnect.id',
    icon: GraduationCap,
    description: 'Langsung cek dashboard guru dan fitur pengajar.',
  },
];

export const DemoPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoLogin = (demo) => {
    login({
      name: demo.name,
      email: demo.email,
      role: demo.role,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <Card className="border-slate-200/80 shadow-xl">
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-dark">Demo Login EduConnect</h1>
              <p className="text-sm text-muted mt-2">
                Pilih role untuk langsung masuk ke dashboard dan memeriksa tampilan siswa atau guru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoUsers.map((demo) => {
                const Icon = demo.icon;
                return (
                  <div key={demo.role} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-dark">{demo.label}</h2>
                        <p className="text-[12px] text-slate-500">{demo.description}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleDemoLogin(demo)}
                      variant="primary"
                      className="w-full"
                    >
                      Buka Dashboard
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DemoPage;
