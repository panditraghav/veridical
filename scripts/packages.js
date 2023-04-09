const external = [
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

const packages = [
    {
        name: 'Veridical',
        inputFile: 'index.tsx',
        external: [
            ...external,
            '@veridical/plugins',
            '@veridical/nodes',
            '@veridical/components',
            '@veridical/utils',
        ],
    },
    {
        name: 'Nodes',
        inputFile: 'index.ts',
        external: [
            ...external,
            '@veridical/plugins',
            '@veridical/components',
            '@veridical/utils',
        ],
    },
    {
        name: 'Plugins',
        inputFile: 'index.ts',
        external: [
            ...external,
            '@veridical/nodes',
            '@veridical/components',
            '@veridical/utils',
        ],
    },
    {
        name: 'Components',
        inputFile: 'index.ts',
        external: [
            ...external,
            '@veridical/nodes',
            '@veridical/plugins',
            '@veridical/utils',
        ],
    },
    {
        name: 'Utils',
        inputFile: 'index.ts',
        external: [
            ...external,
            '@veridical/nodes',
            '@veridical/icons',
            '@veridical/plugins',
        ],
    },
];
const SRC_FOLDER = 'src';
const BUILD_FOLDER = 'dist';
const PROJECT_NAME = 'veridical';

module.exports = { SRC_FOLDER, BUILD_FOLDER, packages, PROJECT_NAME };
