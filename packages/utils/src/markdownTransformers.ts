import { $createImageNode, $isImageNode, ImageNode } from '@veridical/nodes';

import {
    Transformer,
    ElementTransformer,
    TextMatchTransformer,
    TextFormatTransformer,
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
} from '@lexical/markdown';
import { $createParagraphNode } from 'lexical';

const IMAGE: ElementTransformer = {
    dependencies: [ImageNode],
    export: (node) => {
        if (!$isImageNode(node)) return null;
        return `<img src="${node.getSrc()}" alt="${node.getAltText()}" height="${node.getHeight()}" width="${node.getWidth()}"/>`;
    },
    regExp: /<img src="(.*?)" alt="(.*?)" height="(\d*)" width="(\d*)"\/>/,
    replace: (parentNode, children, match, isImport) => {
        const src = match[1];
        const altText = match[2];
        const height = match[3];
        const width = match[4];
        if (altText !== '' && src !== '') {
            const image = $createImageNode({
                src,
                altText,
                width: parseInt(width),
                height: parseInt(height),
            });
            parentNode.insertAfter($createParagraphNode());
            parentNode.replace(image);
        }
    },
    type: 'element',
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

export const MARKDOWN_TRANSFORMERS: Array<Transformer> = [
    ...TEXT_FORMAT_TRANSFORMERS,
    ...ELEMENT_TRANSFORMERS,
];
