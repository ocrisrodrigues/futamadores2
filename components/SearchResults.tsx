import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Users, Calendar, ArrowLeft, MessageCircle } from 'lucide-react';

interface TeamResult {
  id: string;
  name: string;
  logo: string;
  city: string;
  state: string;
  modality: string;
  availableDates: string[];
  location: string;
  rating: number;
  gamesPlayed: number;
  nextAvailable: string;
}

interface SearchResultsProps {
  results: TeamResult[];
  onBack: () => void;
  onViewProfile: (teamId: string) => void;
  onRequestGame: (teamId: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onBack,
  onViewProfile,
  onRequestGame
}) => {
  const mockResults: TeamResult[] = [
    {
      id: '1',
      name: 'Tigres FC',
      logo: '🐅',
      city: 'São Paulo',
      state: 'SP',
      modality: 'Society (7x7)',
      availableDates: ['15/01', '22/01', '29/01'],
      location: 'Campo do Ibirapuera',
      rating: 4.5,
      gamesPlayed: 23,
      nextAvailable: '15 de Janeiro'
    },
    {
      id: '2',
      name: 'Leões do Norte',
      logo: '🦁',
      city: 'São Paulo',
      state: 'SP',
      modality: 'Society (7x7)',
      availableDates: ['16/01', '23/01'],
      location: 'Quadra da Vila',
      rating: 4.2,
      gamesPlayed: 18,
      nextAvailable: '16 de Janeiro'
    },
    {
      id: '3',
      name: 'Falcões United',
      logo: '🦅',
      city: 'São Paulo',
      state: 'SP',
      modality: 'Society (7x7)',
      availableDates: ['20/01', '27/01'],
      location: 'Centro Esportivo',
      rating: 4.8,
      gamesPlayed: 31,
      nextAvailable: '20 de Janeiro'
    }
  ];

  const displayResults = results.length > 0 ? results : mockResults;

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2 mr-2">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Resultados da Busca</h2>
          <p className="text-sm text-gray-600">{displayResults.length} times encontrados</p>
        </div>
      </div>

      <div className="space-y-4">
        {displayResults.map((team) => (
          <Card key={team.id} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{team.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{team.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{team.city}, {team.state}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{team.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{team.gamesPlayed} jogos</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Users size={16} className="text-green-600" />
                  <span>{team.modality}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={16} className="text-blue-500" />
                  <span>{team.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar size={16} className="text-orange-500" />
                  <span>Próxima data: {team.nextAvailable}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Datas disponíveis:</p>
                <div className="flex space-x-2">
                  {team.availableDates.map((date, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {date}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={() => onViewProfile(team.id)}
                  variant="outline"
                  className="flex-1"
                >
                  Ver Perfil
                </Button>
                <Button 
                  onClick={() => onRequestGame(team.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Solicitar Jogo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayResults.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Nenhum time encontrado
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Tente ajustar seus filtros de busca ou expandir a área de localização
          </p>
          <Button onClick={onBack} variant="outline">
            Voltar à Busca
          </Button>
        </div>
      )}
    </div>
  );
};