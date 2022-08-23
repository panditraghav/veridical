import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"

import pkg from "./package.json"

export default [
    {
        input: "./src/index.ts",
        output: [
            { file: pkg.main, format: "esm" }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript(),
            postcss(),
            external(),
            terser()
        ],
    }
]