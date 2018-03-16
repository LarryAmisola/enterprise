#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies, function-paren-newline,
  no-console, no-restricted-syntax, no-continue, no-loop-func, prefer-template */

/**
 * @fileoverview This script does:
 * 1. Coverts components jsdoc comments into html
 * 2. Converts their self-named markdown files into html string
 * (both of these pieces of data are stored in an global object
 * for each component)
 * 3. Pending the "--site" flag specified, it writes each component in the object as:
 *   - HTML files in static/ for local serving (this is the default)
 *   or
 *   - JSON files in dist/, zips them, and POSTs them to the specified
 *     ids-website server
 *
 * @example `node ./build/deploy-documentation.js`
 *
 * Flags:
 * --dry-run       - Run the script, skipping POSTing to the api
 * --site=[server] - Deploy to specific server (defaults to "local"):
 *                   [local, local_debug, staging, prod]
 * --test-mode     - Run the script on a few components
 * --verbose       - Log all details
 *
 * NOTE: More than likely there is a command in the package.json
 * to run this script with NPM.
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
const archiver = require('archiver');
const argv = require('yargs').argv;
const chalk = require('chalk');
const del = require('del');
const documentation = require('documentation');
const frontMatter = require('front-matter');
const fs = require('fs');
const glob = require('glob');
const marked = require('marked');
const path = require('path');
const yaml = require('js-yaml');

// Set Marked options
marked.setOptions({
  gfm: true,
  highlight: function (code, lang, callback) {
    return require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, (err, result) => {
      callback(err, result.toString());
    });
  }
});

// -------------------------------------
//   Constants
// -------------------------------------
const idsWebsitePath = 'docs/ids-website';
const localWebsitePath = 'docs/local-website';
const rootPath = process.cwd();
const paths = {
  components:  `${rootPath}/components`,
  src:         `${rootPath}/${idsWebsitePath}`,
  static:      `${paths.rootPath}/${paths.localWebsitePath}`,
  dist:        `${rootPath}/${idsWebsitePath}/dist`,
  distDocs:    `${rootPath}/${idsWebsitePath}/dist/docs`
};
const jsonTemplate = {
  title: '',
  description: '',
  body: '',
  api: ''
};
const serverUris = {
  static: paths.static,
  local: 'http://localhost/api/docs/',
  localDebug: 'http://localhost:9002/api/docs/',
  staging: 'http://staging.design.infor.com/api/docs/',
  prod: 'https://design.infor.com/api/docs/'
};
const packageJson = require(`${rootPath}/publish/package.json`);
const testComponents = [
  'button',
  'datagrid'
];

// -------------------------------------
//   Variables
// -------------------------------------
const allDocsObj = {};
let componentStats = {
  numDocumented: 0,
  numConverted: 0,
  numWritten: 0,
  numSkipped: 0,
  total: 0,
};
const deployTo = 'static';
const stopwatch = {};
let numArchivesSent = 0;

// -------------------------------------
//   Main
// -------------------------------------
logTaskStart('deploy');

if (arvg.site)

const setupPromises = [
  cleanAll(),
  compileSupportingDocs(),
  compileComponents()
];

Promise.all(setupPromises)
  .catch(err => {
    console.error(chalk.red('Error!'), err);
  })
  .then(values => {
    logTaskStart('writing files');

    let writePromises = [writeSitemapToDist()];
    for (compName in allDocsObj) {
      if (argv.site === 'static') {
        writePromises.push(writeHtmlFile(compName));
      } else {
        writePromises.push(writeJsonFile(compName));
      }
    }

    Promise.all(writePromises)
      .catch(err => {
        console.error(chalk.red('Error!'), err);
      })
      .then(values => {
        logTaskEnd('writing files');
        zipAndDeploy();
      });
  });


// -------------------------------------
//   Functions
// -------------------------------------

/**
 * Compiled the component's MD and DocJS
 * @return {Promise}
 */
function compileComponents() {
  return new Promise((resolve, reject) => {

    logTaskStart('component documentation');
    let compPromises = [];
    let compName = '';

    glob(`${paths.components}/*/`, (err, componentDirs) => {
      componentStats.total = componentDirs.length;

      for (compDir of componentDirs) {
        compName = deriveComponentName(compDir);

        // For testing to only get one or two components
        if (argv.testMode && !testComponents.includes(compName)) continue;

        if (!documentationExists(compName)) {
          logTaskAction('Skipping', compName, 'yellow');
          componentStats.numSkipped++;
          continue;
        }

        allDocsObj[compName] = Object.assign({}, jsonTemplate, {
          title: compName,
          description: 'All about ' + compName,
        });

        // note: comp path includes an ending "/"
        compPromises.push(documentJsToHtml(compName));
        compPromises.push(markdownToHtml(`${compDir}${compName}.md`));
      }

      Promise.all(compPromises)
        .catch(err => {
          reject(err.message)
        })
        .then(values => {
          logTaskEnd('component documentation');
          resolve();
        });
    });
  })
}

