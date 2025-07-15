import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onBack: () => void;
  onLogin: (teamData: any) => void;
  defaultMode?: 'login' | 'register'; // Novo parâmetro para definir modo inicial
}

// Estados brasileiros
const brazilianStates = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' }
];

// Principais cidades por estado (exemplo com alguns estados)
const citiesByState: { [key: string]: string[] } = {
  'SP': ['São Paulo', 'Campinas', 'Santos', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba', 'Mauá', 'São José dos Campos'],
  'RJ': ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Duque de Caxias', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Magé', 'Itaboraí', 'Nova Friburgo'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Lages', 'Jaraguá do Sul', 'Palhoça'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Ilhéus', 'Itabuna', 'Lauro de Freitas', 'Jequié', 'Teixeira de Freitas'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá'],
  'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama']
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  onBack, 
  onLogin, 
  defaultMode = 'register' 
}) => {
  // Inicializa com o modo especificado (login se vier do botão "Faça login para marcar")
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    teamName: '',
    city: '',
    state: '',
    modality: '',
    responsibleName: '',
    contact: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validação básica
      if (!isLogin) {
        if (!formData.teamName || !formData.city || !formData.state || !formData.modality || 
            !formData.responsibleName || !formData.contact || !formData.email || !formData.password) {
          throw new Error('Todos os campos são obrigatórios');
        }

        // Simulação de verificação se o time já existe
        // Em um app real, isso seria uma chamada para API
        const existingTeams = ['Corinthians', 'Palmeiras', 'São Paulo', 'Santos']; // Mock de times já cadastrados
        if (existingTeams.some(team => team.toLowerCase() === formData.teamName.toLowerCase())) {
          throw new Error('Este nome de time já está em uso. Cada time pode ter apenas um representante.');
        }
      } else {
        // Validação para login
        if (!formData.email || !formData.password) {
          throw new Error('Email e senha são obrigatórios');
        }
      }

      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Para login, simular dados do time
      const loginData = isLogin ? {
        teamName: 'Time do Usuário', // Mock - em um app real viria da API
        city: 'São Paulo',
        state: 'SP',
        modality: 'Society (7x7)',
        responsibleName: 'Usuário Teste',
        contact: '(11) 99999-9999',
        email: formData.email
      } : formData;

      onLogin(loginData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Limpa erro quando usuário começa a digitar
  };

  const availableCities = formData.state ? citiesByState[formData.state] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-center flex-1">
            {isLogin ? 'Entrar' : 'Cadastrar Time'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? 'Bem-vindo de volta!' : 'Cadastre seu time'}
            </CardTitle>
            {!isLogin && (
              <p className="text-sm text-gray-600 text-center">
                Apenas um representante por time pode se cadastrar
              </p>
            )}
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="teamName">Nome do Time *</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => updateField('teamName', e.target.value)}
                      placeholder="Ex: Amigos FC"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Verifique se o nome está correto - cada time pode ter apenas um representante
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select onValueChange={(value) => {
                        updateField('state', value);
                        updateField('city', ''); // Reset city when state changes
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {brazilianStates.map((state) => (
                            <SelectItem key={state.code} value={state.code}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Select 
                        onValueChange={(value) => updateField('city', value)}
                        disabled={!formData.state}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={formData.state ? "Selecione" : "Escolha o estado"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                          {availableCities.length === 0 && formData.state && (
                            <SelectItem value="other">Outra cidade</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="modality">Modalidade *</Label>
                    <Select onValueChange={(value) => updateField('modality', value)}>
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

                  <div>
                    <Label htmlFor="responsibleName">Nome do Responsável *</Label>
                    <Input
                      id="responsibleName"
                      value={formData.responsibleName}
                      onChange={(e) => updateField('responsibleName', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact">WhatsApp *</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => updateField('contact', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Entrando...' : 'Cadastrando...'}</span>
                  </div>
                ) : (
                  isLogin ? 'Entrar' : 'Cadastrar Time'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-green-600"
              >
                {isLogin 
                  ? 'Não tem conta? Cadastre seu time' 
                  : 'Já tem conta? Faça login'
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};