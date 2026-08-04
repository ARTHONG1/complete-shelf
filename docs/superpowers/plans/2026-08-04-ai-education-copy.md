# AI 교육 서가 텍스트 리브랜딩 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Shelf의 시각·상호작용 코드를 그대로 유지하면서 모든 사용자 노출 문구를 한국어 AI 교육 콘텐츠로 교체한다.

**Architecture:** 단일 `index.html` 구조를 유지하고 전역 문구와 `BOOKS` 데이터의 문자열 필드만 변경한다. Node 내장 테스트로 카피 계약과 엔진 불변 조건을 검증하고, 실제 브라우저에서 전체 상호작용을 회귀 테스트한다.

**Tech Stack:** HTML, inline CSS, JavaScript ES modules, Three.js 0.165.0, Node.js 24 내장 `node:test`, Python 정적 HTTP 서버.

## Global Constraints

- 승인 설계: `docs/superpowers/specs/2026-08-04-ai-education-copy-design.md`
- CSS, 레이아웃, 이미지, 지오메트리, 팔레트, 숫자 상수, Three.js 로직을 변경하지 않는다.
- `id`, `motifKey`, `color`, `foil`, `palette`, `width`, `height`, `depth`, `seed`를 변경하지 않는다.
- `binding`, `format`, `motif`, `paletteLabel`은 실제 시각 요소를 설명하므로 값을 유지한다.
- 원본 저장소 링크 `https://github.com/MengTo/complete-shelf`를 유지한다.
- 기존 원작자 표시 CSS와 DOM은 유지하고 표시 문구만 확장한다.
- PDF 보기·다운로드와 GitHub Pages 배포는 이 계획의 범위에 포함하지 않는다.

---

### Task 1: 기존 원작자 표시 변경을 기준점으로 보존

**Files:**
- Existing modification: `index.html`

**Interfaces:**
- Consumes: 현재 작업 트리의 `.attribution` CSS와 하단 원작자 링크
- Produces: AI 교육 문구 변경 전의 독립된 Git 기준점

- [ ] **Step 1: 기존 diff가 원작자 표시만 포함하는지 확인**

Run:

```powershell
git diff --check
git diff --unified=3 -- index.html
```

Expected: `.attribution` CSS, `Original by MengTo`, 원본 GitHub 링크 추가만 표시되고 diff check는 출력 없이 종료 코드 0.

- [ ] **Step 2: 기존 원작자 표시를 별도 커밋**

```powershell
git add index.html
git commit -m "feat: add original author attribution"
```

- [ ] **Step 3: 깨끗한 기준점 확인**

Run: `git status --short --branch`

Expected: `main`이 원격보다 앞서 있고 추적되지 않은 구현 파일이나 수정 파일이 없음.

---

### Task 2: 자동 카피 계약 테스트 작성

**Files:**
- Create: `tests/ai-education-copy.test.mjs`
- Read: `index.html`
- Read: `README.md`

**Interfaces:**
- Consumes: Node.js 24의 `node:test`, `node:assert/strict`, `node:fs`
- Produces: 전역 브랜드, 7권 커리큘럼, README, 엔진 불변 조건을 검증하는 테스트

- [ ] **Step 1: 다음 실패 테스트 작성**

