import { Card } from "@/components/ui/card";
import { cities, City } from "@/lib/bolivia-data";

interface CitySelectorProps {
  selectedCity: string;
  onCitySelect: (cityId: string) => void;
}

export default function CitySelector({ selectedCity, onCitySelect }: CitySelectorProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <Card className="p-6 card-shadow hover-lift">
        <h2 className="text-2xl font-inter font-semibold text-gray-800 mb-4 flex items-center">
          <i className="fas fa-map-marker-alt text-red-600 mr-3"></i>
          Cidade: Santa Cruz de la Sierra
        </h2>
        {cities.map((city) => (
          <div key={city.id} className="p-6 border-2 border-green-600 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1549890762-0a3f8933bc5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Santa Cruz de la Sierra" 
                className="w-20 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800">{city.displayName}</h3>
                <p className="text-gray-600 text-sm mt-1">{city.description}</p>
                <div className="mt-2 text-xs font-medium text-green-600">
                  ✓ Cidade selecionada para o cálculo
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
