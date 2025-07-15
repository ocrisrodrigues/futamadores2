import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeFeed } from './components/HomeFeed';
import { SearchScreen } from './components/SearchScreen';
import { SearchResults } from './components/SearchResults';
import { TeamProfile } from './components/TeamProfile';
import { PublishGame } from './components/PublishGame';
import { CalendarScreen } from './components/CalendarScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RequestGameScreen } from './components/RequestGameScreen';
import { RequestSuccessScreen } from './components/RequestSuccessScreen';
import { GameHistoryScreen } from './components/GameHistoryScreen';
import { ResultsTestScreen } from './components/ResultsTestScreen';
import { MyPostsScreen } from './components/MyPostsScreen';
import { FeedbackWidget } from './components/FeedbackWidget';
import { toast } from 'sonner@2.0.3';

type Screen = 
  | 'onboarding' 
  | 'auth' 
  | 'home' 
  | 'search' 
  | 'search-results' 
  | 'team-profile' 
  | 'publish' 
  | 'calendar' 
  | 'profile'
  | 'request-game'
  | 'request-success'
  | 'game-history'
  | 'results-test'
  | 'my-posts';

interface AppState {
  currentScreen: Screen;
  activeTab: string;
  user: any;
  searchResults: any[];
  selectedTeamId: string | null;
  selectedGameId: string | null;
  requestData: any;
  isLoggedIn: boolean;
  authMode: 'login' | 'register';
}