```javascript
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");

test("uses the approved AI education brand copy", () => {
  const required = [
    "AI 교육 서가 — 가르치고 배우는 일곱 권",
    "교사와 학습자를 위한 일곱 가지 AI 교육 주제를 인터랙티브 서가로 소개합니다.",
    "AI와 함께 가르치고 배우는 일곱 권의 안내서",
    "AI Education Edition · 2026",
    "AI 교육 서가 · 정적 카탈로그",
    "AI 교육을 위한 일곱 가지 주제",
    "AI 교육 서가 준비 중",
    "독립적인 AI 교육용 각색",
    "https://github.com/MengTo/complete-shelf"
  ];
  for (const copy of required) assert.ok(html.includes(copy), `missing: ${copy}`);
});

test("contains the approved seven-volume AI curriculum", () => {
  const curriculum = {
    "AI 기초": ["인공지능 이해", "AI란 무엇인가", "학습과 추론", "생활 속 AI"],
    "생성형 AI": ["새로운 콘텐츠 생성", "생성 원리", "가능성과 한계", "안전한 활용"],
    "질문 설계": ["프롬프트 작성", "목표 설정", "맥락 제공", "검증과 개선"],
    "AI 리터러시": ["비판적 정보 판단", "출처 확인", "편향 읽기", "비판적 판단"],
    "수업 활용": ["교수·학습 설계", "수업 아이디어", "활동 설계", "학생 참여"],
    "평가 혁신": ["학습 과정과 피드백", "과정 중심 평가", "피드백", "학습 증거"],
    "AI 윤리": ["책임 있는 AI 사용", "저작권", "개인정보", "책임 있는 사용"]
  };
  for (const [title, phrases] of Object.entries(curriculum)) {
    assert.ok(html.includes(`title: "${title}"`), `missing title: ${title}`);
    for (const phrase of phrases) assert.ok(html.includes(phrase), `missing ${title}: ${phrase}`);
  }
});

test("preserves visual and interaction engine fingerprints", () => {
  const protectedTokens = [
    "three@0.165.0",
    "OrbitControls",
    "requestAnimationFrame",
    "prefers-reduced-motion",
    "new THREE.WebGLRenderer",
    "renderer.setPixelRatio",
    "motifKey: \"brackets\"",
    "motifKey: \"paths\"",
    "motifKey: \"caret\"",
    "motifKey: \"orbits\"",
    "motifKey: \"modules\"",
    "motifKey: \"frames\"",
    "motifKey: \"compass\"",
    "seed: 11",
    "seed: 77"
  ];
  for (const token of protectedTokens) assert.ok(html.includes(token), `engine token changed: ${token}`);
});

test("README identifies the adaptation and original source", () => {
  for (const copy of [
    "# AI 교육 서가",
    "독립적인 AI 교육용 각색",
    "https://github.com/MengTo/complete-shelf",
    "AI 기초",
    "AI 윤리"
  ]) assert.ok(readme.includes(copy), `README missing: ${copy}`);
});
```

- [ ] **Step 2: 테스트가 새 문구 부재로 실패하는지 확인**

Run: `node --test tests/ai-education-copy.test.mjs`

Expected: 브랜드, 7권 커리큘럼, README 테스트가 `missing` 메시지로 실패하고 엔진 fingerprint 테스트만 통과.

- [ ] **Step 3: 실패 테스트 커밋**

```powershell
git add tests/ai-education-copy.test.mjs
git commit -m "test: define AI education copy contract"
```

---

### Task 3: 전역 브랜드·버튼·상태 문구 교체

**Files:**
- Modify: `index.html`
- Test: `tests/ai-education-copy.test.mjs`

**Interfaces:**
- Consumes: Task 2의 `uses the approved AI education brand copy` 테스트
- Produces: 한국어 전역 브랜드, 조작 안내, 접근성 상태 문구

- [ ] **Step 1: 문서 메타와 고정 HTML 문구 교체**

다음 문자열을 정확히 적용한다.

```text
<title>AI 교육 서가 — 가르치고 배우는 일곱 권</title>
meta description = 교사와 학습자를 위한 일곱 가지 AI 교육 주제를 인터랙티브 서가로 소개합니다.
Working Volumes → AI 교육 서가
Seven field guides for making → AI와 함께 가르치고 배우는 일곱 권의 안내서
Edition 02 · 2026 → AI Education Edition · 2026
Previous volume → 이전 책
Next volume → 다음 책
Open → 자세히 보기
Wheel · arrows · select → 휠 · 방향키 · 선택
Return volume to shelf → 서가로 돌아가기
Binding → 제본
Format → 판형
Theme → 주제
Motif → 모티프
Previous sample page → 이전 페이지
Next sample page → 다음 페이지
Open book → 책 열기
Close book → 책 닫기
Reset view → 시점 초기화
Working Volumes · Static catalog → AI 교육 서가 · 정적 카탈로그
Seven tools for making. → AI 교육을 위한 일곱 가지 주제
Binding the collection → AI 교육 서가 준비 중
```

- [ ] **Step 2: 하단 원작자 고지를 확장**

기존 링크와 DOM 구조를 유지하고 보이는 문구를 다음으로 바꾼다.

```text
The Complete Shelf by MengTo를 기반으로 만든 독립적인 AI 교육용 각색입니다. 원저작자와 제휴하거나 공식적으로 연결된 프로젝트가 아닙니다. · 원본 GitHub
```

