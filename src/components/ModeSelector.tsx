import { MapMode } from '../App'

interface ModeSelectorProps {
  mode: MapMode
  onModeChange: (mode: MapMode) => void
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
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
    </div>
  )
}


