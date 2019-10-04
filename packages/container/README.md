# AlgoVisio Container

This is a container simulating the environment in which a [AlgoVisio App](https://algovisio.net) runs.

## Getting Started

We recommend that you use our [Create AlgoVisio App](https://github.com/MMittenbuehler/algovisio-dev-kit/packages/create-algovis-app) 
if you want to create a development environment.

### Prerequisites

A package manager like [npm](https://www.npmjs.com/) is required.

``` bash
npm install npm@latest -g
```

### Installing

To add this package to your project run:

```
npm install @algovisio/container
```


If you want to edit this project, you first have to clone it to your desktop and then
run in the root directory:

```bash
npm install
```

## Scripts

### `npm run start`

Starts a server hosting the build container on port 3000. You can access it
via [localhost:3000](http://localhost:3000). It expects a visualization to be hosted
on port 3001.

### `npm run dev`

Like npm run, just that it compiles the code just in time. We recommend to `build` and then `start` instead of using `dev`.

### `npm run build`

Builds the package. It puts the compiled Container in the out folder and the compiled `src` into `dist`.

### `npm run lint`

Runs eslint in auto-fix mode.

### `npm run test`

Currently there are no tests specified :(

## Built With

* [React](https://reactjs.org/) - Framework
* [Next.js](https://nextjs.org/) - SSR framework
* [Express](https://expressjs.com/) - NodeJS Server
* [Material-UI](https://material-ui.com/) - Design Framework
* [NPM](https://www.npmjs.com/) - Dependency Management

## Authors

* **Marcel Mittenbühler** - *Initial work* - [MMittenbuehler](https://github.com/MMittenbuehler)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
