import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './views/DashboardView';
import { AnalysisView } from './views/AnalysisView';
import { AdminView } from './views/AdminView';

function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleForm={() => setIsLogin(true)} />
      )}
    </div>
  );
}

function MainApp() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Alert acknowledged:', alertId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onAcknowledgeAlert={handleAcknowledgeAlert} />;
      case 'analysis':
        return <AnalysisView />;
      case 'alerts':
        return (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Alert Management</h2>
            <p className="text-gray-400">Advanced alert management interface coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Reports & Analytics</h2>
            <p className="text-gray-400">Detailed reporting and analytics interface coming soon...</p>
          </div>
        );
      case 'users':
      case 'logs':
      case 'settings':
        return <AdminView />;
      default:
        return <DashboardView onAcknowledgeAlert={handleAcknowledgeAlert} />;
    }
  };

  if (!user) {
    return <AuthWrapper />;
  }

  return (
    <div className="h-screen bg-gray-900 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;