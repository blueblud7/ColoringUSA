// 대주별 나라 매핑 (ISO_A2 코드 기준)
export type Continent = 'asia' | 'europe' | 'africa' | 'north-america' | 'south-america' | 'oceania'

export const CONTINENT_NAMES: Record<Continent, string> = {
  'asia': 'Asia',
  'europe': 'Europe',
  'africa': 'Africa',
  'north-america': 'North America',
  'south-america': 'South America',
  'oceania': 'Oceania'
}

// 각 대주의 기본 중심점과 줌 레벨 (지리 좌표: [경도, 위도])
export const CONTINENT_CENTERS: Record<Continent, [number, number]> = {
  'asia': [100, 35],        // 아시아 중심 (중국 부근)
  'europe': [15, 55],       // 유럽 중심 (독일 부근)
  'africa': [20, 0],        // 아프리카 중심
  'north-america': [-100, 40],  // 북미 중심 (미국 중부)
  'south-america': [-60, -15],  // 남미 중심
  'oceania': [150, -25]     // 오세아니아 중심 (호주 부근)
}

// 각 대주의 기본 줌 레벨
export const CONTINENT_ZOOMS: Record<Continent, number> = {
  'asia': 1.2,
  'europe': 2.0,
  'africa': 1.3,
  'north-america': 1.5,
  'south-america': 1.8,
  'oceania': 2.5
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

// 나라 이름을 대주로 매핑 (world-atlas@2는 ISO 코드가 없고 이름만 있음)
const COUNTRY_NAME_TO_CONTINENT: Record<string, Continent> = {
  // 아시아
  'Afghanistan': 'asia', 'Armenia': 'asia', 'Azerbaijan': 'asia', 'Bahrain': 'asia', 'Bangladesh': 'asia',
  'Bhutan': 'asia', 'Brunei': 'asia', 'Cambodia': 'asia', 'China': 'asia', 'Georgia': 'asia',
  'India': 'asia', 'Indonesia': 'asia', 'Iran': 'asia', 'Iraq': 'asia', 'Israel': 'asia',
  'Japan': 'asia', 'Jordan': 'asia', 'Kazakhstan': 'asia', 'Kuwait': 'asia', 'Kyrgyzstan': 'asia',
  'Laos': 'asia', 'Lebanon': 'asia', 'Malaysia': 'asia', 'Maldives': 'asia', 'Mongolia': 'asia',
  'Myanmar': 'asia', 'Nepal': 'asia', 'North Korea': 'asia', 'Oman': 'asia', 'Pakistan': 'asia',
  'Palestine': 'asia', 'Philippines': 'asia', 'Qatar': 'asia', 'Saudi Arabia': 'asia', 'Singapore': 'asia',
  'South Korea': 'asia', 'Sri Lanka': 'asia', 'Syria': 'asia', 'Taiwan': 'asia', 'Tajikistan': 'asia',
  'Thailand': 'asia', 'Timor-Leste': 'asia', 'Turkey': 'asia', 'Turkmenistan': 'asia', 'United Arab Emirates': 'asia',
  'Uzbekistan': 'asia', 'Vietnam': 'asia', 'Yemen': 'asia',
  
  // 유럽
  'Albania': 'europe', 'Andorra': 'europe', 'Austria': 'europe', 'Belarus': 'europe', 'Belgium': 'europe',
  'Bosnia and Herzegovina': 'europe', 'Bulgaria': 'europe', 'Croatia': 'europe', 'Cyprus': 'europe', 'Czech Republic': 'europe',
  'Denmark': 'europe', 'Estonia': 'europe', 'Finland': 'europe', 'France': 'europe', 'Germany': 'europe',
  'Greece': 'europe', 'Hungary': 'europe', 'Iceland': 'europe', 'Ireland': 'europe', 'Italy': 'europe',
  'Latvia': 'europe', 'Liechtenstein': 'europe', 'Lithuania': 'europe', 'Luxembourg': 'europe', 'Malta': 'europe',
  'Moldova': 'europe', 'Monaco': 'europe', 'Montenegro': 'europe', 'Netherlands': 'europe', 'North Macedonia': 'europe',
  'Norway': 'europe', 'Poland': 'europe', 'Portugal': 'europe', 'Romania': 'europe', 'Russia': 'europe',
  'San Marino': 'europe', 'Serbia': 'europe', 'Slovakia': 'europe', 'Slovenia': 'europe', 'Spain': 'europe',
  'Sweden': 'europe', 'Switzerland': 'europe', 'Ukraine': 'europe', 'United Kingdom': 'europe', 'Vatican City': 'europe',
  
  // 아프리카
  'Algeria': 'africa', 'Angola': 'africa', 'Benin': 'africa', 'Botswana': 'africa', 'Burkina Faso': 'africa',
  'Burundi': 'africa', 'Cape Verde': 'africa', 'Cameroon': 'africa', 'Central African Republic': 'africa', 'Chad': 'africa',
  'Comoros': 'africa', 'Congo': 'africa', 'Democratic Republic of the Congo': 'africa', 'Ivory Coast': 'africa', 'Djibouti': 'africa',
  'Egypt': 'africa', 'Equatorial Guinea': 'africa', 'Eritrea': 'africa', 'Eswatini': 'africa', 'Ethiopia': 'africa',
  'Gabon': 'africa', 'Gambia': 'africa', 'Ghana': 'africa', 'Guinea': 'africa', 'Guinea-Bissau': 'africa',
  'Kenya': 'africa', 'Lesotho': 'africa', 'Liberia': 'africa', 'Libya': 'africa', 'Madagascar': 'africa',
  'Malawi': 'africa', 'Mali': 'africa', 'Mauritania': 'africa', 'Mauritius': 'africa', 'Morocco': 'africa',
  'Mozambique': 'africa', 'Namibia': 'africa', 'Niger': 'africa', 'Nigeria': 'africa', 'Rwanda': 'africa',
  'São Tomé and Príncipe': 'africa', 'Senegal': 'africa', 'Seychelles': 'africa', 'Sierra Leone': 'africa', 'Somalia': 'africa',
  'South Africa': 'africa', 'South Sudan': 'africa', 'Sudan': 'africa', 'Tanzania': 'africa', 'Togo': 'africa',
  'Tunisia': 'africa', 'Uganda': 'africa', 'Zambia': 'africa', 'Zimbabwe': 'africa',
  
  // 북미
  'Canada': 'north-america', 'Mexico': 'north-america', 'United States of America': 'north-america',
  'Belize': 'north-america', 'Costa Rica': 'north-america', 'El Salvador': 'north-america',
  'Guatemala': 'north-america', 'Honduras': 'north-america', 'Nicaragua': 'north-america',
  'Panama': 'north-america', 'Cuba': 'north-america', 'Dominican Republic': 'north-america',
  'Haiti': 'north-america', 'Jamaica': 'north-america', 'Bahamas': 'north-america',
  'Barbados': 'north-america', 'Grenada': 'north-america', 'Trinidad and Tobago': 'north-america',
  
  // 남미
  'Argentina': 'south-america', 'Bolivia': 'south-america', 'Brazil': 'south-america',
  'Chile': 'south-america', 'Colombia': 'south-america', 'Ecuador': 'south-america',
  'Guyana': 'south-america', 'Paraguay': 'south-america', 'Peru': 'south-america',
  'Suriname': 'south-america', 'Uruguay': 'south-america', 'Venezuela': 'south-america',
  
  // 오세아니아
  'Australia': 'oceania', 'New Zealand': 'oceania', 'Fiji': 'oceania', 'Papua New Guinea': 'oceania',
  'Solomon Islands': 'oceania', 'Vanuatu': 'oceania', 'New Caledonia': 'oceania', 'French Polynesia': 'oceania',
  'Samoa': 'oceania', 'Tonga': 'oceania', 'Kiribati': 'oceania', 'Micronesia': 'oceania',
  'Marshall Islands': 'oceania', 'Nauru': 'oceania', 'Palau': 'oceania', 'Tuvalu': 'oceania',
  // 추가 오세아니아 국가들 (다른 이름으로 표시될 수 있음)
  'American Samoa': 'oceania', 'Cook Islands': 'oceania', 'Guam': 'oceania', 'Niue': 'oceania',
  'Northern Mariana Islands': 'oceania', 'Pitcairn Islands': 'oceania', 'Tokelau': 'oceania', 'Wallis and Futuna': 'oceania'
}

export function getContinentForCountry(isoA2?: string, isoA3?: string, countryName?: string): Continent | null {
  // ISO 코드로 먼저 시도
  if (isoA2 && COUNTRY_TO_CONTINENT[isoA2]) {
    return COUNTRY_TO_CONTINENT[isoA2]
  }
  if (isoA3 && COUNTRY_TO_CONTINENT_A3[isoA3]) {
    return COUNTRY_TO_CONTINENT_A3[isoA3]
  }
  
  // 나라 이름으로 시도 (world-atlas@2는 이름만 있음)
  if (countryName) {
    const normalizedName = countryName.trim()
    // 정확한 매칭
    if (COUNTRY_NAME_TO_CONTINENT[normalizedName]) {
      return COUNTRY_NAME_TO_CONTINENT[normalizedName]
    }
    // 부분 매칭 (예: "United States" -> "United States of America")
    for (const [name, continent] of Object.entries(COUNTRY_NAME_TO_CONTINENT)) {
      if (normalizedName.includes(name) || name.includes(normalizedName)) {
        return continent
      }
    }
  }
  
  return null
}
