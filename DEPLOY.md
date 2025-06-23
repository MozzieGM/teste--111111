# Guia de Deploy - Simulador de Gastos

*Simulador focado em Santa Cruz de la Sierra - Principal centro econômico da Bolívia*

## Opções de Deploy

### 1. Vercel (Recomendado para Frontend)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Configuração no vercel.json:**
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

### 2. Netlify

```bash
# Build
npm run build

# Deploy pasta dist/public
# Configurar redirects para SPA
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Railway (Full-Stack)

```bash
# Conectar ao GitHub
# Deploy automático do repositório
# Configurar variáveis de ambiente se necessário
```

### 4. Render

```bash
# Conectar repositório
# Build: npm run build
# Start: npm start
# Port: 5000
```

## Preparação para Deploy

### 1. Build de Produção
```bash
npm run build
```

### 2. Arquivos Gerados
```
dist/
├── public/     # Frontend estático
└── index.js    # Server backend
```

### 3. Variáveis de Ambiente (Opcional)
```env
NODE_ENV=production
PORT=5000
```

## Deploy Simplificado (Só Frontend)

Para deploy apenas do frontend (recomendado):

1. **Build do cliente:**
```bash
cd client && npm run build
```

2. **Upload para serviço estático:**
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Comandos Importantes

```bash
# Desenvolvimento
npm run dev

# Build completo
npm run build

# Produção
npm start

# Só frontend
cd client && npm run build
```

## URLs após Deploy

- **Desenvolvimento**: http://localhost:5000
- **Produção**: Depende do serviço escolhido

## Troubleshooting

1. **Build falha**: Verificar dependências
2. **404 em rotas**: Configurar SPA redirects
3. **Assets não carregam**: Verificar paths relativos