- [ ] **Step 3: JavaScript가 생성하는 안내 문구를 한국어로 교체**

다음 의미와 용어로 통일한다.

```text
Selected volume N of 7 → 7권 중 N권 선택: {제목}. {한 줄 설명}
Volume {roman} → 제{roman}권
Closed → 닫힘
Click book to open → 책을 눌러 펼치세요
Page N of 5 → 5쪽 중 N쪽
Opening a closed copy → {제목} 상세 보기를 열었습니다. 표지를 드래그하거나 책 열기 버튼을 사용하세요.
returned to the shelf → {제목}을 서가로 돌려놓았습니다.
Inspection view reset → {제목}의 시점을 초기화했습니다.
WebGL fallback messages → 3D 화면을 사용할 수 없어 정적 AI 교육 카탈로그를 표시합니다.
```

- [ ] **Step 4: 정적 fallback의 일곱 제목을 AI 교육 제목으로 교체**

권 번호와 스타일 속성은 유지하고 제목만 순서대로 `AI 기초`, `생성형 AI`, `질문 설계`, `AI 리터러시`, `수업 활용`, `평가 혁신`, `AI 윤리`로 바꾼다.

- [ ] **Step 5: 브랜드 테스트 실행**

Run: `node --test --test-name-pattern="approved AI education brand copy|visual and interaction engine" tests/ai-education-copy.test.mjs`

Expected: 2 tests pass, 0 fail.

- [ ] **Step 6: 커밋**

```powershell
git add index.html
git commit -m "feat: rebrand shelf for AI education"
```

---

### Task 4: 일곱 권의 AI 교육 카피 교체

**Files:**
- Modify: `index.html`
- Test: `tests/ai-education-copy.test.mjs`

**Interfaces:**
- Consumes: 기존 `BOOKS` 객체 구조와 Task 2의 커리큘럼 테스트
- Produces: `populateDetail`, 표지 생성, 페이지 라벨이 소비하는 새 텍스트 데이터

- [ ] **Step 1: 각 책에서 문자열 필드만 다음 값으로 교체**

```javascript
const AI_COPY = [
  {
    title: "AI 기초",
    discipline: "인공지능 이해",
    note: "인공지능이 배우고 판단하는 기본 원리를 이해합니다.",
    deck: "인공지능의 개념부터 학습과 추론의 차이, 생활 속 활용 사례까지 살펴보는 첫 번째 안내서입니다.",
    theme: "AI 기초 · 원리에서 활용까지",
    chapters: ["AI란 무엇인가", "학습과 추론", "생활 속 AI"]
  },
  {
    title: "생성형 AI",
    discipline: "새로운 콘텐츠 생성",
    note: "텍스트와 이미지를 만드는 AI의 가능성과 한계를 탐구합니다.",
    deck: "생성형 AI가 결과를 만드는 방식과 활용 가능성, 오류와 환각을 포함한 한계, 안전한 사용 원칙을 소개합니다.",
    theme: "생성형 AI · 가능성과 한계",
    chapters: ["생성 원리", "가능성과 한계", "안전한 활용"]
  },
  {
    title: "질문 설계",
    discipline: "프롬프트 작성",
    note: "명확한 목표와 맥락으로 더 나은 질문을 설계합니다.",
    deck: "AI에게 원하는 결과를 설명하고 필요한 맥락을 제공하며, 결과를 검증해 질문을 개선하는 과정을 다룹니다.",
    theme: "질문 설계 · 목표에서 검증까지",
    chapters: ["목표 설정", "맥락 제공", "검증과 개선"]
  },
  {
    title: "AI 리터러시",
    discipline: "비판적 정보 판단",
    note: "AI의 답을 그대로 믿지 않고 근거와 편향을 확인합니다.",
    deck: "출처를 확인하고 데이터와 결과에 숨어 있는 편향을 읽으며, AI 정보를 비판적으로 판단하는 역량을 기릅니다.",
    theme: "AI 리터러시 · 신뢰할 수 있는 판단",
    chapters: ["출처 확인", "편향 읽기", "비판적 판단"]
  },
  {
    title: "수업 활용",
    discipline: "교수·학습 설계",
    note: "AI를 수업 목표와 학생 활동에 의미 있게 연결합니다.",
    deck: "교사의 설명을 보조하고 학생의 탐구와 창작을 촉진하는 AI 활동을 수업 목표에 맞춰 설계합니다.",
    theme: "수업 활용 · 참여하는 AI 학습",
    chapters: ["수업 아이디어", "활동 설계", "학생 참여"]
  },
  {
    title: "평가 혁신",
    discipline: "학습 과정과 피드백",
    note: "결과뿐 아니라 사고 과정과 성장의 증거를 평가합니다.",
    deck: "AI 시대에 필요한 과정 중심 평가, 구체적인 피드백, 학생의 학습 증거를 확인하는 방법을 살펴봅니다.",
    theme: "평가 혁신 · 과정과 성장의 증거",
    chapters: ["과정 중심 평가", "피드백", "학습 증거"]
  },
  {
    title: "AI 윤리",
    discipline: "책임 있는 AI 사용",
    note: "저작권과 개인정보를 지키며 AI를 책임 있게 사용합니다.",
    deck: "AI 활용 과정에서 발생하는 저작권, 개인정보, 공정성 문제를 이해하고 책임 있는 사용 기준을 세웁니다.",
    theme: "AI 윤리 · 안전하고 책임 있는 선택",
    chapters: ["저작권", "개인정보", "책임 있는 사용"]
  }
];
```

