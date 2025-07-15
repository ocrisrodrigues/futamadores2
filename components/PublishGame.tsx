import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, Clock, MapPin, Users, Plus, Check } from 'lucide-react';

interface GamePublication {
  date: string;
  time: string;
  modality: string;
  location: string;
  city: string;
  state: string;
  description: string;
  isUrgent: boolean;
}

interface PublishGameProps {
  onPublish: (gameData: GamePublication) => void;
}

export const PublishGame: React.FC<PublishGameProps> = ({ onPublish }) => {
  const [gameData, setGameData] = useState<GamePublication>({
    date: '',
    time: '',
    modality: '',
    location: '',
    city: '',
    state: '',
    description: '',
    isUrgent: false
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const updateField = (field: keyof GamePublication, value: string | boolean) => {
    setGameData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    
    // Simular publicação
    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
      onPublish(gameData);
      
      // Reset form after success
      setTimeout(() => {
        setPublished(false);
        setGameData({
          date: '',
          time: '',
          modality: '',
          location: '',
          city: '',
          state: '',
          description: '',
          isUrgent: false
        });
      }, 2000);
    }, 1500);
  };

  if (published) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Jogo Publicado!</h3>
            <p className="text-gray-600 mb-6">
              Seu jogo foi publicado no feed. Outros times já podem solicitar para jogar!
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Data:</strong> {new Date(gameData.date).toLocaleDateString('pt-BR')}</p>
              <p><strong>Horário:</strong> {gameData.time}</p>
              <p><strong>Local:</strong> {gameData.location}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Publicar Jogo</h2>
        <p className="text-gray-600">Anuncie uma data livre para receber adversários</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus size={20} className="text-green-600" />
              <span>Detalhes do Jogo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Data e Horário */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>Data *</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={gameData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Horário *</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={gameData.time}
                  onChange={(e) => updateField('time', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Modalidade */}
            <div>
              <Label className="flex items-center space-x-2">
                <Users size={16} />
                <span>Modalidade *</span>
              </Label>
              <Select onValueChange={(value) => updateField('modality', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campo">Futebol de Campo (11x11)</SelectItem>
                  <SelectItem value="society">Society (7x7)</SelectItem>
                  <SelectItem value="futsal">Futsal (5x5)</SelectItem>
                  <SelectItem value="quadra">Futebol de Quadra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Local */}
            <div>
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Local do Jogo *</span>
              </Label>
              <Input
                id="location"
                value={gameData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Ex: Campo do Parque Ibirapuera"
                required
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={gameData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="São Paulo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">Estado *</Label>
                <Select onValueChange={(value) => updateField('state', value)} required>
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

            {/* Descrição */}
            <div>
              <Label htmlFor="description">Observações</Label>
              <Textarea
                id="description"
                value={gameData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Informações adicionais sobre o jogo, regras especiais, etc."
                className="min-h-[80px]"
              />
            </div>

            {/* Urgente */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="urgent"
                checked={gameData.isUrgent}
                onChange={(e) => updateField('isUrgent', e.target.checked)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <Label htmlFor="urgent" className="text-sm">
                Marcar como <strong>URGENTE</strong> (destaque no feed)
              </Label>
            </div>

            {/* Botão de Publicar */}
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
              disabled={isPublishing}
            >
              {isPublishing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publicando...</span>
                </div>
              ) : (
                <>
                  <Plus size={20} className="mr-2" />
                  Publicar no Feed
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Dicas */}
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-orange-800 mb-2">💡 Dicas para uma boa publicação</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Seja específico sobre horário e local</li>
              <li>• Mencione se há alguma regra especial</li>
              <li>• Indique o nível de competitividade desejado</li>
              <li>• Use "Urgente" apenas quando necessário</li>
            </ul>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};