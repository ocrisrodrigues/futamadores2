#!/usr/bin/env node

/**
 * 🔍 Script de Verificação Pré-Deploy
 * Execute: node pre-deploy-check.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 FutAmadores - Verificação Pré-Deploy\n');

// Arquivos obrigatórios para o deploy
const requiredFiles = [
  'package.json',
  'vercel.json', 
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  'src/main.tsx',
  'App.tsx',
  'styles/globals.css',
  'public/manifest.json',
  'public/sw.js'
];

// Componentes principais
const componentFiles = [
  'components/OnboardingScreen.tsx',
  'components/AuthScreen.tsx',
  'components/HomeFeed.tsx',
  'components/Layout.tsx',
  'components/FeedbackWidget.tsx'
];

let allGood = true;

console.log('📁 Verificando arquivos obrigatórios...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANDO!`);
    allGood = false;
  }
});

console.log('\n🧩 Verificando componentes principais...');
componentFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANDO!`);
    allGood = false;
  }
});

console.log('\n⚙️ Verificando configurações...');

// Verificar package.json
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (pkg.scripts && pkg.scripts.build) {
    console.log('  ✅ Script de build configurado');
  } else {
    console.log('  ❌ Script de build não encontrado');
    allGood = false;
  }
  
  if (pkg.dependencies && pkg.dependencies.react) {
    console.log('  ✅ Dependências React configuradas');
  } else {
    console.log('  ❌ Dependências React não encontradas');
    allGood = false;
  }
} catch (e) {
  console.log('  ❌ Erro ao ler package.json');
  allGood = false;
}

// Verificar vercel.json
try {
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  
  if (vercel.rewrites) {
    console.log('  ✅ Rewrites configurados para SPA');
  } else {
    console.log('  ❌ Rewrites não configurados');
    allGood = false;
  }
} catch (e) {
  console.log('  ❌ Erro ao ler vercel.json');
  allGood = false;
}

// Verificar vite.config.ts
if (fs.existsSync('vite.config.ts')) {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  
  if (viteConfig.includes('outDir')) {
    console.log('  ✅ Output directory configurado');
  } else {
    console.log('  ⚠️ Output directory pode não estar configurado');
  }
  
  if (viteConfig.includes('@vitejs/plugin-react')) {
    console.log('  ✅ Plugin React configurado');
  } else {
    console.log('  ❌ Plugin React não encontrado');
    allGood = false;
  }
}

console.log('\n📱 Verificando PWA...');

// Verificar manifest.json
if (fs.existsSync('public/manifest.json')) {
  try {
    const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
    
    if (manifest.name && manifest.name.includes('FutAmadores')) {
      console.log('  ✅ Manifest configurado com nome correto');
    } else {
      console.log('  ⚠️ Nome no manifest pode estar incorreto');
    }
    
    if (manifest.icons && manifest.icons.length > 0) {
      console.log('  ✅ Ícones configurados no manifest');
    } else {
      console.log('  ⚠️ Ícones não encontrados no manifest');
    }
  } catch (e) {
    console.log('  ❌ Erro ao ler manifest.json');
    allGood = false;
  }
}

// Verificar service worker
if (fs.existsSync('public/sw.js')) {
  const sw = fs.readFileSync('public/sw.js', 'utf8');
  
  if (sw.includes('futamadores')) {
    console.log('  ✅ Service Worker configurado');
  } else {
    console.log('  ⚠️ Service Worker pode estar mal configurado');
  }
}

console.log('\n🎨 Verificando estilos...');

// Verificar globals.css
if (fs.existsSync('styles/globals.css')) {
  const css = fs.readFileSync('styles/globals.css', 'utf8');
  
  if (css.includes('@theme inline')) {
    console.log('  ✅ Tailwind V4 configurado corretamente');
  } else {
    console.log('  ⚠️ Configuração do Tailwind pode estar incorreta');
  }
  
  if (css.includes('--color-')) {
    console.log('  ✅ Variáveis CSS customizadas encontradas');
  } else {
    console.log('  ⚠️ Variáveis CSS podem estar faltando');
  }
}

console.log('\n📊 Resultado Final:');

if (allGood) {
  console.log('🎉 TUDO PRONTO PARA DEPLOY!');
  console.log('\n📋 Próximos passos:');
  console.log('1. git init');
  console.log('2. git add .');
  console.log('3. git commit -m "🎉 FutAmadores Beta - Deploy inicial"');
  console.log('4. git branch -M main');
  console.log('5. git remote add origin https://github.com/SEU_USUARIO/futamadores.git');
  console.log('6. git push -u origin main');
  console.log('7. Importar no Vercel');
  console.log('\n🚀 Boa sorte com o deploy!');
} else {
  console.log('❌ PROBLEMAS ENCONTRADOS!');
  console.log('\nCorreja os problemas acima antes de fazer o deploy.');
  console.log('Se precisar de ajuda, verifique os arquivos que estão faltando.');
}

console.log('\n⚽ FutAmadores Team | 2024');