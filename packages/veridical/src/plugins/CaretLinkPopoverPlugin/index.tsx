import { LINK_POPOVER_COMMAND } from '@/commands';
import { $isLinkNode, LinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useRef } from 'react';

export function CaretLinkPopoverPlugin() {
    const [editor] = useLexicalComposerContext();
    const open = useRef(false);
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection) || !selection.isCollapsed())
                    return;
                const node = selection.getNodes()[0];

                const linkNode: LinkNode | null = $isLinkNode(node)
                    ? node
                    : $isLinkNode(node.getParent())
                    ? node.getParent()
                    : null;
                if (linkNode) {
                    editor.dispatchCommand(LINK_POPOVER_COMMAND, {
                        linkNode,
                        autoFocus: false,
                        side: 'bottom',
                    });
                    open.current = true;
                } else {
                    if (open.current) {
                        editor.dispatchCommand(LINK_POPOVER_COMMAND, null);
                        open.current = false;
                    }
                }
            });
        });
    }, [editor]);
    return null;
}
