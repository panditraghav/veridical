import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs"
import dts from "rollup-plugin-dts"
// import { terser } from "rollup-plugin-terser";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";

const baseDir = process.cwd()
const packagesPath = `${baseDir}/src/packages`

const markorPackage = JSON.parse(readFileSync(`${packagesPath}/markor/package.json`, { encoding: "utf-8" }))
const markorPeerDeps = Object.keys(markorPackage.peerDependencies)

function isExternal(peerDeps) {
    return (id) => {
        for (const dep of peerDeps) {
            if (id.includes(dep)) return true
        }
    }
}

const markorBuildConfig = {
    input: `${packagesPath}/markor/src/index.tsx`,
    output: [{ file: `${packagesPath}/markor/dist/${markorPackage.main}`, format: "esm" }],
    external: isExternal(markorPeerDeps),
    plugins: [
        image(),
        resolve(),
        commonjs(),
        typescript(),
        postcss(),
        // terser(),
    ],
};

const markorTypesConfig = {
    input: `${packagesPath}/markor/dist/packages/markor/src/index.d.ts`,
    output: [
        {
            file: `${packagesPath}/markor/dist/index.d.ts`,
            format: 'es'
        }
    ],
    plugins: [dts()]
}

export default [
    // markorBuildConfig,
    markorTypesConfig
];
