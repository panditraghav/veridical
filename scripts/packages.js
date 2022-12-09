
const external = [
    'lexical',
    '@lexical/react',
    // '@lexical/clipboard',
    // '@lexical/code',
    // '@lexical/dragon',
    // '@lexical/hashtag',
    // '@lexical/history',
    // '@lexical/link',
    // '@lexical/list',
    // '@lexical/mark',
    // '@lexical/markdown',
    // '@lexical/overflow',
    // '@lexical/plain-text',
    // '@lexical/rich-text',
    // '@lexical/selection',
    // '@lexical/table',
    // '@lexical/text',
    // '@lexical/utils',
    // '@lexical/yjs',
    'react',
    'react-dom'
]

const packages = [
    {
        name: "veridical",
        inputFile: "index.tsx",
        outputFile: "index.js",
        external: [...external, "@veridical/plugins", "@veridical/nodes", "@veridical/icons", "@veridical/components", "@veridical/utils"]
    },
    {
        name: "nodes",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/plugins", "@veridical/icons", "@veridical/components", "@veridical/utils"]

    },
    {
        name: "plugins",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/nodes", "@veridical/icons", "@veridical/components", "@veridical/utils"]
    },
    {
        name: "components",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/nodes", "@veridical/icons", "@veridical/plugins", "@veridical/utils"]
    },
    {
        name: "icons",
        inputFile: "index.ts",
        outputFile: "index.js",
        external
    },
    {
        name: "utils",
        inputFile: "index.ts",
        outputFile: "index.js",
        external: [...external, "@veridical/nodes", "@veridical/icons", "@veridical/plugins" ]
    },
]
const SRC_FOLDER = "src"
const BUILD_FOLDER = "dist"

module.exports = { SRC_FOLDER, BUILD_FOLDER, packages }