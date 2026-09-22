# 4강 · 이미지 만들기 — 학습 사이트 스캐폴드

AI 이미지 만들기 강의용 학습 페이지의 **구조 스캐폴드**입니다.
빌드 도구가 없어 `index.html` 을 더블클릭하면 바로 열리고, GitHub Pages 에 그대로 올라갑니다.

## 구조

```
picture1/
├── index.html                 화면 뼈대 (섹션 슬롯만 정의)
├── assets/
│   ├── style.css              디자인 시스템 · 다크모드 · 반응형
│   └── app.js                 데이터 → 화면 렌더러
├── content/
│   └── session-04.js          ★ 콘텐츠 — 여기만 채우면 됩니다
└── README.md
```

## 콘텐츠 채우는 법

`content/session-04.js` 의 `window.SESSION_DATA` 한 덩어리만 고치면 됩니다.
HTML·CSS·JS 는 손댈 필요가 없습니다.

- 빈 문자열 `""` 또는 빈 배열 `[]` 로 둔 섹션은 화면에
  **"아직 비어 있습니다 — `content/session-04.js` 의 `<키>` 를 채우세요"** 안내가 뜹니다.
  채워야 할 자리가 화면에서 바로 보이므로 누락이 생기지 않습니다.
- `// TODO` 주석이 달린 항목이 원문에서 옮겨 와야 할 자리입니다.
- 여러 줄 텍스트는 백틱(`` ` ``)으로 감싸면 줄바꿈이 그대로 보존됩니다.

```js
base: {
  title: "처음 쓴 문장",
  text: `첫 줄.

  빈 줄을 포함한 둘째 문단.`
}
```

## 갖춰진 기능

| 기능 | 설명 |
|---|---|
| 글자 크기 6단계 | 상단 `－ / ＋`, `localStorage` 에 저장 |
| 테마 3단계 | 자동 → 밝게 → 어둡게 순환, 저장됨 |
| 프롬프트 복사 | 모든 프롬프트 박스에 복사 버튼 (`file://` 에서도 동작) |
| 반응형 | 900px / 640px 분기, 모바일 1열 |
| 접근성 | 건너뛰기 링크, `aria-expanded`, 키보드 이동 |
| 인쇄 | 상단바·버튼 숨김, 섹션 분할 방지 |
| 모션 감소 | `prefers-reduced-motion` 존중 |

## 섹션 구성

1. **히어로** — 강사·시간·제목·부제·배지·바로가기
2. **목표** — 목표 문장 + 안내 노트(info / tip / warn)
3. **오늘 배우는 핵심** — 카드 4장
4. **학습 흐름** — 분 단위 타임라인
5. **이미지 프롬프트 쓰는 법** — 여섯 줄 프레임워크 카드
6. **겹쳐 보기** — 다른 설명 체계와의 대응표
7. **이렇게 말고, 이렇게** — 나쁜 예 / 좋은 예 대비
8. **오늘 실습** — 최초 프롬프트 + 단계별 수정 프롬프트
9. **바꿔 쓰기** — 상황별 변형 예시
10. **마무리 점검** — 체크리스트

섹션을 추가하려면 `index.html` 에 `data-slot="이름"` 을 두고,
`assets/app.js` 의 `WIRING` 배열에 렌더러를 한 줄 등록하면 됩니다.

## 로컬에서 보기

```bash
# 그냥 열기
start index.html

# 또는 로컬 서버
python -m http.server 8000
```

## 배포 (GitHub Pages)

```bash
git -C D:/DEV/picture1 push
```

저장소 **Settings → Pages → Source: `main` / `root`** 로 설정하면
`https://jungaistar.github.io/picture1/` 에 게시됩니다.

## 출처

본문 콘텐츠의 원저작권은 **DreamIT Biz · Aebon Lee, Ph.D** 에 있습니다.
원본: <https://knou.dreamitbiz.com/#/session/4>

`content/session-04.js` 의 `attribution` 항목은 화면 하단에 항상 노출되며,
**지우지 마세요.**
