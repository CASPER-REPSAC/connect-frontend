# Connect-frontend

스터디, ctf, 프로젝트 등 함께하는 활동을 관리할 수 있는 웹앱 개발 프로젝트 connect의 frontend 입니다.
현재 TWC-RT 브랜치에서 새롭게 공사 중입니다. (Tailwind css, Redux thunk) 사용

## Stack

### OS

* Ubuntu 20.04

### Runtime

* Nodejs 16.13.0

### Framework

* React 17.0.2

(리액트가 프레임워크인지 라이브러리인지 의견이 분분하지만 일단 프레임워크라고 씁니다)

### Package Manager
* yarn 1.22.17

## Initial setting

```

$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo npm -g install n
$ sudo npm -g install yarn
$ sudo n stable

```

1. 처음 nodejs 설치시 10.*.* 버전이 설치됨
2. npm을 통해 n 설치 후 n stable 명령어로 nodejs를 현재 stable 버전인 16.13.0으로 업그레이드
3. npm을 통해 yarn 설치

```

$ git clone https://github.com/CASPER-REPSAC/connect-frontend.git
$ cd connect-frontend
$ yarn install

```
