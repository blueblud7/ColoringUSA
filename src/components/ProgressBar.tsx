import { MapMode } from '../App'

interface ProgressBarProps {
  coloredRegions: Record<string, boolean>
  mode: MapMode
  totalCount: number
}

export function ProgressBar({ coloredRegions, totalCount }: ProgressBarProps) {
  const coloredCount = Object.values(coloredRegions).filter(Boolean).length
  const percentage = totalCount > 0 ? (coloredCount / totalCount) * 100 : 0

  const getMessage = () => {
    if (percentage === 0) {
      return 'Get started!'
    } else if (percentage < 25) {
      return 'Great start! Keep coloring.'
    } else if (percentage < 50) {
      return 'You\'re doing well! Keep going.'
    } else if (percentage < 75) {
      return 'More than halfway done!'
    } else if (percentage < 100) {
      return 'Almost there!'
    } else {
      return 'Perfect! You\'ve colored all regions! 🎉'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">👍</span>
        <div className="flex-1">
          <p className="text-gray-800 font-medium">
            {getMessage()} ({percentage.toFixed(1)}%)
          </p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

