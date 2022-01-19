# Connect frontend with tailwindcss && redux thunk

## Outline

부트스트랩이 구시대 유물이 되었다는 소식을 듣고 tailwindcss로 갈아타기로 함. 잘가....

또한 각 컴포넌트에서 useState를 통해 관리되던 지역 상태를 모두 redux를 사용해 전역 상태로 만들고, 이를 위해 비동기 처리를 redux-chunk로 할 예정.

## New packages compare to previous connect frontend project

<del>

- babel-plugin-module-resolver

  - 절대 경로 import를 위해 사용
  - CRA에서는 .babelrc파일을 사용할 수 없기 때문에 아래의 패키지가 필요.(eject를 통해 사용할 수 있으나 권장되지 않음.)
  - customize-cra, react-app-rewired
  - config-overrides.js와 package.json의 scripts에서 react-app-rewired는 이 패키지를 위한 것.

</del>

- bable-plougin-module-resolver, react-app-rewired 대신 craco사용

## Others

### package.json

scripts.build의 GENERATE_SOURCEMAP=falseGENERATE_SOURCEMAP=false 설정으로 sourcemap 생성 방지

### src/services/helpers.js

log() 함수를 만들어 webpack을 건드리지 않고 build 시에 console.log가 찍히지 않게 함.

매번 import를 해야하는게 귀찮긴하다..

### css

flex-box 위주의 레이아웃을 grid로 전환

tailwindcss의 테마기능 활용

### naming rules

default: camelCase

url params : snake_case
