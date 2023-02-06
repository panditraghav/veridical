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
const { readFileSync } = require('node:fs');
const PeerDepsExternalPlugin = require('rollup-plugin-peer-deps-external');

//All paths are from packages directory

function getPackageInputPath(package) {
    return path.resolve(
        packagesPath,
        `${package.name}/${SRC_FOLDER}`,
        package.inputFile,
    );
}

function getPackageOutputPath(package) {
    return path.resolve(
        packagesPath,
        `${package.name}/${BUILD_FOLDER}`,
        package.outputFile,
    );
}

function getPackageJson(package) {
    return JSON.parse(
        readFileSync(path.resolve(packagesPath, package.name, 'package.json')),
    );
}

async function build(package) {
    const inputOption = {
        input: getPackageInputPath(package),
        external: isExternal(package.external),
        plugins: [
            nodeResolve(),
            postcss({ extract: true, minimize: true }),
            commonjs(),
            typescript(),
            image(),
            PeerDepsExternalPlugin(),
            // terser()
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
    bundle = await rollup(inputOption);
    await generateOutput(bundle, package);
    if (bundle) {
        await bundle.close();
    }
}
async function generateOutput(bundle, package) {
    const outputOption = {
        file: getPackageOutputPath(package),
        format: 'esm',
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

async function buildAll(packages) {
    for (const pkg of packages) {
        console.log(`\nBuilding ${pkg.name}`);
        await build(pkg);
    }
    console.log(`\nBuilding decleration`);
    await buildDecleration();
}
buildAll(packages);
