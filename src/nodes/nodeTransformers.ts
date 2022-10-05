import { createCommand, ParagraphNode, LexicalCommand, $createParagraphNode, $isRootNode, $createTextNode } from "lexical"
import { $createHeadingNode } from "@lexical/rich-text"
import H1 from "../images/H1.svg"
import H2 from "../images/H2.svg"
import H3 from "../images/H3.svg"
import Ol from "../images/Ol.svg"
import Ul from "../images/Ul.svg"
import { $createListItemNode, $createListNode } from "@lexical/list"
import { $createImageNode } from "./ImageNode"

export const TRANSFORM_NODE_COMMAND: LexicalCommand<NodeTransformer> = createCommand()
export type NodeTransformer = (paragraphNode: ParagraphNode) => void

type transformerOption = {
    name: string,
    description: string,
    shortName: string,
    transformer: NodeTransformer,
    image: string;
}

const Heading_1_Transformer: NodeTransformer = (paragraphNode) => {
    const h1 = $createHeadingNode("h1")
    paragraphNode.replace(h1)
    h1.select(0, 0)
}
const Heading_2_Transformer: NodeTransformer = (paragraphNode) => {
    const h2 = $createHeadingNode("h2")
    paragraphNode.replace(h2)
    h2.select(0, 0)
}
const Heading_3_Transformer: NodeTransformer = (paragraphNode) => {
    const h3 = $createHeadingNode("h3")
    paragraphNode.replace(h3)
    h3.select(0, 0)
}
const OrderedListTransformer: NodeTransformer = (paragraphNode) => {
    const ol = $createListNode("number")
    const li = $createListItemNode()
    ol.append(li)
    paragraphNode.replace(ol)
    li.select(0, 0)
}
const unorderedListTransformer: NodeTransformer = (paragraphNode) => {
    const ul = $createListNode("bullet")
    const li = $createListItemNode()
    ul.append(li)
    paragraphNode.replace(ul)
    li.select(0, 0)
}
const imageTransformer: NodeTransformer = (paragraphNode) => {
    const img = $createImageNode({
        src: "",
        altText: "myImage",
    })
    const p = $createParagraphNode()
    p.append($createTextNode(""))
    paragraphNode.insertAfter(p)
    paragraphNode.replace(img)
    p.select(0,0)
}

export const transformerOptions: transformerOption[] = [
    {
        name: "Heading 1",
        shortName: "h1",
        image: H1,
        description: "Biggest heading or Title of blog",
        transformer: Heading_1_Transformer
    },
    {
        name: "Heading 2",
        shortName: "h2",
        image: H2,
        description: "Second biggest heading",
        transformer: Heading_2_Transformer
    },
    {
        name: "Heading 3",
        shortName: "h3",
        image: H3,
        description: "Smallest heading",
        transformer: Heading_3_Transformer
    },
    {
        name: "Ordered List",
        shortName: "ol",
        image: Ol,
        description: "List with numbers",
        transformer: OrderedListTransformer,
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
]


export const NodeTransformers = [
    Heading_1_Transformer,
]