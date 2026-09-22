/* ============================================================
   4강 · 이미지 만들기 — 콘텐츠 데이터
   ------------------------------------------------------------
   이 파일 하나만 채우면 사이트가 완성됩니다. HTML/CSS/JS 는 건드릴 필요 없습니다.

   · 빈 문자열("")이나 빈 배열([])로 두면 해당 섹션에 "아직 비어 있습니다" 안내가 표시됩니다.
   · 여러 줄 텍스트는 백틱(`)으로 감싸면 줄바꿈이 그대로 보존됩니다.
   · TODO 표시가 달린 항목이 원문에서 옮겨 와야 할 자리입니다.
   ============================================================ */

window.SESSION_DATA = {

  /* ── 사이트 공통 ─────────────────────────────────────── */
  site: {
    title: "AI, 오늘부터 바로 씁니다",
    subtitle: "AI 실전 특강 시리즈",
    footerDesc: ""                                   // TODO: 사이트 한 줄 소개
  },

  /* 상단 메뉴 — href 는 다른 강의 페이지를 만들면 연결하세요 */
  nav: [
    { label: "About",            href: "#top" },
    { label: "1강 · 처음 써봅니다", href: "#top" },
    { label: "2강 · 읽기·정리",    href: "#top" },
    { label: "3강 · 글쓰기",       href: "#top" },
    { label: "4강 · 이미지 만들기", href: "#top" },
    { label: "5강 · 가짜 판별",    href: "#top" },
    { label: "6강 · AI 비서",     href: "#top" },
    { label: "프롬프트 학습",      href: "#framework" },
    { label: "갤러리",            href: "#practice" },
    { label: "안전수칙",          href: "#checklist" }
  ],

  /* ── 이 강의 머리말 ──────────────────────────────────── */
  meta: {
    sessionLabel: "4강",
    instructor:   "",                                // TODO: 강사명 · 소속
    duration:     "120분",
    title:        "",                                // TODO: 강의 제목
    subtitle:     ""                                 // TODO: 한 줄 부제 (진행 흐름)
  },

  /* 히어로 아래 배지 — 오늘 다루는 작업 단위 */
  badges: [
    "사진 복원",
    "프로필 보정",
    "배경 제거",
    "카드·포스터 제작"
  ],

  /* 히어로 버튼 */
  heroLinks: [
    { label: "실습 바로가기", href: "#practice" },
    { label: "여섯 줄 보기",  href: "#framework", style: "ghost" }
  ],

  /* ── 목표 ────────────────────────────────────────────── */
  goal: {
    text: "",                                        // TODO: 목표 문장
    notes: [
      // { kind: "info" | "tip" | "warn", text: "..." }
      // TODO: 안내 문구들
    ]
  },

  /* ── 오늘 배우는 핵심 (카드 4장) ─────────────────────── */
  keyPoints: [
    { title: "", body: "" },                         // TODO
    { title: "", body: "" },                         // TODO
    { title: "", body: "" },                         // TODO
    { title: "", body: "" }                          // TODO
  ],

  /* ── 학습 흐름 타임라인 ──────────────────────────────── */
  timelineNote: "120분 동안 이렇게 진행됩니다.",
  timeline: [
    // { time: "0–10", title: "도입", tag: "함께", desc: "..." }
    // TODO: 분 단위 진행 순서
  ],

  /* ── 여섯 줄 프레임워크 ──────────────────────────────── */
  /* 항목 이름과 순서는 골격이므로 그대로 두고, question·example 을 채우세요. */
  framework: {
    note: "이미지는 말한 만큼만 그려집니다. 아래 여섯 줄을 채우면 결과가 크게 달라집니다.",
    items: [
      { no: "①", name: "대상",    question: "누가 · 무엇이 중심인가?",      example: "" },  // TODO
      { no: "②", name: "장면",    question: "어디서 무엇을 하는가?",        example: "" },  // TODO
      { no: "③", name: "분위기",  question: "어떤 느낌과 색인가?",          example: "" },  // TODO
      { no: "④", name: "용도",    question: "어디에 쓸 것인가?",            example: "" },  // TODO
      { no: "⑤", name: "화면",    question: "비율 · 구도 · 여백은?",        example: "" },  // TODO
      { no: "⑥", name: "유지·제외", question: "무엇을 유지하고 무엇을 뺄까?", example: "" }   // TODO
    ],
    mnemonic: "대상 → 장면 → 분위기 → 용도 → 화면 → 유지·제외"
  },

  /* ── 다른 설명과 겹쳐 보기 (대응표) ──────────────────── */
  mapping: {
    note: "",                                        // TODO: 표 설명
    columns: ["이 수업 · 여섯 줄", "더 자세히", "부록 교안"],
    rows: [
      ["① 대상",    "", ""],                         // TODO
      ["② 장면",    "", ""],                         // TODO
      ["③ 분위기",  "", ""],                         // TODO
      ["④ 용도",    "", ""],                         // TODO
      ["⑤ 화면",    "", ""],                         // TODO
      ["⑥ 유지·제외", "", ""]                        // TODO
    ]
  },

  /* ── 이렇게 말고, 이렇게 ─────────────────────────────── */
  compare: {
    bad:  { label: "이렇게 말고", text: "", why: "" },  // TODO
    good: { label: "이렇게",      text: "", why: "" }   // TODO
  },

  /* ── 오늘 실습 ───────────────────────────────────────── */
  practice: {
    note:  "",                                       // TODO: 실습 안내
    title: "",                                       // TODO: 실습 과제 이름
    base: {
      title: "처음 쓴 문장",
      text:  ""                                      // TODO: 최초 프롬프트 전문
    },
    steps: [
      // 한 번에 끝나지 않았을 때 이어서 고친 순서
      { no: "1", title: "", desc: "", promptTitle: "이어서 쓴 문장", prompt: "" },  // TODO
      { no: "2", title: "", desc: "", promptTitle: "이어서 쓴 문장", prompt: "" },  // TODO
      { no: "3", title: "", desc: "", promptTitle: "이어서 쓴 문장", prompt: "" }   // TODO
    ]
  },

  /* ── 바꿔 쓰기 (변형 예시) ───────────────────────────── */
  variantsNote: "상황에 맞게 한 줄만 바꿔 쓰면 됩니다.",
  variants: [
    { label: "개인용", text: "" },                    // TODO
    { label: "가족용", text: "" },                    // TODO
    { label: "강사용", text: "" },                    // TODO
    { label: "기관용", text: "" },                    // TODO
    { label: "가게용", text: "" }                     // TODO
  ],

  /* ── 마무리 점검 ─────────────────────────────────────── */
  checklist: [
    // TODO: 실습 후 확인할 것들
  ],

  /* ── 푸터 ────────────────────────────────────────────── */
  footLinks: [
    {
      title: "바로가기",
      items: [
        { label: "목표",       href: "#goal" },
        { label: "학습 흐름",   href: "#timeline" },
        { label: "여섯 줄",     href: "#framework" },
        { label: "실습",       href: "#practice" }
      ]
    }
  ],

  /* ⚠ 출처·저작권 표기 — 지우지 마세요 */
  attribution: {
    text:        "© 2026 DreamIT Biz · All rights reserved. Design by Aebon, Ph.D",
    sourceLabel: "knou.dreamitbiz.com",
    sourceUrl:   "https://knou.dreamitbiz.com/#/session/4"
  }
};
