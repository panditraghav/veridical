import { ImageNode } from '@/nodes';
import { LinkAttributes, LinkNode } from '@lexical/link';
import { ListType } from '@lexical/list';
import { HeadingTagType } from '@lexical/rich-text';
import { PopoverContentProps } from '@radix-ui/react-popover';
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

export const INSERT_QUOTE_COMMAND = createCommand<InsertCommandPayload>(
    'INSERT_QUOTE_COMMAND',
);

export const MOVE_SELECTED_NODE_COMMAND = createCommand<{
    dir: 'up' | 'down';
}>('MOVE_SELECTED_NODE_COMMAND');

type LinkPopoverCommandPayload =
    | ({
          linkNode?: LinkNode;
          autoFocus?: boolean;
          side?: PopoverContentProps['side'];
      } & LinkAttributes)
    | null;

export const LINK_POPOVER_COMMAND = createCommand<LinkPopoverCommandPayload>(
    'LINK_POPOVER_COMMAND',
);

/*---------------Turn into commands-----------------*/

type TurnIntoHeadingCommandPayload = {
    headingTag: HeadingTagType;
    selectedNode?: LexicalNode;
    textOnly?: boolean;
};

export const TURN_INTO_HEADING_COMMAND =
    createCommand<TurnIntoHeadingCommandPayload>('TURN_INTO_HEADING_COMMAND');

export const TURN_INTO_PARAGRAPH_COMMAND = createCommand<{
    selectedNode?: LexicalNode;
    textOnly?: boolean;
}>('TURN_INTO_PARAGRAPH_COMMAND');

export const TURN_INTO_QUOTE_COMMAND = createCommand<{
    selectedNode?: LexicalNode;
    textOnly?: boolean;
}>('TURN_INTO_QUOTE_COMMAND');

export const TURN_INTO_LIST_COMMAND = createCommand<{
    selectedNode?: LexicalNode;
    listType: ListType;
    textOnly?: boolean;
}>('TURN_INTO_LIST_COMMAND');
