import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Home, 
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Bell,
  Phone,
  Mail
} from 'lucide-react';

interface RequestSuccessScreenProps {
  requestData: any;
  onGoHome: () => void;
  onGoToCalendar: () => void;
}

export const RequestSuccessScreen: React.FC<RequestSuccessScreenProps> = ({
  requestData,
  onGoHome,
  onGoToCalendar
}) => {
  const formatDate = (dateString: string) => {
    // Converter formato de data se necessário
    return dateString;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de Sucesso */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="text-center">
          <CheckCircle size={48} className="mx-auto mb-3" />
          <h1 className="text-xl font-bold">Solicitação Enviada!</h1>
          <p className="text-green-100 text-sm">Sua proposta foi enviada com sucesso</p>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Resumo da Solicitação */}
        <Card className="shadow-md border-green-200">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="font-bold text-lg text-green-800">Solicitação Confirmada</h2>
              <p className="text-sm text-gray-600">
                Enviado para <strong>{requestData.targetTeam}</strong>
              </p>
            </div>

            {/* Detalhes do Jogo */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Users size={16} className="text-green-600" />
                <span className="font-medium">{requestData.fromTeam} vs {requestData.targetTeam}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Calendar size={16} className="text-green-600" />
                <span>{formatDate(requestData.suggestedDate)} às {requestData.suggestedTime}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <MessageCircle size={16} className="text-green-600" />
                <span>Mensagem enviada com seus dados de contato</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* O que acontece agora */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
              <Clock size={20} className="text-green-600" />
              <span>Próximos Passos</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Aguarde a resposta</p>
                  <p className="text-xs text-gray-600">
                    O {requestData.targetTeam} tem até <strong>48 horas</strong> para responder sua solicitação
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell size={12} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Receba notificações</p>
                  <p className="text-xs text-gray-600">
                    Você será notificado assim que eles aceitarem, recusarem ou sugerirem alterações
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={12} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Contato direto</p>
                  <p className="text-xs text-gray-600">
                    Se aceito, vocês podem se comunicar diretamente para finalizar os detalhes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suas Informações Enviadas */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-3">Informações Enviadas</h3>
            
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 mb-3">
              <p className="text-sm text-blue-800 italic">
                "{requestData.message}"
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-green-600" />
                <span><strong>Time:</strong> {requestData.fromTeam}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-green-600" />
                <span><strong>Contato:</strong> {requestData.myContact.responsible} • {requestData.myContact.phone}</span>
              </div>

              {requestData.alternativeDates && requestData.alternativeDates.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Calendar size={14} className="text-green-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Datas alternativas:</span>
                    <ul className="text-xs text-gray-600 mt-1">
                      {requestData.alternativeDates.map((date: string, index: number) => (
                        <li key={index}>• {new Date(date).toLocaleDateString('pt-BR')}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dicas enquanto aguarda */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-orange-800 text-sm mb-2">
              ⏳ Enquanto aguarda a resposta:
            </h4>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• Mantenha seu telefone próximo para receber a resposta</li>
              <li>• Confirme que sua agenda está livre na data sugerida</li>
              <li>• Prepare seu time caso a solicitação seja aceita</li>
              <li>• Verifique a localização do campo no mapa</li>
            </ul>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="space-y-3 pt-2">
          <Button 
            onClick={onGoToCalendar}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Calendar size={16} className="mr-2" />
            Ver Minha Agenda
            <ArrowRight size={16} className="ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={onGoHome}
            className="w-full"
          >
            <Home size={16} className="mr-2" />
            Voltar ao Feed
          </Button>
        </div>

        {/* Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">Status: Aguardando resposta</span>
              </div>
              <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                Enviado às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </div>
            
            <p className="text-xs text-green-700 mt-2">
              💡 Tempo restante: ~48h para resposta
            </p>
          </CardContent>
        </Card>

        {/* Precisa de ajuda */}
        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm mb-2">
            Problemas com sua solicitação?
          </p>
          <Button variant="link" className="text-green-600 p-0 h-auto text-sm">
            <Mail size={14} className="mr-1" />
            Fale conosco
          </Button>
        </div>
      </div>
    </div>
  );
};