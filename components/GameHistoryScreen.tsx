import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Plus, 
  Calendar, 
  MapPin, 
  Clock,
  Target,
  TrendingUp,
  Users,
  Award,
  Star,
  BarChart3,
  CheckCircle,
  XCircle,
  Minus,
  Edit,
  Eye,
  Filter
} from 'lucide-react';

interface GameResult {
  id: string;
  date: Date;
  opponent: string;
  opponentLogo: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  location: string;
  modality: string;
  result: 'win' | 'draw' | 'loss';
  isHome: boolean;
  notes?: string;
  goals?: {
    scorer: string;
    minute: number;
  }[];
  yellowCards?: number;
  redCards?: number;
  addedBy: string;
  addedAt: Date;
}

interface TeamStats {
  totalGames: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  winRate: number;
  rating: number;
  homeWins: number;
  awayWins: number;
  recentForm: ('W' | 'D' | 'L')[];
}

export const GameHistoryScreen: React.FC = () => {
  const [showAddResult, setShowAddResult] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameResult | null>(null);
  const [showGameDetails, setShowGameDetails] = useState(false);
  
  // Form states
  const [opponent, setOpponent] = useState('');
  const [gameDate, setGameDate] = useState('');
  const [location, setLocation] = useState('');
  const [modality, setModality] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [isHome, setIsHome] = useState(true);
  const [notes, setNotes] = useState('');

  // Mock data - histórico de jogos
  const [gameHistory] = useState<GameResult[]>([
    {
      id: '1',
      date: new Date(2024, 11, 15),
      opponent: 'Leões United',
      opponentLogo: '🦁',
      homeTeam: 'Tigres FC',
      awayTeam: 'Leões United',
      homeScore: 3,
      awayScore: 1,
      location: 'Campo do Parque Ibirapuera',
      modality: 'Society (7x7)',
      result: 'win',
      isHome: true,
      notes: 'Ótimo jogo! Time adversário muito técnico.',
      goals: [
        { scorer: 'João Silva', minute: 15 },
        { scorer: 'Pedro Santos', minute: 28 },
        { scorer: 'João Silva', minute: 42 }
      ],
      yellowCards: 2,
      redCards: 0,
      addedBy: 'João Silva',
      addedAt: new Date(2024, 11, 15)
    },
    {
      id: '2',
      date: new Date(2024, 11, 8),
      opponent: 'Águias FC',
      opponentLogo: '🦅',
      homeTeam: 'Águias FC',
      awayTeam: 'Tigres FC',
      homeScore: 2,
      awayScore: 2,
      location: 'Centro Esportivo Vila Maria',
      modality: 'Society (7x7)',
      result: 'draw',
      isHome: false,
      notes: 'Empate justo. Eles empataram nos acréscimos.',
      yellowCards: 1,
      redCards: 0,
      addedBy: 'João Silva',
      addedAt: new Date(2024, 11, 8)
    },
    {
      id: '3',
      date: new Date(2024, 10, 30),
      opponent: 'Falcões SC',
      opponentLogo: '🦅',
      homeTeam: 'Tigres FC',
      awayTeam: 'Falcões SC',
      homeScore: 1,
      awayScore: 3,
      location: 'Campo do Parque Ibirapuera',
      modality: 'Society (7x7)',
      result: 'loss',
      isHome: true,
      notes: 'Não foi nosso dia. Time adversário estava melhor.',
      yellowCards: 3,
      redCards: 1,
      addedBy: 'João Silva',
      addedAt: new Date(2024, 10, 30)
    },
    {
      id: '4',
      date: new Date(2024, 10, 22),
      opponent: 'Tubarões FC',
      opponentLogo: '🦈',
      homeTeam: 'Tubarões FC',
      awayTeam: 'Tigres FC',
      homeScore: 0,
      awayScore: 2,
      location: 'Arena Poliesportiva Zona Norte',
      modality: 'Society (7x7)',
      result: 'win',
      isHome: false,
      notes: 'Vitória sólida fora de casa!',
      yellowCards: 0,
      redCards: 0,
      addedBy: 'João Silva',
      addedAt: new Date(2024, 10, 22)
    }
  ]);

  // Calcular estatísticas
  const calculateStats = (): TeamStats => {
    const totalGames = gameHistory.length;
    const wins = gameHistory.filter(g => g.result === 'win').length;
    const draws = gameHistory.filter(g => g.result === 'draw').length;
    const losses = gameHistory.filter(g => g.result === 'loss').length;
    
    const goalsFor = gameHistory.reduce((total, game) => {
      return total + (game.isHome ? game.homeScore : game.awayScore);
    }, 0);
    
    const goalsAgainst = gameHistory.reduce((total, game) => {
      return total + (game.isHome ? game.awayScore : game.homeScore);
    }, 0);

    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
    const homeWins = gameHistory.filter(g => g.result === 'win' && g.isHome).length;
    const awayWins = gameHistory.filter(g => g.result === 'win' && !g.isHome).length;
    
    // Rating baseado em vitórias, empates e saldo de gols
    const points = (wins * 3) + (draws * 1);
    const rating = totalGames > 0 ? Math.min(5, 1 + (points / totalGames) * 1.5 + (goalsFor - goalsAgainst) * 0.1) : 0;
    
    // Últimos 5 jogos
    const recentGames = [...gameHistory].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    const recentForm = recentGames.map(g => g.result === 'win' ? 'W' : g.result === 'draw' ? 'D' : 'L') as ('W' | 'D' | 'L')[];

    return {
      totalGames,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      winRate,
      rating,
      homeWins,
      awayWins,
      recentForm
    };
  };

  const stats = calculateStats();

  const handleAddResult = () => {
    // Validações básicas
    if (!opponent || !gameDate || !homeScore || !awayScore) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    // Determinar resultado
    const myScore = isHome ? parseInt(homeScore) : parseInt(awayScore);
    const opponentScore = isHome ? parseInt(awayScore) : parseInt(homeScore);
    let result: 'win' | 'draw' | 'loss';
    
    if (myScore > opponentScore) result = 'win';
    else if (myScore === opponentScore) result = 'draw';
    else result = 'loss';

    // Simular adição do resultado
    alert(`✅ Resultado adicionado!\n\n${isHome ? 'Tigres FC' : opponent} ${homeScore} x ${awayScore} ${isHome ? opponent : 'Tigres FC'}\n\nResultado: ${result === 'win' ? 'Vitória' : result === 'draw' ? 'Empate' : 'Derrota'}`);
    
    // Limpar formulário
    setOpponent('');
    setGameDate('');
    setLocation('');
    setHomeScore('');
    setAwayScore('');
    setNotes('');
    setShowAddResult(false);
  };

  const getResultIcon = (result: 'win' | 'draw' | 'loss') => {
    switch (result) {
      case 'win':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'draw':
        return <Minus size={16} className="text-yellow-600" />;
      case 'loss':
        return <XCircle size={16} className="text-red-600" />;
    }
  };

  const getResultColor = (result: 'win' | 'draw' | 'loss') => {
    switch (result) {
      case 'win':
        return 'bg-green-50 border-green-200';
      case 'draw':
        return 'bg-yellow-50 border-yellow-200';
      case 'loss':
        return 'bg-red-50 border-red-200';
    }
  };

  const getFormIcon = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W':
        return <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">W</div>;
      case 'D':
        return <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">D</div>;
      case 'L':
        return <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">L</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Histórico de Jogos</h1>
            <p className="text-sm text-gray-600">Resultados e estatísticas</p>
          </div>
          <Button 
            onClick={() => setShowAddResult(true)}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Plus size={16} className="mr-2" />
            Adicionar
          </Button>
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="form">Forma</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            {/* Estatísticas Principais */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy size={20} className="text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold">{stats.wins}</div>
                  <div className="text-xs text-gray-600">Vitórias</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Star size={20} className="text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold">{stats.rating.toFixed(1)}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Target size={20} className="text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">{stats.goalsFor}</div>
                  <div className="text-xs text-gray-600">Gols Pró</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp size={20} className="text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold">{stats.winRate.toFixed(0)}%</div>
                  <div className="text-xs text-gray-600">Aproveit.</div>
                </CardContent>
              </Card>
            </div>

            {/* Detalhes das Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 size={20} className="text-green-600" />
                  <span>Detalhes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">{stats.wins}</div>
                    <div className="text-xs text-gray-600">Vitórias</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">{stats.draws}</div>
                    <div className="text-xs text-gray-600">Empates</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">{stats.losses}</div>
                    <div className="text-xs text-gray-600">Derrotas</div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total de jogos:</span>
                      <span className="font-medium">{stats.totalGames}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saldo de gols:</span>
                      <span className="font-medium">{stats.goalsFor - stats.goalsAgainst > 0 ? '+' : ''}{stats.goalsFor - stats.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vitórias em casa:</span>
                      <span className="font-medium">{stats.homeWins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vitórias fora:</span>
                      <span className="font-medium">{stats.awayWins}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-3">
            {gameHistory.length > 0 ? (
              gameHistory
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((game) => (
                  <Card key={game.id} className={`border ${getResultColor(game.result)} cursor-pointer hover:shadow-md transition-shadow`} onClick={() => {
                    setSelectedGame(game);
                    setShowGameDetails(true);
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{game.opponentLogo}</span>
                          <div>
                            <p className="font-medium text-sm">{game.opponent}</p>
                            <p className="text-xs text-gray-600">{game.date.toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            {getResultIcon(game.result)}
                            <span className="font-bold">
                              {game.isHome ? game.homeScore : game.awayScore} x {game.isHome ? game.awayScore : game.homeScore}
                            </span>
                          </div>
                          <Badge variant={game.isHome ? 'default' : 'secondary'} className="text-xs">
                            {game.isHome ? 'Casa' : 'Fora'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{game.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={12} />
                          <span>Ver detalhes</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy size={48} className="mx-auto mb-3 text-gray-300" />
                  <h3 className="font-medium mb-2">Nenhum jogo registrado</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Adicione os resultados dos seus jogos para começar a acompanhar suas estatísticas.
                  </p>
                  <Button 
                    onClick={() => setShowAddResult(true)}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Plus size={16} className="mr-2" />
                    Adicionar Primeiro Jogo
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="form" className="space-y-4">
            {/* Forma Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award size={20} className="text-green-600" />
                  <span>Forma Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Últimos 5 jogos:</span>
                  <div className="flex space-x-1">
                    {stats.recentForm.map((result, index) => (
                      <div key={index}>
                        {getFormIcon(result)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  <p>W = Vitória • D = Empate • L = Derrota</p>
                </div>
              </CardContent>
            </Card>

            {/* Análise de Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Análise de Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Em casa</span>
                    <span>{stats.homeWins} vitórias</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${stats.totalGames > 0 ? (stats.homeWins / stats.totalGames) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fora de casa</span>
                    <span>{stats.awayWins} vitórias</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${stats.totalGames > 0 ? (stats.awayWins / stats.totalGames) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal Adicionar Resultado */}
        <Dialog open={showAddResult} onOpenChange={setShowAddResult}>
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus size={20} className="text-green-600" />
                <span>Adicionar Resultado</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="opponent">Adversário *</Label>
                  <Input
                    id="opponent"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="Nome do time"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={gameDate}
                    onChange={(e) => setGameDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Local</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Campo onde foi jogado"
                />
              </div>

              <div>
                <Label htmlFor="modality">Modalidade</Label>
                <Select value={modality} onValueChange={setModality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="society-7x7">Society (7x7)</SelectItem>
                    <SelectItem value="futsal">Futsal (5x5)</SelectItem>
                    <SelectItem value="campo-11x11">Campo (11x11)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Onde jogaram?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={isHome ? 'default' : 'outline'}
                    onClick={() => setIsHome(true)}
                    className="w-full"
                  >
                    Em Casa
                  </Button>
                  <Button
                    variant={!isHome ? 'default' : 'outline'}
                    onClick={() => setIsHome(false)}
                    className="w-full"
                  >
                    Fora
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Resultado *</Label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <Label className="text-xs text-gray-600">
                        {isHome ? 'Tigres FC' : opponent || 'Adversário'}
                      </Label>
                      <Input
                        type="number"
                        value={homeScore}
                        onChange={(e) => setHomeScore(e.target.value)}
                        className="w-16 text-center"
                        min="0"
                        max="20"
                      />
                    </div>
                    <span className="text-xl font-bold">x</span>
                    <div className="text-center">
                      <Label className="text-xs text-gray-600">
                        {isHome ? opponent || 'Adversário' : 'Tigres FC'}
                      </Label>
                      <Input
                        type="number"
                        value={awayScore}
                        onChange={(e) => setAwayScore(e.target.value)}
                        className="w-16 text-center"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Como foi o jogo? Destaques, lances importantes..."
                  className="min-h-[60px] resize-none"
                  maxLength={200}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {notes.length}/200
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Trophy className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm">
                  Este resultado será usado para calcular suas estatísticas e rating do time.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddResult(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleAddResult}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Plus size={16} className="mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Detalhes do Jogo */}
        <Dialog open={showGameDetails} onOpenChange={setShowGameDetails}>
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Eye size={20} className="text-green-600" />
                <span>Detalhes do Jogo</span>
              </DialogTitle>
            </DialogHeader>
            
            {selectedGame && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🐅</div>
                      <p className="font-medium">Tigres FC</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">
                        {selectedGame.isHome ? selectedGame.homeScore : selectedGame.awayScore} x {selectedGame.isHome ? selectedGame.awayScore : selectedGame.homeScore}
                      </div>
                      <Badge variant={selectedGame.result === 'win' ? 'default' : selectedGame.result === 'draw' ? 'secondary' : 'destructive'}>
                        {selectedGame.result === 'win' ? 'Vitória' : selectedGame.result === 'draw' ? 'Empate' : 'Derrota'}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">{selectedGame.opponentLogo}</div>
                      <p className="font-medium">{selectedGame.opponent}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-green-600" />
                    <span>{selectedGame.date.toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-green-600" />
                    <span>{selectedGame.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-green-600" />
                    <span>{selectedGame.modality}</span>
                    <Badge variant={selectedGame.isHome ? 'default' : 'secondary'} className="text-xs">
                      {selectedGame.isHome ? 'Casa' : 'Fora'}
                    </Badge>
                  </div>
                </div>

                {selectedGame.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Observações:</h4>
                    <p className="text-sm text-gray-700">{selectedGame.notes}</p>
                  </div>
                )}

                <div className="text-xs text-gray-500 text-center">
                  Adicionado por {selectedGame.addedBy} em {selectedGame.addedAt.toLocaleDateString('pt-BR')}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setShowGameDetails(false)}
                  className="w-full"
                >
                  Fechar
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};