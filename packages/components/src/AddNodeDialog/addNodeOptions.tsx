import React from "react";
import {
    createCommand,
    ParagraphNode,
    LexicalCommand,
    $createParagraphNode,
    $isRootNode,
    $createTextNode,
    LexicalNode,
    $isParagraphNode,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { $createCodeNode } from "@lexical/code";

import {
    H1Icon,
    H2Icon,
    H3Icon,
    CodeIcon,
    ImageIcon,
    UlIcon,
    OlIcon,
} from "@veridical/icons";
import { $createImageNode } from "@veridical/nodes";

export const ADD_NODE_COMMAND: LexicalCommand<NodeCreator> = createCommand();

export type NodeCreator = (node: LexicalNode) => void;
export type AddNodeOption = {
    name: string;
    description: string;
    shortName: string;
    creator: NodeCreator;
    image: React.ReactNode;
};

const H1Creator: NodeCreator = (node) => {
    const h1 = $createHeadingNode("h1");
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.replace(h1);
    } else {
        node.insertAfter(h1);
    }
    h1.select(0, 0);
};

const H2Creator: NodeCreator = (node) => {
    const h2 = $createHeadingNode("h2");
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.replace(h2);
    } else {
        node.insertAfter(h2);
    }
    h2.select(0, 0);
};
const H3Creator: NodeCreator = (node) => {
    const h3 = $createHeadingNode("h3");
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.replace(h3);
    } else {
        node.insertAfter(h3);
    }
    h3.select(0, 0);
};
const OLCreator: NodeCreator = (node) => {
    const ol = $createListNode("number");
    const li = $createListItemNode();
    ol.append(li);
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.replace(ol);
    } else {
        node.insertAfter(ol);
    }
    li.select(0, 0);
};
const ULCreator: NodeCreator = (node) => {
    const ul = $createListNode("bullet");
    const li = $createListItemNode();
    ul.append(li);
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.replace(ul);
    } else {
        node.insertAfter(ul);
    }
    li.select(0, 0);
};
const ImageCreator: NodeCreator = (node) => {
    const img = $createImageNode({
        src: "",
        altText: "",
        maxWidth: 740,
    });
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.insertBefore(img);
    } else {
        node.insertAfter(img);
    }
};

const CodeCreator: NodeCreator = (node) => {
    const codeNode = $createCodeNode("javascript");
    if ($isParagraphNode(node) && node.getTextContent() == "") {
        node.replace(codeNode);
    } else {
        node.insertAfter(codeNode);
    }
    codeNode.select(0, 0);
};

export const defaultAddNodeOptions: AddNodeOption[] = [
    {
        name: "Heading 1",
        shortName: "h1",
        image: <H1Icon size="md" />,
        description: "Biggest heading or Title of blog",
        creator: H1Creator,
    },
    {
        name: "Heading 2",
        shortName: "h2",
        image: <H2Icon size="md" />,
        description: "Second biggest heading",
        creator: H2Creator,
    },
    {
        name: "Heading 3",
        shortName: "h3",
        image: <H3Icon size="md" />,
        description: "Smallest heading",
        creator: H3Creator,
    },
    {
        name: "Ordered List",
        shortName: "ol",
        image: <OlIcon size="md" />,
        description: "List with numbers",
        creator: OLCreator,
    },
    {
        name: "Unordered List",
        shortName: "ul",
        image: <UlIcon size="md" />,
        description: "Bullet list",
        creator: ULCreator,
    },
    {
        name: "Image",
        shortName: "img",
        image: <ImageIcon size="md" />,
        description: "Fixed width image",
        creator: ImageCreator,
    },
    {
        name: "Code",
        shortName: "code",
        image: <CodeIcon size="md" />,
        description: "Write code with syntax highlighting",
        creator: CodeCreator,
    },
];
