import {
    INSERT_CODE_COMMAND,
    INSERT_HEADING_COMMAND,
    INSERT_IMAGE_COMMAND,
    INSERT_LIST_COMMAND,
    INSERT_PARAGRAPH_COMMAND,
    INSERT_QUOTE_COMMAND,
} from '@/commands';
import { $createImageNode } from '@/nodes';
import { $getTopLevelSelectedNode } from '@/utils/selection';
import { $createCodeNode } from '@lexical/code';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
    $createParagraphNode,
    $createTextNode,
    $getEditor,
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
                replaceOnEmptyParagraph = true,
            }) => {
                const selectedNode = node || $getTopLevelSelectedNode();

                if (!selectedNode) return false;
                const offset = content?.length || 0;

                const editor = $getEditor();
                const heading = $createHeadingNode(headingTag);
                if (
                    replaceOnEmptyParagraph &&
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(heading);
                    heading.select(offset, offset);
                } else {
                    selectedNode.insertAfter(heading);
                    heading.select(offset, offset);
                }
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
                } else {
                    selectedNode.insertAfter(code);
                    code.select(0, 0);
                }
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
                } else {
                    selectedNode.insertAfter(list);
                    list.select(offset, offset);
                }
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
                } else {
                    selectedNode.insertAfter(p);
                    p.select(offset, offset);
                }
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
                } else {
                    selectedNode.insertAfter(quote);
                    quote.select(offset, offset);
                }
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
    return null;
}

export function RegisterInsertImageCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            INSERT_IMAGE_COMMAND,
            (payload) => {
                const topLevelSelectedNode = $getTopLevelSelectedNode();
                if (!topLevelSelectedNode) return false;
                const imageNode = $createImageNode({ ...payload });
                if (
                    $isParagraphNode(topLevelSelectedNode) &&
                    topLevelSelectedNode.getTextContent() == ''
                ) {
                    topLevelSelectedNode.insertBefore(imageNode);
                } else {
                    topLevelSelectedNode.insertAfter(imageNode);
                    const p = $createParagraphNode();
                    imageNode.insertAfter(p);
                    p.select(0, 0);
                }
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    });
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
            <RegisterInsertImageCommand />
        </>
    );
}
