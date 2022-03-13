# Connect-frontend

Web application project for managing Changwon Univercity's security club `Casper`'s activities.

## Stack

### Runtime

- Nodejs 16.13.0

### Framework

- React 17.0.2

### Package Manager

- yarn 1.22.17

## Initial setting

```bash

sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm -g install n
sudo npm -g install yarn
sudo n stable

git clone https://github.com/CASPER-REPSAC/connect-frontend.git
cd connect-frontend
yarn install

```

## New packages compare to previous connect frontend project

This project has been refactor from last one(using react-bootstrap for css library, and good-all useState for state managing). Now it use `TailwindCSS`, `redux` and `redux-thunk`. Planning to add `code spliting` & `SSR` ASAP.

Here are more information about some libraries used in this project.

- craco : For webpack settings.
- <del> bable-plougin-module-resolver, react-app-rewired</del> : moved to craco

## Others

### naming convention

default: camelCase

url params, api functions : snake_case
