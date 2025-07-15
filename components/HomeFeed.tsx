import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { MapPin, Clock, Users, MessageCircle, Share2, Info, Filter, Instagram, Facebook, Mail } from 'lucide-react';

interface GamePost {
  id: string;
  teamName: string;
  teamLogo: string;
  modality: string;
  city: string;
  state: string;
  suggestedDate: string;
  suggestedTime: string;
  location: string;
  description?: string;
  isUrgent?: boolean;
  createdAt: Date;
}

interface HomeFeedProps {
  onGameRequest: (gameId: string) => void;
  onShare: (gameId: string) => void;
  onLoginRedirect: () => void;
  onViewTeamProfile?: (teamId: string) => void;
  isLoggedIn?: boolean;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({ 
  onGameRequest, 
  onShare, 
  onLoginRedirect,
  onViewTeamProfile,
  isLoggedIn = false 
}) => {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [shareGameId, setShareGameId] = useState<string | null>(null);

  const mockGames: GamePost[] = [
    {
      id: '1',
      teamName: 'Estrelas FC',
      teamLogo: '⭐',
      modality: 'Society (7x7)',
      city: 'São Paulo',
      state: 'SP',
      suggestedDate: '15 de Janeiro',
      suggestedTime: '19:00',
      location: 'Campo do Parque Ibirapuera',
      description: 'Buscamos um time para jogo amistoso no domingo!',
      isUrgent: true,
      createdAt: new Date('2025-01-05')
    },
    {
      id: '2',
      teamName: 'Unidos FC',
      teamLogo: '🏆',
      modality: 'Futsal (5x5)',
      city: 'Rio de Janeiro',
      state: 'RJ',
      suggestedDate: '20 de Janeiro',
      suggestedTime: '20:30',
      location: 'Quadra do Clube Recreativo',
      description: 'Vaga para futsal competitivo!',
      createdAt: new Date('2025-01-06')
    },
    {
      id: '3',
      teamName: 'Amigos do Bairro',
      teamLogo: '⚽',
      modality: 'Campo (11x11)',
      city: 'Belo Horizonte',
      state: 'MG',
      suggestedDate: '22 de Janeiro',
      suggestedTime: '16:00',
      location: 'Campo Municipal da Pampulha',
      description: 'Domingo de futebol com a galera!',
      createdAt: new Date('2025-01-04')
    },
    {
      id: '4',
      teamName: 'Bambis FC',
      teamLogo: '🦌',
      modality: 'Society (7x7)',
      city: 'São Paulo',
      state: 'SP',
      suggestedDate: '18 de Janeiro',
      suggestedTime: '15:00',
      location: 'Complexo Esportivo Vila Madalena',
      description: 'Precisamos de um adversário para sábado!',
      createdAt: new Date('2025-01-07')
    }
  ];

  // Extrair estados únicos dos jogos
  const availableStates = useMemo(() => {
    const states = [...new Set(mockGames.map(game => game.state))];
    return states.sort();
  }, []);

  // Extrair cidades do estado selecionado
  const availableCities = useMemo(() => {
    if (selectedState === 'all') return [];
    const cities = [...new Set(mockGames
      .filter(game => game.state === selectedState)
      .map(game => game.city))];
    return cities.sort();
  }, [selectedState]);

  // Filtrar e ordenar jogos
  const filteredAndSortedGames = useMemo(() => {
    let filtered = mockGames;

    // Filtrar por estado
    if (selectedState !== 'all') {
      filtered = filtered.filter(game => game.state === selectedState);
    }

    // Filtrar por cidade
    if (selectedCity !== 'all') {
      filtered = filtered.filter(game => game.city === selectedCity);
    }

    // Ordenar
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'alphabetical':
        return filtered.sort((a, b) => a.teamName.localeCompare(b.teamName));
      case 'urgent':
        return filtered.sort((a, b) => {
          if (a.isUrgent && !b.isUrgent) return -1;
          if (!a.isUrgent && b.isUrgent) return 1;
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
      default:
        return filtered;
    }
  }, [selectedState, selectedCity, sortBy]);

  const handleShare = (gameId: string, platform: string) => {
    const game = mockGames.find(g => g.id === gameId);
    if (!game) return;

    const text = `🏈 Jogo disponível no FutAmadores!\n\n${game.teamName} procura adversário para ${game.modality}\n📅 ${game.suggestedDate} às ${game.suggestedTime}\n📍 ${game.location}, ${game.city}/${game.state}\n\nBaixe o app: https://futamadores.com`;
    const url = `https://futamadores.com/game/${gameId}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'instagram':
        // Instagram não suporta compartilhamento direto via URL, então copiamos o texto
        navigator.clipboard.writeText(text);
        alert('Texto copiado! Cole no Instagram Stories ou Direct.');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        const subject = `Jogo de futebol disponível - ${game.teamName}`;
        const body = text + `\n\nVer detalhes: ${url}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        break;
    }
    
    setShareGameId(null);
  };

  const handleTeamClick = (teamId: string) => {
    if (onViewTeamProfile) {
      onViewTeamProfile(teamId);
    }
  };

  const resetFilters = () => {
    setSelectedState('all');
    setSelectedCity('all');
    setSortBy('recent');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Jogos Disponíveis</h2>
        <p className="text-gray-600">Encontre times procurando adversários</p>
      </div>

      {/* Info para usuários não logados */}
      {!isLoggedIn && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Explorando como visitante</h4>
                <p className="text-blue-700 text-sm">
                  Você pode visualizar jogos disponíveis. Para solicitar jogos, publicar partidas ou gerenciar sua agenda, faça login com seu time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros - mesmo design dos posts */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-600" />
              <span className="font-medium text-gray-800">Filtros</span>
            </div>
            <Button 
              variant="link" 
              size="sm" 
              onClick={resetFilters}
              className="text-orange-500 hover:text-orange-600 p-0 h-auto"
            >
              Limpar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Linha 1: Localização */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Select value={selectedState} onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedCity('all');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os estados</SelectItem>
                    {availableStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select 
                  value={selectedCity} 
                  onValueChange={setSelectedCity}
                  disabled={selectedState === 'all'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as cidades</SelectItem>
                    {availableCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Linha 2: Ordenação */}
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="alphabetical">Ordem alfabética</SelectItem>
                  <SelectItem value="urgent">Urgentes primeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">
          {filteredAndSortedGames.length} {filteredAndSortedGames.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}
        </span>
      </div>

      <div className="space-y-4">
        {filteredAndSortedGames.map((game) => (
          <Card key={game.id} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{game.teamLogo}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleTeamClick(game.id)}
                      className="text-left hover:text-green-600 transition-colors"
                    >
                      <h3 className="font-bold text-lg">{game.teamName}</h3>
                    </button>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{game.city}, {game.state}</span>
                    </div>
                  </div>
                </div>
                {game.isUrgent && (
                  <Badge variant="destructive" className="text-xs">
                    Urgente
                  </Badge>
                )}
              </div>

              {/* Mensagem do post - agora acima dos dados do jogo */}
              {game.description && (
                <p className="text-gray-700 text-sm mb-4 p-3 bg-gray-50 rounded-lg">
                  {game.description}
                </p>
              )}

              {/* Dados do jogo - agora abaixo da mensagem */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Users size={16} className="text-green-600" />
                  <span className="font-medium">{game.modality}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock size={16} className="text-orange-500" />
                  <span>{game.suggestedDate} às {game.suggestedTime}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={16} className="text-blue-500" />
                  <span>{game.location}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={isLoggedIn ? () => onGameRequest(game.id) : onLoginRedirect}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle size={16} className="mr-2" />
                  {isLoggedIn ? 'Quero Marcar' : 'Faça login para marcar'}
                </Button>
                
                <Sheet open={shareGameId === game.id} onOpenChange={(open) => setShareGameId(open ? game.id : null)}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Share2 size={16} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-auto">
                    <SheetHeader>
                      <SheetTitle>Compartilhar Jogo</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                        onClick={() => handleShare(game.id, 'whatsapp')}
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">📱</span>
                        </div>
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                        onClick={() => handleShare(game.id, 'instagram')}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Instagram size={16} className="text-white" />
                        </div>
                        <span className="text-xs">Instagram</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                        onClick={() => handleShare(game.id, 'facebook')}
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Facebook size={16} className="text-white" />
                        </div>
                        <span className="text-xs">Facebook</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto space-y-2"
                        onClick={() => handleShare(game.id, 'email')}
                      >
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <Mail size={16} className="text-white" />
                        </div>
                        <span className="text-xs">E-mail</span>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedGames.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚽</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Nenhum jogo encontrado</h3>
          <p className="text-gray-600 text-sm mb-4">
            Não há jogos disponíveis com os filtros selecionados.
          </p>
          <Button variant="outline" onClick={resetFilters}>
            Limpar filtros
          </Button>
        </div>
      )}

      <div className="text-center pt-4">
        <p className="text-gray-500 text-sm">
          {isLoggedIn ? 'Não encontrou o que procura?' : 'Tem um time? Cadastre-se!'}
        </p>
        <Button variant="link" className="text-green-600">
          {isLoggedIn ? 'Publique seu jogo' : 'Cadastre seu time'}
        </Button>
      </div>
    </div>
  );
};