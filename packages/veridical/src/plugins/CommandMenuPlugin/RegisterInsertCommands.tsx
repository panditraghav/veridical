import {
    INSERT_CODE_COMMAND,
    INSERT_HEADING_COMMAND,
    INSERT_LIST_COMMAND,
} from '@/commands';
import { $getTopLevelSelectedNode } from '@/utils/selection';
import { $createCodeNode } from '@lexical/code';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import {
    $createTextNode,
    $isParagraphNode,
    COMMAND_PRIORITY_LOW,
    LexicalNode,
} from 'lexical';
import React, { useEffect } from 'react';

export function RegisterInsertHeadingCommand() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_HEADING_COMMAND,
            ({ headingTag, node }) => {
                let selectedNode: LexicalNode | null = null;

                if (node) {
                    selectedNode = node;
                } else {
                    selectedNode = $getTopLevelSelectedNode();
                }
                console.log('Insert Heading command', {
                    headingTag,
                    node,
                    selectedNode,
                });
                if (!selectedNode) return false;

                const heading = $createHeadingNode(headingTag);
                const textNode = $createTextNode();
                heading.append(textNode);
                if (
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(heading);
                } else {
                    selectedNode.insertAfter(heading);
                }
                heading.select(0, 0);

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
            ({ node, language }) => {
                let selectedNode: LexicalNode | null = null;

                if (node) {
                    selectedNode = node;
                } else {
                    selectedNode = $getTopLevelSelectedNode();
                }
                if (!selectedNode) return false;

                const code = $createCodeNode(language);
                if (
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(code);
                } else {
                    selectedNode.insertAfter(code);
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
            ({ node, type }) => {
                let selectedNode: LexicalNode | null = null;

                if (node) {
                    selectedNode = node;
                } else {
                    selectedNode = $getTopLevelSelectedNode();
                }
                if (!selectedNode) return false;

                const list = $createListNode(type);
                const item = $createListItemNode();
                list.append(item);
                if (
                    selectedNode.getTextContent() === '' &&
                    $isParagraphNode(selectedNode)
                ) {
                    selectedNode.replace(list);
                } else {
                    selectedNode.insertAfter(list);
                }
                list.select(0, 0);

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
        </>
    );
}
