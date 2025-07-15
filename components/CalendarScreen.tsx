import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react';

interface ScheduledGame {
  id: string;
  date: Date;
  time: string;
  opponent: string;
  location: string;
  modality: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  isHome: boolean;
}

interface CalendarScreenProps {
  onAddAvailableDate: (date: Date) => void;
  onRemoveAvailableDate: (date: Date) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  onAddAvailableDate,
  onRemoveAvailableDate
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Mock data - jogos agendados
  const scheduledGames: ScheduledGame[] = [
    {
      id: '1',
      date: new Date(2025, 0, 18), // 18 de Janeiro
      time: '19:00',
      opponent: 'Leões FC',
      location: 'Campo do Ibirapuera',
      modality: 'Society (7x7)',
      status: 'confirmed',
      isHome: true
    },
    {
      id: '2',
      date: new Date(2025, 0, 25), // 25 de Janeiro
      time: '20:30',
      opponent: 'Águias United',
      location: 'Quadra da Vila',
      modality: 'Futsal (5x5)',
      status: 'pending',
      isHome: false
    },
    {
      id: '3',
      date: new Date(2025, 1, 1), // 1 de Fevereiro
      time: '16:00',
      opponent: 'Falcões FC',
      location: 'Campo do Parque',
      modality: 'Society (7x7)',
      status: 'confirmed',
      isHome: true
    }
  ];

  // Mock data - datas disponíveis
  const [availableDates, setAvailableDates] = useState<Date[]>([
    new Date(2025, 0, 15), // 15 de Janeiro
    new Date(2025, 0, 22), // 22 de Janeiro
    new Date(2025, 0, 29), // 29 de Janeiro
    new Date(2025, 1, 5),  // 5 de Fevereiro
  ]);

  const getGameForDate = (date: Date) => {
    return scheduledGames.find(game => 
      game.date.toDateString() === date.toDateString()
    );
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  const isDateScheduled = (date: Date) => {
    return scheduledGames.some(game => 
      game.date.toDateString() === date.toDateString()
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleToggleAvailability = (date: Date) => {
    if (isDateAvailable(date)) {
      setAvailableDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
      onRemoveAvailableDate(date);
    } else {
      setAvailableDates(prev => [...prev, date]);
      onAddAvailableDate(date);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const upcomingGames = scheduledGames
    .filter(game => game.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Minha Agenda</h2>
          <p className="text-gray-600">Gerencie seus jogos e disponibilidade</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            <CalendarIcon size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            Lista
          </Button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <>
          {/* Calendário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon size={20} className="text-green-600" />
                <span>Calendário</span>
              </CardTitle>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                  <span>Disponível</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                  <span>Jogo marcado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
                  <span>Selecionado</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                modifiers={{
                  available: availableDates,
                  scheduled: scheduledGames.map(g => g.date),
                }}
                modifiersStyles={{
                  available: { backgroundColor: '#dcfce7', color: '#166534' },
                  scheduled: { backgroundColor: '#dbeafe', color: '#1d4ed8', fontWeight: 'bold' },
                }}
                className="rounded-md border"
              />

              {selectedDate && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">
                    {selectedDate.toLocaleDateString('pt-BR')}
                  </h4>
                  
                  {(() => {
                    const game = getGameForDate(selectedDate);
                    const isAvailable = isDateAvailable(selectedDate);
                    
                    if (game) {
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Jogo marcado</span>
                            <Badge className={getStatusColor(game.status)}>
                              {getStatusText(game.status)}
                            </Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <p><strong>Adversário:</strong> {game.opponent}</p>
                            <p><strong>Horário:</strong> {game.time}</p>
                            <p><strong>Local:</strong> {game.location}</p>
                            <p><strong>Modalidade:</strong> {game.modality}</p>
                            <p><strong>Mando:</strong> {game.isHome ? 'Casa' : 'Fora'}</p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            {isAvailable ? 'Data disponível para jogos' : 'Data não disponível'}
                          </p>
                          <Button
                            onClick={() => handleToggleAvailability(selectedDate)}
                            className={`w-full ${isAvailable ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
                          >
                            {isAvailable ? (
                              <>
                                <X size={16} className="mr-2" />
                                Remover Disponibilidade
                              </>
                            ) : (
                              <>
                                <Plus size={16} className="mr-2" />
                                Marcar como Disponível
                              </>
                            )}
                          </Button>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Vista em Lista */
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Jogos</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingGames.length > 0 ? (
                <div className="space-y-4">
                  {upcomingGames.map((game) => (
                    <div key={game.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">vs {game.opponent}</h4>
                          <p className="text-sm text-gray-600">
                            {game.date.toLocaleDateString('pt-BR')} às {game.time}
                          </p>
                        </div>
                        <Badge className={getStatusColor(game.status)}>
                          {getStatusText(game.status)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-blue-500" />
                          <span>{game.location} {game.isHome ? '(Casa)' : '(Fora)'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users size={16} className="text-green-600" />
                          <span>{game.modality}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Edit size={14} className="mr-1" />
                          Editar
                        </Button>
                        {game.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Check size={14} className="mr-1" />
                              Confirmar
                            </Button>
                            <Button size="sm" variant="destructive">
                              <X size={14} className="mr-1" />
                              Recusar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhum jogo agendado
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Publique suas datas disponíveis para receber solicitações
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">{upcomingGames.length}</h3>
            <p className="text-sm text-gray-600">Jogos Agendados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{availableDates.length}</h3>
            <p className="text-sm text-gray-600">Datas Livres</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-orange-600">
              {upcomingGames.filter(g => g.status === 'pending').length}
            </h3>
            <p className="text-sm text-gray-600">Pendentes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};