function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'onboarding',
    activeTab: 'home',
    user: null,
    searchResults: [],
    selectedTeamId: null,
    selectedGameId: null,
    requestData: null,
    isLoggedIn: false,
    authMode: 'register'
  });

  const navigateTo = (screen: Screen, data?: any) => {
    setState(prev => ({
      ...prev,
      currentScreen: screen,
      ...data
    }));
  };

  const handleTabChange = (tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }));
    
    switch (tab) {
      case 'home':
        navigateTo('home');
        break;
      case 'search':
        navigateTo('search');
        break;
      case 'add':
        // Publicar jogo requer login
        if (!state.isLoggedIn) {
          toast.error('Você precisa estar logado para publicar jogos');
          setState(prev => ({ ...prev, authMode: 'login' }));
          navigateTo('auth');
        } else {
          navigateTo('publish');
        }
        break;
      case 'calendar':
        // Agenda requer login
        if (!state.isLoggedIn) {
          toast.error('Você precisa estar logado para acessar sua agenda');
          setState(prev => ({ ...prev, authMode: 'login' }));
          navigateTo('auth');
        } else {
          navigateTo('calendar');
        }
        break;
      case 'profile':
        // Perfil requer login
        if (!state.isLoggedIn) {
          toast.error('Você precisa estar logado para acessar seu perfil');
          setState(prev => ({ ...prev, authMode: 'login' }));
          navigateTo('auth');
        } else {
          navigateTo('profile');
        }
        break;
    }
  };

  const handleAuth = (userData: any) => {
    setState(prev => ({ ...prev, user: userData, isLoggedIn: true }));
    navigateTo('home');
    toast.success(`Bem-vindo, ${userData.teamName}!`);
  };

  const handleLogout = () => {
    setState(prev => ({ 
      ...prev, 
      user: null, 
      isLoggedIn: false,
      activeTab: 'home' // Volta para home após logout
    }));
    navigateTo('home'); // Volta para o feed público
    toast.success('Logout realizado com sucesso! Você pode continuar navegando no feed público.');
  };

  const handleLoginRedirect = () => {
    setState(prev => ({ ...prev, authMode: 'login' })); // Define modo como login
    navigateTo('auth');
    toast.info('Faça login para solicitar jogos e acessar todas as funcionalidades');
  };

  const handleSearch = (filters: any) => {
    // Simulate search results
    const mockResults = [
      {
        id: '1',
        name: 'Tigres FC',
        logo: '🐅',
        city: filters.city || 'São Paulo',
        state: filters.state || 'SP',
        modality: filters.modality || 'Society (7x7)',
        availableDates: ['15/01', '22/01', '29/01'],
        location: 'Campo do Ibirapuera',
        rating: 4.5,
        gamesPlayed: 23,
        nextAvailable: '15 de Janeiro'
      }
    ];

    navigateTo('search-results', { searchResults: mockResults });
    toast.success(`${mockResults.length} times encontrados!`);
  };

  const handleGameRequest = (gameId: string) => {
    if (!state.isLoggedIn) {
      toast.error('Você precisa estar logado para solicitar jogos');
      setState(prev => ({ ...prev, authMode: 'login' }));
      navigateTo('auth');
      return;
    }
    
    // Navegar para a tela de solicitação
    navigateTo('request-game', { selectedGameId: gameId });
  };

  const handleRequestSent = (requestData: any) => {
    // Salvar dados da solicitação e ir para tela de sucesso
    setState(prev => ({ ...prev, requestData }));
    navigateTo('request-success');
    
    // Toast de feedback
    toast.success('Solicitação enviada com sucesso! O time será notificado.');
  };

  const handleShare = (gameId: string) => {
    // Esta função agora é gerenciada internamente pelo HomeFeed
    // Mantemos aqui para compatibilidade
    toast.success('Compartilhamento realizado!');
  };

  const handleViewProfile = (teamId: string) => {
    navigateTo('team-profile', { selectedTeamId: teamId });
  };

  const handleViewTeamProfileFromFeed = (teamId: string) => {
    // Quando vier do feed, definir que volta para o home
    navigateTo('team-profile', { 
      selectedTeamId: teamId,
      returnTo: 'home' 
    });
  };

  const handleRequestGameWithDate = (teamId: string, date: Date) => {
    if (!state.isLoggedIn) {
      toast.error('Você precisa estar logado para solicitar jogos');
      setState(prev => ({ ...prev, authMode: 'login' }));
      navigateTo('auth');
      return;
    }
    toast.success(`Solicitação enviada para ${date.toLocaleDateString('pt-BR')}!`);
  };

  const handleRequestGameGeneral = (teamId: string) => {
    if (!state.isLoggedIn) {
      toast.error('Você precisa estar logado para solicitar jogos');
      setState(prev => ({ ...prev, authMode: 'login' }));
      navigateTo('auth');
      return;
    }
    // Navegar para tela de solicitação geral (simulando um post do time)
    navigateTo('request-game', { 
      selectedGameId: `team-${teamId}`,
      selectedTeamId: teamId 
    });
  };

  const handleContact = (contactUrl: string) => {
    window.open(contactUrl, '_blank');
  };

  const handlePublishGame = (gameData: any) => {
    toast.success('Jogo publicado com sucesso!');
    setTimeout(() => {
      navigateTo('home');
    }, 2000);
  };

  const handleAddAvailableDate = (date: Date) => {
    toast.success(`Data ${date.toLocaleDateString('pt-BR')} marcada como disponível!`);
  };

  const handleRemoveAvailableDate = (date: Date) => {
    toast.success(`Data ${date.toLocaleDateString('pt-BR')} removida da disponibilidade!`);
  };

  const handleUpdateProfile = (profile: any) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...profile } }));
    toast.success('Perfil atualizado com sucesso!');
  };

  // Informações do usuário para o Layout
  const userInfo = state.isLoggedIn ? {
    teamName: state.user?.teamName || 'Tigres FC',
    isLoggedIn: true
  } : undefined;

  // Render current screen
  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            onGetStarted={() => {
              setState(prev => ({ ...prev, authMode: 'register' }));
              navigateTo('auth');
            }}
            onExplore={() => navigateTo('home')} // Vai direto para o feed
          />
        );

      case 'auth':
        return (
          <AuthScreen
            onBack={() => navigateTo('onboarding')}
            onLogin={handleAuth}
            defaultMode={state.authMode} // Passa o modo definido
          />
        );

      case 'home':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            showLoginPrompt={!state.isLoggedIn}
            onLoginPrompt={() => {
              setState(prev => ({ ...prev, authMode: 'login' }));
              navigateTo('auth');
            }}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <HomeFeed
              onGameRequest={handleGameRequest}
              onShare={handleShare}
              onLoginRedirect={handleLoginRedirect}
              onViewTeamProfile={handleViewTeamProfileFromFeed}
              isLoggedIn={state.isLoggedIn}
            />
          </Layout>
        );

      case 'search':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <SearchScreen onSearch={handleSearch} />
          </Layout>
        );

      case 'search-results':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <SearchResults
              results={state.searchResults}
              onBack={() => navigateTo('search')}
              onViewProfile={handleViewProfile}
              onRequestGame={handleGameRequest}
            />
          </Layout>
        );

      case 'team-profile':
        return (
          <TeamProfile
            teamId={state.selectedTeamId || '1'}
            onBack={() => {
              // Se veio do feed, volta para home, senão volta para search-results
              const returnTo = (state as any).returnTo || 'search-results';
              navigateTo(returnTo);
            }}
            onRequestGame={handleRequestGameWithDate}
            onContact={handleContact}
            onRequestGameGeneral={handleRequestGameGeneral}
          />
        );

      case 'publish':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <PublishGame onPublish={handlePublishGame} />
          </Layout>
        );

      case 'calendar':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <CalendarScreen
              onAddAvailableDate={handleAddAvailableDate}
              onRemoveAvailableDate={handleRemoveAvailableDate}
            />
          </Layout>
        );

      case 'profile':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <ProfileScreen
              user={state.user}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              onViewGameHistory={() => navigateTo('game-history')}
              onViewMyPosts={() => navigateTo('my-posts')}
            />
          </Layout>
        );

      case 'request-game':
        return (
          <RequestGameScreen
            gameId={state.selectedGameId || '1'}
            onBack={() => {
              // Se veio do perfil do time, volta para o perfil
              if (state.selectedGameId?.startsWith('team-')) {
                navigateTo('team-profile', { selectedTeamId: state.selectedTeamId });
              } else {
                // Se veio do feed, volta para home
                navigateTo('home');
              }
            }}
            onRequestSent={handleRequestSent}
          />
        );

      case 'request-success':
        return (
          <RequestSuccessScreen
            requestData={state.requestData}
            onGoHome={() => {
              setState(prev => ({ ...prev, activeTab: 'home' }));
              navigateTo('home');
            }}
            onGoToCalendar={() => {
              setState(prev => ({ ...prev, activeTab: 'calendar' }));
              navigateTo('calendar');
            }}
          />
        );

      case 'game-history':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <GameHistoryScreen />
          </Layout>
        );

      case 'results-test':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <ResultsTestScreen />
          </Layout>
        );

      case 'my-posts':
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <MyPostsScreen 
              onBack={() => navigateTo('profile')}
              onEditPost={(post) => {
                toast.success('Funcionalidade de edição implementada!');
              }}
              onDeletePost={(postId) => {
                toast.success('Post excluído com sucesso!');
              }}
              onCreateNewPost={() => {
                setState(prev => ({ ...prev, activeTab: 'add' }));
                navigateTo('publish');
              }}
            />
          </Layout>
        );

      default:
        return (
          <Layout 
            activeTab={state.activeTab} 
            onTabChange={handleTabChange}
            userInfo={userInfo}
            onLogout={handleLogout}
          >
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold">Tela em desenvolvimento</h2>
              <p className="text-gray-600 mt-2">Esta funcionalidade será implementada em breve!</p>
            </div>
          </Layout>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      
      {/* Widget de Feedback para fase de testes */}
      <FeedbackWidget 
        position="bottom-right" 
        isTestMode={true} 
      />
    </div>
  );
}

export default App;