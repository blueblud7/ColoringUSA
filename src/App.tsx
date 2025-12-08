import { useState } from 'react'
import { MapView } from './components/MapView'
import { ModeSelector } from './components/ModeSelector'
import { ProgressBar } from './components/ProgressBar'
import { useLocalStorage } from './hooks/useLocalStorage'

export type MapMode = 'states' | 'counties' | 'world'

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
  const [coloredCountries, setColoredCountries] = useLocalStorage<Record<string, boolean>>('coloredCountries', {})
  const [regionCount, setRegionCount] = useState<number>(
    mode === 'states' ? 50 : mode === 'counties' ? 3143 : 195
  )

  const coloredRegions = mode === 'states' ? coloredStates : mode === 'counties' ? coloredCounties : coloredCountries

  // 카운티 ID에서 주 FIPS 코드 추출
  const getStateFipsFromCountyId = (countyId: string): string | null => {
    // 카운티 ID가 FIPS 코드 형식인지 확인 (예: "06001")
    if (/^\d{5}$/.test(countyId)) {
      return countyId.substring(0, 2)
    }
    return null
  }

  const handleRegionClick = (id: string, _name?: string, fips?: string) => {
    if (mode === 'world') {
      // 세계지도 모드: 국가를 색칠
      const isCurrentlyColored = coloredCountries[id] || false
      
      setColoredCountries(prev => {
        const newCountries = { ...prev }
        if (isCurrentlyColored) {
          // 색칠 해제: 키를 삭제
          delete newCountries[id]
        } else {
          // 색칠: true로 설정
          newCountries[id] = true
        }
        return newCountries
      })
    } else if (mode === 'states') {
      // 주 모드: 주를 색칠하면 주만 색칠 (카운티는 자동으로 색칠하지 않음)
      const isCurrentlyColored = coloredStates[id] || false
      
      setColoredStates(prev => {
        const newStates = { ...prev }
        if (isCurrentlyColored) {
          // 색칠 해제: 키를 삭제
          delete newStates[id]
        } else {
          // 색칠: true로 설정
          newStates[id] = true
        }
        return newStates
      })
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
        const isCurrentlyColored = coloredCounties[id] || false
        
        setColoredCounties(prev => {
          const updated = { ...prev }
          if (isCurrentlyColored) {
            // 색칠 해제: 키를 삭제
            delete updated[id]
          } else {
            // 색칠: true로 설정
            updated[id] = true
          }
          
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
    if (newMode === 'states' || newMode === 'world') {
      setSelectedState(null)
      setSelectedStateFips(null)
    }
  }

  const handleReset = () => {
    setColoredStates({})
    setColoredCounties({})
    setColoredCountries({})
    setSelectedState(null)
    setSelectedStateFips(null)
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-green-400 to-green-600 w-full h-2"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl h-full flex flex-col">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex-1">
              <ProgressBar 
                coloredRegions={coloredRegions}
                mode={mode}
                totalCount={regionCount}
              />
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 shadow-md whitespace-nowrap"
            >
              <span>🔄</span>
              <span>Reset</span>
            </button>
          </div>
          
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
              coloredRegions={coloredRegions}
              coloredStates={coloredStates}
              coloredCounties={coloredCounties}
              coloredCountries={coloredCountries}
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

