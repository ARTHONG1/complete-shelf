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

## 향후 작업 가이드라인 (Next Steps for User & Agent)

1. **PDF 문서 배치:**
   - `C:\Users\user\Desktop\연습\complete-shelf\documents\` 폴더 생성.
   - 7개 주제별 PDF 파일 준비 (`ai-basics.pdf`, `generative-ai.pdf`, `prompt-design.pdf` 등).
2. **상세보기 패널 (Detail Panel) 버튼 연동:**
   - `index.html` 내 책 상세보기 패널에 `[문서 읽기 (PDF)]`, `[다운로드]` 버튼 추가.
3. **업데이트 후 GitHub Push:**
   - `git add .` -> `git commit -m "feat: add PDF document links"` -> `git push origin main` 실행 시 GitHub Pages에 자동 반영.
