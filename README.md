# pre-onboarding-11th-4

원티드 프리온보딩 인턴십 4주차 개인 과제 | 임상실험 검색 사이트 웹 서비스 개발

7.17 ~ 7.19 약 3일 진행

## [배포 사이트](https://main--idyllic-axolotl-bc9f8d.netlify.app/)

## 목차

### [⛳️ 시작 방법](https://github.com/Hyeondoonge/pre-onboarding-11th-4#%EF%B8%8F-%EC%8B%9C%EC%9E%91-%EB%B0%A9%EB%B2%95-1)

### [⚒️ 기술 스택](https://github.com/Hyeondoonge/pre-onboarding-11th-4#%EF%B8%8F-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-1)

### [✨ 주요 기능](https://github.com/Hyeondoonge/pre-onboarding-11th-4#-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-1)

- [필수 기능](https://github.com/Hyeondoonge/pre-onboarding-11th-4#%ED%95%84%EC%88%98-%EA%B8%B0%EB%8A%A5)
- [개인 추가 기능](https://github.com/Hyeondoonge/pre-onboarding-11th-4#%EA%B0%9C%EC%9D%B8-%EC%B6%94%EA%B0%80-%EA%B8%B0%EB%8A%A5)

### [？ 고민했던 부분](https://github.com/Hyeondoonge/pre-onboarding-11th-4#-%EA%B3%A0%EB%AF%BC%ED%96%88%EB%8D%98-%EB%B6%80%EB%B6%84-1)

- [API 호출별로 로컬 캐싱 구현](https://github.com/Hyeondoonge/pre-onboarding-11th-4#api-%ED%98%B8%EC%B6%9C%EB%B3%84%EB%A1%9C-%EB%A1%9C%EC%BB%AC-%EC%BA%90%EC%8B%B1-%EA%B5%AC%ED%98%84---cacherepository)
- [입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행](https://github.com/Hyeondoonge/pre-onboarding-11th-4#%EC%9E%85%EB%A0%A5%EB%A7%88%EB%8B%A4-api-%ED%98%B8%EC%B6%9C%ED%95%98%EC%A7%80-%EC%95%8A%EB%8F%84%EB%A1%9D-api-%ED%98%B8%EC%B6%9C-%ED%9A%9F%EC%88%98%EB%A5%BC-%EC%A4%84%EC%9D%B4%EB%8A%94-%EC%A0%84%EB%9E%B5-%EC%88%98%EB%A6%BD-%EB%B0%8F-%EC%8B%A4%ED%96%89---usedebounce)
- [키보드만으로 추천 검색어들로 이동 가능](https://github.com/Hyeondoonge/pre-onboarding-11th-4#%ED%82%A4%EB%B3%B4%EB%93%9C%EB%A7%8C%EC%9C%BC%EB%A1%9C-%EC%B6%94%EC%B2%9C-%EA%B2%80%EC%83%89%EC%96%B4%EB%93%A4%EB%A1%9C-%EC%9D%B4%EB%8F%99-%EA%B0%80%EB%8A%A5---result)

## ⛳️ 시작 방법

1. 클라이언트 실행 환경을 세팅합니다.

### Clone

```
$ https://github.com/Hyeondoonge/pre-onboarding-11th-4.git
```

### 환경 설정

- .env 파일을 프로젝트 최상단에 생성 후, 아래 코드를 입력해주세요

```
REACT_APP_API_END_POINT = http://localhost:4000
```

### Install & Start

```
$ npm install && npm start
```

### Build

```
$ npm build
```

2. API 서버 실행 환경을 세팅합니다. 자세한 건 아래의 레포지토리를 참고 부탁드립니다.

- https://github.com/walking-sunset/assignment-api

## ⚒️ 기술 스택

- React.js
- typescript
- styled-components
- axios

## ✨ 주요 기능

### 필수 기능

- API 요청 응답에 대한 로컬 캐싱 구현
- debounce를 사용해 UX 개선 및 불필요한 통신 비용 발생 문제 개선
- 위, 아래 방향키 입력 시 검색어를 탐색할 수 있는 기능 구현

### 개인 추가 기능

- ErrorBoundary를 적용해 검색 API 요청 중 에러 발생 시 전체 UI가 깨지지 않도록 에러 핸들링
  - API 주소가 바르지 않거나, API 서버가 작동하지 않는 등의 상황에서 확인가능합니다
- keyword 상태를 관리하는 Context 활용해 props drilling 문제 해결
  - 컴포넌트가 구조가 복잡해지면서 분리가 필요하게 되면서 props를 연쇄적으로 전달하면서 코드 품질이 저하되고 관리가 어려운 문제가 있었습니다.
  - react에서 제공하는 Context API를 이용해 keyword 상태를 관리함으로서, 하위 컴포넌트에서 보다 유연하게 접근하여 사용할 수 있었습니다.
- 검색창 외부 클릭시, 검색창 닫히도록 구현
  - 이벤트 전파 개념을 활용해 이벤트 발생을 제어함으로서 달성했습니다. useFloating훅을 이용해 floating 상태를 관리하여 코드 품질을 개선했습니다.
- 테마 컨텍스트를 정의하여 라이트/다크 모드 구현
  - 화면 오른쪽 상단의 아이콘(해/달)을 눌러 확인가능합니다

## ？ 고민했던 부분

### API 호출별로 로컬 캐싱 구현 ([< > CacheRepository](https://github.com/Hyeondoonge/pre-onboarding-11th-4/blob/devleop/src/repositories/CacheRepository.ts))

**1. 캐싱된 데이터를 관리할 저장소를 구현하기 위한 도구: object vs ☑️ class**

object는 구현하기 쉽다는 장점이 있지만, 다른 모듈에서 쉽게 수정할 수 있어 그에 따라 데이터 변경이 어디서 일어나는지 파악이 어렵다는 단점이 있습니다.
class로 구현하면 object 보다는 코드를 더 작성해야되지만, private 하게 데이터를 관리할 수 있는 기능을 지원합니다.

따라서 데이터를 프라이빗하게 관리할 수 있는 장점을 가진 class를 선택했습니다.

**2. 데이터 저장 위치: 앱 vs ☑️ local storage**

여러 경우의 수에 대해 고민했습니다. 앱에 저장하는 것은 외부 요소의 영향을 받지 않아 예측가능합니다. 하지만 서비스를 끄게되면 데이터도 소멸됩니다.

Local storage에 저장할 경우 서비스를 나갔다와도 캐싱 데이터를 제공할 수 있습니다. 하지만 local storage에 직접 접근해 수정할 수 있는 단점이 있습니다.

외부 요소인 local storage의 기능이 변화한다고해도 영향을 받는 코드를 최소화하고 코드를 조금 더 작성해서 안정성을 보장함으로서, 서비스를 껐다 켜도 데이터를 유지하여 좋은 UX를 제공하기위해 local storage를 선택했습니다.

**3. 무결성 보장**

직접 접근해서 수정하는 경우가 있을 수 있습니다. 이를 대비해 데이터의 형식을 확인하여 옳은 값을 가져오도록 했습니다.
크게 Null 인지, 데이터 형식이 옳은지, 유효기간이 지나지 않았는지를 검사하도록 구현했습니다.

---

### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행 ([< > useDebounce](https://github.com/Hyeondoonge/pre-onboarding-11th-4/blob/devleop/src/hooks/useDebounce.ts))

연속된 입력이 발생할 경우 불필요한 통신 비용이 발생할 수 있습니다. 이러한 상황에서 사용할 수 있는 debounce 기법을 이용했습니다.
추상화를 위해 훅으로 분리했습니다.

---

### 키보드만으로 추천 검색어들로 이동 가능 ([< > Result](https://github.com/Hyeondoonge/pre-onboarding-11th-4/blob/devleop/src/components/Result/Result.tsx))

window 객체에 아래 keydown 이벤트에 핸들러를 바인딩했습니다. 이벤트는 Result 컴포넌트가 떠있을 때 동작하며 언마운트시 이벤트도 함께 제거됩니다.

위, 아래 방향키 입력 시 현재 포커스된 아이템을 변경합니다. 이때, 현재 입력된 키워드도 포커스 된 아이템에 맞게 변경됩니다.

```typescript
const handleKeydown = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      if (event.key === 'ArrowUp') {
        updateFocusedItem(selectedIndex - 1 <= -1 ? RESULT_LENGTH - 1 : selectedIndex - 1);
      } else if (event.key === 'ArrowDown') {
        updateFocusedItem(selectedIndex + 1 === RESULT_LENGTH ? 0 : selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [selectedIndex, RESULT_LENGTH]);
```