/**
 * Compile all ids-website supporting MD files
 * and store the output string in an object
 * @return {Promise}
 */
function compileSupportingDocs() {
  return new Promise((resolve, reject) => {

    logTaskStart('markdown documentation');
    let promises = [];
    let compName = '';

    glob(`${paths.src}/*.md`, (err, files) => {
      for (filePath of files) {
        fileName = path.basename(filePath, '.md');

        allDocsObj[fileName] = Object.assign({}, jsonTemplate, {
          title: fileName,
          description: 'All about ' + fileName,
        });

        promises.push(markdownToHtml(filePath));
      }

      Promise.all(promises)
        .catch(err => {
          reject(err)
        })
        .then(values => {
          logTaskEnd('markdown documentation');
          resolve();
        });
    });
  })
}

/**
 * Remove any "built" directories/files
 * @return {Promise}
 */
function cleanAll() {
  let dirsArr = [paths.static, paths.dist, paths.distDocs];
  return del([paths.dist, paths.static])
    .then(res => {
      logTaskAction('Clean', paths.dist);
      createDirs(dirsArr);
    }
  );
}

/**
 * Convert/write the sitemap.yml to sitemap.json into dist
 * @return {Promise}
 */
function writeSitemapToDist() {
  return new Promise((resolve, reject) => {
    let doc = '';
    try {
      doc = yaml.safeLoad(fs.readFileSync(`${paths.src}/sitemap.yml`, 'utf8'));
    } catch (e) {
      reject(e);
    }

    fs.writeFile(`${paths.dist}/sitemap.json`, JSON.stringify(doc), 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        logTaskAction('Created', 'sitemap.json');
        resolve();
      }
    });
  });
}

/**
 * Convert markdown into html and parse any yaml frontMatter
 * and store the output html string in the component
 * object property
 * @param  {string} filePath - the full file path
 * @return {Promise}
 */
function markdownToHtml(filePath) {
  let fileBasename = path.basename(filePath, '.md');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const fmData = frontMatter(data);
        if (fmData.attributes.title) allDocsObj[fileBasename].title = fmData.attributes.title;
        if (fmData.attributes.description) allDocsObj[fileBasename].description = fmData.attributes.description;

        marked(fmData.body, (err, content) => {
          if (err) {
            reject(err);
          } else {
            componentStats.numConverted++;
            logTaskAction('Converting', fileBasename + '.md')
            resolve(allDocsObj[fileBasename].body = content);
          }
        });
      }
    })
  });
}

/**
 * Create directories if they exist
 * @param  {array} arrPaths - the directory path(s)
 */
function createDirs(arrPaths) {
  for (path in arrPaths) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      logTaskAction('Created', path);
    }
  }
}

/**
 * Check if the component (directory) has a
 * self-named documentation mardkdown file
 * @param  {string} componentName - the name of the component
 * @return {boolean}
 */
function documentationExists(componentName) {
  return fs.existsSync(`${paths.components}/${componentName}/${componentName}.md`);
}

/**
 * Run documentationJs on a file with JSON output
 * and save that in the components object property
 * @param  {string} componentName - the name of the component
 * @return {Promise}
 */
function documentJsToHtml(componentName) {
  const compFilePath = `${paths.components}/${componentName}/${componentName}.js`;
  return documentation.build([compFilePath], { extension: 'js', shallow: true })
    .then(documentation.formats.html({ theme: 'default_theme' }))
    .then(output => {
      componentStats.numDocumented++;
      logTaskAction('Documented', componentName + '.js')
      allDocsObj[componentName].api = output;
    });
}

/**
 * Derive the component name from its folder path
 * @param {string} dirPath - the component's directory path
 * @return {string} - the component's name
 */
function deriveComponentName(dirPath) {
  return dirPath
    .replace(`${paths.components}/`, '')
    .slice(0, -1);
}

/**
 * Console.log a staring action and track its start time
 * @param {string} taskName - the unique name of the task
 */
function logTaskStart(taskName) {
  stopwatch[taskName] = Date.now();
  console.log('Starting', chalk.cyan(taskName), '...');
}

