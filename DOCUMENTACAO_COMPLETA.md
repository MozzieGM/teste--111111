# SIMULADOR DE GASTOS - SANTA CRUZ DE LA SIERRA
## Documentação Completa para Download e Deploy

---

## 📋 DESCRIÇÃO DO PROJETO

**Simulador de Gastos** é uma calculadora focada em Santa Cruz de la Sierra, Bolívia, desenvolvida especificamente para brasileiros que planejam estudar ou morar na cidade.

### Características Principais:
- Foco exclusivo em Santa Cruz de la Sierra
- Câmbio BRL-BOB atualizado: 2,5-3,0 Bs por Real
- Períodos flexíveis: Mensal, Anual, 6 Anos
- 6 categorias essenciais de gastos
- Interface responsiva e intuitiva
- Salvamento local de simulações
- Compartilhamento via WhatsApp

---

## 🛠 TECNOLOGIAS UTILIZADAS

### Frontend:
- React 18 + TypeScript
- Tailwind CSS
- Shadcn/ui + Radix UI
- Recharts (gráficos)
- Vite (build tool)

### Backend:
- Node.js + Express
- TypeScript
- Drizzle ORM

### Estrutura:
```
📁 Projeto/
├── 📁 client/          # Frontend React
├── 📁 server/          # Backend Express  
├── 📁 shared/          # Tipos compartilhados
├── 📁 components.json  # Configuração UI
├── 📄 package.json     # Dependências
└── 📄 README.md        # Documentação
```

---

## ⚙️ INSTALAÇÃO E USO

### Pré-requisitos:
- Node.js 18+ 
- npm ou yarn

### Comandos:
```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

### URLs:
- **Desenvolvimento**: http://localhost:5000
- **Produção**: Depende do serviço escolhido

---

## 🚀 OPÇÕES DE DEPLOY

### 1. VERCEL (Recomendado)
**Melhor para:** Projetos React, deploy automático

**Passos:**
1. Conectar repositório GitHub ao Vercel
2. Configurar build: `npm run build`
3. Deploy automático a cada commit

**Configuração vercel.json:**
```json
{
  "builds": [
    { "src": "client/**", "use": "@vercel/static-build" },
    { "src": "server/index.ts", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.ts" },
    { "src": "/(.*)", "dest": "/client/$1" }
  ]
}
```

### 2. NETLIFY 
**Melhor para:** Frontend estático, simplicidade

**Passos:**
1. Build: `npm run build`
2. Deploy da pasta `dist/public`
3. Configurar redirects SPA

**Configuração netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. RAILWAY
**Melhor para:** Full-stack, banco de dados

**Passos:**
1. Conectar repositório GitHub
2. Deploy automático
3. Configurar variáveis de ambiente se necessário

### 4. RENDER
**Melhor para:** Aplicações Node.js, gratuito

**Configuração:**
- Build: `npm run build`
- Start: `npm start`
- Port: 5000

---

## 💾 DADOS E CONFIGURAÇÕES

### Taxas de Câmbio (Junho 2025):
- **USD → BOB**: 6.96
- **BRL → BOB**: 2.5 - 3.0 (faixa atualizada)
- **BRL → USD**: 0.19

### Categorias de Gastos:
1. **Moradia/Aluguel**: Apartamento 1-2 quartos
2. **Alimentação**: Supermercado + refeições
3. **Transporte**: Micro (ônibus) + táxi
4. **Educação**: Mensalidade universitária
5. **Saúde**: Seguro médico + farmácia
6. **Gastos Pessoais**: Higiene, roupas, diversos

### Valores Padrão (em Bolivianos):
- Moradia: Bs. 1.500
- Alimentação: Bs. 1.000
- Transporte: Bs. 200
- Educação: Bs. 3.000
- Saúde: Bs. 300
- Pessoais: Bs. 400

---

## 🔧 COMANDOS ESSENCIAIS

```bash
# Desenvolvimento local
npm run dev

# Build completo (frontend + backend)
npm run build

# Produção
npm start

# Apenas frontend (para deploy estático)
cd client && npm run build

# Verificar build
npm run preview
```

---

## 🌐 DEPLOY SIMPLIFICADO (FRONTEND APENAS)

Para sites estáticos (recomendado):

1. **Build do cliente:**
```bash
cd client
npm run build
```

2. **Upload para:**
- Vercel
- Netlify  
- GitHub Pages
- Firebase Hosting

---

## 🐛 TROUBLESHOOTING

### Problemas Comuns:

**1. Build falha:**
- Verificar Node.js versão 18+
- Deletar node_modules e reinstalar
- Verificar dependências no package.json

**2. 404 em rotas:**
- Configurar SPA redirects
- Verificar configuração do servidor

**3. Assets não carregam:**
- Verificar paths relativos
- Configurar base URL no Vite

**4. Erro de permissão:**
```bash
sudo npm install -g npm@latest
```

**5. Porta em uso:**
```bash
# Matar processo na porta 5000
lsof -ti:5000 | xargs kill -9
```

---

## 📊 FEATURES DETALHADAS

### Interface:
- Design responsivo (mobile-first)
- Tema brasileiro/boliviano
- Animações suaves
- Gráficos interativos

### Funcionalidades:
- Cálculo em tempo real
- Barras de progresso por categoria
- Simulações salvas no localStorage
- Exportação para WhatsApp
- Comparação de períodos

### Dados:
- Câmbio corrigido e atualizado
- Multiplicadores por cidade
- Valores baseados em pesquisa real

---

## 📜 LICENÇA

MIT License - Livre para uso comercial e pessoal

---

## 📞 SUPORTE

Para dúvidas técnicas:
1. Verificar documentação
2. Consultar troubleshooting
3. Revisar logs de build
4. Testar em ambiente local

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

1. **Fazer fork** do repositório
2. **Personalizar** valores padrão se necessário  
3. **Escolher plataforma** de deploy
4. **Configurar domínio** personalizado
5. **Monitorar** métricas de uso

---

---

*Documentação atualizada em Junho 2025*
*Simulador de Gastos - Santa Cruz de la Sierra*