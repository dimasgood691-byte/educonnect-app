import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './components/dashboard/StudentDashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AssignmentsPage from './pages/AssignmentsPage';
import QuizPage from './pages/QuizPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CertificatesPage from './pages/CertificatesPage';
import ForumPage from './pages/ForumPage';
import EditProfilePage from './pages/EditProfilePage';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import TeacherClassesPage from './pages/TeacherClassesPage';
import TeacherAssignmentsPage from './pages/TeacherAssignmentsPage';
import TeacherQuizzesPage from './pages/TeacherQuizzesPage';
import TeacherStudentsPage from './pages/TeacherStudentsPage';
import TeacherReportsPage from './pages/TeacherReportsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import DemoPage from './pages/DemoPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

// Guard untuk memproteksi rute berdasarkan autentikasi dan role
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Jika tidak ada session user, balikkan ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika role spesifik diminta dan tidak sesuai, arahkan ke dashboard masing-masing
  if (allowedRole && user.role !== allowedRole) {
    return (
      <Navigate
        to={user.role === 'teacher' ? '/teacher/dashboard' : '/dashboard'}
        replace
      />
    );
  }

  return children;
};

const DashboardRouter = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'teacher') {
    return <TeacherDashboard />;
  }

  if (user.role === 'student') {
    return <StudentDashboard />;
  }

  return <Navigate to="/login" replace />;
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/demo" element={<DemoPage />} />

          {/* Rute Dashboard Utama berdasarkan role */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Rute Dashboard Guru */}
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/classes"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherClassesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/assignments"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherAssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/quizzes"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherQuizzesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherStudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/reports"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={<Navigate to="/teacher/dashboard" replace />}
          />

          {/* Shared Protected Routes */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <AssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <CertificatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <AIAssistantPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;