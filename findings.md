# AI 교육 서가 (AI Education Shelf) 기술 분석 및 수집 정보 (Findings)

> **생성 일시:** 2026-08-04
> **저장 위치:** `C:\Users\user\Desktop\연습\complete-shelf\findings.md`

---

## 1. 저장소 및 트래픽 분석

### 1.1 GitHub 저장소 정보
- **원본 저장소:** `MengTo/complete-shelf` (Star 303개, Fork 51개)
- **사용자 Fork 저장소:** `ARTHONG1/complete-shelf`
- **배포 서비스:** GitHub Pages (`main` 브랜치 `/` 루트 기준)
- **라이브 URL:** `https://arthong1.github.io/complete-shelf/`

### 1.2 배포 및 용량 / 트래픽 제한
- **전체 정적 빌드 용량:** 약 0.9 MB (907,533 Bytes, `index.html` 단일 파일에 WebP Base64 2개 내장)
- **GitHub Pages 용량 제한:** 사이트 전체 1 GB, 파일당 100 MB (권장 50 MB 이하)
- **대역폭 제한:** 월 100 GB 소프트 제한 (Soft Bandwidth Limit)
- **트래픽 감당 가능 인원 예시:**
  - 웹사이트만 방문 시: 월 약 110,000 회
  - 5MB PDF 1개 함께 이용 시: 월 약 17,000 회
  - 10MB PDF 1개 함께 이용 시: 월 약 9,000 회
  - 20MB PDF 1개 함께 이용 시: 월 약 4,900 회

---

## 2. 라이선스 및 이용 약관 조사 (Legal & Compliance)

1. **오픈소스 라이선스 유무:** 원본 `MengTo/complete-shelf`에 `LICENSE` 파일 없음 (Default Copyright 적용).
2. **GitHub Terms of Service (D.5):** 공개 저장소(Public Repository)로 올린 코드는 다른 사용자가 GitHub 상에서 Fork하는 권한을 동의한 것으로 간주함.
3. **GitHub Pages Educational Policy:** 기존 사이트를 학습/교육 목적으로 복제하는 것은 허용되나, 직접 코드를 작성/수정하고, 데이터 미수집 및 원작자와 연관이 없다는 명확한 고지(Disclaimer)를 표기해야 함.
4. **적용 조치:** 
   - `index.html` 하단에 `The Complete Shelf by MengTo를 기반으로 만든 독립적인 AI 교육용 각색입니다. 원저작자와 제휴하거나 공식적으로 연결된 프로젝트가 아닙니다. · GitHub repository` 고지 추가.
   - `README.md`에 프로젝트의 성격, 각색 목적, 원본 저작자 및 출처 명시.

---

## 3. 웹 성능 및 아키텍처 (Technical Architecture)

- **프레임워크:** No-Framework, Pure HTML/CSS/JS (Single File Architecture)
- **3D 렌더링 Engine:** Three.js v0.165.0 (`three.module.js`) + `OrbitControls.js` + `RoomEnvironment.js`
- **텍스처 생성 방식:** 
  - 표지 WebP Base64 Atlas 이미지 (711,764 Base64 문자로 내장)
  - 종이 결, 나무 결, 포일 반사, 그림자 등은 HTML5 Canvas API로 Runtime에 절차적(Procedural) 생성
- **접근성(A11y):** 키보드 탐색 (`ArrowLeft`, `ArrowRight`, `Escape`, `Tab`), ARIA roles (`dialog`, `tablist`, `aria-live="polite"`), `prefers-reduced-motion` 대응.
