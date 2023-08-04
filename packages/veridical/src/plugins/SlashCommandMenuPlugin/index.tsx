import { OPEN_COMMAND_MENU } from '@/commands';
import { $isCodeHighlightNode, $isCodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect } from 'react';

const SEARCH_EXPRESSION = /\/(?<search>\w*)$/;

export default function SlashCommandMenuPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();

                if (!$isRangeSelection(selection)) return;

                const node = selection.getNodes()[0];
                if ($isCodeNode(node) || $isCodeHighlightNode(node)) return;

                const parent = node.getParent();
                const lastChild = parent?.getLastChild();

                if (lastChild?.getKey() !== node.getKey()) return;

                const [anchorOffset, focusOffset] =
                    selection.getCharacterOffsets();

                const text = node.getTextContent();

                if (
                    anchorOffset === focusOffset &&
                    anchorOffset === text.length
                ) {
                    const match = text.match(/\/$/);
                    if (match) {
                        editor.dispatchCommand(OPEN_COMMAND_MENU, {
                            searchExpression: SEARCH_EXPRESSION,
                        });
                    }
                }
            });
        });
    }, [editor]);

    return null;
}
