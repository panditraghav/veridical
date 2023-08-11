import { LexicalEditor } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CommandMenuPlugin as CommandMenu } from 'veridical/plugins';

export type LargeCommandItemType = {
    name: string;
    description: string;
    icon: React.ReactNode;
    onSelect: (editor: LexicalEditor, value: string) => void;
};

export function LargeCommandItem({
    name,
    description,
    icon,
    onSelect,
}: LargeCommandItemType) {
    const [editor] = useLexicalComposerContext();
    return (
        <CommandMenu.Item
            value={name + ' ' + description}
            onSelect={(value) => {
                onSelect(editor, value);
            }}
            className="my-1 flex cursor-pointer rounded-md px-1 py-2 data-[selected]:bg-muted"
        >
            <div className="rounded-md border flex w-12 h-12 justify-center items-center">
                {icon}
            </div>
            <div className="px-2 py-1">
                <div className="text-lg font-medium text-foreground">
                    {name}
                </div>
                <div className="text-xs text-foreground/60">{description}</div>
            </div>
        </CommandMenu.Item>
    );
}
