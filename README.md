# 🔥 프리온보딩 인턴쉽 Week 4 개인과제 김진혜

|                                                            프로젝트 개발자                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/sjerry-kim/Portfolio_Academy_ARCO/assets/112137364/23130bde-b5ff-48c3-bfd9-45a1e8bebe07" width="160px" /> |
|                                                             [ 🙋🏻‍♀️ FE 진혜 ]                                                             |
|                                                                                                                                        |

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

## ✔️ 과제 요구 사항

- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- API 호출별로 로컬 캐싱 구현

  - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

---

## 데모

![화면-기록-2023-07-19-오후-11 34 49](https://github.com/sjerry-kim/Portfolio_TodaysNovel/assets/112137364/6e16c0d8-d1c4-4b0f-a95e-56e2b66f2407)

## 👊🏻 구현 기능 설명

### API 캐싱

- 처음 검색한 키워드의 경우 : try-catch문에서 axios로 api를 받아오고, setCache(requestUrl, data) 함수를 통해 cacheStorage에 저장함.
  - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정하였음.
- 처음 검색하는 키워드가 아닌 경우 : getCache(requestUrl)함수를 사용해 cacheStrorage에 동일한 데이터가 있는지 If문을 통해 확인한 후, 저장해둔 값을 리턴해줌.

```javascript
// src/apis/search.js

import { API_STRING, ERROR_MESSAGE } from "../constants/config";
import { getCache, setCache } from "../utils/cacheStorage";
import client from "./clientApi";

export const searchAPI = async (q) => {
  const config = {
    params: {
      q,
    },
  };

  const requestUrl = new URLSearchParams(config.params).toString();
  const cachedData = await getCache(requestUrl);

  if (config.params.q === "") return [];

  if (cachedData) return cachedData.json();

  try {
    const { data } = await client.get(API_STRING, config);
    console.info("calling api");
    setCache(requestUrl, data);
    return data;
  } catch (err) {
    alert(ERROR_MESSAGE);
  }
};
```

```javascript
// src/utils/cacheStorage.js

export const setCache = async (url, data) => {
  const cache = await caches.open("cacheStorage");
  const responseData = new Response(JSON.stringify(data));
  cache.put(url, responseData);
};

export const getCache = async (url) => {
  const cache = await caches.open("cacheStorage");
  const cachedData = await cache.match(url);
  return cachedData;
};
```

### Debounce

- onChange 발생마다 api가 호출되는 비효율을 저지하기 위해 useDebounce 훅을 만들어 사용함.
- 유저가 한 단어를 모두 입력하였을 때 api가 호출됨.

```javascript
// src/hooks/useDebounce.js

import { useEffect, useState } from "react";

const useDebounce = (value, delay = 300) => {
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedText;
};

export default useDebounce;
```

### 추천 검색어 키보드 이동 기능

- 사용법
  - 검색창에 단어를 입력한 후, 키보드 방향키 `↑`, `↓` 로 추천 검색어를 이동할 수 있음.
  - `Enter` 키를 사용하여 추천검색어를 검색할 수 있음(최근 검색어에 추가됨).
- keydown 이벤트 등록, 해제를 uesEffect로 구현함.
- handleKeyEvent 함수를 사용하여 keydown 이벤트를 구성하였음.
  - key 이벤트의 isComposing으로 한글 검색 시 이벤트가 중복 호출되는 현상을 방지함.

```javascript
// src/components/AutoCompleteBox.jsx

useEffect(() => {
  window.addEventListener("keydown", handleKeyEvent);
  return () => {
    window.removeEventListener("keydown", handleKeyEvent);
  };
});

const handleKeyEvent = (e) => {
  const autoLength = autocompleteArray?.length;
  if (!isFocused) return;
  if (e.isComposing) return;
  if (e.key === "ArrowDown") {
    setSelectedIndex((prev) => Math.min(prev + 1, autoLength - 1));
    setKeyEventWord(autocompleteArray[selectedIndex + 1]?.sickNm);
  }
  if (e.key === "ArrowUp") {
    setSelectedIndex((prev) => Math.max(prev - 1, -1));
    setKeyEventWord(autocompleteArray[selectedIndex - 1]?.sickNm);
  }
  if (e.key === "Enter") {
    setSession(keyEventWord);
  }
};
```
