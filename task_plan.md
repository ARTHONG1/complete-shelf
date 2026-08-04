# AI 교육 서가 (AI Education Shelf) 프로젝트 종합 계획 및 진행 현황

> **상태:** 완료 (Phase 1 ~ Phase 4 배포 완료, Phase 5 문서 연동 대기 중)
> **저장 위치:** `C:\Users\user\Desktop\연습\complete-shelf\task_plan.md`
> **배포 URL:** https://arthong1.github.io/complete-shelf/
> **GitHub Fork Repository:** https://github.com/ARTHONG1/complete-shelf
> **Upstream Original Repository:** https://github.com/MengTo/complete-shelf

---

## 1. 프로젝트 목표
1. MengTo의 3D Three.js 서가 프로젝트 `The Complete Shelf`를 바탕화면 `연습` 폴더에 복제 및 검증.
2. 7권의 도서 및 전체 사이트 브랜딩을 **한국어 AI 교육 서가**로 리브랜딩.
3. 원작자 표기 및 비공식 각색 고지(Attribution)를 준수하여 저작권 및 라이선스 위험 방지.
4. 사용자 GitHub 계정 (`ARTHONG1`)으로 Fork 후 **GitHub Pages**에 성공적으로 정적 배포.
5. 향후 7개 주제별 PDF/문서 보기 및 다운로드 기능 확장에 대비한 구조 완성.

---

## 2. 주요 단계 및 상태 (Phases)

| Phase | 설명 | 상태 | 주요 결과물 / 검증 |
|---|---|---|---|
| Phase 1 | 원본 복제 및 로컬 검증 | 완료 | `C:\Users\user\Desktop\연습\complete-shelf`, HTTP 200 검증 |
| Phase 2 | 리브랜딩 설계 및 테스트 작성 | 완료 | `docs/superpowers/specs/`, `tests/ai-education-copy.test.mjs` (fail -> pass) |
| Phase 3 | 한국어 AI 교육 콘텐츠 적용 | 완료 | `index.html`, `README.md`, 원작자 출처 및 고지 표기 |
| Phase 4 | GitHub Fork & Pages 배포 | 완료 | `ARTHONG1/complete-shelf`, GitHub Pages HTTP 200 (`built`) |
| Phase 5 | 책별 PDF/문서 연동 (향후) | 대기 | `documents/` 폴더에 PDF 추가 후 상세 패널 링크 구현 예정 |

---

## 3. 핵심 7권 커리큘럼 구성 (Curriculum Structure)

| 권 (Volume) | 도서 제목 | 분야 (Discipline) | 핵심 노트 (Note) | 상세 설명 (Deck) | 세부 장 (Chapters) |
|---|---|---|---|---|---|
| Volume I | **AI 기초** | 인공지능 이해 | 인공지능이 배우고 판단하는 기본 원리를 이해합니다. | 인공지능의 개념부터 학습과 추론의 차이, 생활 속 활용 사례까지 살펴보는 첫 번째 안내서입니다. | AI란 무엇인가, 학습과 추론, 생활 속 AI |
| Volume II | **생성형 AI** | 새로운 콘텐츠 생성 | 텍스트와 이미지를 만드는 AI의 가능성과 한계를 탐구합니다. | 생성형 AI가 결과를 만드는 방식과 활용 가능성, 오류와 환각을 포함한 한계, 안전한 사용 원칙을 소개합니다. | 생성 원리, 가능성과 한계, 안전한 활용 |
| Volume III | **질문 설계** | 프롬프트 작성 | 명확한 목표와 맥락으로 더 나은 질문을 설계합니다. | AI에게 원하는 결과를 설명하고 필요한 맥락을 제공하며, 결과를 검증해 질문을 개선하는 과정을 다룹니다. | 목표 설정, 맥락 제공, 검증과 개선 |
| Volume IV | **AI 리터러시** | 비판적 정보 판단 | AI의 답을 그대로 믿지 않고 근거와 편향을 확인합니다. | 출처를 확인하고 데이터와 결과에 숨어 있는 편향을 읽으며, AI 정보를 비판적으로 판단하는 역량을 기릅니다. | 출처 확인, 편향 읽기, 비판적 판단 |
| Volume V | **수업 활용** | 교수·학습 설계 | AI를 수업 목표와 학생 활동에 의미 있게 연결합니다. | 교사의 설명을 보조하고 학생의 탐구와 창작을 촉진하는 AI 활동을 수업 목표에 맞춰 설계합니다. | 수업 아이디어, 활동 설계, 학생 참여 |
| Volume VI | **평가 혁신** | 학습 과정과 피드백 | 결과뿐 아니라 사고 과정과 성장의 증거를 평가합니다. | AI 시대에 필요한 과정 중심 평가, 구체적인 피드백, 학생의 학습 증거를 확인하는 방법을 살펴봅니다. | 과정 중심 평가, 피드백, 학습 증거 |
| Volume VII | **AI 윤리** | 책임 있는 AI 사용 | 저작권과 개인정보를 지키며 AI를 책임 있게 사용합니다. | AI 활용 과정에서 발생하는 저작권, 개인정보, 공정성 문제를 이해하고 책임 있는 사용 기준을 세웁니다. | 저작권, 개인정보, 책임 있는 사용 |

---

## 4. 제약 사항 및 보존 규칙 (Constraints & Guardrails)
- **보존 요소:** CSS 레이아웃, 3D 가공 재질(Texture/Foil), Three.js 0.165.0, OrbitControls, 종이 휨 물리 애니메이션, WebGL 렌더러 설정, 접근성(ARIA) 및 reduced-motion.
- **불변 키 값:** `id`, `motifKey`, `color`, `foil`, `palette`, `width`, `height`, `depth`, `seed` 보존.
- **저작권 고지:** 하단 고지 문구 및 원본 repository 링크 (`https://github.com/MengTo/complete-shelf`) 필수 포함.

---

## 5. 오류 및 해결 이력 (Errors & Resolutions)
| 발생 상황 | 원인 | 해결 방안 |
|---|---|---|
| PowerShell 한글 경로 실행 오류 | `http.server` 실행시 한글 경로 탈출 문자 처리 문제 | Python inline 스크립트 및 `http.server --directory` 옵션 활용 |
| Git Commit 작성자 미설정 | 저장소 초기 커밋 시 작성자 이메일 없음 | `git config user.name 'ARTHONG1'`, `user.email` 로컬 설정 |
| Node REPL 자동화 브라우저 중단 | WebGL 탭 캡처 시 대용량 렌더러 소켓 세션 타임아웃/종료 | Node 내장 `node:test` 및 `Invoke-WebRequest`로 이중 백엔드 자동 검증 수행 |
