// 대주별 나라 매핑 (ISO_A2 코드 기준)
export type Continent = 'asia' | 'europe' | 'africa' | 'north-america' | 'south-america' | 'oceania'

export const CONTINENT_NAMES: Record<Continent, string> = {
  'asia': '아시아',
  'europe': '유럽',
  'africa': '아프리카',
  'north-america': '북미',
  'south-america': '남미',
  'oceania': '오세아니아'
}

// ISO_A2 코드를 대주로 매핑
export const COUNTRY_TO_CONTINENT: Record<string, Continent> = {
  // 아시아
  'AF': 'asia', 'AM': 'asia', 'AZ': 'asia', 'BH': 'asia', 'BD': 'asia', 'BT': 'asia',
  'BN': 'asia', 'KH': 'asia', 'CN': 'asia', 'GE': 'asia', 'IN': 'asia', 'ID': 'asia',
  'IR': 'asia', 'IQ': 'asia', 'IL': 'asia', 'JP': 'asia', 'JO': 'asia', 'KZ': 'asia',
  'KW': 'asia', 'KG': 'asia', 'LA': 'asia', 'LB': 'asia', 'MY': 'asia', 'MV': 'asia',
  'MN': 'asia', 'MM': 'asia', 'NP': 'asia', 'KP': 'asia', 'OM': 'asia', 'PK': 'asia',
  'PH': 'asia', 'QA': 'asia', 'SA': 'asia', 'SG': 'asia', 'KR': 'asia', 'LK': 'asia',
  'SY': 'asia', 'TW': 'asia', 'TJ': 'asia', 'TH': 'asia', 'TL': 'asia', 'TR': 'asia',
  'TM': 'asia', 'AE': 'asia', 'UZ': 'asia', 'VN': 'asia', 'YE': 'asia',
  
  // 유럽
  'AL': 'europe', 'AD': 'europe', 'AT': 'europe', 'BY': 'europe', 'BE': 'europe',
  'BA': 'europe', 'BG': 'europe', 'HR': 'europe', 'CY': 'europe', 'CZ': 'europe',
  'DK': 'europe', 'EE': 'europe', 'FI': 'europe', 'FR': 'europe', 'DE': 'europe',
  'GR': 'europe', 'HU': 'europe', 'IS': 'europe', 'IE': 'europe', 'IT': 'europe',
  'LV': 'europe', 'LI': 'europe', 'LT': 'europe', 'LU': 'europe', 'MT': 'europe',
  'MD': 'europe', 'MC': 'europe', 'ME': 'europe', 'NL': 'europe', 'MK': 'europe',
  'NO': 'europe', 'PL': 'europe', 'PT': 'europe', 'RO': 'europe', 'RU': 'europe',
  'SM': 'europe', 'RS': 'europe', 'SK': 'europe', 'SI': 'europe', 'ES': 'europe',
  'SE': 'europe', 'CH': 'europe', 'UA': 'europe', 'GB': 'europe', 'VA': 'europe',
  
  // 아프리카
  'DZ': 'africa', 'AO': 'africa', 'BJ': 'africa', 'BW': 'africa', 'BF': 'africa',
  'BI': 'africa', 'CV': 'africa', 'CM': 'africa', 'CF': 'africa', 'TD': 'africa',
  'KM': 'africa', 'CG': 'africa', 'CD': 'africa', 'CI': 'africa', 'DJ': 'africa',
  'EG': 'africa', 'GQ': 'africa', 'ER': 'africa', 'SZ': 'africa', 'ET': 'africa',
  'GA': 'africa', 'GM': 'africa', 'GH': 'africa', 'GN': 'africa', 'GW': 'africa',
  'KE': 'africa', 'LS': 'africa', 'LR': 'africa', 'LY': 'africa', 'MG': 'africa',
  'MW': 'africa', 'ML': 'africa', 'MR': 'africa', 'MU': 'africa', 'MA': 'africa',
  'MZ': 'africa', 'NA': 'africa', 'NE': 'africa', 'NG': 'africa', 'RW': 'africa',
  'ST': 'africa', 'SN': 'africa', 'SC': 'africa', 'SL': 'africa', 'SO': 'africa',
  'ZA': 'africa', 'SS': 'africa', 'SD': 'africa', 'TZ': 'africa', 'TG': 'africa',
  'TN': 'africa', 'UG': 'africa', 'ZM': 'africa', 'ZW': 'africa',
  
  // 북미
  'CA': 'north-america', 'MX': 'north-america', 'US': 'north-america',
  'BZ': 'north-america', 'CR': 'north-america', 'SV': 'north-america',
  'GT': 'north-america', 'HN': 'north-america', 'NI': 'north-america',
  'PA': 'north-america', 'CU': 'north-america', 'DO': 'north-america',
  'HT': 'north-america', 'JM': 'north-america', 'BS': 'north-america',
  'BB': 'north-america', 'GD': 'north-america', 'TT': 'north-america',
  
  // 남미
  'AR': 'south-america', 'BO': 'south-america', 'BR': 'south-america',
  'CL': 'south-america', 'CO': 'south-america', 'EC': 'south-america',
  'GY': 'south-america', 'PY': 'south-america', 'PE': 'south-america',
  'SR': 'south-america', 'UY': 'south-america', 'VE': 'south-america',
  
  // 오세아니아
  'AU': 'oceania', 'NZ': 'oceania', 'FJ': 'oceania', 'PG': 'oceania',
  'SB': 'oceania', 'VU': 'oceania', 'NC': 'oceania', 'PF': 'oceania',
  'WS': 'oceania', 'TO': 'oceania', 'KI': 'oceania', 'FM': 'oceania',
  'MH': 'oceania', 'NR': 'oceania', 'PW': 'oceania', 'TV': 'oceania'
}

// ISO_A3 코드를 대주로 매핑 (ISO_A2가 없을 때 대비)
export const COUNTRY_TO_CONTINENT_A3: Record<string, Continent> = {
  // 주요 국가들만 (필요시 확장)
  'AFG': 'asia', 'CHN': 'asia', 'IND': 'asia', 'IDN': 'asia', 'JPN': 'asia',
  'KOR': 'asia', 'THA': 'asia', 'VNM': 'asia',
  'DEU': 'europe', 'FRA': 'europe', 'GBR': 'europe', 'ITA': 'europe', 'ESP': 'europe',
  'RUS': 'europe', 'NGA': 'africa', 'ZAF': 'africa', 'EGY': 'africa', 'KEN': 'africa',
  'USA': 'north-america', 'CAN': 'north-america', 'MEX': 'north-america',
  'BRA': 'south-america', 'ARG': 'south-america', 'CHL': 'south-america',
  'AUS': 'oceania', 'NZL': 'oceania'
}

export function getContinentForCountry(isoA2?: string, isoA3?: string, _countryName?: string): Continent | null {
  if (isoA2 && COUNTRY_TO_CONTINENT[isoA2]) {
    return COUNTRY_TO_CONTINENT[isoA2]
  }
  if (isoA3 && COUNTRY_TO_CONTINENT_A3[isoA3]) {
    return COUNTRY_TO_CONTINENT_A3[isoA3]
  }
  return null
}
