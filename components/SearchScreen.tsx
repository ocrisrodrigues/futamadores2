import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, MapPin, Clock, Users, Filter } from 'lucide-react';

interface SearchFilters {
  date: string;
  time: string;
  modality: string;
  homeAway: string;
  city: string;
  state: string;
}

interface SearchScreenProps {
  onSearch: (filters: SearchFilters) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    date: '',
    time: '',
    modality: '',
    homeAway: '',
    city: '',
    state: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      time: '',
      modality: '',
      homeAway: '',
      city: '',
      state: ''
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Buscar Jogos</h2>
        <p className="text-gray-600">Encontre times disponíveis para jogar</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter size={20} className="text-green-600" />
            <span>Filtros de Busca</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Data e Horário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Data</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={filters.date}
                onChange={(e) => updateFilter('date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time" className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Horário</span>
              </Label>
              <Select onValueChange={(value) => updateFilter('time', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Qualquer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Manhã (6h-12h)</SelectItem>
                  <SelectItem value="afternoon">Tarde (12h-18h)</SelectItem>
                  <SelectItem value="evening">Noite (18h-23h)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modalidade */}
          <div>
            <Label className="flex items-center space-x-2">
              <Users size={16} />
              <span>Modalidade</span>
            </Label>
            <Select onValueChange={(value) => updateFilter('modality', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as modalidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campo">Futebol de Campo (11x11)</SelectItem>
                <SelectItem value="society">Society (7x7)</SelectItem>
                <SelectItem value="futsal">Futsal (5x5)</SelectItem>
                <SelectItem value="quadra">Futebol de Quadra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mando de Campo */}
          <div>
            <Label>Preferência de Local</Label>
            <Select onValueChange={(value) => updateFilter('homeAway', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tanto faz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Jogar em casa (mandante)</SelectItem>
                <SelectItem value="away">Jogar fora (visitante)</SelectItem>
                <SelectItem value="neutral">Local neutro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Localização */}
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full mb-4"
            >
              <MapPin size={16} className="mr-2" />
              {showAdvanced ? 'Ocultar' : 'Mostrar'} Filtros de Localização
            </Button>

            {showAdvanced && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={filters.city}
                    onChange={(e) => updateFilter('city', e.target.value)}
                    placeholder="Ex: São Paulo"
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Select onValueChange={(value) => updateFilter('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleSearch}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Filter size={16} className="mr-2" />
              Buscar Times
            </Button>
            <Button 
              onClick={clearFilters}
              variant="outline"
              className="px-4"
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dicas */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Dicas de Busca</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Deixe campos vazios para busca mais ampla</li>
            <li>• Use filtros de localização para times próximos</li>
            <li>• Verifique disponibilidade em horários alternativos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};