const { rollup } = require('rollup');
const { isExternal } = require('./utils');
const { default: dts } = require('rollup-plugin-dts');
const { exec } = require('child-process-promise');
const path = require('path');
const { packages } = require('./packages');

const PROJECT_DIR = `${__dirname}/..`;
const PACKAGES_DIR = 'packages';
const DECLERATION_DIR = path.resolve(PROJECT_DIR, '.dec-temp');
const SRC_DIR = 'src';
const DIST_DIR = 'dist';

function getPackageJsonPath(packageName) {
    return path.resolve(PROJECT_DIR, PACKAGES_DIR, packageName, 'package.json');
}
function getDistPath(packageName) {
    return path.resolve(PROJECT_DIR, PACKAGES_DIR, packageName, DIST_DIR);
}

function getDeclarationInputPath(packageName) {
    return path.resolve(DECLERATION_DIR, packageName, SRC_DIR, 'index.d.ts');
}

async function rollupTypeFor(package) {
    console.log(`Rolluping type for ${package.name}`);
    const name = package.name.toLowerCase()
    const inputOption = {
        input: getDeclarationInputPath(name),
        plugins: [dts()],
        external: isExternal(package.external),
        onwarn(warning) {
            if (warning.code === 'CIRCULAR_DEPENDENCY') {
                // Ignored
            } else if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                // Important, but not enough to stop the build
                console.error();
                console.error(warning.message || warning);
                console.error();
            } else if (typeof warning.code === 'string') {
                console.error(warning);
                // This is a warning coming from Rollup itself.
                // These tend to be important (e.g. clashes in namespaced exports)
                // so we'll fail the build on any of them.
                console.error();
                console.error(warning.message || warning);
                console.error();
                process.exit(1);
            } else {
                // The warning is from one of the plugins.
                // Maybe it's not important, so just print it.
                console.warn(warning.message || warning);
            }
        },
    };
    const outputOption = {
        file: path.resolve(getDistPath(name), 'index.d.ts'),
        format: 'es',
    };
    let bundle = await rollup(inputOption);
    await bundle.write(outputOption);
    if (bundle) {
        await bundle.close();
    }
}

async function copyPackageJson() {
    console.log('Copying package.json[s]');
    packages.forEach(async (pkg) => {
        const name = pkg.name.toLowerCase()
        const pkgJsonPath = getPackageJsonPath(name);
        const distDirPath = getDistPath(name);
        console.log(`copying ${pkgJsonPath} to ${distDirPath}`);
        await exec(`cp ${pkgJsonPath} ${distDirPath}/`);
    });
}

async function copyDeclarations() {
    packages.forEach(async (pkg) => {
        await rollupTypeFor(pkg);
    });
}

async function copyReadme() {
    packages.forEach(async (pkg) => {
        const name = pkg.name.toLowerCase()
        const readmeDest = getDistPath(name);
        let readmeSrc = path.resolve(
            PROJECT_DIR,
            PACKAGES_DIR,
            name,
            'README.md',
        );
        if (name === 'veridical')
            readmeSrc = path.resolve(PROJECT_DIR, 'README.md');
        console.log(`copying ${readmeSrc} to ${readmeDest}`);
        await exec(`cp ${readmeSrc} ${readmeDest}/`);
    });
}

async function prepareRelease() {
    await copyPackageJson();
    await copyReadme();
    await copyDeclarations();
}

prepareRelease();
