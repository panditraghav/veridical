import { InputOptions, OutputOptions, rollup, RollupBuild } from 'rollup';
import { exec } from 'child-process-promise';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import image from '@rollup/plugin-image';
import external from 'rollup-plugin-peer-deps-external';

const externalDeps = [
    'lexical',
    '@lexical/react',
    '@lexical/clipboard',
    '@lexical/code',
    '@lexical/dragon',
    '@lexical/hashtag',
    '@lexical/history',
    '@lexical/link',
    '@lexical/list',
    '@lexical/mark',
    '@lexical/markdown',
    '@lexical/overflow',
    '@lexical/plain-text',
    '@lexical/rich-text',
    '@lexical/selection',
    '@lexical/table',
    '@lexical/text',
    '@lexical/utils',
    '@lexical/yjs',
    'react',
    'react-dom',
    'prettier',
];

const baseDir = path.resolve('');

function isExternal(source: string) {
    for (const dep of externalDeps) {
        if (source.includes(dep)) {
            return true;
        }
    }
    return false;
}

const inputOptions: InputOptions = {
    input: path.resolve('src', 'index.ts'),
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
            console.log(`${warning.code} : ${warning.message}`);
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
        file: 'dist/index.js',
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
    const tsConfigBuildPath = path.resolve(baseDir, 'tsconfig.build.json');
    try {
        await exec(`tsc -p ${tsConfigBuildPath}`);
        await build(
            {
                input: path.resolve(baseDir, '.dec-temp', 'index.d.ts'),
                plugins: [dts()],
                external: isExternal,
            },
            [
                {
                    file: path.resolve(baseDir, 'dist', 'index.d.ts'),
                    format: 'es',
                },
            ],
        );
    } catch (error) {
        console.log(error);
    }
}

async function buildAll() {
    await build(inputOptions, outputOptionsList);
    await buildDecleration();
}

buildAll();
