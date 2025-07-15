import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  MessageCircle, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';

interface GameRequest {
  id: string;
  fromTeam: string;
  fromTeamLogo: string;
  responsible: string;
  phone: string;
  email: string;
  message: string;
  suggestedDate?: string;
  suggestedTime?: string;
  alternativeDates: string[];
  submittedAt: Date;
  status: 'pending' | 'accepted' | 'declined';
  rating: number;
}

interface PostRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  requests: GameRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
}

export const PostRequestsModal: React.FC<PostRequestsModalProps> = ({
  isOpen,
  onClose,
  postTitle,
  requests,
  onAcceptRequest,
  onDeclineRequest
}) => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const handleAccept = (requestId: string) => {
    onAcceptRequest(requestId);
    alert('✅ Solicitação aceita! O time será notificado.');
  };

  const handleDecline = (requestId: string) => {
    onDeclineRequest(requestId);
    alert('❌ Solicitação recusada. O time será notificado.');
  };

  const getStatusBadge = (status: GameRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Aceita</Badge>;
      case 'declined':
        return <Badge variant="destructive">Recusada</Badge>;
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle size={20} className="text-green-600" />
            <span>Solicitações Recebidas</span>
          </DialogTitle>
          <p className="text-sm text-gray-600">"{postTitle}"</p>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-yellow-50 rounded-lg p-2">
              <div className="text-lg font-bold text-yellow-700">{pendingRequests.length}</div>
              <div className="text-xs text-yellow-600">Pendentes</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-700">{requests.filter(r => r.status === 'accepted').length}</div>
              <div className="text-xs text-green-600">Aceitas</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2">
              <div className="text-lg font-bold text-red-700">{requests.filter(r => r.status === 'declined').length}</div>
              <div className="text-xs text-red-600">Recusadas</div>
            </div>
          </div>

          {/* Solicitações Pendentes */}
          {pendingRequests.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-3 text-yellow-800">⏳ Aguardando Resposta ({pendingRequests.length})</h4>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xl">{request.fromTeamLogo}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{request.fromTeam}</p>
                            <div className="flex items-center space-x-1">
                              <Star size={12} className="text-yellow-500" />
                              <span className="text-xs text-gray-600">{request.rating} • Responsável: {request.responsible}</span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="bg-white p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <Phone size={12} className="text-green-600" />
                          <span>{request.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail size={12} className="text-green-600" />
                          <span>{request.email}</span>
                        </div>
                        {request.suggestedDate && (
                          <div className="flex items-center space-x-2">
                            <Calendar size={12} className="text-green-600" />
                            <span>Sugestão: {request.suggestedDate} às {request.suggestedTime}</span>
                          </div>
                        )}
                      </div>

                      {request.alternativeDates.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-600 mb-1">Datas alternativas:</p>
                          <div className="flex flex-wrap gap-1">
                            {request.alternativeDates.map((date, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {new Date(date).toLocaleDateString('pt-BR')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <span className="text-xs text-gray-500">
                          {request.submittedAt.toLocaleDateString('pt-BR')} às {request.submittedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleDecline(request.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <XCircle size={14} className="mr-1" />
                            Recusar
                          </Button>
                          <Button
                            onClick={() => handleAccept(request.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle size={14} className="mr-1" />
                            Aceitar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Solicitações Processadas */}
          {processedRequests.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-3 text-gray-700">📋 Já Respondidas ({processedRequests.length})</h4>
              <div className="space-y-2">
                {processedRequests.map((request) => (
                  <Card key={request.id} className="opacity-75">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-lg">{request.fromTeamLogo}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{request.fromTeam}</p>
                            <p className="text-xs text-gray-600">{request.submittedAt.toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Estado vazio */}
          {requests.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
              <h3 className="font-medium mb-2">Nenhuma solicitação ainda</h3>
              <p className="text-sm text-gray-600">
                Quando times se interessarem pelo seu jogo, as solicitações aparecerão aqui.
              </p>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};