import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import image from "@rollup/plugin-image"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"

import pkg from "./package.json"

export default [
    {
        input: "./src/index.tsx",
        output: [
            { file: pkg.main, format: "esm" }
        ],
        external: (id, parent, isResolved) => {
            if (id.includes("lexical") && id.includes("react")) return true
        },
        plugins: [
            image(),
            resolve(),
            commonjs(),
            typescript(),
            postcss(),
            external(),
            terser(),
        ],
    }
]