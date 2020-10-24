# Rendas

This app is a desktop standalone app for managing rent for personal use. Based on Electron, React, Bootstrap, Webpack and Electron-builder.

## Wiki
[link to docs home](docs/HOME.md)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Starts the electron processes which load the files from `build` folder. BUILD COMMAND MUST BE RAN FIRST IF ANY CHANGES TO THE CODE.

### `yarn build`

Use `webpack` to build the project. Output to `build` folder. 

### `yarn build-prod`

Use `webpack` to build the project FOR PRODUCTION. Output to `build` folder. 

### `yarn dist`

Uses electron-builder to create a distributable version of the app to the folder `dist`.

## Folder Structure

`/` : has all the config files and electron's `main.js` to run the main process.

`/src` : has all the source code. has `index.html`, `renderer.js` for electrons renderer process which loads up `react`.

`/src/components` : its where all the react components go.

`/src/backend` : its where the backend facade goes.


## Useful Links

* Articles
    * https://www.valentinog.com/blog/babel/
* Electron
    * https://www.electronjs.org/docs
    * https://github.com/electron-userland/electron-builder
* React
    * https://reactjs.org/docs/getting-started.html
    * https://create-react-app.dev/docs/getting-started
* Bootstrap
    * https://react-bootstrap.github.io/getting-started/introduction
    * https://getbootstrap.com/docs/4.0/getting-started/introduction/
* Build
    * https://webpack.js.org/
    * https://babeljs.io/
* Utils
    * https://lodash.com/docs/4.17.15
