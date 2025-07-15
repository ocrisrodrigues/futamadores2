import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Calendar as CalendarIcon,
  MessageCircle,
  Share2,
  Star,
  ExternalLink,
  Navigation,
  Clock,
  Info,
  Map,
  Camera,
  Trophy,
  Eye,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface TeamProfileProps {
  teamId: string;
  onBack: () => void;
  onRequestGame: (teamId: string, date: Date) => void;
  onContact: (contact: string) => void;
  onRequestGameGeneral: (teamId: string) => void;
}

interface ScheduledGame {
  id: string;
  date: Date;
  opponent: string;
  opponentLogo?: string;
  status: 'confirmed' | 'pending';
  location?: string;
  time?: string;
  type: 'home' | 'away';
  description?: string;
  modality?: string;
}

interface TeamPhoto {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: Date;
}

export const TeamProfile: React.FC<TeamProfileProps> = ({
  teamId,
  onBack,
  onRequestGame,
  onContact,
  onRequestGameGeneral
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showPreScheduleDialog, setShowPreScheduleDialog] = useState(false);
  const [showGameDetailsDialog, setShowGameDetailsDialog] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState<ScheduledGame | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  
  // Estado para galeria de fotos
  const [teamPhotos] = useState<TeamPhoto[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      caption: 'Time completo - Temporada 2024',
      uploadedAt: new Date(2024, 11, 15)
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      caption: 'Treinamento no campo oficial',
      uploadedAt: new Date(2024, 11, 10)
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      caption: 'Celebração após vitória importante',
      uploadedAt: new Date(2024, 11, 5)
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      caption: 'Aquecimento antes do jogo',
      uploadedAt: new Date(2024, 10, 28)
    }
  ]);

  // Estados do calendário
  const [availableDates] = useState<Date[]>([
    new Date(2025, 0, 22), // 22 de Janeiro  
    new Date(2025, 0, 29), // 29 de Janeiro
    new Date(2025, 1, 5),  // 5 de Fevereiro
    new Date(2025, 1, 12), // 12 de Fevereiro
    new Date(2025, 1, 19), // 19 de Fevereiro
    new Date(2025, 1, 26), // 26 de Fevereiro
  ]);

  // Jogos já confirmados
  const [scheduledGames] = useState<ScheduledGame[]>([
    {
      id: '1',
      date: new Date(2025, 0, 18),
      opponent: 'Leões United',
      opponentLogo: '🦁',
      status: 'confirmed',
      location: 'Campo do Parque Ibirapuera',
      time: '15:00',
      type: 'home',
      modality: 'Society (7x7)'
    },
    {
      id: '2', 
      date: new Date(2025, 0, 25),
      opponent: 'Águias FC',
      opponentLogo: '🦅',
      status: 'confirmed',
      location: 'Centro Esportivo Vila Maria',
      time: '16:30',
      type: 'away',
      modality: 'Society (7x7)'
    }
  ]);

  const bookedDates = scheduledGames.map(game => game.date);

  // Mock team data
  const team = {
    id: teamId,
    name: 'Tigres FC',
    logo: '🐅',
    coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    logoImage: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    teamPhoto: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1193&q=80',
    description: 'Time amador focado em diversão e fair play. Jogamos há 5 anos e adoramos conhecer novos adversários! Nosso campo fica em uma localização privilegiada e contamos com estrutura completa para receber outros times.',
    city: 'São Paulo',
    state: 'SP',
    modality: 'Society (7x7)',
    location: 'Campo do Parque Ibirapuera',
    address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
    coordinates: { lat: -23.5575, lng: -46.6396 },
    responsible: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'tigresfc@email.com',
    rating: 4.5,
    gamesPlayed: 23,
    founded: '2019',
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const getGameForDate = (date: Date): ScheduledGame | undefined => {
    return scheduledGames.find(game => 
      game.date.toDateString() === date.toDateString()
    );
  };

  const handleGameClick = (game: ScheduledGame) => {
    setSelectedGame(game);
    setShowGameDetailsDialog(true);
  };

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setShowPhotoGallery(true);
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => 
      prev === teamPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => 
      prev === 0 ? teamPhotos.length - 1 : prev - 1
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setSelectedDate(date);
      setRequestMessage('');
      setShowPreScheduleDialog(true);
    } else if (date && isDateBooked(date)) {
      const game = getGameForDate(date);
      if (game) {
        handleGameClick(game);
      }
    } else if (date && !isDateAvailable(date) && !isDateBooked(date)) {
      alert('Esta data não está disponível para agendamento.');
    }
  };

  const handlePreScheduleRequest = () => {
    if (selectedDate) {
      onRequestGame(teamId, selectedDate);
      setShowPreScheduleDialog(false);
      
      alert(`✅ Solicitação enviada para ${selectedDate.toLocaleDateString('pt-BR')}!\n\nMensagem: "${requestMessage || 'Sem mensagem adicional'}"\n\nO ${team.name} será notificado e você receberá uma resposta em até 48 horas.`);
      
      setSelectedDate(undefined);
      setRequestMessage('');
    }
  };

  const getGoogleMapsUrl = () => {
    const query = encodeURIComponent(team.address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const getWazeUrl = () => {
    const query = encodeURIComponent(team.address);
    return `https://waze.com/ul?q=${query}&navigate=yes`;
  };

  const upcomingGames = scheduledGames
    .filter(game => game.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile-First */}
      <div className="relative">
        {/* Foto de capa */}
        <div className="h-48 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
          <ImageWithFallback
            src={team.coverImage}
            alt={`Campo do ${team.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Botão voltar */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className="absolute top-4 left-4 text-white hover:bg-black hover:bg-opacity-25 z-10 h-10 w-10 p-0"
          >
            <ArrowLeft size={20} />
          </Button>

          {/* Badge do campo */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm">
            📍 {team.location}
          </div>
        </div>

        {/* Avatar e informações básicas */}
        <div className="px-4 pb-4">
          <div className="flex items-end space-x-4 -mt-16 relative z-10">
            {/* Brasão do time */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              <ImageWithFallback
                src={team.logoImage}
                alt={`Brasão do ${team.name}`}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
            <div className="flex-1 text-white mb-2">
              <h1 className="text-2xl font-bold drop-shadow-lg">{team.name}</h1>
              <div className="flex items-center space-x-2 text-green-100 drop-shadow">
                <MapPin size={16} />
                <span>{team.city}, {team.state}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-500" />
              <span className="font-medium">{team.rating}</span>
            </div>
            <span className="text-gray-600">{team.gamesPlayed} jogos</span>
            <span className="text-gray-600">Desde {team.founded}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Próximos Jogos */}
        {upcomingGames.length > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Trophy size={20} className="text-green-600" />
                <h3 className="font-semibold text-green-800">
                  Próximos Jogos ({upcomingGames.length})
                </h3>
              </div>
              
              <div className="space-y-3">
                {upcomingGames.map((game) => (
                  <div key={game.id} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-400 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleGameClick(game)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-xl">{game.opponentLogo}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-sm">{team.name} vs {game.opponent}</p>
                            <Badge variant={game.type === 'home' ? 'default' : 'secondary'} className="text-xs">
                              {game.type === 'home' ? 'Casa' : 'Fora'}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p className="flex items-center space-x-1">
                              <CalendarIcon size={12} />
                              <span>{game.date.toLocaleDateString('pt-BR')}</span>
                              {game.time && (
                                <>
                                  <Clock size={12} />
                                  <span>{game.time}</span>
                                </>
                              )}
                            </p>
                            {game.location && (
                              <p className="flex items-center space-x-1">
                                <MapPin size={12} />
                                <span>{game.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Eye size={14} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sobre o Time */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Sobre o Time</h3>
            <p className="text-gray-700 text-sm mb-4">{team.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Users size={16} className="text-green-600" />
                <span className="font-medium">{team.modality}</span>
              </div>
              
              <div className="flex items-start space-x-2 text-sm">
                <MapPin size={16} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">{team.location}</p>
                  <p className="text-gray-600 text-xs">{team.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendário Mobile-Optimized */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3 flex items-center space-x-2">
              <CalendarIcon size={20} className="text-green-600" />
              <span>Disponibilidade</span>
            </h3>
            
            <div className="mb-4">
              <div className="flex items-center space-x-3 text-xs flex-wrap gap-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                  <span>Disponível</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                  <span>Ocupado</span>
                </div>
              </div>
            </div>

            <TooltipProvider>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                modifiers={{
                  available: availableDates,
                  booked: bookedDates,
                }}
                modifiersStyles={{
                  available: { backgroundColor: '#dcfce7', color: '#166534', cursor: 'pointer' },
                  booked: { backgroundColor: '#fecaca', color: '#dc2626', cursor: 'pointer' },
                }}
                className="rounded-md border w-full"
              />
            </TooltipProvider>

            {/* Lista de jogos */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Info size={16} className="text-green-600" />
                <h4 className="font-semibold text-sm">Jogos Marcados:</h4>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {scheduledGames.map((game) => (
                  <div 
                    key={game.id} 
                    className="bg-red-50 p-2 rounded text-xs border-l-3 border-red-300 cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => handleGameClick(game)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">
                          {game.date.toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-red-600">
                          vs {game.opponent} {game.opponentLogo}
                        </p>
                        {game.time && (
                          <p className="text-red-500 text-xs">
                            {game.time} • {game.type === 'home' ? 'Casa' : 'Fora'}
                          </p>
                        )}
                      </div>
                      <Eye size={12} className="text-red-400" />
                    </div>
                  </div>
                ))}
                
                {scheduledGames.length === 0 && (
                  <p className="text-gray-500 text-xs text-center py-2">
                    Nenhum jogo marcado ainda
                  </p>
                )}
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-700">{availableDates.length}</div>
                <div className="text-green-600">Disponíveis</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="font-semibold text-red-700">{bookedDates.length}</div>
                <div className="text-red-600">Ocupadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Galeria de Fotos Mobile */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Camera size={18} className="text-green-600" />
                <h3 className="font-bold">Fotos do Time</h3>
                <Badge variant="secondary" className="text-xs">
                  {teamPhotos.length}
                </Badge>
              </div>
            </div>

            {teamPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {teamPhotos.slice(0, 4).map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-square"
                    onClick={() => handlePhotoClick(index)}
                  >
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.caption || 'Foto do time'}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center">
                      <Eye size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    {index === 3 && teamPhotos.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          +{teamPhotos.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Camera size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Este time ainda não possui fotos.</p>
              </div>
            )}

            {teamPhotos.length > 4 && (
              <div className="mt-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPhotoGallery(true)}
                  className="text-green-600 border-green-300 hover:bg-green-50"
                >
                  Ver todas as {teamPhotos.length} fotos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-green-600" />
                  <div>
                    <p className="font-medium text-sm">{team.responsible}</p>
                    <p className="text-xs text-gray-600">{team.phone}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onContact(`https://wa.me/5511999999999`)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  WhatsApp
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-green-600" />
                  <p className="text-sm">{team.email}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onContact(`mailto:${team.email}`)}
                >
                  E-mail
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Como Chegar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Map size={16} className="text-green-600" />
              <h4 className="font-semibold">Como Chegar</h4>
            </div>
            
            {/* Mapa Embed */}
            <div className="rounded-lg overflow-hidden shadow-md h-48 mb-3">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0963118572967!2d-46.6423634245978!3d-23.557499678769456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201578%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1sps-BR!2sbr!4v1735746000000!5m2!1spt-BR!2sbr`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Localização do ${team.location}`}
              />
            </div>
            
            {/* Botões de navegação */}
            <div className="grid grid-cols-1 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={() => window.open(getGoogleMapsUrl(), '_blank')}
              >
                <ExternalLink size={14} className="mr-2" />
                Abrir no Google Maps
              </Button>
              <Button 
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open(getWazeUrl(), '_blank')}
              >
                <Navigation size={14} className="mr-2" />
                Navegar pelo Waze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ações Principais - Mobile Sticky */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-md mx-auto flex space-x-3">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`https://wa.me/5511999999999`, '_blank')}
            >
              <Phone size={16} className="mr-2" />
              Contato
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onRequestGameGeneral(teamId)}
            >
              <MessageCircle size={16} className="mr-2" />
              Marcar Jogo
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="px-3"
            >
              <Share2 size={16} />
            </Button>
          </div>
        </div>

        {/* Espaço para botões fixos */}
        <div className="h-20"></div>
      </div>

      {/* Dialog de Pré-agendamento */}
      <Dialog open={showPreScheduleDialog} onOpenChange={setShowPreScheduleDialog}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-green-600" />
              <span>Solicitar Jogo</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <Clock className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Você está solicitando um jogo para{' '}
                <strong>{selectedDate?.toLocaleDateString('pt-BR')}</strong> com o <strong>{team.name}</strong>.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Mensagem (opcional)
              </Label>
              <Textarea
                id="message"
                placeholder="Adicione uma mensagem para o time..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={200}
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>💡 Apresente seu time</span>
                <span>{requestMessage.length}/200</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowPreScheduleDialog(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handlePreScheduleRequest}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <MessageCircle size={16} className="mr-2" />
                Solicitar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes do Jogo */}
      <Dialog open={showGameDetailsDialog} onOpenChange={setShowGameDetailsDialog}>
        <DialogContent className="sm:max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trophy size={20} className="text-green-600" />
              <span>Detalhes do Jogo</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedGame && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-3xl">{selectedGame.opponentLogo}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{team.name} vs {selectedGame.opponent}</h3>
                    <Badge variant={selectedGame.type === 'home' ? 'default' : 'secondary'} className="text-xs">
                      {selectedGame.type === 'home' ? 'Jogo em Casa' : 'Jogo Fora'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CalendarIcon size={16} className="text-green-600" />
                  <span className="font-medium">Data:</span>
                  <span>{selectedGame.date.toLocaleDateString('pt-BR')}</span>
                </div>
                
                {selectedGame.time && (
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-green-600" />
                    <span className="font-medium">Horário:</span>
                    <span>{selectedGame.time}</span>
                  </div>
                )}
                
                {selectedGame.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-green-600" />
                    <span className="font-medium">Local:</span>
                    <span>{selectedGame.location}</span>
                  </div>
                )}
              </div>

              <Button 
                variant="outline" 
                onClick={() => setShowGameDetailsDialog(false)}
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Galeria */}
      <Dialog open={showPhotoGallery} onOpenChange={setShowPhotoGallery}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 mx-4">
          <div className="relative">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Camera size={20} className="text-green-600" />
                <h3 className="font-bold">Galeria do {team.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {selectedPhotoIndex + 1} de {teamPhotos.length}
                </Badge>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setShowPhotoGallery(false)}>
                <X size={16} />
              </Button>
            </div>

            <div className="relative bg-black">
              <ImageWithFallback
                src={teamPhotos[selectedPhotoIndex]?.url}
                alt={teamPhotos[selectedPhotoIndex]?.caption || 'Foto do time'}
                className="w-full h-64 object-contain"
              />
              
              {teamPhotos.length > 1 && (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </>
              )}
            </div>

            <div className="p-4 space-y-2">
              {teamPhotos[selectedPhotoIndex]?.caption && (
                <p className="font-medium">{teamPhotos[selectedPhotoIndex].caption}</p>
              )}
              <p className="text-sm text-gray-600">
                {teamPhotos[selectedPhotoIndex]?.uploadedAt.toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};