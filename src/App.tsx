import { useState } from 'react'
import { MapView } from './components/MapView'
import { ModeSelector } from './components/ModeSelector'
import { ProgressBar } from './components/ProgressBar'
import { CategorySelector } from './components/CategorySelector'
import { useLocalStorage } from './hooks/useLocalStorage'

export type MapMode = 'states' | 'counties'
export type Category = 'visited' | 'passed' | 'favorite' | 'want' | null

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
  const [stateCategories, setStateCategories] = useLocalStorage<Record<string, Category>>('stateCategories', {})
  const [countyCategories, setCountyCategories] = useLocalStorage<Record<string, Category>>('countyCategories', {})
  const [selectedCategory, setSelectedCategory] = useState<Category>(null)
  const [regionCount, setRegionCount] = useState<number>(mode === 'states' ? 50 : 3143)

  const coloredRegions = mode === 'states' ? coloredStates : coloredCounties

  const handleRegionClick = (id: string, _name?: string, fips?: string) => {
    if (mode === 'states') {
      // 주 모드: 선택된 카테고리로 주 색칠
      if (selectedCategory) {
        setStateCategories(prev => {
          const currentCategory = prev[id]
          // 같은 카테고리를 다시 클릭하면 제거, 다른 카테고리면 변경
          const newCategory = currentCategory === selectedCategory ? null : selectedCategory
          if (newCategory === null) {
            const updated = { ...prev }
            delete updated[id]
            return updated
          }
          return { ...prev, [id]: newCategory }
        })
        // 색칠 상태도 업데이트
        setColoredStates(prev => ({
          ...prev,
          [id]: selectedCategory !== null
        }))
      }
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
        // 카운티 모드: 선택된 카테고리로 카운티 색칠
        if (selectedCategory) {
          setCountyCategories(prev => {
            const currentCategory = prev[id]
            // 같은 카테고리를 다시 클릭하면 제거, 다른 카테고리면 변경
            const newCategory = currentCategory === selectedCategory ? null : selectedCategory
            if (newCategory === null) {
              const updated = { ...prev }
              delete updated[id]
              return updated
            }
            return { ...prev, [id]: newCategory }
          })
          // 색칠 상태도 업데이트
          setColoredCounties(prev => ({
            ...prev,
            [id]: selectedCategory !== null
          }))
          
          // 카운티가 속한 주도 색칠 (카운티가 하나라도 색칠되면 주도 색칠)
          if (selectedStateFips && selectedState) {
            setColoredStates(prev => ({
              ...prev,
              [selectedState]: true
            }))
          }
        }
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
          
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
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
              stateCategories={stateCategories}
              countyCategories={countyCategories}
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

