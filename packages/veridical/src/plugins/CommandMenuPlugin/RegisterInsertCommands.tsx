import {
    INSERT_CODE_COMMAND,
    INSERT_HEADING_COMMAND,
    INSERT_LIST_COMMAND,
    INSERT_PARAGRAPH_COMMAND,
    INSERT_QUOTE_COMMAND,
} from '@/commands';
import { $getTopLevelSelectedNode } from '@/utils/selection';
import { $createCodeNode } from '@lexical/code';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
    $createParagraphNode,
    $createTextNode,
    $isParagraphNode,
    COMMAND_PRIORITY_LOW,
} from 'lexical';
import React, { useEffect } from 'react';

export function RegisterInsertHeadingCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_HEADING_COMMAND,
            ({
                headingTag,
                selectedNode: node,
                content,
                position,
                replaceOnEmptyParagraph = true,
            }) => {
                const selectedNode = node || $getTopLevelSelectedNode();

                if (!selectedNode) return false;

                const offset = content?.length || 0;
                const heading = $createHeadingNode(headingTag);
                const textNode = $createTextNode(content);
                heading.append(textNode);
                if (
                    replaceOnEmptyParagraph &&
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(heading);
                    heading.select(offset, offset);
                    return true;
                }

                switch (position) {
                    case 'after':
                        selectedNode.insertAfter(heading);
                        break;
                    case 'before':
                        selectedNode.insertBefore(heading);
                        break;
                    default:
                        selectedNode.insertAfter(heading);
                        break;
                }

                heading.select(offset, offset);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);

    return null;
}

export function RegisterInsertCodeCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            INSERT_CODE_COMMAND,
            ({
                selectedNode: node,
                language,
                position,
                replaceOnEmptyParagraph = true,
            }) => {
                const selectedNode = node || $getTopLevelSelectedNode();

                if (!selectedNode) return false;

                const code = $createCodeNode(language);

                if (
                    replaceOnEmptyParagraph &&
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(code);
                    code.select(0, 0);
                    return true;
                }

                switch (position) {
                    case 'after':
                        selectedNode.insertAfter(code);
                        break;
                    case 'before':
                        selectedNode.insertBefore(code);
                        break;
                    default:
                        selectedNode.insertAfter(code);
                        break;
                }

                code.select(0, 0);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    });
    return null;
}

export function RegisterInsertListCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            INSERT_LIST_COMMAND,
            ({
                selectedNode: node,
                type,
                position,
                content,
                replaceOnEmptyParagraph = true,
            }) => {
                const selectedNode = node || $getTopLevelSelectedNode();

                if (!selectedNode) return false;

                const offset = content?.length || 0;
                const list = $createListNode(type);
                const item = $createListItemNode();
                item.append($createTextNode(content));
                list.append(item);

                if (
                    replaceOnEmptyParagraph &&
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(list);
                    item.select(offset, offset);
                    return true;
                }
                switch (position) {
                    case 'after':
                        selectedNode.insertAfter(list);
                        break;
                    case 'before':
                        selectedNode.insertBefore(list);
                        break;
                    default:
                        selectedNode.insertAfter(list);
                        break;
                }

                list.select(offset, offset);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    });
    return null;
}

export function RegisterInsertParagraphCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_PARAGRAPH_COMMAND,
            ({
                selectedNode: node,
                position,
                content,
                replaceOnEmptyParagraph = true,
            }) => {
                const selectedNode = node || $getTopLevelSelectedNode();

                if (!selectedNode) return false;

                const offset = content?.length || 0;
                const p = $createParagraphNode();
                const text = $createTextNode(content);
                p.append(text);

                if (
                    replaceOnEmptyParagraph &&
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(p);
                    p.select(offset, offset);
                    return true;
                }

                switch (position) {
                    case 'after':
                        selectedNode.insertAfter(p);
                        break;
                    case 'before':
                        selectedNode.insertBefore(p);
                        break;
                    default:
                        selectedNode.insertAfter(p);
                        break;
                }

                p.select(offset, offset);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
}

export function RegisterInsertQuoteCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_QUOTE_COMMAND,
            ({
                selectedNode: node,
                position,
                content,
                replaceOnEmptyParagraph = true,
            }) => {
                const selectedNode = node || $getTopLevelSelectedNode();

                if (!selectedNode) return false;

                const offset = content?.length || 0;
                const quote = $createQuoteNode();
                const text = $createTextNode(content);
                quote.append(text);

                if (
                    replaceOnEmptyParagraph &&
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(quote);
                    quote.select(offset, offset);
                    return true;
                }

                switch (position) {
                    case 'after':
                        selectedNode.insertAfter(quote);
                        break;
                    case 'before':
                        selectedNode.insertBefore(quote);
                        break;
                    default:
                        selectedNode.insertAfter(quote);
                        break;
                }

                quote.select(offset, offset);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
}

export function RegisterInsertCommands() {
    return (
        <>
            <RegisterInsertHeadingCommand />
            <RegisterInsertCodeCommand />
            <RegisterInsertListCommand />
            <RegisterInsertParagraphCommand />
            <RegisterInsertQuoteCommand />
        </>
    );
}
