import { MapMode } from '../App'
import { CONTINENT_NAMES, Continent } from '../data/continents'

interface ModeSelectorProps {
  mode: MapMode
  onModeChange: (mode: MapMode) => void
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  const continents: Continent[] = ['asia', 'europe', 'africa', 'north-america', 'south-america', 'oceania']
  
  return (
    <div className="mb-4">
      {/* 기존 모드 버튼 */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => onModeChange('states')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'states'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          States
        </button>
        <button
          onClick={() => onModeChange('counties')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'counties'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          Counties
        </button>
        <button
          onClick={() => onModeChange('world')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'world'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          World
        </button>
      </div>
      
      {/* 6대주 버튼 */}
      <div className="flex flex-wrap gap-3">
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => onModeChange(continent)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              mode === continent
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            {CONTINENT_NAMES[continent]}
          </button>
        ))}
      </div>
    </div>
  )
}


