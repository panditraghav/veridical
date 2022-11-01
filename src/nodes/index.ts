import { Klass, LexicalNode } from "lexical";
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ImageNode } from "./ImageNode";

export const defaultEditorNodes: Array<Klass<LexicalNode>> = [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    MarkNode,
    OverflowNode,
    HorizontalRuleNode,
    TableCellNode,
    TableCellNode,
    TableRowNode,
    HashtagNode,
    CodeHighlightNode,
    CodeNode,
    ImageNode,
]
