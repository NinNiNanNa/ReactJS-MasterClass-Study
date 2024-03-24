# #9 NOMFLIX CLONE

## 9.0 Introduction

```bash
npm i styled-components
npm i recoil
```

```bash
├── 📁src
│   ├── App.tsx
│   ├── index.tsx
│   ├── styled.ts
│   └── theme.ts
```

## 9.1 Header part One

```bash
npm i react-router-dom@5.3.0
npm i --save-dev @types/react-router-dom
```

```bash
├── 📁src
│   ├── 📁Components (추가)
│   │   └── Header.tsx
│   ├── 📁Routes (추가)
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   └── Tv.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── styled.ts
│   └── theme.ts
```

Header.tsx에서 헤더 스타일 적용

## 9.2 Header part Two

```bash
npm i framer-motion
```

넷플릭스 svg 로고 애니메이션만들기

route 경로는 공통적으로 `/`로 시작한다.  
이러면 Router가 경로를 찾을때 항상 `/`부분에서 true를 반환하므로 path가 `/tv`라도 `/` 페이지를 렌더링 하는 문제가 있다.  
이 문제를 해결하기 위해서는 위의 코드와 같이 path가 `/`만 있는 Route는 제일 마지막에 위치해야 한다. (React-Router-Dom v5)

## 9.3 Header part Three

메뉴 클릭표시 빨간점 이동 애니메이션 만들기

검색아이콘 클릭시 검색창 표출 애니메이션 만들기

## 9.4 Header part Four

스크롤시 헤더 배경색 변경하는 애니메이션 만들기

## 9.5 Home Screen part One

```bash
npm i @tanstack/react-query
```

API 상영중인 영화목록 데이터 fetcher

