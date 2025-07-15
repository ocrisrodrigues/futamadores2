import React from 'react';
import { Home, Search, Plus, User, Calendar, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showLoginPrompt?: boolean;
  onLoginPrompt?: () => void;
  userInfo?: {
    teamName: string;
    isLoggedIn: boolean;
  };
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange,
  showLoginPrompt = false,
  onLoginPrompt,
  userInfo,
  onLogout
}) => {
  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
      onLogout?.();
    }
  };

  // Definir todos os tabs possíveis
  const allTabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'add', icon: Plus, label: 'Publicar' },
    { id: 'calendar', icon: Calendar, label: 'Agenda', requiresLogin: true }, // Requer login
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  // Filtrar tabs baseado no status de login
  const tabs = allTabs.filter(tab => {
    // Se o tab requer login e o usuário não está logado, não mostrar
    if (tab.requiresLogin && !userInfo?.isLoggedIn) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">⚽</span>
            </div>
            <h1 className="text-xl font-bold">FutAmadores</h1>
          </div>
          
          {/* User status and actions */}
          <div className="flex items-center space-x-2">
            {userInfo?.isLoggedIn ? (
              <>
                {/* User info */}
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{userInfo.teamName}</p>
                  <p className="text-xs text-green-100">Logado</p>
                </div>
                
                {/* Logout button */}
                <Button
                  onClick={handleLogout}
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              /* Login button for non-logged users */
              showLoginPrompt && (
                <Button
                  onClick={onLoginPrompt}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <LogIn size={16} className="mr-2" />
                  Entrar
                </Button>
              )
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-500 hover:text-green-600'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};