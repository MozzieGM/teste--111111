import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { expenseCategories, periodOptions, PeriodType } from "@/lib/bolivia-data";
import { Currency, getCurrencySymbol } from "@/lib/currency-utils";

interface ExpenseCalculatorProps {
  expenses: Record<string, number>;
  onExpenseChange: (category: string, value: number) => void;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onCalculate: () => void;
  progressBars: Record<string, number>;
}

export default function ExpenseCalculator({
  expenses,
  onExpenseChange,
  currentCurrency,
  onCurrencyChange,
  selectedPeriod,
  onPeriodChange,
  onCalculate,
  progressBars
}: ExpenseCalculatorProps) {
  const currencies: Currency[] = ['BOB', 'BRL', 'USD'];
  const currencyLabels = {
    BOB: '💰 Bolivianos (Bs.)',
    BRL: '💴 Reais (R$)',
    USD: '💵 Dólares (US$)'
  };

  return (
    <Card className="p-6 card-shadow">
      <h2 className="text-2xl font-inter font-semibold text-gray-800 mb-6 flex items-center">
        <i className="fas fa-calculator text-green-600 mr-3"></i>
        Categorias de Gastos Mensais
      </h2>
      
      {/* Currency Toggle */}
      <div className="mb-6 flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          {currencies.map((currency) => (
            <Button
              key={currency}
              variant={currentCurrency === currency ? "default" : "ghost"}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentCurrency === currency
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => onCurrencyChange(currency)}
            >
              {currencyLabels[currency]}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expenseCategories.map((category) => (
          <div key={category.id} className="space-y-2">
            <label className="flex items-center font-semibold text-gray-700">
              <span className="text-2xl mr-2">{category.icon}</span>
              {category.name}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                {getCurrencySymbol(currentCurrency)}
              </span>
              <Input
                type="number"
                className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl input-focus"
                placeholder={category.defaultValue.toString()}
                value={expenses[category.id] || ''}
                onChange={(e) => onExpenseChange(category.id, parseFloat(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="progress-bar h-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressBars[category.id] || 0}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">💡 {category.description}</p>
          </div>
        ))}
      </div>

      {/* Period Calculator */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <i className="fas fa-calendar-alt text-blue-600 mr-2"></i>
          Período do cálculo
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {periodOptions.map((period) => (
            <Button
              key={period.id}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              className={`w-full text-left justify-start p-4 h-auto ${
                selectedPeriod === period.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => onPeriodChange(period.id as PeriodType)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{period.icon}</span>
                <div>
                  <div className="font-semibold">{period.label}</div>
                  <div className="text-sm opacity-75">
                    {period.months === 1 ? 'Custo mensal' : `Custo total: ${period.months} meses`}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <Button 
        onClick={onCalculate}
        className="w-full mt-8 gradient-bg text-white font-bold py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        <i className="fas fa-calculator mr-2"></i>
        Calcular Custo Total
      </Button>
    </Card>
  );
}
