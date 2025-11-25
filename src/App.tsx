import { useState } from 'react'
import { MapView } from './components/MapView'
import { ModeSelector } from './components/ModeSelector'
import { ProgressBar } from './components/ProgressBar'
import { useLocalStorage } from './hooks/useLocalStorage'

export type MapMode = 'states' | 'counties'

export interface ColoredRegion {
  id: string
  name: string
  colored: boolean
}

function App() {
  const [mode, setMode] = useState<MapMode>('states')
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedStateFips, setSelectedStateFips] = useState<string | null>(null)
  const [coloredStates, setColoredStates] = useLocalStorage<Record<string, boolean>>('coloredStates', {})
  const [coloredCounties, setColoredCounties] = useLocalStorage<Record<string, boolean>>('coloredCounties', {})
  const [regionCount, setRegionCount] = useState<number>(mode === 'states' ? 50 : 3143)

  const coloredRegions = mode === 'states' ? coloredStates : coloredCounties

  // 카운티 ID에서 주 FIPS 코드 추출
  const getStateFipsFromCountyId = (countyId: string): string | null => {
    // 카운티 ID가 FIPS 코드 형식인지 확인 (예: "06001")
    if (/^\d{5}$/.test(countyId)) {
      return countyId.substring(0, 2)
    }
    return null
  }

  const handleRegionClick = (id: string, _name?: string, fips?: string) => {
    if (mode === 'states') {
      // 주 모드: 주를 색칠하면 주만 색칠 (카운티는 자동으로 색칠하지 않음)
      const newStateColored = !coloredStates[id]
      
      setColoredStates(prev => ({
        ...prev,
        [id]: newStateColored
      }))
    } else {
      // 카운티 모드
      if (!selectedState) {
        // 주가 선택되지 않았으면 주 선택
        setSelectedState(id)
        // FIPS 코드도 저장 (있는 경우)
        if (fips) {
          setSelectedStateFips(fips)
        }
      } else {
        // 카운티 색칠: 카운티를 색칠하면 해당 주도 색칠
        const newCountyColored = !coloredCounties[id]
        
        setColoredCounties(prev => {
          const updated = { ...prev, [id]: newCountyColored }
          
          // 카운티가 속한 주도 색칠 (카운티가 하나라도 색칠되면 주도 색칠)
          if (selectedStateFips && selectedState) {
            // 해당 주의 카운티 중 하나라도 색칠되어 있으면 주도 색칠
            const hasAnyColoredCounty = Object.keys(updated).some(countyId => {
              const countyStateFips = getStateFipsFromCountyId(countyId)
              return countyStateFips === selectedStateFips && updated[countyId]
            })
            
            if (hasAnyColoredCounty) {
              setColoredStates(prev => ({
                ...prev,
                [selectedState]: true
              }))
            } else {
              // 모든 카운티가 색칠 해제되면 주도 색칠 해제
              setColoredStates(prev => {
                const newStates = { ...prev }
                delete newStates[selectedState]
                return newStates
              })
            }
          }
          
          return updated
        })
      }
    }
  }

  const handleBackToStateSelection = () => {
    setSelectedState(null)
    setSelectedStateFips(null)
  }

  const handleModeChange = (newMode: MapMode) => {
    setMode(newMode)
    if (newMode === 'states') {
      setSelectedState(null)
      setSelectedStateFips(null)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-green-400 to-green-600 w-full h-2"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl h-full flex flex-col">
          <ProgressBar 
            coloredRegions={coloredRegions}
            mode={mode}
            totalCount={regionCount}
          />
          
          <ModeSelector 
            mode={mode} 
            onModeChange={handleModeChange}
          />
          
          {mode === 'counties' && (
            <div className="mb-4 flex items-center gap-4">
              {selectedState ? (
                <>
                  <button
                    onClick={handleBackToStateSelection}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>Back to State Selection</span>
                  </button>
                  <div className="text-lg font-semibold text-gray-700">
                    Counties of {selectedState}
                  </div>
                </>
              ) : (
                <div className="text-lg font-semibold text-gray-700">
                  Select a state to color its counties
                </div>
              )}
            </div>
          )}
          
          <div className="flex-1 mt-4">
            <MapView
              mode={mode}
              selectedState={selectedState}
              selectedStateFips={selectedStateFips}
              coloredStates={coloredStates}
              coloredCounties={coloredCounties}
              onRegionClick={handleRegionClick}
              onRegionCountChange={setRegionCount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

