import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PostRequestsModal } from './PostRequestsModal';
import { 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  MessageCircle,
  Eye,
  AlertTriangle,
  Save,
  X,
  Plus,
  FileText,
  Target,
  CheckCircle,
  XCircle,
  Timer
} from 'lucide-react';

interface GamePost {
  id: string;
  title: string;
  description: string;
  modality: string;
  suggestedDate: string;
  suggestedTime: string;
  location: string;
  city: string;
  state: string;
  isUrgent: boolean;
  createdAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'completed' | 'cancelled';
  requests: number;
  views: number;
}

interface MyPostsScreenProps {
  onBack: () => void;
  onEditPost: (post: GamePost) => void;
  onDeletePost: (postId: string) => void;
  onCreateNewPost: () => void;
}

export const MyPostsScreen: React.FC<MyPostsScreenProps> = ({
  onBack,
  onEditPost,
  onDeletePost,
  onCreateNewPost
}) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<GamePost | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'expired' | 'all'>('active');

  // Form states para edição
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    modality: '',
    suggestedDate: '',
    suggestedTime: '',
    location: '',
    city: '',
    state: '',
    isUrgent: false
  });

  // Mock data - publicações do usuário
  const [posts, setPosts] = useState<GamePost[]>([
    {
      id: '1',
      title: 'Jogo Society - Domingo de manhã',
      description: 'Buscamos um time para jogo amistoso no domingo às 9:00. Campo bem localizado, com estacionamento.',
      modality: 'Society (7x7)',
      suggestedDate: '21 de Janeiro',
      suggestedTime: '09:00',
      location: 'Campo do Parque Ibirapuera',
      city: 'São Paulo',
      state: 'SP',
      isUrgent: false,
      createdAt: new Date(2024, 11, 18),
      expiresAt: new Date(2024, 11, 21, 9, 0),
      status: 'active',
      requests: 3,
      views: 24
    },
    {
      id: '2',
      title: 'URGENTE - Adversário para hoje à tarde',
      description: 'Time desistiu em cima da hora! Precisamos de um adversário para hoje às 15h.',
      modality: 'Society (7x7)',
      suggestedDate: '19 de Janeiro',
      suggestedTime: '15:00',
      location: 'Centro Esportivo Vila Maria',
      city: 'São Paulo',
      state: 'SP',
      isUrgent: true,
      createdAt: new Date(2024, 11, 19, 12, 0),
      expiresAt: new Date(2024, 11, 19, 15, 0),
      status: 'expired',
      requests: 1,
      views: 18
    },
    {
      id: '3',
      title: 'Amistoso final de semana',
      description: 'Jogo tranquilo para o fim de semana. Focamos no fair play e diversão!',
      modality: 'Society (7x7)',
      suggestedDate: '28 de Janeiro',
      suggestedTime: '16:00',
      location: 'Campo do Parque Ibirapuera',
      city: 'São Paulo',
      state: 'SP',
      isUrgent: false,
      createdAt: new Date(2024, 11, 15),
      expiresAt: new Date(2024, 11, 28, 16, 0),
      status: 'completed',
      requests: 7,
      views: 45
    }
  ]);

  const handleEditPost = (post: GamePost) => {
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      description: post.description,
      modality: post.modality,
      suggestedDate: post.suggestedDate,
      suggestedTime: post.suggestedTime,
      location: post.location,
      city: post.city,
      state: post.state,
      isUrgent: post.isUrgent
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!selectedPost) return;
    
    // Atualizar o post
    setPosts(prev => prev.map(post => 
      post.id === selectedPost.id 
        ? { ...post, ...editForm }
        : post
    ));
    
    setShowEditDialog(false);
    setSelectedPost(null);
    alert('✅ Publicação atualizada com sucesso!');
  };

  const handleDeletePost = (post: GamePost) => {
    setSelectedPost(post);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!selectedPost) return;
    
    setPosts(prev => prev.filter(post => post.id !== selectedPost.id));
    setShowDeleteDialog(false);
    setSelectedPost(null);
    alert('🗑️ Publicação excluída com sucesso!');
  };

  const handleViewRequests = (post: GamePost) => {
    setSelectedPost(post);
    setShowRequestsModal(true);
  };

  // Mock data para solicitações
  const getMockRequests = (postId: string) => {
    const mockRequests = [
      {
        id: '1',
        fromTeam: 'Leões FC',
        fromTeamLogo: '🦁',
        responsible: 'Carlos Silva',
        phone: '(11) 98765-4321',
        email: 'leoesfc@email.com',
        message: 'Olá! Temos interesse no jogo de domingo. Somos um time recreativo e valorizamos o fair play. Confirmamos presença no horário sugerido!',
        suggestedDate: '21 de Janeiro',
        suggestedTime: '09:00',
        alternativeDates: ['2024-01-28', '2024-02-04'],
        submittedAt: new Date(2024, 11, 19, 14, 30),
        status: 'pending' as const,
        rating: 4.2
      },
      {
        id: '2',
        fromTeam: 'Águias United',
        fromTeamLogo: '🦅',
        responsible: 'João Santos',
        phone: '(11) 91234-5678',
        email: 'aguiasunited@email.com',
        message: 'Boa tarde! Queremos marcar o jogo. Temos disponibilidade no domingo, mas preferiríamos um pouco mais tarde, tipo 10h. É possível?',
        alternativeDates: ['2024-01-21'],
        submittedAt: new Date(2024, 11, 19, 16, 15),
        status: 'pending' as const,
        rating: 4.7
      },
      {
        id: '3',
        fromTeam: 'Falcões SC',
        fromTeamLogo: '🦅',
        responsible: 'Pedro Lima',
        phone: '(11) 95555-1234',
        email: 'falcoessc@email.com',
        message: 'Salve! Interesse no jogo, mas só conseguimos depois das 14h. Vocês topam?',
        alternativeDates: [],
        submittedAt: new Date(2024, 11, 18, 20, 45),
        status: 'declined' as const,
        rating: 3.9
      }
    ];

    return postId === '1' ? mockRequests : [];
  };

  const getStatusBadge = (status: GamePost['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Ativo</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expirado</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
    }
  };

  const getStatusIcon = (status: GamePost['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'expired':
        return <Timer size={16} className="text-gray-600" />;
      case 'completed':
        return <Target size={16} className="text-blue-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
    }
  };

  const filteredPosts = posts.filter(post => {
    switch (activeTab) {
      case 'active':
        return post.status === 'active';
      case 'expired':
        return post.status === 'expired' || post.status === 'completed' || post.status === 'cancelled';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  const statsCards = [
    {
      title: 'Publicações Ativas',
      value: posts.filter(p => p.status === 'active').length,
      icon: <CheckCircle size={20} className="text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Total de Solicitações',
      value: posts.reduce((sum, p) => sum + p.requests, 0),
      icon: <MessageCircle size={20} className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Total de Visualizações',
      value: posts.reduce((sum, p) => sum + p.views, 0),
      icon: <Eye size={20} className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Jogos Realizados',
      value: posts.filter(p => p.status === 'completed').length,
      icon: <Target size={20} className="text-orange-600" />,
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Minhas Publicações</h1>
            <p className="text-sm text-gray-600">Gerencie seus jogos publicados</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={onCreateNewPost}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Plus size={16} className="mr-2" />
              Nova
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              size="sm"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {statsCards.map((stat, index) => (
            <Card key={index} className={`${stat.color} text-center`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              Ativas ({posts.filter(p => p.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Antigas ({posts.filter(p => p.status !== 'active').length})
            </TabsTrigger>
            <TabsTrigger value="all">
              Todas ({posts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3 mt-4">
            {filteredPosts.length > 0 ? (
              filteredPosts
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((post) => (
                  <Card key={post.id} className="shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(post.status)}
                            <CardTitle className="text-base">{post.title}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(post.status)}
                            {post.isUrgent && (
                              <Badge variant="destructive" className="text-xs">
                                Urgente
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {post.status === 'active' && (
                          <div className="flex space-x-1 ml-2">
                            <Button
                              onClick={() => handleEditPost(post)}
                              variant="outline"
                              size="sm"
                              className="p-2 h-8 w-8"
                            >
                              <Edit size={12} />
                            </Button>
                            <Button
                              onClick={() => handleDeletePost(post)}
                              variant="outline"
                              size="sm"
                              className="p-2 h-8 w-8 text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{post.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users size={14} className="text-green-600" />
                          <span>{post.modality}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-green-600" />
                          <span>{post.suggestedDate} às {post.suggestedTime}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-green-600" />
                          <span>{post.location}</span>
                          <span className="text-gray-500">• {post.city}/{post.state}</span>
                        </div>
                      </div>

                      {/* Stats da publicação */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <button 
                            onClick={() => handleViewRequests(post)}
                            className="flex items-center space-x-1 hover:text-green-600 transition-colors"
                          >
                            <MessageCircle size={12} />
                            <span>{post.requests} solicitações</span>
                          </button>
                          <div className="flex items-center space-x-1">
                            <Eye size={12} />
                            <span>{post.views} visualizações</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {post.createdAt.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                  <h3 className="font-medium mb-2">
                    {activeTab === 'active' ? 'Nenhuma publicação ativa' : 'Nenhuma publicação encontrada'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {activeTab === 'active' 
                      ? 'Publique seu primeiro jogo para encontrar adversários!' 
                      : 'Suas publicações aparecerão aqui.'}
                  </p>
                  {activeTab === 'active' && (
                    <Button 
                      onClick={onCreateNewPost}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <Plus size={16} className="mr-2" />
                      Publicar Jogo
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal de Edição */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Edit size={20} className="text-green-600" />
                <span>Editar Publicação</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título do seu jogo"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva os detalhes do jogo"
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-date">Data Sugerida</Label>
                  <Input
                    id="edit-date"
                    value={editForm.suggestedDate}
                    onChange={(e) => setEditForm(prev => ({ ...prev, suggestedDate: e.target.value }))}
                    placeholder="Ex: 15 de Janeiro"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-time">Horário</Label>
                  <Input
                    id="edit-time"
                    value={editForm.suggestedTime}
                    onChange={(e) => setEditForm(prev => ({ ...prev, suggestedTime: e.target.value }))}
                    placeholder="Ex: 19:00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-location">Local</Label>
                <Input
                  id="edit-location"
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Nome do campo/local"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-city">Cidade</Label>
                  <Input
                    id="edit-city"
                    value={editForm.city}
                    onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="São Paulo"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-state">Estado</Label>
                  <Input
                    id="edit-state"
                    value={editForm.state}
                    onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-modality">Modalidade</Label>
                <Select 
                  value={editForm.modality} 
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, modality: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Society (7x7)">Society (7x7)</SelectItem>
                    <SelectItem value="Futsal (5x5)">Futsal (5x5)</SelectItem>
                    <SelectItem value="Campo (11x11)">Campo (11x11)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-urgent"
                  checked={editForm.isUrgent}
                  onChange={(e) => setEditForm(prev => ({ ...prev, isUrgent: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="edit-urgent" className="text-sm cursor-pointer">
                  Marcar como urgente
                </Label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEditDialog(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveEdit}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Save size={16} className="mr-2" />
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Confirmação de Exclusão */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Trash2 size={20} className="text-red-600" />
                <span>Excluir Publicação</span>
              </DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. A publicação será removida permanentemente.
              </DialogDescription>
            </DialogHeader>
            
            {selectedPost && (
              <div className="space-y-4">
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Atenção:</strong> Você está prestes a excluir a publicação "{selectedPost.title}".
                    {selectedPost.requests > 0 && (
                      <span className="block mt-1">
                        Esta publicação possui {selectedPost.requests} solicitação(ões) pendente(s).
                      </span>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{selectedPost.title}</h4>
                  <p className="text-xs text-gray-600">{selectedPost.description}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {selectedPost.suggestedDate} às {selectedPost.suggestedTime} • {selectedPost.location}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDeleteDialog(false)}
                    className="flex-1"
                  >
                    Manter
                  </Button>
                  <Button 
                    onClick={confirmDelete}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Solicitações */}
        <PostRequestsModal
          isOpen={showRequestsModal}
          onClose={() => setShowRequestsModal(false)}
          postTitle={selectedPost?.title || ''}
          requests={selectedPost ? getMockRequests(selectedPost.id) : []}
          onAcceptRequest={(requestId) => {
            // Aqui você implementaria a lógica de aceitar solicitação
            console.log('Aceitar solicitação:', requestId);
          }}
          onDeclineRequest={(requestId) => {
            // Aqui você implementaria a lógica de recusar solicitação
            console.log('Recusar solicitação:', requestId);
          }}
        />
      </div>
    </div>
  );
};