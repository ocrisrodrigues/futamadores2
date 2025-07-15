import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Users, 
  Calendar,
  Phone,
  Mail,
  Info,
  CheckCircle,
  Send,
  User
} from 'lucide-react';

interface RequestGameScreenProps {
  gameId: string;
  onBack: () => void;
  onRequestSent: (requestData: any) => void;
}

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
  responsibleName: string;
  phone: string;
  email: string;
}

export const RequestGameScreen: React.FC<RequestGameScreenProps> = ({
  gameId,
  onBack,
  onRequestSent
}) => {
  const [message, setMessage] = useState('');
  const [myTeamName, setMyTeamName] = useState('Leões FC'); // Em produção viria do estado do usuário
  const [myResponsible, setMyResponsible] = useState('Paulo Santos');
  const [myPhone, setMyPhone] = useState('(11) 91234-5678');
  const [alternativeDates, setAlternativeDates] = useState<string[]>(['']);
  const [preferredTime, setPreferredTime] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock game data - em produção viria de uma API
  const mockGame: GamePost = gameId.startsWith('team-') ? {
    // Quando vem do perfil do time, simula uma proposta geral
    id: gameId,
    teamName: 'Tigres FC',
    teamLogo: '🐅',
    modality: 'Society (7x7)',
    city: 'São Paulo',
    state: 'SP',
    suggestedDate: 'A combinar',
    suggestedTime: 'A combinar',
    location: 'Campo do Parque Ibirapuera',
    description: 'Estamos sempre disponíveis para jogos amistosos! Entre em contato para combinarmos uma data que funcione para ambos os times.',
    isUrgent: false,
    responsibleName: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'tigresfc@email.com'
  } : {
    // Quando vem do feed, dados do post original
    id: gameId,
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
    responsibleName: 'Carlos Silva',
    phone: '(11) 98765-4321',
    email: 'estrelas.fc@email.com'
  };

  const addAlternativeDate = () => {
    setAlternativeDates([...alternativeDates, '']);
  };

  const updateAlternativeDate = (index: number, value: string) => {
    const newDates = [...alternativeDates];
    newDates[index] = value;
    setAlternativeDates(newDates);
  };

  const removeAlternativeDate = (index: number) => {
    if (alternativeDates.length > 1) {
      setAlternativeDates(alternativeDates.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert('Por favor, escreva uma mensagem para o time.');
      return;
    }

    if (!acceptTerms) {
      alert('Você precisa aceitar os termos para continuar.');
      return;
    }

    setIsSubmitting(true);

    // Simular envio da solicitação
    const requestData = {
      gameId: mockGame.id,
      targetTeam: mockGame.teamName,
      fromTeam: myTeamName,
      message: message.trim(),
      myContact: {
        responsible: myResponsible,
        phone: myPhone
      },
      suggestedDate: mockGame.suggestedDate,
      suggestedTime: mockGame.suggestedTime,
      alternativeDates: alternativeDates.filter(date => date.trim()),
      preferredTime: preferredTime.trim(),
      submittedAt: new Date()
    };

    // Simular delay de rede
    setTimeout(() => {
      setIsSubmitting(false);
      onRequestSent(requestData);
    }, 1500);
  };

  const currentDate = new Date();
  const minDate = currentDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-white hover:bg-green-700 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Solicitar Jogo</h1>
            <p className="text-green-100 text-sm">Envie uma proposta para o time</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Informações do Jogo */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">{mockGame.teamLogo}</span>
              </div>
              <div>
                <span>{mockGame.teamName}</span>
                {mockGame.isUrgent && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Urgente
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Mensagem do time */}
            {mockGame.description && (
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-800 italic">"{mockGame.description}"</p>
              </div>
            )}

            {/* Detalhes do jogo */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Users size={16} className="text-green-600" />
                <span className="font-medium">{mockGame.modality}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Calendar size={16} className="text-green-600" />
                <span>
                  {mockGame.suggestedDate === 'A combinar' 
                    ? 'Data e horário a combinar' 
                    : `${mockGame.suggestedDate} às ${mockGame.suggestedTime}`
                  }
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} className="text-green-600" />
                <span>{mockGame.location}</span>
                <span className="text-gray-500">• {mockGame.city}/{mockGame.state}</span>
              </div>
            </div>

            {/* Contato do time */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <User size={14} className="text-green-600" />
                <span>Responsável</span>
              </h4>
              <div className="space-y-1 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone size={12} />
                  <span>{mockGame.responsibleName} • {mockGame.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={12} />
                  <span>{mockGame.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Solicitação */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-green-600" />
              <span>Sua Solicitação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Informações do meu time */}
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-green-800">Seus Dados</h4>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="my-team" className="text-xs">Nome do Time</Label>
                  <Input
                    id="my-team"
                    value={myTeamName}
                    onChange={(e) => setMyTeamName(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="my-responsible" className="text-xs">Responsável</Label>
                    <Input
                      id="my-responsible"
                      value={myResponsible}
                      onChange={(e) => setMyResponsible(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="my-phone" className="text-xs">Telefone</Label>
                    <Input
                      id="my-phone"
                      value={myPhone}
                      onChange={(e) => setMyPhone(e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mensagem */}
            <div>
              <Label htmlFor="message">Mensagem para o {mockGame.teamName} *</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={gameId.startsWith('team-') 
                  ? "Apresente seu time e proponha datas/horários. Seja cordial e profissional!"
                  : "Apresente seu time e confirme interesse na data/horário sugeridos. Seja cordial e profissional!"
                }
                className="min-h-[100px] resize-none"
                maxLength={500}
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>💡 {gameId.startsWith('team-') ? 'Seja claro sobre suas intenções e disponibilidade' : 'Seja claro sobre suas intenções e disponibilidade'}</span>
                <span>{message.length}/500</span>
              </div>
            </div>

            {/* Datas Alternativas */}
            <div>
              <Label>
                {gameId.startsWith('team-') ? 'Datas de Interesse' : 'Datas Alternativas'} (opcional)
              </Label>
              <p className="text-xs text-gray-600 mb-2">
                {gameId.startsWith('team-') 
                  ? 'Sugira datas que funcionam para seu time' 
                  : 'Caso a data sugerida não funcione, ofereça alternativas'
                }
              </p>
              
              <div className="space-y-2">
                {alternativeDates.map((date, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => updateAlternativeDate(index, e.target.value)}
                      min={minDate}
                      className="flex-1 h-8"
                    />
                    {alternativeDates.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAlternativeDate(index)}
                        className="px-2 h-8"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
                
                {alternativeDates.length < 3 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addAlternativeDate}
                    className="w-full h-8 text-xs"
                  >
                    + Adicionar Data Alternativa
                  </Button>
                )}
              </div>
            </div>

            {/* Horário Preferido - Agora campo aberto */}
            <div>
              <Label htmlFor="preferred-time">Horário Preferido (opcional)</Label>
              <Input
                id="preferred-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="Ex: 14:00, manhã, tarde, 19h30, flexível..."
                className="h-8"
                maxLength={50}
              />
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>💡 Seja específico ou indique período/flexibilidade</span>
                <span>{preferredTime.length}/50</span>
              </div>
            </div>

            {/* Termos */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={setAcceptTerms}
                className="mt-1"
              />
              <div>
                <Label htmlFor="terms" className="text-xs cursor-pointer">
                  Aceito que meus dados de contato sejam compartilhados com o {mockGame.teamName} para organização do jogo
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Importantes */}
        <Alert className="border-orange-200 bg-orange-50">
          <Info className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm">
            <strong>Como funciona:</strong> Sua solicitação será enviada para o {mockGame.teamName}. 
            Eles têm até 48h para responder. Você receberá uma notificação com a resposta.
          </AlertDescription>
        </Alert>

        {/* Botões de Ação */}
        <div className="flex space-x-3 pt-2">
          <Button 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!message.trim() || !acceptTerms || isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Enviar Solicitação
              </>
            )}
          </Button>
        </div>

        {/* Dicas */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <h4 className="font-semibold text-green-800 text-sm mb-2">
              💡 Dicas para uma boa solicitação:
            </h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Seja cordial e apresente seu time brevemente</li>
              <li>• {gameId.startsWith('team-') ? 'Proponha datas e horários que funcionam' : 'Confirme se a data/horário funciona para vocês'}</li>
              <li>• Mencione seu nível de jogo (recreativo, competitivo, etc.)</li>
              <li>• {gameId.startsWith('team-') ? 'Seja flexível com datas e horários' : 'Ofereça datas alternativas se possível'}</li>
              <li>• Deixe seus dados de contato atualizados</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};