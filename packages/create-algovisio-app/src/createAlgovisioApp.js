import chalk from 'chalk';
import cpy from 'cpy';
import fs from 'fs';
import makeDir from 'make-dir';
import os from 'os';
import path from 'path';

import {
  shouldUseYarn, install, isFolderEmpty, getOnline,
} from './helper';

export default async function createApp({
  appPath,
  useNpm,
}) {
  const root = path.resolve(appPath);
  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = useNpm ? false : shouldUseYarn();
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  const displayedCommand = useYarn ? 'yarn' : 'npm';
  console.log(`Creating a new AlgoVisio app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'node scripts/start.js',
      build: 'next build && next export',
      start: 'node scripts/start.js',
      standalone: 'node scripts/standalone.js',
    },
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  console.log(
    `Installing ${chalk.cyan('react')}, 
        ${chalk.cyan('react-dom')}, 
        ${chalk.cyan('next')}, 
        ${chalk.cyan('express')}, 
        ${chalk.cyan('@material-ui/core')}, 
        ${chalk.cyan('@material-ui/icons')}, 
        ${chalk.cyan('@material-ui/styles')}, 
        and ${chalk.cyan('@algovisio/container')} using ${displayedCommand}...`,
  );
  console.log();

  await install(root, [
    'react',
    'react-dom',
    'next',
    'express',
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/styles',
    '@algovisio/container',
  ], { useYarn, isOnline });
  console.log();

  await cpy('**', root, {
    parents: true,
    cwd: path.join(__dirname, '..', 'templates', 'default'),
    rename: (name) => {
      switch (name) {
        case 'gitignore': {
          return '.'.concat(name);
        }
        default: {
          return name;
        }
      }
    },
  });

  let cdpath;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}dev`));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`));
  console.log('    Builds the project to be deployed on AlgoVisio.');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`,
  );
  console.log();
}
