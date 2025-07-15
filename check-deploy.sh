#!/bin/bash

# 🔍 Script de Verificação Rápida
echo "🔍 FutAmadores - Verificação Rápida"
echo "=================================="

# Verificar se está na pasta correta
if [ ! -f "App.tsx" ]; then
    echo "❌ Execute este script na pasta do projeto (onde está App.tsx)"
    exit 1
fi

echo "✅ Pasta do projeto encontrada"

# Verificar arquivos principais
FILES=(
    "package.json"
    "vercel.json"
    "App.tsx"
    "index.html"
    "vite.config.ts"
)

echo ""
echo "📁 Verificando arquivos principais..."
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file - FALTANDO!"
        exit 1
    fi
done

# Verificar se Git está inicializado
if [ ! -d ".git" ]; then
    echo ""
    echo "⚠️  Git não inicializado"
    echo "Execute: git init"
else
    echo ""
    echo "✅ Git inicializado"
fi

# Verificar se Node.js está instalado
if command -v node &> /dev/null; then
    echo "✅ Node.js instalado: $(node --version)"
else
    echo "❌ Node.js não encontrado"
    exit 1
fi

# Verificar se NPM está instalado  
if command -v npm &> /dev/null; then
    echo "✅ NPM instalado: $(npm --version)"
else
    echo "❌ NPM não encontrado"
    exit 1
fi

echo ""
echo "🎉 TUDO PRONTO PARA DEPLOY!"
echo ""
echo "📋 Comandos para executar:"
echo "1. git init (se não executou ainda)"
echo "2. git add ."
echo "3. git commit -m '🎉 FutAmadores Beta'"
echo "4. git branch -M main"  
echo "5. git remote add origin https://github.com/SEU_USUARIO/futamadores.git"
echo "6. git push -u origin main"
echo ""
echo "Depois acesse: https://vercel.com"
echo ""
echo "🚀 Boa sorte!"