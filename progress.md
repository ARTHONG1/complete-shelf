# AI 교육 서가 (AI Education Shelf) 작업 진행 기록 (Progress Log)

> **최종 수정:** 2026-08-04
> **저장 위치:** `C:\Users\user\Desktop\연습\complete-shelf\progress.md`

---

## 최근 커밋 이력 (Git Commit History)

- `396411f` - `docs: describe AI education adaptation` (README.md 개편 및 프로젝트 설명)
- `4bbc1c0` - `feat: rebrand shelf for AI education` (index.html 7권 한국어 AI 교육 커리큘럼 및 전역 카피 적용)
- `e747b8c` - `test: define AI education copy contract` (tests/ai-education-copy.test.mjs 카피 검증 테스트 추가)
- `14209b8` - `feat: add original author attribution` (하단 원작자 출처 고지 및 GitHub 링크 추가)
- `ac2740d` - `docs: plan AI education copy implementation` (구현 계획 문서 추가)
- `95de910` - `docs: define AI education copy design` (설계 문서 추가)
- `6ef1662` - `Publish The Complete Shelf` (Upstream 원본 최신 커밋)

---

## 검증 결과 (Verification Results)

1. **자동화 테스트 (`node --test tests/ai-education-copy.test.mjs`):**
   - `✔ uses the approved AI education brand copy` (Pass)
   - `✔ contains the approved seven-volume AI curriculum` (Pass)
   - `✔ preserves visual and interaction engine fingerprints` (Pass)
   - `✔ README identifies the adaptation and original source` (Pass)
   - 결과: 4/4 테스트 통과

2. **HTTP 정적 검증 (`Invoke-WebRequest`):**
   - 로컬 서버: `http://127.0.0.1:4178/` (HTTP 200 OK)
   - GitHub Pages 라이브: `https://arthong1.github.io/complete-shelf/` (HTTP 200 OK)
   - 인코딩 및 타이틀: `UTF-8`, `<title>AI 교육 서가 — 가르치고 배우는 일곱 권</title>` 정상 수신

3. **저장소 상태:**
   - Git Branch: `main` (Upstream: `https://github.com/MengTo/complete-shelf.git`, Origin: `https://github.com/ARTHONG1/complete-shelf.git`)
   - Working Tree: Clean (수정되거나 유실된 파일 없음)

---

## 2026-08-04 — Phase 5: Hero 스크롤 비디오 섹션 GitHub Pages 배포 완료

### 완료된 작업
1. **Node 테스트 재확인:** 4/4 통과 (`uses the approved AI education brand copy`, `contains seven-volume curriculum`, `preserves visual fingerprints`, `README identifies adaptation`)
2. **파일 무결성 확인:** `index.html` UTF-8 정상, 타이틀 `AI 교육 서가 — 가르치고 배우는 일곱 권` 확인
3. **Hero 섹션 요소 검증:** `hero-scroll-container`, `hero-bg.mp4` 소스, `initHeroScrollInteraction` JS 함수 모두 정상
4. **`.gitignore` 업데이트:** `assets/테스트.mp4`, `update_hero.js`, `update_script.js` 제외 처리
5. **Git Commit:** `c520439` — "feat: add hero scroll section with AI education video background"
6. **Git Push:** `origin main` 성공 (62MB 경고 있으나 100MB 한도 이내, 정상 업로드)
7. **GitHub Pages 빌드 확인:** `built` 상태 확인
8. **라이브 HTTP 검증:** `https://arthong1.github.io/complete-shelf/` — HTTP 200, Hero section OK, Video ref OK, Korean title OK

### 현재 배포 상태
- **라이브 URL:** https://arthong1.github.io/complete-shelf/
- **Hero 비디오:** `assets/hero-bg.mp4` (AI 교육 테마, 62MB)
- **스크롤 경험:** 350vh 스크롤 → 3단계 텍스트 전환 → 3D AI 교육 서가로 자연 연결

### 다음 단계 (Phase 6)
- `documents/` 폴더에 PDF 배치 후 책 클릭 시 읽기/다운로드 버튼 구현

---

## 2026-08-05 — Hero 섹션 최종 정리 및 재배포

### 변경 사항
1. 파티클 캔버스(hero-particle-canvas) 완전 제거 — CSS, HTML, JS 모두
2. 비디오 소스 순서 변경: `테스트.mp4` (primary) → `hero-bg.mp4` (fallback)
3. CSS 간소화: 배경색 #0b132b, opacity 0.75, transition ease-out 0.6s
4. JS 간소화: 파티클 생성/렌더링 로직 99줄 삭제, 스크롤 전환만 유지
5. 테스트 4/4 통과 확인
6. Git commit `bd655fa` → push → GitHub Pages `built` → HTTP 200 라이브 확인

### 라이브 URL
- https://arthong1.github.io/complete-shelf/

---

## 향후 작업 가이드라인 (Next Steps for User & Agent)

1. **PDF 문서 배치:**
   - `C:\Users\user\Desktop\연습\complete-shelf\documents\` 폴더 생성.
   - 7개 주제별 PDF 파일 준비 (`ai-basics.pdf`, `generative-ai.pdf`, `prompt-design.pdf` 등).
2. **상세보기 패널 (Detail Panel) 버튼 연동:**
   - `index.html` 내 책 상세보기 패널에 `[문서 읽기 (PDF)]`, `[다운로드]` 버튼 추가.
3. **업데이트 후 GitHub Push:**
   - `git add .` -> `git commit -m "feat: add PDF document links"` -> `git push origin main` 실행 시 GitHub Pages에 자동 반영.
