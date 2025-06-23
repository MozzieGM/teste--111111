# Simulador de Gastos - Santa Cruz de la Sierra

Calculadora de gastos focada em Santa Cruz de la Sierra, Bolívia, para brasileiros planejando estudar ou morar na cidade.

## Características

- **Foco em Santa Cruz**: Cálculos específicos para a principal cidade da Bolívia
- **Câmbio Atualizado**: BRL para BOB entre 2,5-3,0 (referência junho 2025)
- **Períodos Flexíveis**: Mensal, anual ou 6 anos (curso completo)
- **6 Categorias Essenciais**: Moradia, alimentação, transporte, educação, saúde, gastos pessoais
- **Interface Moderna**: Design responsivo com vista aérea da cidade
- **Salvamento Local**: Salve e carregue simulações
- **Compartilhamento**: Envie resultados por WhatsApp

## Tecnologias

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **UI Components**: Shadcn/ui + Radix UI
- **Charts**: Recharts
- **Build**: Vite

## Como Usar

### Desenvolvimento

```bash
npm install
npm run dev
```

### Deploy

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Tipos compartilhados
└── dist/           # Build de produção
```

## Deploy Recomendado

- **Vercel**: Ideal para frontend estático
- **Netlify**: Alternativa para frontend
- **Railway**: Para full-stack com backend
- **Render**: Para aplicações Node.js

## Dados

- **Câmbio**: USD→BOB: 6.96 | BRL→BOB: 2.5-3.0
- **Base**: Santa Cruz de la Sierra (multiplicador 1.0)
- **Referência**: Junho 2025

## Licença

MIT License - Livre para uso e modificação.