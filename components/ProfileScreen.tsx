import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  User, 
  Edit, 
  Settings, 
  Shield, 
  Bell, 
  MapPin, 
  Phone, 
  Mail, 
  Users,
  Trophy,
  Calendar,
  Save,
  Camera,
  LogOut,
  Share2,
  Navigation,
  ExternalLink,
  Upload,
  X,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface TeamProfile {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  description: string;
  city: string;
  state: string;
  modality: string;
  founded: string;
  responsibleName: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  rating: number;
}

interface ProfileScreenProps {
  user: any;
  onUpdateProfile: (profile: TeamProfile) => void;
  onLogout: () => void;
  onViewGameHistory?: () => void;
  onViewMyPosts?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateProfile,
  onLogout,
  onViewGameHistory,
  onViewMyPosts
}) => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'stats'>('profile');
  const [showLocationEdit, setShowLocationEdit] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Mock profile data
  const [profile, setProfile] = useState<TeamProfile>({
    id: '1',
    name: 'Tigres FC',
    logo: '🐅',
    bannerImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
    description: 'Time amador focado em diversão e fair play. Jogamos há 5 anos e adoramos conhecer novos adversários!',
    city: 'São Paulo',
    state: 'SP',
    modality: 'Society (7x7)',
    founded: '2019',
    responsibleName: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'tigresfc@email.com',
    location: 'Campo do Parque Ibirapuera',
    address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
    latitude: -23.561414,
    longitude: -46.655981,
    gamesPlayed: 23,
    wins: 15,
    draws: 5,
    losses: 3,
    rating: 4.5
  });

  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: false,
    whatsappNotifications: true,
    publicProfile: true,
    showLocation: true,
    showContact: true
  });

  const updateProfile = (field: keyof TeamProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateSetting = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveProfile = () => {
    onUpdateProfile(profile);
    setEditMode(false);
    setShowLocationEdit(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowLogoutDialog(false);
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfile('bannerImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: `Localização do ${profile.name}`,
        text: `Confira onde jogamos: ${profile.location}`,
        url: `https://maps.google.com/?q=${profile.latitude},${profile.longitude}`
      });
    } else {
      navigator.clipboard.writeText(`https://maps.google.com/?q=${profile.latitude},${profile.longitude}`);
      // toast.success('Link da localização copiado!');
    }
  };

  const openInMaps = (app: 'google' | 'waze') => {
    const lat = profile.latitude;
    const lng = profile.longitude;
    
    if (app === 'google') {
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
    }
  };

  const handleAddressSearch = async () => {
    // In a real app, you would use a geocoding service
    // For demo purposes, we'll simulate coordinates based on the address
    if (profile.address.includes('São Paulo')) {
      updateProfile('latitude', -23.561414);
      updateProfile('longitude', -46.655981);
    }
  };

  const winRate = profile.gamesPlayed > 0 ? Math.round((profile.wins / profile.gamesPlayed) * 100) : 0;

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Actions Card - Destaque no topo */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">Logado como</p>
                <p className="text-sm text-green-600">{profile.name}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowLogoutDialog(true)}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              size="sm"
            >
              <LogOut size={14} className="mr-2" />
              Sair
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            {onViewMyPosts && (
              <Button 
                onClick={onViewMyPosts}
                variant="outline" 
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <FileText size={14} className="mr-2" />
                Minhas Publicações
              </Button>
            )}
            {onViewGameHistory && (
              <Button 
                onClick={onViewGameHistory}
                variant="outline" 
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                <Trophy size={14} className="mr-2" />
                Histórico
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Banner/Foto Wide do Time */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-r from-green-400 to-green-600 rounded-t-lg overflow-hidden">
              {profile.bannerImage ? (
                <ImageWithFallback
                  src={profile.bannerImage}
                  alt={`Banner do ${profile.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Camera size={32} className="mx-auto mb-2 opacity-70" />
                    <p className="text-sm opacity-70">Adicione uma foto do seu time</p>
                  </div>
                </div>
              )}
            </div>
            
            {editMode && (
              <div className="absolute bottom-4 right-4">
                <label htmlFor="banner-upload" className="cursor-pointer">
                  <Button size="sm" className="bg-white text-gray-800 hover:bg-gray-100">
                    <Camera size={16} className="mr-2" />
                    {profile.bannerImage ? 'Alterar' : 'Adicionar'} Foto
                  </Button>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {profile.bannerImage && editMode && (
              <Button
                onClick={() => updateProfile('bannerImage', '')}
                size="sm"
                variant="destructive"
                className="absolute bottom-4 left-4"
              >
                <X size={16} className="mr-2" />
                Remover
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User size={20} className="text-green-600" />
              <span>Informações do Time</span>
            </CardTitle>
            <Button 
              onClick={() => setEditMode(!editMode)}
              variant="outline"
              size="sm"
            >
              <Edit size={16} className="mr-2" />
              {editMode ? 'Cancelar' : 'Editar'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Logo e Nome */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">{profile.logo}</span>
              </div>
              {editMode && (
                <Button size="sm" className="absolute -bottom-2 -right-2 p-1 h-6 w-6 rounded-full">
                  <Camera size={12} />
                </Button>
              )}
            </div>
            <div className="flex-1">
              {editMode ? (
                <Input
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="text-xl font-bold"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.name}</h2>
              )}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <MapPin size={14} />
                <span>{profile.city}, {profile.state}</span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label>Descrição do Time</Label>
            {editMode ? (
              <Textarea
                value={profile.description}
                onChange={(e) => updateProfile('description', e.target.value)}
                className="mt-1"
                rows={3}
              />
            ) : (
              <p className="text-gray-700 text-sm mt-1">{profile.description}</p>
            )}
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Modalidade</Label>
              {editMode ? (
                <Select onValueChange={(value) => updateProfile('modality', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={profile.modality} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campo">Futebol de Campo (11x11)</SelectItem>
                    <SelectItem value="society">Society (7x7)</SelectItem>
                    <SelectItem value="futsal">Futsal (5x5)</SelectItem>
                    <SelectItem value="quadra">Futebol de Quadra</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm mt-1">{profile.modality}</p>
              )}
            </div>
            <div>
              <Label>Fundado em</Label>
              {editMode ? (
                <Input
                  value={profile.founded}
                  onChange={(e) => updateProfile('founded', e.target.value)}
                />
              ) : (
                <p className="text-sm mt-1">{profile.founded}</p>
              )}
            </div>
          </div>

          {/* Contato */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Responsável</Label>
              {editMode ? (
                <Input
                  value={profile.responsibleName}
                  onChange={(e) => updateProfile('responsibleName', e.target.value)}
                />
              ) : (
                <p className="text-sm mt-1">{profile.responsibleName}</p>
              )}
            </div>
            <div>
              <Label>Telefone</Label>
              {editMode ? (
                <Input
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                />
              ) : (
                <p className="text-sm mt-1">{profile.phone}</p>
              )}
            </div>
          </div>

          <div>
            <Label>E-mail</Label>
            {editMode ? (
              <Input
                value={profile.email}
                onChange={(e) => updateProfile('email', e.target.value)}
                type="email"
              />
            ) : (
              <p className="text-sm mt-1">{profile.email}</p>
            )}
          </div>

          {editMode && (
            <Button 
              onClick={handleSaveProfile}
              className="w-full bg-green-600 hover:bg-green-700 mt-4"
            >
              <Save size={16} className="mr-2" />
              Salvar Alterações
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Localização e Mapa */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin size={20} className="text-green-600" />
              <span>Localização do Campo</span>
            </CardTitle>
            {!showLocationEdit && (
              <Button 
                onClick={() => setShowLocationEdit(true)}
                variant="outline"
                size="sm"
              >
                <Edit size={16} className="mr-2" />
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showLocationEdit ? (
            <div className="space-y-4">
              <div>
                <Label>Nome do Local</Label>
                <Input
                  value={profile.location}
                  onChange={(e) => updateProfile('location', e.target.value)}
                  placeholder="Ex: Campo do Parque Ibirapuera"
                />
              </div>
              
              <div>
                <Label>Endereço Completo</Label>
                <div className="flex space-x-2">
                  <Input
                    value={profile.address}
                    onChange={(e) => updateProfile('address', e.target.value)}
                    placeholder="Rua, número, bairro, cidade, CEP"
                    className="flex-1"
                  />
                  <Button onClick={handleAddressSearch} variant="outline">
                    <Navigation size={16} />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Digite o endereço completo e clique no ícone para buscar as coordenadas
                </p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={handleSaveProfile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save size={16} className="mr-2" />
                  Salvar Localização
                </Button>
                <Button 
                  onClick={() => setShowLocationEdit(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm">
                <p className="font-medium">{profile.location}</p>
                <p className="text-gray-600">{profile.address}</p>
              </div>

              {/* Mini Mapa Simulado */}
              <div className="relative bg-green-50 rounded-lg overflow-hidden border">
                <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 relative">
                  {/* Simulação de mapa com grid */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="flex">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div 
                            key={j} 
                            className="w-full h-full border border-gray-300 flex-1"
                            style={{ height: '19.2px' }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Pin de localização */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-red-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                      <MapPin size={20} />
                    </div>
                  </div>

                  {/* Informações do local */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md max-w-xs">
                    <h4 className="font-semibold text-sm">{profile.location}</h4>
                    <p className="text-xs text-gray-600">{profile.city}, {profile.state}</p>
                  </div>
                </div>

                {/* Overlay de carregamento de mapa real */}
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                    <p className="text-sm text-gray-600 mb-2">📍 Localização verificada</p>
                    <p className="text-xs text-gray-500">
                      Lat: {profile.latitude.toFixed(6)}, Lng: {profile.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  onClick={handleShareLocation}
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <Share2 size={16} className="mr-1" />
                  Compartilhar
                </Button>
                <Button 
                  onClick={() => openInMaps('google')}
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <ExternalLink size={16} className="mr-1" />
                  Google Maps
                </Button>
                <Button 
                  onClick={() => openInMaps('waze')}
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <Navigation size={16} className="mr-1" />
                  Waze
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 text-sm mb-1">💡 Dica</h4>
                <p className="text-green-700 text-xs">
                  Mantenha a localização atualizada para que outros times possam encontrar facilmente seu campo!
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Conta - Destaque no topo */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle size={20} className="text-red-600" />
            <span>Zona de Perigo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Atenção:</strong> As ações abaixo são irreversíveis e podem afetar permanentemente sua conta.
            </AlertDescription>
          </Alert>
          
          <Button 
            variant="outline" 
            className="w-full justify-start border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Shield size={16} className="mr-2" />
            Alterar Senha
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut size={16} className="mr-2" />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell size={20} className="text-green-600" />
            <span>Notificações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-600">Receber notificações no app</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">E-mail</p>
              <p className="text-sm text-gray-600">Notificações por e-mail</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">WhatsApp</p>
              <p className="text-sm text-gray-600">Notificações via WhatsApp</p>
            </div>
            <Switch
              checked={settings.whatsappNotifications}
              onCheckedChange={(checked) => updateSetting('whatsappNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield size={20} className="text-green-600" />
            <span>Privacidade</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Perfil Público</p>
              <p className="text-sm text-gray-600">Outros times podem ver seu perfil</p>
            </div>
            <Switch
              checked={settings.publicProfile}
              onCheckedChange={(checked) => updateSetting('publicProfile', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mostrar Localização</p>
              <p className="text-sm text-gray-600">Exibir endereço do campo</p>
            </div>
            <Switch
              checked={settings.showLocation}
              onCheckedChange={(checked) => updateSetting('showLocation', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mostrar Contato</p>
              <p className="text-sm text-gray-600">Exibir informações de contato</p>
            </div>
            <Switch
              checked={settings.showContact}
              onCheckedChange={(checked) => updateSetting('showContact', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy size={20} className="text-green-600" />
            <span>Estatísticas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-600">{profile.gamesPlayed}</h3>
              <p className="text-sm text-gray-600">Jogos Disputados</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-600">{winRate}%</h3>
              <p className="text-sm text-gray-600">Taxa de Vitórias</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <h4 className="text-xl font-bold text-green-600">{profile.wins}</h4>
              <p className="text-xs text-gray-600">Vitórias</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <h4 className="text-xl font-bold text-yellow-600">{profile.draws}</h4>
              <p className="text-xs text-gray-600">Empates</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <h4 className="text-xl font-bold text-red-600">{profile.losses}</h4>
              <p className="text-xs text-gray-600">Derrotas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avaliação */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliação do Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-yellow-600">{profile.rating}</h3>
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`text-lg ${star <= Math.floor(profile.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Baseado em {profile.gamesPlayed} jogos</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="w-20">Fair Play:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span>4.5</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="w-20">Pontualidade:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span>4.3</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="w-20">Organização:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span>4.8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="mr-2">Pontual</Badge>
            <Badge variant="outline" className="mr-2">Fair Play</Badge>
            <Badge variant="outline" className="mr-2">Organizado</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Conquistas */}
      <Card>
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-sm font-medium">Veterano</p>
              <p className="text-xs text-gray-600">5+ anos no app</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">⚽</div>
              <p className="text-sm font-medium">Ativo</p>
              <p className="text-xs text-gray-600">20+ jogos</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🤝</div>
              <p className="text-sm font-medium">Fair Play</p>
              <p className="text-xs text-gray-600">Avaliação 4.5+</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">📅</div>
              <p className="text-sm font-medium">Pontual</p>
              <p className="text-xs text-gray-600">Sempre no horário</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico Recente */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico Recente</CardTitle>
            {onViewGameHistory && (
              <Button 
                onClick={onViewGameHistory}
                variant="outline" 
                size="sm"
                className="text-green-600 border-green-300 hover:bg-green-50"
              >
                <Trophy size={14} className="mr-2" />
                Ver Tudo
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { opponent: 'Leões FC', result: 'V', score: '3-1', date: '15/12' },
              { opponent: 'Águias United', result: 'E', score: '2-2', date: '08/12' },
              { opponent: 'Dragões SC', result: 'V', score: '4-2', date: '01/12' }
            ].map((game, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    game.result === 'V' ? 'bg-green-500' : 
                    game.result === 'E' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {game.result}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{game.opponent}</p>
                    <p className="text-xs text-gray-600">{game.date}</p>
                  </div>
                </div>
                <p className="font-bold text-sm">{game.score}</p>
              </div>
            ))}
          </div>
          
          {onViewGameHistory && (
            <div className="mt-4 space-y-2">
              <Button 
                onClick={onViewGameHistory}
                variant="ghost" 
                size="sm"
                className="w-full text-green-600 hover:bg-green-50"
              >
                📊 Gerenciar resultados e ver estatísticas completas
              </Button>
              <p className="text-xs text-center text-gray-500">
                💡 Adicione resultados dos jogos para calcular estatísticas reais
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'profile', label: 'Perfil', icon: User },
          { id: 'settings', label: 'Configurações', icon: Settings },
          { id: 'stats', label: 'Estatísticas', icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'profile' && renderProfile()}
      {activeTab === 'settings' && renderSettings()}
      {activeTab === 'stats' && renderStats()}

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <LogOut size={20} className="text-red-600" />
              <span>Confirmar Logout</span>
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja sair da sua conta?
            </DialogDescription>
          </DialogHeader>
          
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Atenção:</strong> Você precisará fazer login novamente para acessar 
              suas funcionalidades exclusivas como publicar jogos e gerenciar sua agenda.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <LogOut size={16} className="mr-2" />
              Sair da Conta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};