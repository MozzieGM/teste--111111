#!/bin/bash

# Script para criar pacote de download do Simulador de Gastos
echo "🔄 Criando pacote de download..."

# Criar diretório temporário para o pacote
mkdir -p simulador-gastos-bolivia

# Copiar arquivos essenciais
cp -r client simulador-gastos-bolivia/
cp -r server simulador-gastos-bolivia/
cp -r shared simulador-gastos-bolivia/
cp package.json simulador-gastos-bolivia/
cp package-lock.json simulador-gastos-bolivia/
cp tsconfig.json simulador-gastos-bolivia/
cp vite.config.ts simulador-gastos-bolivia/
cp tailwind.config.ts simulador-gastos-bolivia/
cp postcss.config.js simulador-gastos-bolivia/
cp components.json simulador-gastos-bolivia/
cp drizzle.config.ts simulador-gastos-bolivia/
cp README.md simulador-gastos-bolivia/
cp DEPLOY.md simulador-gastos-bolivia/
cp DOCUMENTACAO_COMPLETA.md simulador-gastos-bolivia/
cp replit.md simulador-gastos-bolivia/

# Criar arquivo .gitignore para o pacote
cat > simulador-gastos-bolivia/.gitignore << EOF
node_modules/
dist/
.env
.env.local
.vscode/
.idea/
*.log
.DS_Store
EOF

# Criar ZIP
if command -v zip &> /dev/null; then
    zip -r simulador-gastos-bolivia.zip simulador-gastos-bolivia/
    echo "✅ Arquivo ZIP criado: simulador-gastos-bolivia.zip"
elif command -v tar &> /dev/null; then
    tar -czf simulador-gastos-bolivia.tar.gz simulador-gastos-bolivia/
    echo "✅ Arquivo TAR.GZ criado: simulador-gastos-bolivia.tar.gz"
else
    echo "❌ Zip ou tar não encontrado. Use manualmente:"
    echo "zip -r simulador-gastos-bolivia.zip simulador-gastos-bolivia/"
fi

# Limpar diretório temporário
rm -rf simulador-gastos-bolivia/

echo "📦 Pacote pronto para download!"