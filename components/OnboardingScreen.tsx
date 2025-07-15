import React from 'react';
import { Button } from './ui/button';
import { Users, Calendar, MapPin } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ 
  onGetStarted, 
  onExplore 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-700 text-white flex flex-col justify-center items-center p-6">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto relative">
          <span className="text-4xl">⚽</span>
          {/* Beta Badge */}
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            BETA
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">FutAmadores</h1>
        <p className="text-xl opacity-90 mb-3">
          Encontre adversários e marque jogos com seu time
        </p>
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-sm">
          <p className="text-white">
            🧪 <strong>Versão Beta</strong> - Teste e nos ajude a melhorar!
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Conecte Times</h3>
            <p className="text-sm opacity-80">Encontre outros times da sua região</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Agende Jogos</h3>
            <p className="text-sm opacity-80">Marque partidas em datas disponíveis</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Locais Próximos</h3>
            <p className="text-sm opacity-80">Jogue em campos da sua cidade</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <Button 
          onClick={onGetStarted}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
        >
          Criar Conta
        </Button>
        <Button 
          onClick={onExplore}
          variant="outline" 
          className="w-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-600 py-3"
        >
          Explorar Times
        </Button>
      </div>
    </div>
  );
};