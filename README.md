# connect-frontend

스터디, ctf, 프로젝트 등 함께하는 활동을 관리할 수 있는 웹앱 개발 프로젝트 connect의 frontend

[메모](./zmemo/Notes.md)

## notes..

- css class naming rules: kebab-case

## stack

React

## Progress

- card UI implemented

## todo

- 동기적 작업 공부

### pages

> _기울어진 항목_ 은 컴포넌트

- [ ] ActivityPage
- [ ] ActivityDetailPage
- [ ] MainPage (dashboard)
  - _Profile_
  - _CardList_
    - recent(all)
    - recent(sorted by type)
    - my cards
  - schedule
- [ ] WritePage
- [ ] ProfilePage
  - _Profile_

### components

> url과 page는 activity로 표현하지만 component에서는 card라고 이름 붙임.

- [ ] CardLIst(or container of CardList)

  - show card list sorted by type
  - <u>show filterd card based on url</u>

- [x] CardListItem

  - author
  - title
  - introduce
  - dates(create, start, end)
  - participants
  - tags
  - type

- [ ] CardDetail extends CardListItem

  - content
    - planes?
  - view_num
  - read
  - comment

- [ ] Profile

  - name
  - id
  - introduce
  - cards & comments
  - etc...

- [ ] WriteContainer
  - introduce
  - author
  - participants
  - tags
  - plans(date + content)

### reducers

- cards
- profile
- input managing
- load managing
- theme(혹은 contextApi 사용)
