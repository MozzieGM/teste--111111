import { Card } from "@/components/ui/card";
import { cities } from "@/lib/bolivia-data";
import { formatCurrency } from "@/lib/currency-utils";

interface CityComparisonProps {
  baseExpenses: Record<string, number>;
}

export default function CityComparison({ baseExpenses }: CityComparisonProps) {
  const calculateCityTotal = (multiplier: number) => {
    const total = Object.values(baseExpenses).reduce((sum, value) => sum + value, 0);
    return total * multiplier;
  };

  const getCityStatusColor = (multiplier: number) => {
    if (multiplier < 0.9) return 'border-blue-600 bg-blue-50';
    if (multiplier > 1.1) return 'border-red-600 bg-red-50';
    return 'border-gray-200';
  };

  const getCityStatusBadge = (multiplier: number) => {
    if (multiplier < 0.9) return { text: '💰 Barato', class: 'bg-blue-100 text-blue-800' };
    if (multiplier > 1.1) return { text: '⚠ Caro', class: 'bg-red-100 text-red-800' };
    return { text: '✓ Economia', class: 'bg-green-100 text-green-800' };
  };

  return (
    <Card className="p-6 card-shadow">
      <h2 className="text-2xl font-inter font-semibold text-gray-800 mb-6 flex items-center">
        <i className="fas fa-balance-scale text-red-600 mr-3"></i>
        Comparação Entre Cidades
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cities.map((city) => {
          const total = calculateCityTotal(city.multiplier);
          const totalBRL = total / 1.35;
          const totalUSD = total / 6.96;
          const status = getCityStatusBadge(city.multiplier);

          return (
            <div 
              key={city.id}
              className={`text-center p-4 border-2 rounded-xl ${getCityStatusColor(city.multiplier)}`}
            >
              <h3 className="font-bold text-lg text-gray-800">{city.displayName}</h3>
              <div className="text-2xl font-bold text-gray-800 mt-2">
                {formatCurrency(total, 'BOB')}
              </div>
              <div className="text-sm text-gray-600">
                {formatCurrency(totalBRL, 'BRL')} • {formatCurrency(totalUSD, 'USD')}
              </div>
              <div className="mt-3 text-xs">
                <div className={`px-2 py-1 rounded ${status.class}`}>
                  {status.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
