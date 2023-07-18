// TODO: Convert relative paths like @/utils to absolute paths
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { exec } from 'child-process-promise';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { InputOptions, OutputOptions, rollup, RollupBuild } from 'rollup';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const basePath = path.resolve(__dirname, '..');
const packagesPath = path.resolve(basePath, 'packages');
const veridicalPath = path.resolve(packagesPath, 'veridical');
const srcPath = path.resolve(veridicalPath, 'src');
const distPath = path.resolve(veridicalPath, 'dist');
const readmePath = path.resolve(basePath, 'README.md');
const packageJSONPath = path.resolve(veridicalPath, 'package.json');
const outputFileName = 'Veridical';

function isExternal(source: string) {
    const externalDeps = Object.keys(
        JSON.parse(readFileSync(packageJSONPath).toString()).dependencies,
    );
    for (const dep of externalDeps) {
        if (source.includes(dep)) {
            return true;
        }
    }
    return false;
}

const inputOptions: InputOptions = {
    input: path.resolve(srcPath, 'index.ts'),
    external: isExternal,
    plugins: [
        nodeResolve(),
        postcss(),
        commonjs(),
        typescript(),
        //@ts-ignore
        external(),
        image(),
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

const outputOptionsList: OutputOptions[] = [
    {
        file: path.resolve(distPath, `${outputFileName}.dev.js`),
        format: 'cjs',
    },
    {
        file: path.resolve(distPath, `${outputFileName}.prod.js`),
        plugins: [terser()],
        format: 'cjs',
    },
];

async function build(
    inputOptions: InputOptions,
    outputOptionsList: OutputOptions[],
) {
    let bundle: RollupBuild | undefined;
    try {
        bundle = await rollup(inputOptions);
        await generateOutputs(bundle, outputOptionsList);
    } catch (error) {
        console.error(error);
    }
    if (bundle) {
        await bundle.close();
    }
}

async function generateOutputs(
    bundle: RollupBuild,
    outputOptionsList: OutputOptions[],
) {
    for (const opt of outputOptionsList) {
        await bundle.write(opt);
    }
}
async function buildDecleration() {
    const tsConfigBuildPath = path.resolve(basePath, 'tsconfig.build.json');
    try {
        await exec(`tsc -p ${tsConfigBuildPath}`);
        await build(
            {
                input: path.resolve(basePath, '.dec-temp', 'index.d.ts'),
                plugins: [dts()],
                external: isExternal,
            },
            [
                {
                    file: path.resolve(distPath, `${outputFileName}.d.ts`),
                    format: 'es',
                },
            ],
        );
    } catch (error) {
        console.log(error);
    }
}

function createMainFile() {
    const mainFile = `const ${outputFileName} = process.env.NODE_ENV === 'development' ? require('./${outputFileName}.dev.js') : require('./${outputFileName}.prod.js')\n module.exports = ${outputFileName}`;
    writeFileSync(path.resolve(distPath, `${outputFileName}.js`), mainFile);
}

async function buildAll() {
    await build(inputOptions, outputOptionsList);
    await buildDecleration();
    createMainFile();

    //Copy package.json and README.md to dist
    await exec(`cp ${packageJSONPath} ${distPath}`);
    await exec(`cp ${readmePath} ${distPath}`);
}

buildAll();
