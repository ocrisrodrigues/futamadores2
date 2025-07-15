# 🚀 Guia de Deploy - FutAmadores

## 📱 Opções de Deploy

### 1. **Figma Make (Mais Simples)**
```bash
# Se estiver no Figma Make, use a funcionalidade built-in
1. Clique no botão "Share" ou "Publish" no Figma Make
2. Configure as permissões (público/privado)
3. Copie o link gerado
4. Compartilhe com testadores
```

### 2. **Vercel (Recomendado)**
```bash
# 1. Crie conta no Vercel (vercel.com)
# 2. Conecte seu GitHub/GitLab
# 3. Faça deploy em 1 clique

# Ou via CLI:
npm i -g vercel
vercel login
vercel --prod
```

### 3. **Netlify**
```bash
# 1. Acesse netlify.com
# 2. Arraste a pasta do projeto para o deploy
# 3. Ou conecte via GitHub

# Build settings:
Build command: npm run build
Publish directory: dist
```

### 4. **GitHub Pages**
```bash
# 1. Push código para GitHub
# 2. Ative GitHub Pages nas configurações
# 3. Configure source: GitHub Actions

# Crie .github/workflows/deploy.yml:
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔧 Preparação para Produção

### 1. **Performance Otimizations**
```typescript
// Lazy loading dos componentes
const GameHistoryScreen = React.lazy(() => import('./components/GameHistoryScreen'));
const MyPostsScreen = React.lazy(() => import('./components/MyPostsScreen'));

// No App.tsx, adicione Suspense:
<Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
  <GameHistoryScreen />
</Suspense>
```

### 2. **Error Boundaries**
```typescript
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2>Ops! Algo deu errado 😅</h2>
          <p>Recarregue a página ou tente novamente.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 3. **PWA Configuration**
```typescript
// public/manifest.json
{
  "name": "FutAmadores",
  "short_name": "FutAmadores",
  "description": "App para marcar jogos de futebol amador",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#16a34a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 📲 Teste em Dispositivos Móveis

### 1. **QR Code Generator**
```html
<!-- Adicione no HTML -->
<script>
// Gera QR code automaticamente para o link
const generateQR = (url) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  console.log('QR Code:', qrUrl);
}
</script>
```

### 2. **Device Testing Checklist**
```markdown
✅ iPhone Safari
✅ Android Chrome  
✅ iPad
✅ Tablets Android
✅ Desktop Chrome
✅ Desktop Firefox
✅ Desktop Safari

Testes específicos:
- [ ] Touch gestures (swipe, tap, long press)
- [ ] Keyboard virtual abre/fecha
- [ ] Orientação landscape/portrait
- [ ] Performance em 3G/4G
- [ ] Offline functionality
```

## 📊 Analytics e Feedback

### 1. **Google Analytics (Simples)**
```html
<!-- Adicione no index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. **Hotjar (Heatmaps)**
```html
<!-- Ver como usuários navegam -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HJID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

### 3. **Feedback Widget**
```typescript
// components/FeedbackWidget.tsx
export const FeedbackWidget = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  
  const sendFeedback = () => {
    // Enviar para Google Forms ou email
    const formData = new FormData();
    formData.append('feedback', feedback);
    formData.append('rating', rating.toString());
    
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
    });
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setShowWidget(true)}>
        💬 Feedback
      </Button>
    </div>
  );
};
```

## 🌐 URLs de Teste Sugeridas

### Estrutura de URLs amigáveis:
```
https://futamadores.vercel.app/
├── /feed (home - público)
├── /buscar (search teams)
├── /time/tigres-fc (team profile)
├── /perfil (user profile - requer login)
├── /agenda (calendar - requer login)  
├── /publicar (create game - requer login)
└── /historico (game history - requer login)
```

## 🧪 Plano de Testes

### **Fase 1: Testes Internos (1-2 dias)**
```markdown
👥 Testadores: Você + 2-3 pessoas próximas
🎯 Foco: Bugs críticos, navegação básica
📱 Dispositivos: 2-3 smartphones diferentes
```

### **Fase 2: Beta Fechado (1 semana)**
```markdown
👥 Testadores: 10-15 pessoas de diferentes perfis
🎯 Foco: Usabilidade, fluxos completos
📱 Dispositivos: Variedade iOS/Android
📊 Métricas: Tempo de uso, telas mais visitadas
```

### **Fase 3: Beta Aberto (2 semanas)**
```markdown
👥 Testadores: 50+ pessoas via redes sociais
🎯 Foco: Stress test, feedback de UX
📱 Dispositivos: Máxima variedade
📊 Métricas: Conversão, retenção, erros
```

## 📝 Template de Teste

### **Para compartilhar com testadores:**
```markdown
🏆 FutAmadores - App Beta Test

📱 **Link:** https://futamadores.vercel.app
⏰ **Tempo:** 10-15 minutos
🎯 **Objetivo:** Testar app para marcar jogos de futebol

**O que testar:**
1. ✅ Explore o feed (sem login)
2. ✅ Faça cadastro como representante de time
3. ✅ Publique um jogo
4. ✅ Solicite um jogo de outro time
5. ✅ Navegue pelo perfil e agenda

**Feedback:**
- 🐛 Bugs encontrados?
- 😍 O que mais gostou?
- 😕 O que mais te incomodou?
- 💡 Sugestões de melhoria?

**Form:** https://forms.gle/YOUR_FORM_ID
```

## 🚨 Monitoramento

### **Sentry (Error Tracking)**
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
});

// Wrap App component
export default Sentry.withProfiler(App);
```

### **Performance Monitoring**
```typescript
// Web Vitals
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 📋 Checklist Final

### **Antes do Deploy:**
- [ ] Testado em pelo menos 3 dispositivos diferentes
- [ ] Imagens otimizadas (WebP, lazy loading)
- [ ] Textos revisados (sem "Lorem ipsum")
- [ ] Links funcionando
- [ ] Forms com validação
- [ ] Loading states implementados
- [ ] Error states implementados
- [ ] PWA configurado
- [ ] Analytics configurado

### **Pós Deploy:**
- [ ] Teste completo no link de produção
- [ ] QR code gerado
- [ ] Lista de testadores preparada
- [ ] Forms de feedback configurados
- [ ] Monitoramento ativo
- [ ] Backup do código

## 🎉 Launch Strategy

### **1. Soft Launch (Amigos/Família)**
- 5-10 pessoas
- Feedback direto via WhatsApp
- Foco em bugs críticos

### **2. Community Launch (Grupos de Futebol)**
- Postar em grupos de WhatsApp/Telegram
- Facebook grupos de futebol
- Stories no Instagram

### **3. Public Launch (Redes Sociais)**
- Post no LinkedIn
- Tweet no Twitter
- Post no Instagram com screenshots

---

💡 **Dica:** Comece sempre com um grupo pequeno e vá expandindo gradualmente. É melhor ter 10 usuários testando bem do que 100 testando mal!

🏆 **Meta:** Conseguir pelo menos 20-30 feedbacks detalhados antes de considerar a versão final.