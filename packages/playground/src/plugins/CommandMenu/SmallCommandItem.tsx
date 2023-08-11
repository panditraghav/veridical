import { LexicalEditor } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CommandMenuPlugin as CommandMenu } from 'veridical/plugins';

export type SmallCommandItemProps = {
    name: string;
    value: string;
    icon: React.ReactNode;
    onSelect: (editor: LexicalEditor, value: string) => void;
};

export default function SmallCommandItem({
    value,
    name,
    onSelect,
    icon,
}: SmallCommandItemProps) {
    const [editor] = useLexicalComposerContext();
    return (
        <CommandMenu.Item
            value={value}
            onSelect={(value) => {
                onSelect(editor, value);
            }}
            className="my-1 flex cursor-pointer rounded-md px-1 py-0.5 data-[selected]:bg-muted items-center"
        >
            <div className="rounded-md border flex w-9 h-9 justify-center items-center">
                {icon}
            </div>
            <div className="text-sm font-normal text-foreground ml-1">
                {name}
            </div>
        </CommandMenu.Item>
    );
}
