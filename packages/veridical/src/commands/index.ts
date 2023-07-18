import { ImageNode } from '@/nodes';
import { HeadingTagType } from '@lexical/rich-text';
import { createCommand, LexicalNode } from 'lexical';

export const IMAGE_DIALOG_COMMAND = createCommand<{
    imageNode?: ImageNode | null;
    action: 'edit' | 'add';
}>();

/*Command menu*/
export const OPEN_COMMAND_MENU = createCommand<{
    searchExpression: RegExp;
}>('OPEN_COMMAND_MENU');

export const INSERT_HEADING_NODE = createCommand<{
    headingTag: HeadingTagType;
    node?: LexicalNode;
}>('INSERT_HEADING_NODE');

export const INSERT_CODE_NODE = createCommand<{
    node?: LexicalNode;
    language?: string | null;
}>('INSERT_CODE_NODE');
