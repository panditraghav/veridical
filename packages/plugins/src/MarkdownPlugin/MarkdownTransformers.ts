import {
    Transformer,
    ElementTransformer,
    TextMatchTransformer,
    TextFormatTransformer,
} from "@lexical/markdown";

import { $createImageNode, $isImageNode, ImageNode } from "@veridical/nodes";

import {
    BOLD_ITALIC_STAR,
    BOLD_ITALIC_UNDERSCORE,
    BOLD_STAR,
    BOLD_UNDERSCORE,
    STRIKETHROUGH,
    INLINE_CODE,
    ITALIC_STAR,
    ITALIC_UNDERSCORE,
    LINK,
    ORDERED_LIST,
    CODE,
    QUOTE,
    UNORDERED_LIST,
    HEADING,
} from "@lexical/markdown";
import { $createParagraphNode } from "lexical";

const IMAGE: ElementTransformer = {
    dependencies: [ImageNode],
    export: (node) => {
        if (!$isImageNode(node)) return null;
        return `![${node.getAltText()}](${node.getSrc()})`;
    },
    regExp: /^!\[(.+)\]\((.+)\)\s/,
    replace: (parentNode, children, match, isImport) => {
        const altText = match[1];
        const src = match[2];
        if (altText !== "" && src !== "") {
            //TODO: Change naturalWidth and naturalHeight
            const image = $createImageNode({
                src,
                altText,
                naturalWidth: 1,
                naturalHeight: 1,
            });
            parentNode.insertAfter($createParagraphNode());
            parentNode.replace(image);
        }
    },
    type: "element",
};

const TEXT_MATCH_TRANSFORMERS: TextMatchTransformer[] = [LINK];

const TEXT_FORMAT_TRANSFORMERS: TextFormatTransformer[] = [
    BOLD_ITALIC_STAR,
    BOLD_ITALIC_UNDERSCORE,
    BOLD_STAR,
    BOLD_UNDERSCORE,
    STRIKETHROUGH,
    INLINE_CODE,
    ITALIC_STAR,
    ITALIC_UNDERSCORE,
];

const ELEMENT_TRANSFORMERS: ElementTransformer[] = [
    ORDERED_LIST,
    CODE,
    QUOTE,
    UNORDERED_LIST,
    HEADING,
    IMAGE,
];

export const defaultTransformers: Array<Transformer> = [
    ...TEXT_FORMAT_TRANSFORMERS,
    ...ELEMENT_TRANSFORMERS,
];