`AI_COPY` 상수를 새로 추가하지 말고, 위 값을 기존 7개 `BOOKS` 객체의 `title`, `discipline`, `note`, `deck`, `theme`, `chapters`에 직접 적용한다. 다른 필드는 수정하지 않는다.

- [ ] **Step 2: 커리큘럼 테스트 실행**

Run: `node --test --test-name-pattern="approved seven-volume AI curriculum|visual and interaction engine" tests/ai-education-copy.test.mjs`

Expected: 2 tests pass, 0 fail.

- [ ] **Step 3: diff에서 비문자열 필드 변경이 없는지 확인**

Run:

```powershell
git diff --unified=0 HEAD -- index.html
```

Expected: `title`, `discipline`, `note`, `deck`, `theme`, `chapters` 문자열 변경만 표시. `id`, `motifKey`, 색상, 팔레트, 치수, seed 변경 없음.

- [ ] **Step 4: 커밋**

```powershell
git add index.html
git commit -m "content: add seven AI education volumes"
```

---

### Task 5: README를 AI 교육용 각색 문서로 교체

**Files:**
- Modify: `README.md`
- Test: `tests/ai-education-copy.test.mjs`

**Interfaces:**
- Consumes: 승인된 브랜드와 일곱 권 제목
- Produces: 저장소 방문자가 목적·원본 관계·실행법을 이해할 수 있는 문서

- [ ] **Step 1: README를 다음 내용으로 교체**

```markdown
# AI 교육 서가

교사와 학습자를 위한 일곱 가지 AI 교육 주제를 인터랙티브 3D 서가로 소개합니다. 서가에서 책을 고르고, 상세 정보를 살펴보고, 책을 펼쳐 각 주제의 핵심 내용을 탐색할 수 있습니다.

## 일곱 가지 주제

1. AI 기초
2. 생성형 AI
3. 질문 설계
4. AI 리터러시
5. 수업 활용
6. 평가 혁신
7. AI 윤리

## 원본 프로젝트와의 관계

이 프로젝트는 MengTo의 [The Complete Shelf](https://github.com/MengTo/complete-shelf)를 기반으로 만든 독립적인 AI 교육용 각색입니다. 원저작자와 제휴하거나 공식적으로 연결된 프로젝트가 아닙니다.

원본의 Three.js 서가, 책 모델, 카메라, 조명, 애니메이션과 페이지 상호작용은 유지하고, 사용자에게 표시되는 콘텐츠를 AI 교육 주제로 교체했습니다. 원본 저장소에는 명시적인 오픈소스 라이선스가 없으므로 이 저장소는 원본에 대한 별도 라이선스 권리를 주장하지 않습니다.

## 로컬 실행

JavaScript 모듈을 사용하므로 파일을 직접 열지 말고 HTTP 서버로 실행합니다.

```bash
python -m http.server 4173
```

브라우저에서 `http://127.0.0.1:4173/`에 접속합니다. Three.js 모듈과 웹폰트를 불러오려면 인터넷 연결이 필요합니다.

## 기술 구성

- 단일 `index.html`
- Three.js 0.165.0
- 빌드 도구와 백엔드 없음
- GitHub Pages 배포 가능

