import { OPEN_ADD_IMAGE_DIALOG } from '@/commands';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as React from 'react';

export default function ImageDialogPlugin({
    children,
    onOpenChange,
}: {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
}) {
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        return editor.registerCommand(
            OPEN_ADD_IMAGE_DIALOG,
            () => {
                setOpen(true);
                onOpenChange?.(true);
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor, onOpenChange]);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(open) => {
                setOpen(open);
                onOpenChange?.(open);
            }}
        >
            <Dialog.Portal>{children}</Dialog.Portal>
        </Dialog.Root>
    );
}

ImageDialogPlugin.Content = Dialog.Content;
ImageDialogPlugin.Close = Dialog.Close;
ImageDialogPlugin.Overlay = Dialog.Overlay;
ImageDialogPlugin.Title = Dialog.Title;
ImageDialogPlugin.Description = Dialog.Description;
