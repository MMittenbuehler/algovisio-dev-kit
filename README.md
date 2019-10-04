 # AlgoVisio Dev-Kit
 
 [AlgoVisio](https://algovisio.net) is a platform to visualize algorithms and data structures.
 
 This dev kit contains the foundation needed to develop AlgoVisio apps.
 
 ## Getting started

### Prerequisites

We use the package manager [npm](https://www.npmjs.com/) for the installation.
`create-algovisio-app` is used to initialize a new project.

``` bash
npm install npm@latest -g
npm install create-algovisio-app -g
```

### Installation

For installation you can simply run `create-algovisio-app` with npx and go through
the installation proccess.

``` bash
npx create-algovisio-app
```

## Usage

### Scripts

#### `npm run start` `npm run dev`

Starts a development server on [localhost:3000](http://localhost:3000).

#### `npm run build`

Creates the needed build files to create a visualization on [AlgoVisio](https://algovisio.net).

#### `npm run standalone`

Runs the dev server without the container.

### Structure

```
.
├── .next           # Temp folder used by NEXT.js
├── pages           # The pages to be rendered
    ├── _app.js       # App Wrapper 
    ├── _document.js  # Document Wrapper
    ├── _error.js     # Error page of AlgoVisio
    ├── 0.js          # Step 0
    ├── 1.js          # Step 1
    ├── 2.js          # Step 2
    ...               # Step ...
├── out             # Build files created by `npm run build`
└── scripts         # This folder contains the run scripts
```

### Rules

In order for you visualization to work the pages must be
in numeric order (i.e. 0.js, 1.js, 2.js, 3.js).

Each step in the visualization relates to one page. The starting point is always 0.js.

If a visualization would have pages 0.js, 1.js and 3.js a user could not 
reach step 3!

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

Distributed under the MIT License. See [LICENSE](https://github.com/mmittenbuehler/algovisio-dev-kit/blob/master/LICENSE.md) for more information.
