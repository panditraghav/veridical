import { Klass, LexicalNode } from 'lexical';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ImageNode, $createImageNode, $isImageNode } from './ImageNode';

export const defaultEditorNodes: Array<Klass<LexicalNode>> = [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    OverflowNode,
    HorizontalRuleNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    CodeHighlightNode,
    CodeNode,
    ImageNode,
    LinkNode,
    AutoLinkNode,
];

export { $createImageNode, $isImageNode, ImageNode };
