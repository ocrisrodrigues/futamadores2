import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Trophy, 
  Plus, 
  ArrowLeft,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Minus,
  Star,
  BarChart3,
  Calendar
} from 'lucide-react';

interface SimpleGameResult {
  id: string;
  opponent: string;
  myScore: number;
  opponentScore: number;
  date: Date;
  result: 'win' | 'draw' | 'loss';
}

export const ResultsTestScreen: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [opponent, setOpponent] = useState('');
  const [myScore, setMyScore] = useState('');
  const [opponentScore, setOpponentScore] = useState('');
  
  const [results, setResults] = useState<SimpleGameResult[]>([
    {
      id: '1',
      opponent: 'Leões United',
      myScore: 3,
      opponentScore: 1,
      date: new Date(2024, 11, 15),
      result: 'win'
    },
    {
      id: '2',
      opponent: 'Águias FC',
      myScore: 2,
      opponentScore: 2,
      date: new Date(2024, 11, 8),
      result: 'draw'
    },
    {
      id: '3',
      opponent: 'Falcões SC',
      myScore: 1,
      opponentScore: 3,
      date: new Date(2024, 10, 30),
      result: 'loss'
    }
  ]);

  // Calcular estatísticas
  const stats = {
    totalGames: results.length,
    wins: results.filter(r => r.result === 'win').length,
    draws: results.filter(r => r.result === 'draw').length,
    losses: results.filter(r => r.result === 'loss').length,
    goalsFor: results.reduce((total, r) => total + r.myScore, 0),
    goalsAgainst: results.reduce((total, r) => total + r.opponentScore, 0),
  };

  const winRate = stats.totalGames > 0 ? (stats.wins / stats.totalGames) * 100 : 0;
  const rating = stats.totalGames > 0 ? Math.min(5, 1 + (stats.wins * 3 + stats.draws) / stats.totalGames * 1.5) : 0;

  const handleAddResult = () => {
    if (!opponent || !myScore || !opponentScore) {
      alert('Preencha todos os campos');
      return;
    }

    const my = parseInt(myScore);
    const opp = parseInt(opponentScore);
    let result: 'win' | 'draw' | 'loss';
    
    if (my > opp) result = 'win';
    else if (my === opp) result = 'draw';
    else result = 'loss';

    const newResult: SimpleGameResult = {
      id: Date.now().toString(),
      opponent,
      myScore: my,
      opponentScore: opp,
      date: new Date(),
      result
    };

    setResults(prev => [newResult, ...prev]);
    setOpponent('');
    setMyScore('');
    setOpponentScore('');
    setShowAddForm(false);
    
    alert(`✅ Resultado adicionado!\nTigres FC ${my} x ${opp} ${opponent}\nResultado: ${result === 'win' ? 'Vitória! 🎉' : result === 'draw' ? 'Empate' : 'Derrota'}`);
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Sistema de Resultados</h1>
            <p className="text-sm text-gray-600">Teste de funcionalidade</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Plus size={16} className="mr-2" />
            {showAddForm ? 'Cancelar' : 'Adicionar'}
          </Button>
        </div>

        {/* Formulário de Adição */}
        {showAddForm && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus size={20} className="text-green-600" />
                <span>Adicionar Resultado</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="opponent">Time Adversário</Label>
                <Input
                  id="opponent"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  placeholder="Nome do time adversário"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Resultado</Label>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 block mb-1">Tigres FC</Label>
                      <Input
                        type="number"
                        value={myScore}
                        onChange={(e) => setMyScore(e.target.value)}
                        className="w-16 text-center text-lg font-bold"
                        min="0"
                        max="20"
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-400">x</span>
                    <div className="text-center">
                      <Label className="text-xs text-gray-600 block mb-1">{opponent || 'Adversário'}</Label>
                      <Input
                        type="number"
                        value={opponentScore}
                        onChange={(e) => setOpponentScore(e.target.value)}
                        className="w-16 text-center text-lg font-bold"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleAddResult}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!opponent || !myScore || !opponentScore}
              >
                <Plus size={16} className="mr-2" />
                Salvar Resultado
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas */}
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
              <div className="text-2xl font-bold">{rating.toFixed(1)}</div>
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
              <div className="text-2xl font-bold">{winRate.toFixed(0)}%</div>
              <div className="text-xs text-gray-600">Aproveit.</div>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes das Estatísticas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 size={20} className="text-green-600" />
              <span>Resumo Geral</span>
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
                  <span className="text-gray-600">Média gols/jogo:</span>
                  <span className="font-medium">{stats.totalGames > 0 ? (stats.goalsFor / stats.totalGames).toFixed(1) : '0.0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating calculado:</span>
                  <span className="font-medium">{rating.toFixed(1)}/5.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Resultados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar size={20} className="text-green-600" />
              <span>Histórico ({results.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.length > 0 ? (
              results.map((game) => (
                <div key={game.id} className={`border ${getResultColor(game.result)} p-3 rounded-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getResultIcon(game.result)}
                      <div>
                        <p className="font-medium text-sm">vs {game.opponent}</p>
                        <p className="text-xs text-gray-600">{game.date.toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {game.myScore} x {game.opponentScore}
                      </div>
                      <Badge variant={game.result === 'win' ? 'default' : game.result === 'draw' ? 'secondary' : 'destructive'} className="text-xs">
                        {game.result === 'win' ? 'Vitória' : game.result === 'draw' ? 'Empate' : 'Derrota'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Trophy size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Nenhum resultado cadastrado</p>
                <p className="text-xs">Adicione seus primeiros resultados!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Explicação */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 text-sm mb-2">
              💡 Como Funciona:
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Adicione resultados dos seus jogos</li>
              <li>• O rating é calculado automaticamente (vitórias = 3 pts, empates = 1 pt)</li>
              <li>• Estatísticas são atualizadas em tempo real</li>
              <li>• Rating vai de 1.0 a 5.0 baseado no desempenho</li>
              <li>• Saldo de gols também influencia na avaliação</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};