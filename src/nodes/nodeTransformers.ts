import {
    createCommand,
    ParagraphNode,
    LexicalCommand,
    $createParagraphNode,
    $isRootNode,
    $createTextNode,
    LexicalNode,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { $createImageNode } from "./ImageNode";

import H1 from "../images/H1.svg";
import H2 from "../images/H2.svg";
import H3 from "../images/H3.svg";
import Ol from "../images/Ol.svg";
import Ul from "../images/Ul.svg";
import { $createCodeNode } from "@lexical/code";

export const TRANSFORM_NODE_COMMAND: LexicalCommand<NodeTransformer> =
    createCommand();
export type NodeTransformer = (node: LexicalNode) => void;

export type NodeTransformerOption = {
    name: string;
    description: string;
    shortName: string;
    transformer: NodeTransformer;
    image: string;
};

const heading_1_Transformer: NodeTransformer = (node) => {
    const h1 = $createHeadingNode("h1");
    node.replace(h1);
    h1.select(0, 0);
};

const heading_2_Transformer: NodeTransformer = (node) => {
    const h2 = $createHeadingNode("h2");
    node.replace(h2);
    h2.select(0, 0);
};
const heading_3_Transformer: NodeTransformer = (node) => {
    const h3 = $createHeadingNode("h3");
    node.replace(h3);
    h3.select(0, 0);
};
const orderedListTransformer: NodeTransformer = (node) => {
    const ol = $createListNode("number");
    const li = $createListItemNode();
    ol.append(li);
    node.replace(ol);
    li.select(0, 0);
};
const unorderedListTransformer: NodeTransformer = (node) => {
    const ul = $createListNode("bullet");
    const li = $createListItemNode();
    ul.append(li);
    node.replace(ul);
    li.select(0, 0);
};
const imageTransformer: NodeTransformer = (node) => {
    const img = $createImageNode({
        src: "",
        altText: "myImage",
    });
    const p = $createParagraphNode();
    p.append($createTextNode(""));
    node.insertAfter(p);
    node.replace(img);
    p.select(0, 0);
};

const codeTransformer: NodeTransformer = (node) => {
    const codeNode = $createCodeNode("javascript");
    const p = $createParagraphNode();
    p.append($createTextNode(""));
    node.insertAfter(p);
    node.replace(codeNode);
    codeNode.select(0, 0);
};

export const defaultNodeTransformerOptions: NodeTransformerOption[] = [
    {
        name: "Heading 1",
        shortName: "h1",
        image: H1,
        description: "Biggest heading or Title of blog",
        transformer: heading_1_Transformer,
    },
    {
        name: "Heading 2",
        shortName: "h2",
        image: H2,
        description: "Second biggest heading",
        transformer: heading_2_Transformer,
    },
    {
        name: "Heading 3",
        shortName: "h3",
        image: H3,
        description: "Smallest heading",
        transformer: heading_3_Transformer,
    },
    {
        name: "Ordered List",
        shortName: "ol",
        image: Ol,
        description: "List with numbers",
        transformer: orderedListTransformer,
    },
    {
        name: "Unordered List",
        shortName: "ul",
        image: Ul,
        description: "Bullet list",
        transformer: unorderedListTransformer,
    },
    {
        name: "Image",
        shortName: "img",
        image: Ul,
        description: "Fixed width image",
        transformer: imageTransformer,
    },
    {
        name: "Code",
        shortName: "code",
        image: Ul,
        description: "Write code with syntax highlighting",
        transformer: codeTransformer,
    },
];
