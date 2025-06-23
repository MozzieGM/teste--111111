export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  defaultValue: number;
  description: string;
}

export interface City {
  id: string;
  name: string;
  displayName: string;
  multiplier: number;
  description: string;
  costLevel: 'low' | 'medium' | 'high';
  imageUrl: string;
}

export const expenseCategories: ExpenseCategory[] = [
  {
    id: 'moradia',
    name: 'Moradia/Aluguel',
    icon: '🏠',
    defaultValue: 1500,
    description: 'Apartamento 1-2 quartos em Santa Cruz'
  },
  {
    id: 'alimentacao',
    name: 'Alimentação',
    icon: '🍽️',
    defaultValue: 1000,
    description: 'Supermercado + refeições ocasionais'
  },
  {
    id: 'transporte',
    name: 'Transporte',
    icon: '🚗',
    defaultValue: 200,
    description: 'Micro (ônibus) + táxi ocasional'
  },
  {
    id: 'educacao',
    name: 'Educação/Mensalidade',
    icon: '🎓',
    defaultValue: 3000,
    description: 'Universidade medicina em Santa Cruz'
  },
  {
    id: 'saude',
    name: 'Saúde/Seguro',
    icon: '🏥',
    defaultValue: 300,
    description: 'Seguro médico + farmácia'
  },
  {
    id: 'pessoais',
    name: 'Gastos Pessoais',
    icon: '🧼',
    defaultValue: 400,
    description: 'Higiene, roupas, diversos'
  }
];

export const cities: City[] = [
  {
    id: 'santa-cruz',
    name: 'santa-cruz',
    displayName: 'Santa Cruz de la Sierra',
    multiplier: 1.0,
    description: 'Principal destino • Centro econômico • Clima tropical • Maior cidade da Bolívia',
    costLevel: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200'
  }
];

export const exchangeRates = {
  USD_BOB: 6.96,
  BRL_BOB: 2.75, // Taxa média entre 2.5 e 3.0
  BRL_BOB_MIN: 2.5,
  BRL_BOB_MAX: 3.0,
  BRL_USD: 0.19
};

export type PeriodType = 'monthly' | 'annual' | 'six-years';

export const periodOptions = [
  { id: 'monthly', label: 'Mensal', months: 1, icon: '📅' },
  { id: 'annual', label: 'Anual (12 meses)', months: 12, icon: '🗓️' },
  { id: 'six-years', label: '6 Anos (curso completo)', months: 72, icon: '🎓' }
];

export interface Simulation {
  id: number;
  date: string;
  city: string;
  totalBOB: number;
  totalBRL: number;
  totalUSD: number;
  categories: Record<string, number>;
  period: PeriodType;
  totalMonths: number;
}
