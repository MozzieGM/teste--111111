import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency, getBRLRange } from "@/lib/currency-utils";
import { expenseCategories, Simulation, PeriodType, periodOptions } from "@/lib/bolivia-data";

interface ResultsPanelProps {
  totals: {
    monthly: { BOB: number; BRL: number; USD: number };
    period: { BOB: number; BRL: number; USD: number };
  };
  expenses: Record<string, number>;
  selectedPeriod: PeriodType;
  recommendations: Array<{
    icon: string;
    text: string;
    type: 'success' | 'warning' | 'danger' | 'info';
  }>;
  savedSimulations: Simulation[];
  onSaveSimulation: () => void;
  onLoadSimulation: (id: number) => void;
  onExportPDF: () => void;
  onShareWhatsApp: () => void;
  visible: boolean;
}

const CHART_COLORS = [
  '#009639', '#CE1126', '#0067B7', '#FFDF00',
  '#28A745', '#FFC107', '#DC3545', '#6C757D'
];

export default function ResultsPanel({
  totals,
  expenses,
  selectedPeriod,
  recommendations,
  savedSimulations,
  onSaveSimulation,
  onLoadSimulation,
  onExportPDF,
  onShareWhatsApp,
  visible
}: ResultsPanelProps) {
  const chartData = expenseCategories.map((category, index) => ({
    name: category.name,
    value: expenses[category.id] || 0,
    color: CHART_COLORS[index]
  })).filter(item => item.value > 0);

  const getRecommendationClass = (type: string) => {
    const classes = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return classes[type as keyof typeof classes] || classes.info;
  };

  if (!visible) return null;

  return (
    <div className="space-y-6">
      {/* Real-time Exchange Rates */}
      <Card className="p-6 card-shadow">
        <h3 className="text-lg font-inter font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-exchange-alt text-yellow-500 mr-2"></i>
          Taxas de Câmbio Atuais
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">USD → BOB</span>
            <span className="text-green-600 font-bold">6.96</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">BRL → BOB</span>
            <span className="text-red-600 font-bold">2.5 - 3.0</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">BRL → USD</span>
            <span className="text-blue-600 font-bold">0.19</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          <i className="fas fa-info-circle mr-1"></i>
          Referência: dezembro 2024
        </p>
      </Card>

      {/* Results Summary */}
      <Card className="p-6 card-shadow">
        <h3 className="text-lg font-inter font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-chart-pie text-green-600 mr-2"></i>
          Resumo Financeiro
        </h3>
        
        {/* Total Cost */}
        <div className="text-center mb-6 p-4 gradient-bg rounded-xl text-white">
          <div className="text-sm opacity-90">
            {selectedPeriod === 'monthly' ? 'Custo Mensal' : 
             selectedPeriod === 'annual' ? 'Custo Anual' : 
             'Custo Total (6 Anos)'}
          </div>
          <div className="text-3xl font-bold">{formatCurrency(totals.period.BOB, 'BOB')}</div>
          <div className="text-sm opacity-90">
            {(() => {
              const brlRange = getBRLRange(totals.period.BOB);
              return `R$ ${brlRange.min.toFixed(0)} - R$ ${brlRange.max.toFixed(0)} • ${formatCurrency(totals.period.USD, 'USD')}`;
            })()}
          </div>
        </div>

        {/* Period Info */}
        <div className="text-center mb-6 p-3 bg-blue-100 rounded-xl">
          <div className="text-sm text-gray-700 font-medium">
            {periodOptions.find(p => p.id === selectedPeriod)?.label}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Santa Cruz de la Sierra • Valores atualizados
          </div>
        </div>

        {/* Chart Container */}
        {chartData.length > 0 && (
          <div className="mb-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value, 'BOB')} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-3 mb-6">
          {recommendations.map((rec, index) => (
            <div key={index} className={`p-3 rounded-lg ${getRecommendationClass(rec.type)}`}>
              <span className="text-lg">{rec.icon}</span>
              <span className="ml-2 text-sm font-medium">{rec.text}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onExportPDF}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            Baixar PDF
          </Button>
          <Button 
            onClick={onShareWhatsApp}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Compartilhar WhatsApp
          </Button>
          <Button 
            onClick={onSaveSimulation}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-save mr-2"></i>
            Salvar Simulação
          </Button>
        </div>
      </Card>

      {/* Saved Simulations */}
      <Card className="p-6 card-shadow">
        <h3 className="text-lg font-inter font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-history text-yellow-500 mr-2"></i>
          Simulações Salvas
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {savedSimulations.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Nenhuma simulação salva ainda</p>
          ) : (
            savedSimulations.map((sim) => (
              <div 
                key={sim.id}
                onClick={() => onLoadSimulation(sim.id)}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">{sim.date}</div>
                    <div className="text-xs text-gray-500 capitalize">{sim.city.replace('-', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{formatCurrency(sim.totalBOB, 'BOB')}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(sim.totalBRL, 'BRL')}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