/**
 * Console.log a finished action and display its run time
 * @param {string} taskName - the name of the task that matches its start time
 */
function logTaskEnd(taskName) {
  console.log('Finished', chalk.cyan(taskName), `after ${chalk.magenta(timeElapsed(stopwatch[taskName]))}`);
}

/**
 * Log an individual task's action
 * @param {string} action - the action
 * @param {string} desc - a brief description or more details
 * @param {string} [color] - one of the chalk module's color aliases
 */
function logTaskAction(action, desc, color = 'green') {
  if (argv.verbose) {
    console.log('-', action, chalk[color](desc));
  }
}

/**
 * Deploy the zipped bundle using a POST request
 */
function postZippedBundle() {
  const formData = require('form-data');


  let envAlias = 'local';
  if (argv.site) {
    if (Object.keys(serverUris).includes(argv.site)) {
      envAlias = argv.site;
    } else {
      console.log(chalk.red(`Site "${argv.site}" not found!`), '\n"--site" options are', Object.keys(serverUris).join(', '));
      console.log(`Defaulting to "${envAlias}" api`)
    }
  }

  logTaskStart(`publish to server "${envAlias}"`);

  let form = new formData();
  form.append('file', fs.createReadStream(`${paths.dist}.zip`));
  form.append('root_path', `ids-jquery/${packageJson.version}`);
  form.submit(serverUris[envAlias], (err, res) => {
    if (err) {
      console.error(err);
    } else {
      if (res.statusCode == 200) {
        logTaskAction('Success', `to "${urls[envAlias]}"`)
      } else {
        logTaskAction('Failed!', `Status ${res.statusCode}`, 'red');
      }
      res.resume();
      logTaskEnd(`publish to server "${envAlias}"`);
      numArchivesSent++;
      statsConclusion();
    }
  });
}

/**
 * Console.log statistics from the build
 */
function statsConclusion() {
  logTaskEnd('deploy');
  // did not use multiline string for formatting reasons
  let str = '';
  str += `\nComponents ${chalk.green('converted')}:  ${componentStats.numConverted}/${componentStats.total}`;
  str += `\nComponents ${chalk.green('documented')}: ${componentStats.numDocumented}/${componentStats.total}`;
  str += `\nComponents ${chalk.yellow('skipped')}:    ${componentStats.numSkipped}/${componentStats.total}`;
  str += `\nComponents ${chalk.green('written')}:    ${componentStats.numWritten}/${componentStats.total}`;
  if (numArchivesSent === 0) {
    str += `\n\nBundles ${chalk.red('deployed')}: ${numArchivesSent}/1`;
  } else {
    str += `\n\nBundles ${chalk.green('deployed')}: ${numArchivesSent}/1`;
  }
  str += '\n';
  console.log(str);
}

/**
 * Calculate the difference in seconds
 * @param {number} t - a time in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 * @return {string}
 */
function timeElapsed(t) {
  const elapsed = ((Date.now() - t)/1000).toFixed(1);
  return elapsed + 's';
}

/**
 * Write a json file for specified component
 * @param {string} componentName - the name of the component
 */
function writeJsonFile(componentName) {
  return new Promise((resolve, reject) => {
    const thisName = componentName;
    fs.writeFile(`${paths.distDocs}/${thisName}.json`, JSON.stringify(allDocsObj[thisName]), 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        componentStats.numWritten++;
        logTaskAction('Created', thisName + '.json');
        resolve();
      }
    });
  });
}

/**
 * Write an HTML file for specified component
 * @param {string} componentName - the name of the component
 */
function writeJsonFile(componentName) {
  return new Promise((resolve, reject) => {
    const thisName = componentName;
    fs.writeFile(`${paths.distDocs}/${thisName}.json`, JSON.stringify(allDocsObj[thisName]), 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        componentStats.numWritten++;
        logTaskAction('Created', thisName + '.json');
        resolve();
      }
    });
  });
}

/**
 * Zip the documentation files and call the method to POST
 */
function zipAndDeploy() {
  logTaskStart('zip json files');

  // create a file to stream archive data to.
  var output = fs.createWriteStream(paths.dist + '.zip');
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', () => {
    logTaskAction('Zipped', archive.pointer() + ' total bytes')
    logTaskEnd('zip json files');

    if (argv.dryRun) {
      console.log(chalk.bgRed.bold('!! DRY RUN !!'));
      statsConclusion()
    } else {
      postZippedBundle();
    }
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', () => {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', err => {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  archive.directory(paths.dist, false);
  archive.finalize();
}
