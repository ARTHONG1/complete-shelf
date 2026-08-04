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