[영화 API](https://developer.themoviedb.org/reference/intro/getting-started)

[상영중인 영화목록](https://developer.themoviedb.org/reference/movie-now-playing-list)

```bash
├── 📁src
│   ├── 📁Components
│   │   └── Header.tsx
│   ├── 📁Routes
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   └── Tv.tsx
│   ├── api.ts (추가)
│   ├── App.tsx
│   ├── index.tsx
│   ├── styled.ts
│   └── theme.ts
```

## 9.6 Home Screen part Two

API 상영중인 영화목록 데이터 interface 정의하기

API 상영중인 영화목록 데이터중 첫번째 데이터로 홈페이지 배너 만들기

```bash
├── 📁src
│   ├── 📁Components
│   │   └── Header.tsx
│   ├── 📁Routes
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   └── Tv.tsx
│   ├── api.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── styled.ts
│   ├── theme.ts
│   └── utils.ts (추가)
```

TheMovieDB Image가져오기  
이미지 파일명 앞에 https://image.tmdb.org/t/p/original/ 붙이기

TheMovieDB Image 사이즈 조절  
https://image.tmdb.org/t/p/w500/  
https://image.tmdb.org/t/p/w200/

## 9.7 Slider part One

API 상영중인 영화목록 데이터로 슬라이드 만들기(첫번째 데이터 제외)

## 9.8 Slider part Two

슬라이드 버그 고치기

1. 두번 연속으로 클릭할 시 뒤의 슬라이드가 먼저 나오면서 애니메이션이 엉키게된다.

   - AnimatePresence의 `onExitCompolete` : exit이 끝났을때 함수를 실행시키는 prop

2. state가 hidden인 상태로 시작해서 새로고침 하거나 Home 페이지를 클릭하면, slider가 오른쪽에서 들어온다.
   - AnimatePresence에 `initial={false}`

배너에 나온 첫번째 데이터를 제외하면 총 18개 데이터가 있다.  
여기서 한번에 6개씩 표출 = 슬라이드 총 3 묶음

```javascript
const offset = 6;
let page = 0;

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(
  offset * page,
  offset * page + offset
);
// 결과 (6) [1, 2, 3, 4, 5, 6]

page = 1;
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(
  offset * page,
  offset * page + offset
);
// 결과 (6) [7, 8, 9, 10, 11, 12]

page = 2;
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].slice(
  offset * page,
  offset * page + offset
);
// 결과 (6) [13, 14, 15, 16, 17, 18]
```

- 영화목록데이터에서 배너의 배경으로쓴 첫번째 데이터 제외 시키기
  - `data?.results.slice(1)`
- 나머지 데이터에서 6개씩 나누기
  - `.slice(offset * index, offset * index + offset)`
- 현재 index 값은 계속 증가하므로 상환값(슬라이드묶음수)에 도달하면 0으로 리셋해주기
  ```typescript
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      // 총 영화 수(배너에 첫번째 영화 한개 제외)
      const totalMovies = data?.results.length - 1;
      // 상환값(슬라이드묶음수)
      // 남는 페이지를 살릴려면 올림처리(Math.ceil()), 남는페이지 없앨려면 내림처리(Math.floor())
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  ```

슬라이드 안에 배경 이미지 넣기

- 이미지가 너무 크면 `format`으로 사이즈("w500")를 보낼 수 있다.

#### 📌 댓글참고 ) react resize

```
1. 함수 컴포넌트 하나를 만듭니다.

useWidowDimensions.tsx


import React, { useEffect, useState } from 'react';

function getWindowDimensions() {
const { innerWidth: width } = window;
return width;
}
function useWindowDimensions() {
const [windowDimensions, setWindowDimensions] = useState(
getWindowDimensions()
);
useEffect(() => {
function handleResize() {
setWindowDimensions(getWindowDimensions());
}
window.addEventListener('resize', handleResize);
return () => window.removeEventListener('resize', handleResize);
}, []);
return windowDimensions;
}

export default useWindowDimensions;

이제 width는 window의 width값을 계속 추적해요! Header에서 작성한 ScrollY처럼요!



2. Home.tsx에서 import 해옵니다
const width = useWindowDimensions();

3. const rowVariants를 삭제하고, 컴포넌트에 직접 inital,animate,exit 값을 줍니다.
initial={{ x: width + 10 }}
animate={{ x: 0 }}
exit={{ x: -width - 10 }}
```

## 9.9 Box Animations part One

슬라이드 이미지 호버시 이미지 크기 키우기

- 위로 올라가면서 이미지가 커진다.
- 첫번째와 마지막 이미지는 가장자리 기준으로 한쪽으로만 커진다.

## 9.10 Box Animations part Two

슬라이드 이미지 호버시 영화정보 부분 구현하기

## 9.11 Movie Modal

Box 클릭 시 영화정보를 볼 수 있는 모달창 구현하기

- URL 변경하기
  - `useHistory()` : 여러 route 사이를 움직일 수 있다.
    - `push()` : URL 변경

## 9.12 Movie Modal part Two

모달창 바깥영역 클릭시 모달 닫기

스크롤이 어느 위치에 있어도 가운데에 모달창 띄우기

## 9.13 Movie Modal part Three

#### String 으로 형변환

1. `String()` 으로 감싸기  
   `const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);`

2. 뒤에 `+ ""` 붙여주기  
   `const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => movie.id + "" === bigMovieMatch.params.movieId);`

#### number 로 형변환

1. 앞에 `+` 붙여주기  
   `const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => movie.id === +bigMovieMatch.params.movieId);`

#### 모달창 영화상세정보 데이터 출력하기

현재는 이미 받고 있는 API를 쓰지만 추후 더 자세한 영화정보를 위해 [영화상세정보 API](https://developer.themoviedb.org/reference/movie-details) 를 이용

## 9.14 Search Redirect

```bash
npm install react-hook-form
```

`URLSerachParams` : URL에서 특정 쿼리 문자열을 가져오거나 수정할 때 사용

```javascript
const search = new URLSearchParams("?keyword=dune&region=kr");

search.get("region");
// 'kr'
search.get("keyword");
// 'dune'
```

[검색 API](https://developer.themoviedb.org/reference/search-multi)
