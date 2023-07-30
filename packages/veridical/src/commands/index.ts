import { ImageNode } from '@/nodes';
import { ListType } from '@lexical/list';
import { HeadingTagType } from '@lexical/rich-text';
import { createCommand, LexicalNode } from 'lexical';

export const IMAGE_DIALOG_COMMAND = createCommand<{
    imageNode?: ImageNode | null;
    action: 'edit' | 'add';
}>();

type InsertCommandPayload = {
    selectedNode?: LexicalNode;
    content?: string;
    position?: 'before' | 'after';
    replaceOnEmptyParagraph?: boolean;
};

/*Command menu*/
export const OPEN_COMMAND_MENU = createCommand<{
    searchExpression: RegExp;
}>('OPEN_COMMAND_MENU');

export const INSERT_HEADING_COMMAND = createCommand<
    InsertCommandPayload & { headingTag: HeadingTagType }
>('INSERT_HEADING_COMMAND');

export const INSERT_CODE_COMMAND = createCommand<
    Omit<InsertCommandPayload, 'content'> & {
        language?: string | null;
    }
>('INSERT_CODE_COMMAND');

export const INSERT_LIST_COMMAND = createCommand<
    InsertCommandPayload & {
        type: ListType;
    }
>('INSERT_LIST_COMMAND');

export const INSERT_PARAGRAPH_COMMAND = createCommand<InsertCommandPayload>(
    'INSERT_PARAGRAPH_COMMAND',
);

export const MOVE_SELECTED_NODE_COMMAND = createCommand<{
    dir: 'up' | 'down';
}>('MOVE_SELECTED_NODE_COMMAND');
