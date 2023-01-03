
const external = [
    'lexical',
    '@lexical/react',
    'react',
    'react-dom'
]

const packages = [
    {
        name: "veridical",
        inputFile: "index.tsx",
        outputFile: "index.js",
        external: [...external, "@veridical/plugins", "@veridical/nodes", "@veridical/components", "@veridical/utils"]
    },
    {
        name: "nodes",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/plugins", "@veridical/components", "@veridical/utils"]

    },
    {
        name: "plugins",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/nodes", "@veridical/components", "@veridical/utils"]
    },
    {
        name: "components",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/nodes", "@veridical/plugins", "@veridical/utils"]
    },
    {
        name: "utils",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/nodes", "@veridical/components", "@veridical/plugins"]
    },
]
const SRC_FOLDER = "src"
const BUILD_FOLDER = "dist"
const PROJECT_NAME = "veridical"

module.exports = { SRC_FOLDER, BUILD_FOLDER, packages, PROJECT_NAME }