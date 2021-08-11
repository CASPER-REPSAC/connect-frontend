# 간단 메모

- 최근 날짜가 위쪽

# 2021/08

## 12

- [ ] UI틀 만들기
  - [ ] 제일 바깥 container
  - [ ] 카드 적절히 정렬
  - 백엔드와 연동은 틀을 만든 후 차차 진행 예정

## 11

- [x] 공부삼아 DropdownMenu 컴포넌트 생성. nav용으로 사용 예정..

  - 사용법
    _ props: menuName=표시이름, menuLink=메뉴에서 연결할 path
    _ children: <li><Link to=path>Link name</Link></li> 형식으로 사용

- node-sass를 설치했으나 cra(create react-app)으로 만든 프로젝트에서는 v6을 사용하지 못한다고 해 v4로 설치. 지금까지 잘 사용했는데 갑자기 이런다.
- css파일을 분리해 사용하는 것이 익숙해서 그런가 styled-component가 상당히 불편하다. 나중에 styled-component를 scss로 바꾸는 과정이 필요할 것 같음.
- utils.scss를 사용하지 않는 scss파일은 그냥 컴포넌트와 같은 폴더에 놓기로 했음. 유지보수가 힘들 것 같기도 하다.
