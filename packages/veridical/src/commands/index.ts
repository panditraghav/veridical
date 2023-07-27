import { ImageNode } from '@/nodes';
import { ListType } from '@lexical/list';
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

export const INSERT_HEADING_COMMAND = createCommand<{
    headingTag: HeadingTagType;
    node?: LexicalNode;
}>('INSERT_HEADING_COMMAND');

export const INSERT_CODE_COMMAND = createCommand<{
    language?: string | null;
    node?: LexicalNode;
}>('INSERT_CODE_COMMAND');

export const INSERT_LIST_COMMAND = createCommand<{
    type: ListType;
    node?: LexicalNode;
}>('INSERT_LIST_COMMAND');

export const MOVE_SELECTED_NODE_COMMAND = createCommand<{ dir: 'up' | 'down' }>(
    'MOVE_UP_COMMAND',
);
