const baseDir = `${__dirname}/..`;
const packagesPath = `${baseDir}/packages`;

const { isExternal } = require('./utils');

const { packages, SRC_FOLDER, BUILD_FOLDER } = require('./packages');
const path = require('node:path');
const { exec } = require('child-process-promise');
const { rollup } = require('rollup');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-minification');
const image = require('@rollup/plugin-image');
const postcss = require('rollup-plugin-postcss');
const { readFileSync, writeFileSync } = require('node:fs');
const PeerDepsExternalPlugin = require('rollup-plugin-peer-deps-external');

//All paths are from packages directory

function getPackageInputPath(package) {
    return path.resolve(
        packagesPath,
        `${package.name.toLowerCase()}/${SRC_FOLDER}`,
        package.inputFile,
    );
}

function getPackageOutputPath(package, type) {
    if (!type) type = 'dev';
    const extension = 'js';
    const outputFileName = [package.name, type, extension].join('.');
    return path.resolve(
        packagesPath,
        `${package.name.toLowerCase()}/${BUILD_FOLDER}`,
        outputFileName,
    );
}

async function build(package, type) {
    const inputOption = {
        input: getPackageInputPath(package),
        external: isExternal(package.external),
        plugins: [
            nodeResolve(),
            postcss({ extract: true, minimize: true }),
            commonjs(),
            typescript({ compilerOptions: { target: 'ESNext' } }),
            image(),
            PeerDepsExternalPlugin(),
            //terser(),
        ],
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
    let bundle;
    if (type == 'prod') {
        inputOption.plugins.push(terser());
    }
    bundle = await rollup(inputOption);
    await generateOutput(bundle, package, type);
    if (bundle) {
        await bundle.close();
    }
}
async function generateOutput(bundle, package, type) {
    const outputOption = {
        file: getPackageOutputPath(package, type),
        format: 'cjs',
    };
    await bundle.write(outputOption);
}

async function buildDecleration() {
    const tsConfigBuildPath = path.resolve(baseDir, 'tsconfig.build.json');
    try {
        await exec(`tsc -p ${tsConfigBuildPath}`);
    } catch (error) {
        console.log(error);
    }
}

function createIndexFiles(packages) {
    const indexTemplate = readFileSync(
        path.resolve(baseDir, 'scripts', 'index.js.template'),
    );
    let strTemplate = indexTemplate.toString();
    for (const pkg of packages) {
        const indexFileStr = strTemplate.replace(/{Name}/g, pkg.name);
        const outFile = path.resolve(
            packagesPath,
            pkg.name.toLowerCase(),
            'dist',
            pkg.name + '.js',
        );
        writeFileSync(outFile, indexFileStr);
    }
}

async function buildAll(packages) {
    console.log(`Building for developmenet`);
    for (const pkg of packages) {
        console.log(`\nBuilding ${pkg.name}`);
        await build(pkg, 'dev');
    }
    console.log(`Building for production`);
    for (const pkg of packages) {
        console.log(`\nBuilding ${pkg.name}`);
        await build(pkg, 'prod');
    }
    console.log('Creating index files');
    createIndexFiles(packages);
    console.log(`\nBuilding decleration`);
    await buildDecleration();
}
buildAll(packages);
