import {
    TURN_INTO_HEADING_COMMAND,
    TURN_INTO_LIST_COMMAND,
    TURN_INTO_PARAGRAPH_COMMAND,
    TURN_INTO_QUOTE_COMMAND,
} from '@/commands';
import { $getTopLevelSelectedNode } from '@/utils';
import {
    $createListItemNode,
    $createListNode,
    $isListItemNode,
    $isListNode,
    ListItemNode,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
    $createLineBreakNode,
    $createParagraphNode,
    $createTextNode,
    $isElementNode,
    $isLineBreakNode,
    COMMAND_PRIORITY_EDITOR,
    ElementNode,
    LexicalNode,
    TextNode,
} from 'lexical';
import React, { useEffect } from 'react';

function $replaceNode(
    selectedNode: ElementNode,
    replaceWith: ElementNode,
    textOnly?: boolean,
) {
    const children = selectedNode.getChildren();

    if (textOnly) {
        /*
         * selectedNode.getTextContent() will give text with '\n' character.
         * Instead of that we should use the LineBreakNode for new-line
         * */
        let lastTextNode: TextNode | undefined; // For selection
        let selectionOffset: number | undefined; // For selection

        for (const child of children) {
            if ($isLineBreakNode(child)) {
                replaceWith.append(child);
            } else {
                const textContent = child.getTextContent();
                const textNode = $createTextNode(textContent);
                selectionOffset = textContent.length;
                lastTextNode = textNode;
                replaceWith.append(textNode);
            }
        }

        selectedNode.replace(replaceWith);
        lastTextNode?.select(selectionOffset, selectionOffset);
        return;
    }

    if ($isListNode(selectedNode)) {
        // To insert a LineBreakNode after every list item
        for (let i = 0; i < children.length; i++) {
            const item = children[i];
            if (!$isListItemNode(item)) continue;
            replaceWith.append(...item.getChildren());
            if (i !== children.length - 1) {
                replaceWith.append($createLineBreakNode());
            }
        }
        selectedNode.replace(replaceWith);
        return;
    }

    replaceWith.append(...children);
    selectedNode.replace(replaceWith);
}

export function RegisterTurnIntoHeadingCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            TURN_INTO_HEADING_COMMAND,
            (payload) => {
                const selectedNode =
                    payload.selectedNode || $getTopLevelSelectedNode();
                if (!selectedNode) return false;

                const heading = $createHeadingNode(payload.headingTag);
                if (
                    !selectedNode.canReplaceWith(heading) ||
                    !$isElementNode(selectedNode)
                )
                    return false;

                $replaceNode(selectedNode, heading, payload.textOnly);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);
    return null;
}

export function RegisterTurnIntoParagraphCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            TURN_INTO_PARAGRAPH_COMMAND,
            (payload) => {
                const selectedNode =
                    payload.selectedNode || $getTopLevelSelectedNode();
                if (!selectedNode) return false;
                const paragraph = $createParagraphNode();
                if (
                    !selectedNode.canReplaceWith(paragraph) ||
                    !$isElementNode(selectedNode)
                ) {
                    return false;
                }
                $replaceNode(selectedNode, paragraph, payload.textOnly);

                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);
    return null;
}

export function RegisterTurnIntoQuoteCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            TURN_INTO_QUOTE_COMMAND,
            (payload) => {
                const selectedNode =
                    payload.selectedNode || $getTopLevelSelectedNode();
                if (!selectedNode) return false;
                const quote = $createQuoteNode();
                if (
                    !selectedNode.canReplaceWith(quote) ||
                    !$isElementNode(selectedNode)
                ) {
                    return false;
                }
                $replaceNode(selectedNode, quote, payload.textOnly);

                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);
    return null;
}

export function RegisterTurnIntoListCommand() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            TURN_INTO_LIST_COMMAND,
            (payload) => {
                const selectedNode =
                    payload.selectedNode || $getTopLevelSelectedNode();
                if (!selectedNode) return false;

                const listNode = $createListNode(payload.listType);

                if (
                    !selectedNode.canReplaceWith(listNode) ||
                    !$isElementNode(selectedNode)
                ) {
                    return false;
                }

                const children = selectedNode.getChildren();

                if ($isListNode(selectedNode)) {
                    selectedNode.setListType(payload.listType);
                    return true;
                }

                // Creating new list item on every line break
                let liNode: ListItemNode = $createListItemNode();
                let lastNodeForSelection: LexicalNode | undefined;

                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    if ($isLineBreakNode(child)) {
                        listNode.append(liNode);
                        liNode = $createListItemNode();
                        continue;
                    }
                    liNode.append(child);
                    lastNodeForSelection = child;
                }
                listNode.append(liNode); // Append the last liNode

                selectedNode.replace(listNode);
                const offset = lastNodeForSelection?.getTextContent().length;
                lastNodeForSelection?.select(offset, offset);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);
    return null;
}

export function RegisterTurnIntoCommands() {
    return (
        <>
            <RegisterTurnIntoHeadingCommand />
            <RegisterTurnIntoParagraphCommand />
            <RegisterTurnIntoQuoteCommand />
            <RegisterTurnIntoListCommand />
        </>
    );
}
