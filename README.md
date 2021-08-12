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

> card는 activity로 변경

- 동기적 작업 공부
- card write page
  - author
  - title
  - introduce
  - content
    - planes?
  - dates(create, start, end)
  - participants
  - tags
  - type
- cardlist page
  - show card list sorted by type
  - show filterd card based on url
- card detail page
  - view_num
  - read
  - comment
- main page (dashboard)
  - profile
  - card list(maybe use cardlist page)
  - schedule
  - latest cards
- profile page
  - name
  - id
  - introduce
  - cards & comments
- reducers 작성
  - cards
  - profile
  - input managing
  - load managing
  - theme(혹은 contextApi 사용)