## 향후 기능

- 책별 AI 교육 문서 보기
- PDF 다운로드
- 교육 자료 출처와 저작권 정보 표시
```

- [ ] **Step 2: README 테스트 실행**

Run: `node --test --test-name-pattern="README identifies" tests/ai-education-copy.test.mjs`

Expected: 1 test passes, 0 fail.

- [ ] **Step 3: 커밋**

```powershell
git add README.md
git commit -m "docs: describe AI education adaptation"
```

---

### Task 6: 전체 자동 검증과 텍스트 전용 diff 감사

**Files:**
- Verify: `index.html`
- Verify: `README.md`
- Verify: `tests/ai-education-copy.test.mjs`

**Interfaces:**
- Consumes: Tasks 2–5의 결과
- Produces: 자동 테스트와 Git diff 근거

- [ ] **Step 1: 전체 테스트 실행**

Run: `node --test tests/ai-education-copy.test.mjs`

Expected: 4 tests pass, 0 fail.

- [ ] **Step 2: 문법·공백 오류 확인**

Run:

```powershell
git diff --check origin/main...HEAD
```

Expected: 출력 없음, 종료 코드 0.

- [ ] **Step 3: 원본 대비 변경 파일 확인**

Run:

```powershell
git diff --stat origin/main...HEAD
git diff --name-only origin/main...HEAD
```

Expected: `index.html`, `README.md`, 설계·계획 문서, 테스트 파일만 표시. 이미지와 에셋 변경 없음.

- [ ] **Step 4: 보호 문자열 확인**

Run:

```powershell
rg -n 'three@0.165.0|OrbitControls|WebGLRenderer|requestAnimationFrame|prefers-reduced-motion' index.html
rg -n 'Codex|Claude Code|Cursor|Antigravity|Figma|Framer|Xcode|Working Volumes' index.html
```

Expected: 첫 명령은 기존 엔진 문자열을 찾고, 두 번째 명령은 사용자 노출 문구에서 결과가 없음.

---

### Task 7: 실제 브라우저 완주 및 반응형 회귀 테스트

**Files:**
- Verify: `index.html`

**Interfaces:**
- Consumes: 로컬 HTTP 서버와 실제 브라우저
- Produces: 시각·상호작용·접근성·콘솔 검증 결과

- [ ] **Step 1: 로컬 서버 시작**

Run: `python -m http.server 4173`

Expected: `http://127.0.0.1:4173/`이 HTTP 200으로 응답.

- [ ] **Step 2: 데스크톱 초기 화면 확인**

다음을 확인한다.

```text
사이트 이름: AI 교육 서가
첫 책: AI 기초
7개 선택 탭: AI 기초부터 AI 윤리까지
하단: 독립적인 AI 교육용 각색 고지와 원본 GitHub 링크
```

- [ ] **Step 3: 상호작용 완주**

다음 순서를 실행한다.

```text
AI 기초 → 다음 책 → 생성형 AI → 자세히 보기 → 책 열기
→ 1쪽에서 2쪽 → 3쪽 → 2쪽으로 후진
→ 책 닫기 → 서가로 돌아가기
```

Expected: 각 단계의 제목·페이지 상태가 한국어로 갱신되고 애니메이션 중단이나 포즈 점프 없음.

- [ ] **Step 4: 키보드 확인**

`ArrowLeft`, `ArrowRight`, `Escape`, Tab 포커스를 확인한다.

Expected: 이전/다음 책, 페이지 이동, 상세 닫기, 버튼 포커스가 기존과 동일하게 작동.

- [ ] **Step 5: 좁은 화면 확인**

폭 390px 화면에서 `AI 리터러시`, `평가 혁신`, 상세 설명, 하단 고지를 확인한다.

Expected: 텍스트가 잘려 의미가 사라지지 않고 버튼과 하단 고지가 겹치지 않음. CSS 수정이 필요하다면 구현을 멈추고 사용자에게 범위 확장을 요청한다.

- [ ] **Step 6: 콘솔 확인**

Expected: error 0건. 경고가 있으면 메시지와 발생 단계 기록.

- [ ] **Step 7: 최종 상태 확인**

Run: `git status --short --branch`

Expected: 계획 문서 외 구현 파일이 모두 커밋되어 작업 트리가 깨끗함.
