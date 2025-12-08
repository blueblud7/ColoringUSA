import { useState, useEffect, useRef } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { geoAlbersUsa, geoBounds } from 'd3-geo'
import { MapMode } from '../App'
import { getContinentForCountry, Continent } from '../data/continents'

interface MapViewProps {
  mode: MapMode
  selectedState?: string | null
  selectedStateFips?: string | null
  coloredRegions: Record<string, boolean>
  coloredStates: Record<string, boolean>
  coloredCounties: Record<string, boolean>
  coloredCountries: Record<string, boolean>
  coloredAsia?: Record<string, boolean>
  coloredEurope?: Record<string, boolean>
  coloredAfrica?: Record<string, boolean>
  coloredNorthAmerica?: Record<string, boolean>
  coloredSouthAmerica?: Record<string, boolean>
  coloredOceania?: Record<string, boolean>
  onRegionClick: (id: string, name?: string, fips?: string) => void
  onRegionCountChange?: (count: number) => void
}

// 미국 주(State) TopoJSON URL
const STATES_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// 미국 카운티(County) TopoJSON URL
const COUNTIES_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json'

// 세계지도 TopoJSON URL
const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export function MapView({ mode, selectedState, selectedStateFips, coloredRegions: _coloredRegions, coloredStates, coloredCounties, coloredCountries, coloredAsia, coloredEurope, coloredAfrica, coloredNorthAmerica, coloredSouthAmerica, coloredOceania, onRegionClick, onRegionCountChange }: MapViewProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [hoveredRegionName, setHoveredRegionName] = useState<string | null>(null)
  const regionCountRef = useRef<number>(0)
  const pendingCountRef = useRef<number | null>(null)
  const [zoomCenter, setZoomCenter] = useState<[number, number] | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const countiesGeographiesRef = useRef<Geo[]>([])
  const mapContainerRef = useRef<HTMLDivElement>(null)
  
  // 대주 모드인지 확인
  const isContinentMode = mode === 'asia' || mode === 'europe' || mode === 'africa' || 
                          mode === 'north-america' || mode === 'south-america' || mode === 'oceania'
  
  // 지도 URL 결정
  const geoUrl = (mode === 'world' || isContinentMode)
    ? WORLD_URL
    : (mode === 'states' || (mode === 'counties' && !selectedState)) 
      ? STATES_URL 
      : COUNTIES_URL

  // 지역 수가 변경되면 부모 컴포넌트에 알림 (렌더링 후 처리)
  useEffect(() => {
    if (pendingCountRef.current !== null && pendingCountRef.current !== regionCountRef.current) {
      regionCountRef.current = pendingCountRef.current
      if (onRegionCountChange) {
        onRegionCountChange(pendingCountRef.current)
      }
      pendingCountRef.current = null
    }
  })

  interface GeoProperties {
    name?: string
    fips?: string
    state?: string
    id?: string
    [key: string]: any
  }

  interface Geo {
    properties: GeoProperties
    rsmKey: string
    id?: string
    [key: string]: any
  }

  const getRegionId = (geo: Geo, isCountyMode: boolean, isWorldMode: boolean, isContinentMode: boolean): string => {
    if (isWorldMode || isContinentMode) {
      // 세계지도 모드: ISO 코드를 우선 사용 (고유하고 안정적), 없으면 나라 이름 사용
      // 숫자 ID는 피하기 위해 ISO 코드나 이름을 우선 사용
      const props = geo.properties || {}
      const isoA3 = props.ISO_A3 || props.iso_a3 || props.ISO3 || props.iso3 || props.ISO_A3_EH
      const isoA2 = props.ISO_A2 || props.iso_a2 || props.ISO2 || props.iso2 || props.ISO_A2_EH
      const name = props.NAME || props.NAME_LONG || props.name || props.NAME_EN || props.name_en || props.ADMIN || props.admin
      
      if (isoA3) return String(isoA3)
      if (isoA2) return String(isoA2)
      if (name) return String(name)
      
      // 최후의 수단으로만 숫자 ID 사용
      return geo.id ? String(geo.id) : geo.rsmKey
    }
    if (!isCountyMode || !selectedState) {
      // 주 모드이거나 주 선택 중
      return geo.properties.name || geo.id || geo.rsmKey
    } else {
      // 카운티의 경우: FIPS 코드 또는 고유 ID 사용
      const fips = geo.properties.fips || geo.id
      if (fips) return String(fips)
      // FIPS가 없으면 이름 기반 ID 생성
      const state = geo.properties.state || ''
      const name = geo.properties.name || ''
      return `${state}-${name}`.replace(/\s+/g, '-') || geo.rsmKey
    }
  }

  const getRegionName = (geo: Geo, isCountyMode: boolean, isWorldMode: boolean, isContinentMode: boolean): string => {
    if (isWorldMode || isContinentMode) {
      // 세계지도 모드: 나라 이름을 우선 사용
      const props = geo.properties || {}
      const name = props.NAME || props.NAME_LONG || props.name || props.NAME_EN || props.name_en || props.ADMIN || props.admin
      if (name) return String(name)
      
      // 이름이 없으면 ISO 코드 사용
      const isoA3 = props.ISO_A3 || props.iso_a3 || props.ISO3 || props.iso3 || props.ISO_A3_EH
      const isoA2 = props.ISO_A2 || props.iso_a2 || props.ISO2 || props.iso2 || props.ISO_A2_EH
      if (isoA3) return String(isoA3)
      if (isoA2) return String(isoA2)
      
      // 최후의 수단으로만 숫자 ID 사용
      return geo.id ? String(geo.id) : geo.rsmKey
    }
    if (!isCountyMode || !selectedState) {
      // 주 모드이거나 주 선택 중
      return geo.properties.name || geo.id || geo.rsmKey
    } else {
      // 카운티 모드
      const state = geo.properties.state || ''
      const name = geo.properties.name || ''
      return state && name ? `${name}, ${state}` : name || geo.id || geo.rsmKey
    }
  }

  // 주 모드이거나 카운티 모드에서 주 선택 중일 때는 줌 불가 (고정)
  // 카운티 모드에서 주가 선택되었을 때 또는 대주 모드일 때 줌 가능
  const allowZoom = (mode === 'counties' && selectedState !== null) || isContinentMode

  // 주의 카운티 색칠 비율 계산
  const getStateCountyRatio = (_stateId: string, stateFips?: string): number => {
    if (!stateFips) return 0
    
    // 모든 카운티 중에서 해당 주의 카운티 찾기
    let totalCounties = 0
    let coloredCount = 0
    
    Object.keys(coloredCounties).forEach(countyId => {
      // 카운티 ID에서 주 FIPS 코드 추출
      const countyStateFips = /^\d{5}$/.test(countyId) ? countyId.substring(0, 2) : null
      
      if (countyStateFips === stateFips) {
        totalCounties++
        if (coloredCounties[countyId]) {
          coloredCount++
        }
      }
    })
    
    return totalCounties > 0 ? coloredCount / totalCounties : 0
  }

  // 주 색상 계산 (카운티 색칠 비율에 따라 진하기 조정)
  const getStateColor = (stateId: string, stateFips?: string): string => {
    const isStateColored = coloredStates[stateId] || false
    
    if (!isStateColored) {
      return '#f3f4f6' // 기본 회색
    }
    
    // 카운티 색칠 비율에 따라 색상 진하기 조정
    const ratio = getStateCountyRatio(stateId, stateFips)
    
    // 비율에 따라 색상 진하기: 0% = 연한 색, 100% = 진한 색
    // #a5f3d0 (연한 민트) -> #4ade80 (진한 민트)
    const r1 = 0xa5, g1 = 0xf3, b1 = 0xd0 // 연한 민트
    const r2 = 0x4a, g2 = 0xde, b2 = 0x80 // 진한 민트
    
    const r = Math.round(r1 + (r2 - r1) * ratio)
    const g = Math.round(g1 + (g2 - g1) * ratio)
    const b = Math.round(b1 + (b2 - b1) * ratio)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  // 카운티 색상 계산
  const getCountyColor = (countyId: string, stateFips?: string): string => {
    const isCountyDirectlyColored = coloredCounties[countyId] || false
    
    // 카운티가 직접 색칠되었으면 진한 색
    if (isCountyDirectlyColored) {
      return '#4ade80' // 진한 민트 색
    }
    
    // 주가 색칠되어 있고 카운티가 직접 색칠되지 않았으면 옅은 색
    if (stateFips && selectedState) {
      if (coloredStates[selectedState]) {
        return '#d1fae5' // 매우 옅은 민트 색
      }
    }
    
    // 주도 색칠되지 않고 카운티도 색칠되지 않았으면 회색
    return '#f3f4f6'
  }

  // 카운티 또는 대주 나라들의 경계를 계산하여 중앙과 줌 레벨 설정
  useEffect(() => {
    if (allowZoom && countiesGeographiesRef.current.length > 0) {
      // 약간의 지연을 두어 DOM이 렌더링된 후 크기를 가져오기
      const timer = setTimeout(() => {
        try {
          // 모든 카운티를 하나의 FeatureCollection로 합치기
          const featureCollection = {
            type: 'FeatureCollection',
            features: countiesGeographiesRef.current.map(geo => {
              // react-simple-maps의 Geo 객체는 이미 Feature 형식이거나 geometry 속성을 가질 수 있음
              if (geo.type === 'Feature') {
                return geo
              }
              return {
                type: 'Feature',
                geometry: geo.geometry || geo,
                properties: geo.properties
              }
            })
          }

          // 경계 상자 계산 (지리 좌표)
          const bounds = geoBounds(featureCollection as any)
          
          if (bounds && bounds.length === 2) {
            const [[minLon, minLat], [maxLon, maxLat]] = bounds
            
            // 중심점 계산 (지리 좌표)
            const centerLon = (minLon + maxLon) / 2
            const centerLat = (minLat + maxLat) / 2
            
            if (isContinentMode) {
              // 대주 모드: geoMercator 사용, 간단한 줌 계산
              // 화면 크기 가져오기
              const containerWidth = mapContainerRef.current?.clientWidth || 960
              const containerHeight = mapContainerRef.current?.clientHeight || 500
              
              // 경계 상자의 크기 계산 (도 단위)
              const lonRange = maxLon - minLon
              const latRange = maxLat - minLat
              
              if (lonRange > 0 && latRange > 0) {
                // 여백 고려
                const margin = 0.15
                const availableWidth = containerWidth * (1 - margin * 2)
                const availableHeight = containerHeight * (1 - margin * 2)
                
                // geoMercator는 경도 360도를 화면 너비로 매핑
                // 기본적으로 360도 = 960px라고 가정
                const baseWidth = 960
                const lonScale = baseWidth / 360
                
                // 필요한 줌 레벨 계산
                const zoomX = (availableWidth / (lonRange * lonScale)) * 0.9
                const zoomY = (availableHeight / (latRange * lonScale)) * 0.9
                const zoom = Math.min(zoomX, zoomY, 8) // 최대 줌 레벨 8
                
                // 중심점은 지리 좌표로 사용
                setZoomCenter([centerLon, centerLat])
                setZoomLevel(Math.max(zoom, 0.8)) // 최소 줌 레벨 0.8
                console.log(`Continent zoom: ${zoom}, center: [${centerLon}, ${centerLat}], bounds: [${minLon}, ${minLat}] to [${maxLon}, ${maxLat}]`)
              }
            } else {
              // 카운티 모드: 기존 로직 사용
              const projection = geoAlbersUsa()
                .scale(1070)
                .translate([480, 250])
              
              // 경계 상자의 네 모서리를 프로젝션 좌표로 변환
              const topLeft = projection([minLon, maxLat])
              const bottomRight = projection([maxLon, minLat])
              
              if (topLeft && bottomRight && topLeft.length === 2 && bottomRight.length === 2) {
                // 프로젝션된 경계 상자 크기
                const projectedWidth = Math.abs(bottomRight[0] - topLeft[0])
                const projectedHeight = Math.abs(bottomRight[1] - topLeft[1])
                
                // 화면 크기 가져오기 (실제 컨테이너 크기)
                const containerWidth = mapContainerRef.current?.clientWidth || 960
                const containerHeight = mapContainerRef.current?.clientHeight || 500
                
                // 15-20% 여백을 고려 (평균 17.5%)
                const margin = 0.175
                const availableWidth = containerWidth * (1 - margin * 2)
                const availableHeight = containerHeight * (1 - margin * 2)
                
                // 필요한 줌 레벨 계산 (가장 작은 비율에 맞춤)
                const zoomX = availableWidth / projectedWidth
                const zoomY = availableHeight / projectedHeight
                const zoom = Math.min(zoomX, zoomY)
                
                // 중심점은 지리 좌표로 사용 (ZoomableGroup이 지리 좌표를 받음)
                setZoomCenter([centerLon, centerLat])
                setZoomLevel(Math.max(zoom, 1)) // 최소 줌 레벨 1
              }
            }
          }
        } catch (error) {
          console.error('Error calculating zoom center:', error)
        }
      }, 100) // DOM 렌더링 후 실행
      
      return () => clearTimeout(timer)
    } else {
      // 줌이 필요 없을 때는 초기화
      setZoomCenter(null)
      setZoomLevel(1)
    }
  }, [allowZoom, selectedState, selectedStateFips, isContinentMode, mode])

  function renderGeographies(geographies: Geo[], isCountyMode: boolean, isWorldMode: boolean): JSX.Element[] {
    // 카운티 모드이고 주가 선택된 경우, 해당 주의 카운티만 필터링
    let filteredGeographies = geographies
    if (isWorldMode && !isContinentMode) {
      // 세계지도 모드 (대주 모드가 아닐 때): 모든 국가 표시
      countiesGeographiesRef.current = []
    } else if (isContinentMode) {
      // 대주 모드: 선택된 대주에 해당하는 나라만 필터링
      const selectedContinent = mode as Continent
      
      // 디버깅: 첫 번째 나라의 모든 속성 확인
      if (geographies.length > 0) {
        console.log('First country properties:', geographies[0].properties)
        console.log('First country keys:', Object.keys(geographies[0].properties || {}))
      }
      
      filteredGeographies = geographies.filter((geo) => {
        // world-atlas@2의 실제 속성 이름 확인 (다양한 가능성 시도)
        const props = geo.properties || {}
        const isoA2 = props.ISO_A2 || props.iso_a2 || props.ISO2 || props.iso2 || props.ISO_A2_EH
        const isoA3 = props.ISO_A3 || props.iso_a3 || props.ISO3 || props.iso3 || props.ISO_A3_EH
        // world-atlas@2는 주로 "name" 속성을 사용
        const countryName = props.name || props.NAME || props.NAME_LONG || props.NAME_EN || props.name_en || props.ADMIN || props.admin
        
        const continent = getContinentForCountry(isoA2, isoA3, countryName)
        const matches = continent === selectedContinent
        
        // 디버깅: 첫 몇 개 나라의 매핑 확인
        if (geographies.indexOf(geo) < 5) {
          console.log(`Country: ${countryName}, ISO_A2: ${isoA2}, ISO_A3: ${isoA3}, Continent: ${continent}, Selected: ${selectedContinent}, Matches: ${matches}`)
        }
        
        return matches
      })
      console.log(`Filtered ${filteredGeographies.length} countries for ${selectedContinent} from ${geographies.length} total`)
      
      // 필터링된 나라가 없으면 모든 나라를 표시 (디버깅용)
      if (filteredGeographies.length === 0) {
        console.warn(`No countries found for ${selectedContinent}. Showing first 10 countries for debugging.`)
        filteredGeographies = geographies.slice(0, 10) // 처음 10개만 표시
      }
      
      countiesGeographiesRef.current = filteredGeographies
    } else if (isCountyMode && selectedState) {
      // 디버깅: 첫 번째 카운티의 속성 확인
      if (geographies.length > 0) {
        console.log('Total counties:', geographies.length)
        console.log('First county properties:', geographies[0].properties)
        console.log('Selected state:', selectedState)
        console.log('Selected state FIPS:', selectedStateFips)
      }
      
      filteredGeographies = geographies.filter((geo) => {
        // us-atlas 카운티 데이터는 보통 id에 FIPS 코드가 있음 (예: "06001")
        const geoId = geo.id || geo.properties.id || ''
        const fips = geo.properties.fips || geoId || ''
        
        // FIPS 코드로 필터링 (가장 정확한 방법, 우선순위 1)
        if (selectedStateFips) {
          let stateFipsCode = ''
          
          // id가 문자열이고 숫자로 시작하는 경우 (예: "06001")
          if (geoId && typeof geoId === 'string' && /^\d/.test(geoId)) {
            const idStr = geoId.padStart(5, '0')
            if (idStr.length >= 2) {
              stateFipsCode = idStr.substring(0, 2)
            }
          } 
          // fips 속성이 있는 경우
          else if (fips) {
            const fipsStr = String(fips).padStart(5, '0')
            if (fipsStr.length >= 2) {
              stateFipsCode = fipsStr.substring(0, 2)
            }
          }
          
          // FIPS 코드가 있으면 FIPS 코드로만 매칭 (다른 조건 무시)
          if (stateFipsCode) {
            return stateFipsCode === selectedStateFips
          }
        }
        
        // FIPS 코드가 없을 때만 주 이름으로 매칭 (보조 방법)
        // 주의: 카운티 데이터의 properties.state는 주 이름이 아닐 수 있음
        const stateName = geo.properties.state || ''
        const normalizedStateName = stateName.toLowerCase().trim()
        const normalizedSelectedState = selectedState.toLowerCase().trim()
        
        if (normalizedStateName && normalizedStateName === normalizedSelectedState) {
          return true
        }
        
        return false
      })
      
      console.log(`Filtered ${filteredGeographies.length} counties from ${geographies.length} total`)
      if (filteredGeographies.length === 0 && geographies.length > 0) {
        console.warn('No counties matched! Sample county:', geographies[0])
      }
      
      // 카운티 지리 데이터를 ref에 저장 (줌 계산용)
      countiesGeographiesRef.current = filteredGeographies
    } else {
      countiesGeographiesRef.current = []
    }
    
    // 지역 수를 ref에 저장 (렌더링 후 useEffect에서 처리됨)
    if (filteredGeographies.length !== regionCountRef.current) {
      pendingCountRef.current = filteredGeographies.length
    }
    
    return filteredGeographies.map((geo) => {
      const regionId = getRegionId(geo, isCountyMode, isWorldMode, isContinentMode)
      const regionName = getRegionName(geo, isCountyMode, isWorldMode, isContinentMode)
      const isHovered = hoveredRegion === regionId
      
      // 주 FIPS 코드 추출 (세계지도 모드나 대주 모드에서는 불필요)
      let stateFips: string | undefined = undefined
      if (isWorldMode || isContinentMode) {
        // 세계지도 모드나 대주 모드에서는 FIPS 코드 불필요
      } else if (!isCountyMode || !selectedState) {
        const geoId = geo.id || geo.properties.id || ''
        const fips = geo.properties.fips || ''
        
        if (fips) {
          const fipsStr = String(fips)
          if (fipsStr.length >= 2) {
            stateFips = fipsStr.substring(0, 2).padStart(2, '0')
          } else if (fipsStr.length > 0) {
            stateFips = fipsStr.padStart(2, '0')
          }
        } else if (geoId && /^\d{1,2}$/.test(String(geoId))) {
          stateFips = String(geoId).padStart(2, '0')
        } else if (geoId && /^\d{5}$/.test(String(geoId))) {
          stateFips = String(geoId).substring(0, 2)
        }
      } else {
        // 카운티 모드: 카운티 ID에서 주 FIPS 추출
        const countyId = regionId
        if (/^\d{5}$/.test(countyId)) {
          stateFips = countyId.substring(0, 2)
        }
      }
      
      // 색상 결정
      let fillColor: string
      if (isContinentMode) {
        // 대주 모드: 해당 대주의 색칠 상태 확인
        const continentColored = 
          mode === 'asia' ? coloredAsia :
          mode === 'europe' ? coloredEurope :
          mode === 'africa' ? coloredAfrica :
          mode === 'north-america' ? coloredNorthAmerica :
          mode === 'south-america' ? coloredSouthAmerica :
          mode === 'oceania' ? coloredOceania : {}
        fillColor = continentColored?.[regionId] ? '#4ade80' : '#f3f4f6'
      } else if (isWorldMode) {
        // 세계지도 모드: 국가 색칠 여부에 따라 색상 결정
        fillColor = coloredCountries[regionId] ? '#4ade80' : '#f3f4f6'
      } else if (!isCountyMode || !selectedState) {
        // 주 모드: 카운티 색칠 비율에 따라 색상 진하기 조정
        fillColor = getStateColor(regionId, stateFips)
      } else {
        // 카운티 모드: 주가 색칠되어 있으면 옅은 색, 직접 색칠되면 진한 색
        fillColor = getCountyColor(regionId, stateFips)
      }
      
      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          fill={fillColor}
          stroke="#6b7280"
          strokeWidth={isHovered ? 2.5 : 1.5}
          style={{
            default: {
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            },
            hover: {
              fill: (() => {
                if (isContinentMode || isWorldMode) {
                  // 대주 모드 또는 세계지도 모드
                  return fillColor === '#4ade80' ? '#22c55e' : '#e5e7eb'
                } else if (!isCountyMode || !selectedState) {
                  // 주 모드: 호버 시 약간 진한 색
                  return fillColor === '#f3f4f6' ? '#e5e7eb' : '#86efac'
                } else {
                  // 카운티 모드
                  if (fillColor === '#4ade80') {
                    // 직접 색칠된 카운티: 호버 시 더 진한 색
                    return '#22c55e'
                  } else if (fillColor === '#d1fae5') {
                    // 주만 색칠된 카운티: 호버 시 약간 진한 옅은 색
                    return '#a5f3d0'
                  } else {
                    // 색칠되지 않은 카운티
                    return '#e5e7eb'
                  }
                }
              })(),
              outline: 'none',
              cursor: 'pointer',
              transform: 'scale(1.02)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              transition: 'all 0.3s ease',
            },
            pressed: {
              outline: 'none',
              transform: 'scale(0.98)',
            },
          }}
          onClick={() => {
            if (isContinentMode || isWorldMode) {
              // 대주 모드 또는 세계지도 모드: 국가 클릭
              onRegionClick(regionId, regionName)
            } else if (!isCountyMode || !selectedState) {
              // 주 모드이거나 주 선택 중일 때는 FIPS 코드 전달
              // us-atlas 주 데이터에서 FIPS 코드 추출
              // 주 데이터의 id는 보통 숫자 2자리 (예: "06" for California)
              const geoId = geo.id || geo.properties.id || ''
              const fips = geo.properties.fips || ''
              
              let stateFips: string | undefined = undefined
              
              // fips 속성이 있으면 사용
              if (fips) {
                const fipsStr = String(fips)
                if (fipsStr.length >= 2) {
                  stateFips = fipsStr.substring(0, 2).padStart(2, '0')
                } else if (fipsStr.length > 0) {
                  stateFips = fipsStr.padStart(2, '0')
                }
              } 
              // id가 숫자 2자리면 FIPS 코드
              else if (geoId && /^\d{1,2}$/.test(String(geoId))) {
                stateFips = String(geoId).padStart(2, '0')
              }
              // id가 5자리 숫자면 첫 2자리가 주 FIPS 코드
              else if (geoId && /^\d{5}$/.test(String(geoId))) {
                stateFips = String(geoId).substring(0, 2)
              }
              
              console.log('State clicked:', regionName, 'ID:', geoId, 'FIPS:', stateFips, 'Properties:', geo.properties)
              onRegionClick(regionId, regionName, stateFips)
            } else {
              // 카운티 모드에서는 FIPS 코드 전달하지 않음
              onRegionClick(regionId, regionName)
            }
          }}
          onMouseEnter={() => {
            setHoveredRegion(regionId)
            setHoveredRegionName(regionName)
          }}
          onMouseLeave={() => {
            setHoveredRegion(null)
            setHoveredRegionName(null)
          }}
        />
      )
    })
  }

  // 타입 좁히기 문제를 피하기 위해 미리 계산
  const isCountyMode = mode === 'counties'
  const isWorldMode = mode === 'world' && !isContinentMode

  return (
    <div 
      ref={mapContainerRef}
      className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden relative border-4 border-gray-300"
    >
      <ComposableMap
        projection={(mode === 'world' || isContinentMode) ? 'geoMercator' : 'geoAlbersUsa'}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {allowZoom ? (
          <ZoomableGroup 
            center={zoomCenter || (isContinentMode ? [0, 0] : undefined)}
            zoom={zoomLevel || (isContinentMode ? 1 : 1)}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: Geo[] }) => {
                return renderGeographies(geographies, isCountyMode, isWorldMode)
              }}
            </Geographies>
          </ZoomableGroup>
        ) : (
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Geo[] }) => {
              return renderGeographies(geographies, isCountyMode, isWorldMode)
            }}
          </Geographies>
        )}
      </ComposableMap>
      
      {hoveredRegionName && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-5 py-3 rounded-2xl shadow-xl pointer-events-none z-10 border-2 border-white animate-pulse">
          <p className="text-sm font-semibold">{hoveredRegionName}</p>
        </div>
      )}
    </div>
  )
}

