import { $createImageNode, $isImageNode, ImageNode } from '../nodes';

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

export const IMAGE: ElementTransformer = {
    dependencies: [ImageNode],
    export: (node) => {
        if (!$isImageNode(node)) return null;
        const src = node.getSrc();
        const alt = node.getAltText();
        const height = node.getNaturalHeight();
        const width = node.getNaturalWidth();
        const isMaxWidth = node.isMaxWidth();
        return `<img src="${src}" alt="${alt}" data-natural-height="${height}" data-natural-width="${width}" data-is-max-width="${isMaxWidth}"/>`;
    },
    regExp: /<img src="(.*?)" alt="(.*?)" data-natural-height="(\d*)" data-natural-width="(\d*)" data-is-max-width="(.*?)"\/>/,
    replace: (parentNode, children, match, isImport) => {
        const src = match[1];
        const altText = match[2];
        const height = match[3];
        const width = match[4];
        const isMaxWidthStr = match[5];
        let isMaxWidth = false;
        if (isMaxWidthStr === 'true') isMaxWidth = true;
        if (altText !== '' && src !== '') {
            const image = $createImageNode({
                src,
                altText,
                naturalWidth: parseInt(width),
                naturalHeight: parseInt(height),
                isMaxWidth: isMaxWidth,
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
    ...TEXT_MATCH_TRANSFORMERS,
];
