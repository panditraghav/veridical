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

const veridicalPackage = JSON.parse(readFileSync(`${packagesPath}/veridical/package.json`, { encoding: "utf-8" }))
const veridicalPeerDeps = Object.keys(veridicalPackage.peerDependencies)

function isExternal(peerDeps) {
    return (id) => {
        for (const dep of peerDeps) {
            if (id.includes(dep)) return true
        }
    }
}

const veridicalBuildConfig = {
    input: `${packagesPath}/veridical/src/index.tsx`,
    output: [{ file: `${packagesPath}/veridical/dist/${veridicalPackage.main}`, format: "esm" }],
    external: isExternal(veridicalPeerDeps),
    plugins: [
        image(),
        resolve(),
        commonjs(),
        typescript(),
        postcss(),
        // terser(),
    ],
};

const veridicalTypesConfig = {
    input: `${packagesPath}/veridical/dist/packages/veridical/src/index.d.ts`,
    output: [
        {
            file: `${packagesPath}/veridical/dist/index.d.ts`,
            format: 'es'
        }
    ],
    plugins: [dts()]
}

export default [
    // veridicalBuildConfig,
    veridicalTypesConfig
];
