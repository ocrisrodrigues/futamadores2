import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle, 
  User,
  Trophy,
  Clock,
  MapPin,
  Calendar,
  Phone
} from 'lucide-react';

export const TestFlowScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Feed - Visualizar Post',
      description: 'Usuário vê um post de time procurando adversário',
      component: (
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">Estrelas FC</h3>
                  <Badge variant="destructive" className="text-xs">Urgente</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Buscamos um time para jogo amistoso no domingo às 19:00! 
                  Campo do Parque Ibirapuera - São Paulo/SP
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>15 de Janeiro</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>19:00</span>
                  </span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    onClick={() => setCurrentStep(2)}
                  >
                    <MessageCircle size={14} className="mr-2" />
                    Quero Marcar
                  </Button>
                  <Button size="sm" variant="outline" className="px-3">
                    <Phone size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: 2,
      title: 'Tela de Perfil do Time',
      description: 'Usuário pode ver detalhes do time e clicar em "Marcar Jogo"',
      component: (
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🐅</span>
              </div>
              <div>
                <CardTitle>Tigres FC</CardTitle>
                <p className="text-sm text-gray-600">São Paulo, SP</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm">⭐ 4.5</span>
                  <span className="text-sm text-gray-500">23 jogos</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 text-sm mb-2">Próximos Jogos</h4>
                <div className="text-xs text-green-700">
                  <div className="flex items-center space-x-2">
                    <Calendar size={12} />
                    <span>18 de Janeiro - vs Leões United</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600 mb-3">
                  Time amador focado em diversão e fair play. Jogamos há 5 anos e adoramos conhecer novos adversários!
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => alert('Abrindo WhatsApp...')}
                >
                  <Phone size={14} className="mr-2" />
                  Contato
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => setCurrentStep(3)}
                >
                  <MessageCircle size={14} className="mr-2" />
                  Marcar Jogo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: 3,
      title: 'Tela de Solicitação',
      description: 'Usuário preenche formulário para solicitar jogo',
      component: (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-green-600" />
              <span>Solicitar Jogo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800 italic">
                "Estamos sempre disponíveis para jogos amistosos! Entre em contato para combinarmos uma data."
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <User size={14} className="text-green-600" />
                <span>Tigres FC</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar size={14} className="text-green-600" />
                <span>Data e horário a combinar</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={14} className="text-green-600" />
                <span>Campo do Parque Ibirapuera</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 text-sm mb-2">Seus Dados</h4>
              <div className="text-xs text-green-700">
                <p>Time: Leões FC</p>
                <p>Responsável: Paulo Santos</p>
                <p>Telefone: (11) 91234-5678</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 italic">
                "Olá! Somos o Leões FC e temos interesse em marcar um jogo amistoso. 
                Estamos disponíveis nos fins de semana, preferencialmente pela manhã. 
                Jogamos em nível recreativo e valorizamos o fair play!"
              </p>
            </div>
            
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setCurrentStep(4)}
            >
              <MessageCircle size={16} className="mr-2" />
              Enviar Solicitação
            </Button>
          </CardContent>
        </Card>
      )
    },
    {
      id: 4,
      title: 'Tela de Sucesso',
      description: 'Confirmação de envio da solicitação',
      component: (
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Solicitação Enviada!</h3>
              <p className="text-gray-600 text-sm">
                Sua solicitação foi enviada para o <strong>Tigres FC</strong>
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-orange-800 text-sm mb-2">⏰ Próximos Passos</h4>
              <ul className="text-xs text-orange-700 space-y-1 text-left">
                <li>• O time tem até 48h para responder</li>
                <li>• Você receberá uma notificação com a resposta</li>
                <li>• Se aceito, vocês combinarão os detalhes finais</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setCurrentStep(1)}
              >
                <Trophy size={16} className="mr-2" />
                Voltar ao Feed
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setCurrentStep(1)}
              >
                <Calendar size={16} className="mr-2" />
                Ir para Agenda
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  const currentStepData = steps.find(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-center mb-2">
            Fluxo de Marcar Jogo
          </h1>
          <p className="text-center text-gray-600 text-sm">
            Demonstração do fluxo completo
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step.id === currentStep
                    ? 'bg-green-600 text-white'
                    : step.id < currentStep
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id < currentStep ? <CheckCircle size={16} /> : step.id}
              </div>
            ))}
          </div>
          <div className="flex">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full mx-1 transition-colors ${
                  index < currentStep - 1 ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step */}
        {currentStepData && (
          <div className="mb-6">
            <div className="text-center mb-4">
              <h2 className="font-semibold text-lg">{currentStepData.title}</h2>
              <p className="text-gray-600 text-sm">{currentStepData.description}</p>
            </div>
            {currentStepData.component}
          </div>
        )}

        {/* Navigation */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex-1"
          >
            ← Anterior
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Próximo →
          </Button>
        </div>

        {/* Reset Button */}
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(1)}
            className="text-gray-500 hover:text-gray-700"
          >
            🔄 Reiniciar Demonstração
          </Button>
        </div>
      </div>
    </div>
  );
};