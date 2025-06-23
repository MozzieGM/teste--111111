import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import CitySelector from '@/components/city-selector';
import ExpenseCalculator from '@/components/expense-calculator';
import ResultsPanel from '@/components/results-panel';
import CityComparison from '@/components/city-comparison';
import { expenseCategories, cities, Simulation, PeriodType, periodOptions } from '@/lib/bolivia-data';
import { Currency, convertCurrency, getBRLRange } from '@/lib/currency-utils';


export default function Home() {
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState('santa-cruz');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('BOB');
  const [expenses, setExpenses] = useState<Record<string, number>>({});
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');
  const [showResults, setShowResults] = useState(false);
  const [progressBars, setProgressBars] = useState<Record<string, number>>({});
  const [savedSimulations, setSavedSimulations] = useLocalStorage<Simulation[]>('boliviaSimulations', []);

  // Initialize default values
  useEffect(() => {
    const defaultExpenses: Record<string, number> = {};
    expenseCategories.forEach(category => {
      defaultExpenses[category.id] = category.defaultValue;
    });
    setExpenses(defaultExpenses);
  }, []);

  // Calculate totals and recommendations
  const calculateTotals = () => {
    const cityMultiplier = cities.find(city => city.id === selectedCity)?.multiplier || 1;
    const monthlyBOB = Object.values(expenses).reduce((sum, value) => sum + value, 0) * cityMultiplier;
    const monthlyBRL = convertCurrency(monthlyBOB, 'BOB', 'BRL');
    const monthlyUSD = convertCurrency(monthlyBOB, 'BOB', 'USD');
    
    const periodMonths = periodOptions.find(p => p.id === selectedPeriod)?.months || 1;
    
    return {
      monthly: { BOB: monthlyBOB, BRL: monthlyBRL, USD: monthlyUSD },
      period: { 
        BOB: monthlyBOB * periodMonths, 
        BRL: monthlyBRL * periodMonths, 
        USD: monthlyUSD * periodMonths 
      }
    };
  };

  const generateRecommendations = (totalBRL: number) => {
    const recommendations = [];
    
    if (totalBRL < 4000) {
      recommendations.push({
        icon: '💰',
        text: 'Ótimo! Seu orçamento está bem equilibrado para a Bolívia.',
        type: 'success' as const
      });
    } else if (totalBRL < 6000) {
      recommendations.push({
        icon: '⚠️',
        text: 'Orçamento moderado. Considere compartilhar moradia.',
        type: 'warning' as const
      });
    } else {
      recommendations.push({
        icon: '🚨',
        text: 'Orçamento alto. Revise as categorias de maior gasto.',
        type: 'danger' as const
      });
    }

    if (selectedCity === 'cochabamba') {
      recommendations.push({
        icon: '🎯',
        text: 'Cochabamba é a opção mais econômica!',
        type: 'info' as const
      });
    }

    return recommendations;
  };

  const updateProgressBars = () => {
    const total = Object.values(expenses).reduce((sum, value) => sum + value, 0);
    const newProgressBars: Record<string, number> = {};
    
    Object.entries(expenses).forEach(([category, value]) => {
      newProgressBars[category] = total > 0 ? (value / total) * 100 : 0;
    });
    
    setProgressBars(newProgressBars);
  };

  useEffect(() => {
    updateProgressBars();
  }, [expenses]);

  const handleExpenseChange = (category: string, value: number) => {
    setExpenses(prev => ({ ...prev, [category]: value }));
  };

  const handleCalculate = () => {
    setShowResults(true);
    toast({
      title: "Cálculo realizado!",
      description: "Confira os resultados abaixo.",
    });
  };

  const handleSaveSimulation = () => {
    const totals = calculateTotals();
    const simulation: Simulation = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      city: selectedCity,
      totalBOB: totals.monthly.BOB,
      totalBRL: totals.monthly.BRL,
      totalUSD: totals.monthly.USD,
      categories: { ...expenses },
      period: selectedPeriod,
      totalMonths: periodOptions.find(p => p.id === selectedPeriod)?.months || 1
    };

    setSavedSimulations(prev => [simulation, ...prev.slice(0, 9)]);
    
    toast({
      title: "Simulação salva!",
      description: "Você pode carregá-la a qualquer momento.",
    });
  };

  const handleLoadSimulation = (id: number) => {
    const simulation = savedSimulations.find(sim => sim.id === id);
    if (!simulation) return;

    setExpenses(simulation.categories);
    setSelectedCity(simulation.city);
    setSelectedPeriod(simulation.period);
    setShowResults(true);

    toast({
      title: "Simulação carregada!",
      description: "Dados restaurados com sucesso.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Função em desenvolvimento",
      description: "A exportação em PDF estará disponível em breve.",
    });
  };

  const handleShareWhatsApp = () => {
    const totals = calculateTotals();
    const periodInfo = periodOptions.find(p => p.id === selectedPeriod);
    const brlRange = getBRLRange(totals.period.BOB);
    
    const message = `💰 *Simulador de Gastos - Bolívia*\n\n📍 Santa Cruz de la Sierra\n⏰ Período: ${periodInfo?.label}\n💰 Total: Bs. ${totals.period.BOB.toLocaleString('es-BO')}\n💴 Em reais: R$ ${brlRange.min.toFixed(0)} - R$ ${brlRange.max.toFixed(0)}\n\n🔗 Calcule seus gastos: ${window.location.href}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const totals = calculateTotals();
  const recommendations = generateRecommendations(totals.monthly.BRL);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-6">
            <img 
              src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=60" 
              alt="Bandeira do Brasil" 
              className="w-12 h-8 rounded flag-animation"
            />
            <div className="text-center">
              <h1 className="text-4xl font-inter font-bold mb-2">💰 Simulador de Gastos</h1>
              <p className="text-xl opacity-90">Santa Cruz de la Sierra - Bolívia</p>
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Bolivia_%28state%29.svg/320px-Flag_of_Bolivia_%28state%29.svg.png" 
              alt="Bandeira da Bolívia" 
              className="w-12 h-8 rounded flag-animation"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CitySelector 
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ExpenseCalculator
              expenses={expenses}
              onExpenseChange={handleExpenseChange}
              currentCurrency={currentCurrency}
              onCurrencyChange={setCurrentCurrency}
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              onCalculate={handleCalculate}
              progressBars={progressBars}
            />
          </div>

          <div className="lg:col-span-1">
            <ResultsPanel
              totals={totals}
              expenses={expenses}
              selectedPeriod={selectedPeriod}
              recommendations={recommendations}
              savedSimulations={savedSimulations}
              onSaveSimulation={handleSaveSimulation}
              onLoadSimulation={handleLoadSimulation}
              onExportPDF={handleExportPDF}
              onShareWhatsApp={handleShareWhatsApp}
              visible={showResults}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Simulador de Gastos - Santa Cruz de la Sierra | Dados baseados em pesquisas atualizadas
          </p>
          <p className="text-gray-500 text-xs mt-2">
            * Cotações atualizadas automaticamente • Valores são estimativas baseadas em dados reais
          </p>
        </div>
      </footer>
    </div>
  );
}
