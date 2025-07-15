# 🚀 Guia de Deploy - FutAmadores no Vercel

## 📋 Pré-requisitos

- ✅ Conta no GitHub (gratuita)
- ✅ Conta no Vercel (gratuita)
- ✅ Todos os arquivos do projeto

## 🔧 Método 1: Deploy via GitHub (Recomendado)

### 1. Preparar o Repositório GitHub

```bash
# 1. Crie um novo repositório no GitHub
# Acesse: https://github.com/new
# Nome: futamadores
# Público ou Privado (sua escolha)

# 2. No terminal, na pasta do projeto:
git init
git add .
git commit -m "🎉 Initial commit - FutAmadores Beta"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/futamadores.git
git push -u origin main
```

### 2. Deploy no Vercel

```bash
# 1. Acesse: https://vercel.com
# 2. Faça login com GitHub
# 3. Clique em "New Project"
# 4. Selecione o repositório "futamadores"
# 5. Configure:
#    - Framework Preset: Vite
#    - Build Command: npm run build
#    - Output Directory: dist
# 6. Clique em "Deploy"
```

### 3. Configuração Automática

O Vercel vai automaticamente:
- ✅ Instalar dependências
- ✅ Executar build
- ✅ Fazer deploy
- ✅ Gerar URL: https://futamadores.vercel.app

## 🔧 Método 2: Deploy via CLI (Avançado)

### 1. Instalar Vercel CLI

```bash
npm i -g vercel
```

### 2. Fazer Login

```bash
vercel login
# Use sua conta GitHub
```

### 3. Deploy

```bash
# Na pasta do projeto:
vercel

# Responda as perguntas:
# ? Set up and deploy? [Y/n] y
# ? Which scope? Sua conta
# ? Link to existing project? [y/N] n
# ? What's your project's name? futamadores
# ? In which directory is your code located? ./
# ? Auto-detected Project Settings (Vite):
# ? Want to modify these settings? [y/N] n
```

### 4. Deploy para Produção

```bash
vercel --prod
```

## 🔧 Método 3: Deploy Manual (Mais Simples)

### 1. Build Local

```bash
# Na pasta do projeto:
npm install
npm run build
```

### 2. Deploy no Vercel

```bash
# 1. Acesse: https://vercel.com
# 2. Clique em "New Project"
# 3. Selecione "Browse All Templates"
# 4. Escolha "Static Site"
# 5. Arraste a pasta "dist" para o campo de upload
# 6. Clique em "Deploy"
```

## 🎯 Configurações Importantes

### 1. Variáveis de Ambiente (Opcional)

```bash
# No painel do Vercel > Settings > Environment Variables
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=FutAmadores
NODE_ENV=production
```

### 2. Domínio Personalizado

```bash
# No painel do Vercel > Settings > Domains
# Adicione: futamadores.com.br (se você tiver)
```

### 3. Configurações de Build

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

## 📱 Teste Pós-Deploy

### 1. Teste Básico

```bash
✅ Abrir a URL gerada
✅ Testar onboarding
✅ Testar cadastro/login
✅ Testar publicação de jogo
✅ Testar busca de times
✅ Testar responsividade mobile
```

### 2. Teste de Performance

```bash
# Use ferramentas:
✅ Google PageSpeed Insights
✅ GTmetrix
✅ Lighthouse (Chrome DevTools)
```

### 3. Teste em Dispositivos

```bash
✅ iPhone Safari
✅ Android Chrome
✅ Desktop Chrome
✅ Desktop Firefox
```

## 🔄 Atualizações Futuras

### Deploy Automático

```bash
# Após configurar GitHub:
git add .
git commit -m "🔄 Nova funcionalidade"
git push

# Vercel fará deploy automático!
```

### Deploy Manual

```bash
# Via CLI:
vercel --prod

# Via Interface:
# Acesse painel do Vercel > Deployments > Redeploy
```

## 🚨 Troubleshooting

### 1. Erro de Build

```bash
# Verificar logs no painel do Vercel
# Comum: dependências em falta

# Solução:
npm install
npm run build
# Testar local antes do deploy
```

### 2. Erro 404 em Rotas

```bash
# Já configurado no vercel.json
# Todas as rotas redirecionam para index.html
```

### 3. Erro de Tailwind

```bash
# Verificar se globals.css está importado
# Verificar se todas as classes estão corretas
```

## 📊 Monitoramento

### 1. Analytics do Vercel

```bash
# Painel do Vercel > Analytics
# Veja visitantes, performance, etc.
```

### 2. Logs de Erro

```bash
# Painel do Vercel > Functions > Logs
# Monitore erros em tempo real
```

## 🎉 URLs Finais

### Produção
- **Principal:** https://futamadores.vercel.app
- **Alternativa:** https://futamadores-git-main-seuusuario.vercel.app

### Preview (Branches)
- **Develop:** https://futamadores-git-develop-seuusuario.vercel.app

## 📋 Checklist Final

```bash
✅ Deploy realizado com sucesso
✅ URL funcionando
✅ Todas as telas carregando
✅ Responsividade OK
✅ PWA funcionando
✅ Feedback widget ativo
✅ Performance > 90 no Lighthouse
✅ Sem erros no console
✅ Domínio personalizado configurado (opcional)
✅ Analytics configurado
```

## 🔗 Links Úteis

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **Deploy Status:** https://vercel.com/dashboard
- **Analytics:** https://vercel.com/analytics

---

## 🎯 Próximos Passos

1. **Compartilhar o link** com testadores
2. **Coletar feedback** via widget
3. **Monitorar performance** via Vercel Analytics
4. **Iterar baseado** nos dados dos usuários

🏆 **Parabéns! Seu app está no ar!** 🚀

---

⚽ **FutAmadores Team** | 2024
```

## 🚀 COMANDOS RÁPIDOS

```bash
# Setup completo em 2 minutos:
git init
git add .
git commit -m "🎉 FutAmadores Beta"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/futamadores.git
git push -u origin main

# Depois:
# 1. Abra vercel.com
# 2. Import GitHub project
# 3. Deploy!
```

🎯 **Resultado:** https://futamadores.vercel.app