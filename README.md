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

## Defference from previous connect frontend project

This project has been refactor from [last one](https://github.com/CASPER-REPSAC/connect-frontend/tree/Bootstrap) (using react-bootstrap for css library, and good-all useState for state managing). Now it uses `TailwindCSS`, `redux` and `redux-thunk`. Planning to add `code spliting` & `SSR` ASAP.

## Others

### naming convention

default: camelCase

url params, api functions : snake_case
