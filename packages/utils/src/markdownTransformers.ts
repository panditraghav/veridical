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
        const src = node.getSrc();
        const alt = node.getAltText();
        const width = node.getWidth();
        const height = node.getHeight();
        const isMaxWidth = node.isMaxWidth();
        return `<img src="${src}" alt="${alt}" height="${height}" width="${width}" data-isMaxWidth="${isMaxWidth}"/>`;
    },
    regExp: /<img src="(.*?)" alt="(.*?)" height="(\d*)" width="(\d*)" data-isMaxWidth="(.*?)"\/>/,
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
                width: parseInt(width),
                height: parseInt(height),
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
    ...TEXT_MATCH_TRANSFORMERS
];