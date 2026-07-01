import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import CreateJobPage from './pages/CreateJobPage';
import EditJobPage from './pages/EditJobPage';
import CompanyPage from './pages/CompanyPage';
import JobApplyPage from './pages/JobApplyPage';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <div>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/jobs/:id/apply" element={<ProtectedRoute><JobApplyPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/employer" element={<ProtectedRoute><EmployerDashboardPage /></ProtectedRoute>} />
          <Route path="/employer/jobs/create" element={<ProtectedRoute><CreateJobPage /></ProtectedRoute>} />
          <Route path="/employer/jobs/:id/edit" element={<ProtectedRoute><EditJobPage /></ProtectedRoute>} />
          <Route path="/companies/:id" element={<CompanyPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
