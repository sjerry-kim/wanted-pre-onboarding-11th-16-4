# 🔥 프리온보딩 인턴쉽 Week 4 개인과제 김진혜

wanted 프리온보딩 인턴쉽 4주차 과제입니다. 😊

---

## ⚙️ 설치 및 실행

### 서버

[assignment-api](https://github.com/walking-sunset/assignment-api)에서 사용하고 있습니다.
<br />
clone 한 뒤, http://localhost:4000 으로 배포해주시기 바랍니다.

### 설치 및 실행

```
git clone
npm install
npm start
```

---

## 🛠️ 사용 라이브러리 및 스택

- Language : ![React](https://img.shields.io/badge/React-blue), ![TypeScript](https://img.shields.io/badge/JavaScript-yellow)
- API : ![Axios](https://img.shields.io/badge/Axios-orange)
- Style : ![Emotion](https://img.shields.io/badge/Emotion-pink)

---

## 🗂️ 디렉토리 구조

```
📦 src
├── apis
|	├── clientApi.js
| └── search.js
├── components
|	├── AutoCompleteBox.jsx
|	├── SearchBar.jsx
| └── SearchButtonjsx
├── constants
|	├── config.js
| └── search.js
├── hooks
| └── useDebounce.js
├── pages
| └── Main.jsx
├── utils
|	├── cacheStorage.js
| └── sessionStorage.js
├── App.js
└── index.js
```

---

## ✔️ 과제 요구 사항

- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- API 호출별로 로컬 캐싱 구현

  - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
