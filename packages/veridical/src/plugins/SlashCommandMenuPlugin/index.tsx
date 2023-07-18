import { OPEN_COMMAND_MENU } from '@/commands';
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

                const [anchorOffset, focusOffset] =
                    selection.getCharacterOffsets();
                const node = selection.getNodes()[0];
                const text = node.getTextContent();

                if (
                    anchorOffset === focusOffset &&
                    anchorOffset === text.length
                ) {
                    const match = text.match(/\/$/);
                    if (match) {
                        console.log('SlashCommandMenuPlugin: Match');
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
