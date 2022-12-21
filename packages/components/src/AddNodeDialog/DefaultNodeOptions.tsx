import React from "react";
import { $createHeadingNode } from "@lexical/rich-text";
import {
    LexicalNode,
    $createTextNode,
    $isParagraphNode,
    $createParagraphNode,
} from "lexical";
import {
    CodeIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ImageIcon,
    OlIcon,
    UlIcon,
} from "@veridical/components";
import { $createImageNode } from "@veridical/nodes";
import { $createCodeNode } from "@lexical/code";
import { $createListItemNode, $createListNode } from "@lexical/list";

export type NodeOption = {
    name: string;
    shortName: string;
    description: string;
    nodeCreator: (node: LexicalNode) => void;
    icon: JSX.Element;
};

const TEXT_OPTIONS: NodeOption[] = [
    {
        name: "Heading 1",
        shortName: "h1",
        description: "Highest level heading or title",
        nodeCreator: (node) => {
            const h1 = $createHeadingNode("h1");
            h1.append($createTextNode(""));
            if (node.getTextContent() === "" && $isParagraphNode(node)) {
                node.replace(h1);
            } else {
                node.insertAfter(h1);
            }
            h1.select(0, 0);
        },
        icon: <H1Icon size="md" />,
    },
    {
        name: "Heading 2",
        shortName: "h2",
        description: "Second level heading",
        nodeCreator: (node) => {
            const h2 = $createHeadingNode("h2");
            h2.append($createTextNode(""));
            if (node.getTextContent() === "" && $isParagraphNode(node)) {
                node.replace(h2);
            } else {
                node.insertAfter(h2);
            }
            h2.select(0, 0);
        },
        icon: <H2Icon size="md" />,
    },
    {
        name: "Heading 3",
        shortName: "h3",
        description: "Third level heading",
        nodeCreator: (node) => {
            const h3 = $createHeadingNode("h3");
            h3.append($createTextNode(""));
            if (node.getTextContent() === "" && $isParagraphNode(node)) {
                node.replace(h3);
            } else {
                node.insertAfter(h3);
            }
            h3.select(0, 0);
        },
        icon: <H3Icon size="md" />,
    },
    {
        name: "Unordered List",
        shortName: "ul",
        description: "List with bullet points",
        nodeCreator: (node) => {
            const ul = $createListNode("bullet");
            const li = $createListItemNode();
            ul.append(li);
            if (node.getTextContent() === "" && $isParagraphNode(node)) {
                node.replace(ul);
            } else {
                node.insertAfter(ul);
            }
            li.select(0, 0);
        },
        icon: <UlIcon size="md" />,
    },
    {
        name: "Ordered List",
        shortName: "ol",
        description: "List with numbers points",
        nodeCreator: (node) => {
            const ol = $createListNode("number");
            const li = $createListItemNode();
            ol.append(li);
            if (node.getTextContent() === "" && $isParagraphNode(node)) {
                node.replace(ol);
            } else {
                node.insertAfter(ol);
            }
            li.select(0, 0);
        },
        icon: <OlIcon size="md" />,
    },
];

const BLOCK_OPTIONS: NodeOption[] = [
    {
        name: "Image",
        shortName: "img",
        description: "Image node",
        nodeCreator(node) {
            const img = $createImageNode({
                src: "",
                altText: "",
                width: 1,
                height: 1,
            });
            if ($isParagraphNode(node) && node.getTextContent() == "") {
                node.insertBefore(img);
            } else {
                node.insertAfter(img);
                const p = $createParagraphNode();
                p.append($createTextNode(""));
                img.insertAfter(p);
                p.select(0, 0);
            }
        },
        icon: <ImageIcon size="md" />,
    },
    {
        name: "Code",
        shortName: "code",
        description: "Write code",
        nodeCreator(node) {
            const code = $createCodeNode("JavaScript");
            if ($isParagraphNode(node) && node.getTextContent() == "") {
                node.replace(code);
            } else {
                node.insertAfter(code);
            }
            code.select(0, 0);
        },
        icon: <CodeIcon size="md" />,
    },
];

const defaultNodeOptions: NodeOption[] = [...TEXT_OPTIONS, ...BLOCK_OPTIONS];

export { defaultNodeOptions };
