import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Star, 
  Send, 
  X, 
  ThumbsUp, 
  ThumbsDown,
  Bug,
  Lightbulb,
  Heart
} from 'lucide-react';

interface FeedbackWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  isTestMode?: boolean;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  position = 'bottom-right',
  isTestMode = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'rating' | 'feedback' | 'thanks'>('rating');
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'suggestion' | 'compliment' | ''>('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('');

  // Get current page info
  React.useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4', 
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const handleRatingSubmit = () => {
    if (rating > 0) {
      setStep('feedback');
    }
  };

  const handleFeedbackSubmit = async () => {
    const feedbackData = {
      rating,
      type: feedbackType,
      message,
      email,
      page: currentPage,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`
    };

    try {
      // In a real app, send to your backend or service like Formspree
      console.log('Feedback submitted:', feedbackData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('thanks');
      
      // Reset after showing thanks
      setTimeout(() => {
        setIsOpen(false);
        setStep('rating');
        setRating(0);
        setFeedbackType('');
        setMessage('');
        setEmail('');
      }, 3000);
      
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
    }
  };

  const renderRatingStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold mb-2">Como está sendo sua experiência?</h3>
        <p className="text-sm text-gray-600">Sua opinião é muito importante!</p>
      </div>
      
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`p-2 rounded-full transition-colors ${
              star <= rating 
                ? 'text-yellow-500 bg-yellow-50' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
      
      {rating > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">
            {rating === 5 && "Incrível! 🎉"}
            {rating === 4 && "Muito bom! 😊"}
            {rating === 3 && "Bom! 👍"}
            {rating === 2 && "Pode melhorar 😐"}
            {rating === 1 && "Precisa melhorar 😔"}
          </p>
          <Button onClick={handleRatingSubmit} className="bg-green-600 hover:bg-green-700">
            Continuar
          </Button>
        </div>
      )}
    </div>
  );

  const renderFeedbackStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold mb-2">Obrigado pela avaliação!</h3>
        <p className="text-sm text-gray-600">Conte-nos mais detalhes (opcional)</p>
      </div>

      {/* Feedback Type */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Tipo de feedback:</Label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setFeedbackType('bug')}
            className={`p-3 rounded-lg border text-center transition-colors ${
              feedbackType === 'bug' 
                ? 'border-red-300 bg-red-50 text-red-700' 
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <Bug size={16} className="mx-auto mb-1" />
            <span className="text-xs">Bug</span>
          </button>
          <button
            onClick={() => setFeedbackType('suggestion')}
            className={`p-3 rounded-lg border text-center transition-colors ${
              feedbackType === 'suggestion' 
                ? 'border-blue-300 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Lightbulb size={16} className="mx-auto mb-1" />
            <span className="text-xs">Sugestão</span>
          </button>
          <button
            onClick={() => setFeedbackType('compliment')}
            className={`p-3 rounded-lg border text-center transition-colors ${
              feedbackType === 'compliment' 
                ? 'border-green-300 bg-green-50 text-green-700' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <Heart size={16} className="mx-auto mb-1" />
            <span className="text-xs">Elogio</span>
          </button>
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="feedback-message">
          {feedbackType === 'bug' && 'Descreva o problema encontrado:'}
          {feedbackType === 'suggestion' && 'Qual sua sugestão de melhoria?'}
          {feedbackType === 'compliment' && 'O que você mais gostou?'}
          {!feedbackType && 'Sua mensagem:'}
        </Label>
        <Textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            feedbackType === 'bug' ? 'Ex: O botão X não funciona na tela Y...' :
            feedbackType === 'suggestion' ? 'Ex: Seria legal ter a funcionalidade Z...' :
            feedbackType === 'compliment' ? 'Ex: Adorei o design da tela...' :
            'Conte-nos sua experiência...'
          }
          className="min-h-[80px] resize-none"
          maxLength={500}
        />
        <div className="text-xs text-gray-500 text-right mt-1">
          {message.length}/500
        </div>
      </div>

      {/* Email (optional) */}
      <div>
        <Label htmlFor="feedback-email">E-mail (opcional):</Label>
        <Input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Para respondermos seu feedback"
        />
      </div>

      {/* Page info */}
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        📍 Página atual: {currentPage || '/'}
      </div>

      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={() => setStep('rating')}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button 
          onClick={handleFeedbackSubmit}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Send size={16} className="mr-2" />
          Enviar
        </Button>
      </div>
    </div>
  );

  const renderThanksStep = () => (
    <div className="text-center space-y-4">
      <div className="text-6xl">🙏</div>
      <h3 className="font-semibold">Obrigado pelo feedback!</h3>
      <p className="text-sm text-gray-600">
        Sua opinião nos ajuda a melhorar o FutAmadores
      </p>
      <div className="flex items-center justify-center space-x-1 text-green-600">
        <Heart size={16} />
        <span className="text-sm">Feedback enviado com sucesso</span>
      </div>
    </div>
  );

  if (!isTestMode) return null;

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 shadow-lg rounded-full w-14 h-14 p-0"
          title="Dar feedback"
        >
          <MessageCircle size={20} />
        </Button>
        
        {/* Beta Badge */}
        <Badge 
          className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs px-2 py-1"
        >
          BETA
        </Badge>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center space-x-2">
                <MessageCircle size={20} className="text-green-600" />
                <span>Feedback - FutAmadores Beta</span>
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-1"
              >
                <X size={16} />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {step === 'rating' && renderRatingStep()}
            {step === 'feedback' && renderFeedbackStep()}
            {step === 'thanks' && renderThanksStep()}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};