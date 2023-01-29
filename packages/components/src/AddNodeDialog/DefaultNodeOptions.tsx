import React from 'react';
import { $createHeadingNode } from '@lexical/rich-text';
import {
    LexicalNode,
    $createTextNode,
    $isParagraphNode,
    $createParagraphNode,
    $isRootNode,
} from 'lexical';
import {
    CodeIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ImageIcon,
    OlIcon,
    UlIcon,
} from '..';
import { $createImageNode } from '@veridical/nodes';
import { $createCodeNode } from '@lexical/code';
import { $createListItemNode, $createListNode } from '@lexical/list';

export type NodeOption = {
    name: string;
    shortName: string;
    description: string;
    nodeCreator: (node: LexicalNode) => void;
    icon: JSX.Element;
};

function getTopLevelParent(node: LexicalNode): LexicalNode | null {
    let parent = node.getParent();
    if ($isRootNode(parent)) return node;

    while (parent && !$isRootNode(parent.getParent())) {
        parent = parent.getParent();
    }
    return parent;
}

const TEXT_OPTIONS: NodeOption[] = [
    {
        name: 'Title',
        shortName: 'h1',
        description: 'Title of blog',
        nodeCreator: (selectedNode) => {
            const h1 = $createHeadingNode('h1');
            h1.append($createTextNode(''));
            const topParent = getTopLevelParent(selectedNode);
            if (
                topParent?.getTextContent() === '' &&
                $isParagraphNode(topParent)
            ) {
                topParent.replace(h1);
            } else {
                topParent?.insertAfter(h1);
            }
            h1.select(0, 0);
        },
        icon: <H1Icon size="md" />,
    },
    {
        name: 'Heading 2',
        shortName: 'h2',
        description: 'Second level heading',
        nodeCreator: (selectedNode) => {
            const h2 = $createHeadingNode('h2');
            h2.append($createTextNode(''));
            const topParent = getTopLevelParent(selectedNode);
            if (
                $isParagraphNode(topParent) &&
                topParent?.getTextContent() === ''
            ) {
                topParent.replace(h2);
            } else {
                topParent?.insertAfter(h2);
            }
            h2.select(0, 0);
        },
        icon: <H2Icon size="md" />,
    },
    {
        name: 'Heading 3',
        shortName: 'h3',
        description: 'Third level heading',
        nodeCreator: (selectedNode) => {
            const h3 = $createHeadingNode('h3');
            h3.append($createTextNode(''));
            const topParent = getTopLevelParent(selectedNode);
            if (
                $isParagraphNode(topParent) &&
                topParent.getTextContent() === ''
            ) {
                topParent.replace(h3);
            } else {
                topParent?.insertAfter(h3);
            }
            h3.select(0, 0);
        },
        icon: <H3Icon size="md" />,
    },
    {
        name: 'Unordered List',
        shortName: 'ul',
        description: 'List with bullet points',
        nodeCreator: (node) => {
            const ul = $createListNode('bullet');
            const li = $createListItemNode();
            ul.append(li);
            const topParent = getTopLevelParent(node);
            if (
                $isParagraphNode(topParent) &&
                topParent.getTextContent() === ''
            ) {
                topParent.replace(ul);
            } else {
                topParent?.insertAfter(ul);
            }
            li.select(0, 0);
        },
        icon: <UlIcon size="md" />,
    },
    {
        name: 'Ordered List',
        shortName: 'ol',
        description: 'List with numbers points',
        nodeCreator: (node) => {
            const ol = $createListNode('number');
            const li = $createListItemNode();
            ol.append(li);
            const topParent = getTopLevelParent(node);
            if (
                $isParagraphNode(topParent) &&
                topParent.getTextContent() === ''
            ) {
                topParent.replace(ol);
            } else {
                topParent?.insertAfter(ol);
            }
            li.select(0, 0);
        },
        icon: <OlIcon size="md" />,
    },
];

const BLOCK_OPTIONS: NodeOption[] = [
    {
        name: 'Image',
        shortName: 'img',
        description: 'Image node',
        nodeCreator(node) {
            const img = $createImageNode({
                src: '',
                altText: '',
                width: 1,
                height: 1,
            });
            const topParent = getTopLevelParent(node);
            if (
                $isParagraphNode(topParent) &&
                topParent.getTextContent() == ''
            ) {
                topParent.insertBefore(img);
            } else {
                topParent?.insertAfter(img);
                const p = $createParagraphNode();
                p.append($createTextNode(''));
                img.insertAfter(p);
                p.select(0, 0);
            }
        },
        icon: <ImageIcon size="md" />,
    },
    {
        name: 'Code',
        shortName: 'code',
        description: 'Write code',
        nodeCreator(node) {
            const code = $createCodeNode('JavaScript');
            const topParent = getTopLevelParent(node);
            if (
                $isParagraphNode(topParent) &&
                topParent.getTextContent() == ''
            ) {
                topParent.replace(code);
            } else {
                topParent?.insertAfter(code);
            }
            code.select(0, 0);
        },
        icon: <CodeIcon size="md" />,
    },
];

const defaultNodeOptions: NodeOption[] = [...TEXT_OPTIONS, ...BLOCK_OPTIONS];

export { defaultNodeOptions };
