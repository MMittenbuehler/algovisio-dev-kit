import validateProjectName from 'validate-npm-package-name';
import { execSync } from 'child_process';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import dns from 'dns';
import url from 'url';

export function validateNpmName(name) {
  const nameValidation = validateProjectName(name);
  if (nameValidation.validForNewPackages) {
    return { valid: true };
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
  };
}

export function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

export function install(
  root,
  dependencies,
  { useYarn, isOnline },
) {
  return new Promise((resolve, reject) => {
    let command;
    let args;
    if (useYarn) {
      command = 'yarnpkg';
      args = dependencies ? ['add', '--exact'] : ['install'];
      if (!isOnline) {
        args.push('--offline');
      }
      if (dependencies) {
        args.push(...dependencies);
      }
      args.push('--cwd', root);

      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'));
        console.log(chalk.yellow('Falling back to the local Yarn cache.'));
        console.log();
      }
    } else {
      command = 'npm';
      args = ([
        'install',
        dependencies && '--save',
        dependencies && '--save-exact',
        '--loglevel',
        'error',
      ].filter(Boolean).map((a) => String(a))).concat(dependencies || []);
    }

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    });
    child.on('close', (code) => {
      if (code !== 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ command: `${command} ${args.join(' ')}` });
        return;
      }
      resolve();
    });
  });
}

export function isFolderEmpty(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log',
  ];

  const conflicts = fs
    .readdirSync(root)
    .filter((file) => !validFiles.includes(file))
  // Support IntelliJ IDEA-based editors
    .filter((file) => !/\.iml$/.test(file));

  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`,
    );
    console.log();
    conflicts.forEach((file) => {
      try {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(file)}/`);
        } else {
          console.log(`  ${file}`);
        }
      } catch {
        console.log(`  ${file}`);
      }
    });
    console.log();
    console.log(
      'Either try using a new directory name, or remove the files listed above.',
    );
    console.log();
    return false;
  }

  return true;
}

function getProxy() {
  if (process.env.https_proxy) {
    return process.env.https_proxy;
  }

  const httpsProxy = execSync('npm config get https-proxy')
    .toString()
    .trim();
  return httpsProxy !== 'null' ? httpsProxy : undefined;
}

export function getOnline() {
  return new Promise((resolve) => {
    dns.lookup('registry.yarnpkg.com', (registryErr) => {
      if (!registryErr) {
        return resolve(true);
      }

      const proxy = getProxy();
      if (!proxy) {
        return resolve(false);
      }

      const { hostname } = url.parse(proxy);
      if (!hostname) {
        return resolve(false);
      }

      return dns.lookup(hostname, (proxyErr) => {
        resolve(proxyErr == null);
      });
    });
  });
}
