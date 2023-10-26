import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';
import { INSERT_IMAGE_COMMAND } from 'veridical/commands';
import { ImageDialogPlugin } from 'veridical/plugins';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext();
    const [imageUrl, setImageUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [isMaxWidth, setIsMaxWidth] = useState(true);

    function handleInsert() {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            console.log(img.naturalHeight, img.naturalWidth);
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src: imageUrl,
                altText: alt,
                isMaxWidth,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
            });
            setImageUrl('');
            setAlt('');
            setIsMaxWidth(true);
        };
    }

    return (
        <ImageDialogPlugin
            onOpenChange={(open) => {
                if (!open) editor.focus();
            }}
        >
            <ImageDialogPlugin.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <ImageDialogPlugin.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <ImageDialogPlugin.Title className="text-lg font-semibold leading-none tracking-tight">
                        Insert image
                    </ImageDialogPlugin.Title>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageurl" className="text-right">
                        Image
                    </Label>
                    <Input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        id="imageurl"
                        placeholder="Image url"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="alt" className="text-right">
                        Alt text
                    </Label>
                    <Input
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                        id="alt"
                        placeholder="Alternative text"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ismaxwidth" className="text-right">
                        Maximum width
                    </Label>
                    <div className="col-span-3 items-left">
                        <input
                            checked={isMaxWidth}
                            onChange={(e) => setIsMaxWidth(e.target.checked)}
                            id="ismaxwidth"
                            type="checkbox"
                        />
                    </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <ImageDialogPlugin.Close asChild>
                        <Button onClick={handleInsert}>Insert</Button>
                    </ImageDialogPlugin.Close>
                </div>
            </ImageDialogPlugin.Content>
        </ImageDialogPlugin>
    );
}
