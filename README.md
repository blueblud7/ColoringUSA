# 지도 컬러링 앱

인터랙티브 지도 컬러링 애플리케이션입니다. 미국 주(State) 레벨, 카운티(County) 레벨, 그리고 세계 국가(World) 레벨의 세 가지 모드를 제공합니다.

## 기능

- 🗺️ 미국 주(State) 레벨 컬러링 (50개 주)
- 🗺️ 미국 카운티(County) 레벨 컬러링 (3,143개 카운티)
- 🌍 세계 국가(World) 레벨 컬러링 (195개 국가)
- 📊 실시간 진행률 추적
- 💾 로컬 스토리지에 진행 상황 자동 저장
- 🎨 직관적인 UI/UX

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-simple-maps
- D3 Geo

## 사용 방법

1. 주(States), 카운티(Counties), 또는 세계(World) 모드를 선택합니다.
2. 지도에서 색칠하고 싶은 지역을 클릭합니다.
3. 진행률이 실시간으로 업데이트됩니다.
4. 진행 상황은 브라우저 로컬 스토리지에 자동으로 저장됩니다.
5. 카운티 모드에서는 먼저 주를 선택한 후 해당 주의 카운티를 색칠할 수 있습니다.

## GitHub Pages 배포

이 프로젝트는 GitHub Pages에 자동으로 배포됩니다.

### 배포 방법

1. GitHub 리포지토리에 코드를 푸시합니다.
2. 리포지토리 Settings > Pages로 이동합니다.
3. Source를 "GitHub Actions"로 설정합니다.
4. `main` 브랜치에 푸시하면 자동으로 빌드되고 배포됩니다.

### 리포지토리 이름 변경 시

만약 리포지토리 이름이 "Coloring"이 아니라면, `vite.config.ts`의 `base` 경로를 리포지토리 이름에 맞게 수정해야 합니다:

```typescript
base: process.env.NODE_ENV === 'production' ? '/리포지토리이름/' : '/',
```

배포 후 접속 URL: `https://사용자명.github.io/Coloring/`


