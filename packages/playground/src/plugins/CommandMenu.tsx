import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalEditor } from 'lexical';
import {
    INSERT_LIST_COMMAND,
    INSERT_HEADING_COMMAND,
    INSERT_CODE_COMMAND,
    MOVE_SELECTED_NODE_COMMAND,
} from 'veridical/commands';
import {
    CommandMenuPlugin as CommandMenu,
    RegisterInsertCommands,
    RegisterMoveCommand,
} from 'veridical/plugins/CommandMenuPlugin';
import {
    CodeIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    OlIcon,
    UlIcon,
    MoveUpIcon,
    MoveDownIcon,
} from '../components/Icons';

export default function CommandMenuPlugin() {
    return (
        <>
            <CommandMenu>
                <CommandMenu.Content className="data-[state=open] flex h-[270px] flex-col data-[side=top]:justify-end  data-[state=closed]:duration-200 data-[state=open]:duration-150 data-[state=closed]:ease-out data-[state=open]:ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=open]:zoom-in-95">
                    <CommandMenu.Command
                        defaultValue="Heading 1"
                        className="box-border flex flex-col rounded-md border border-border bg-background"
                    >
                        <CommandMenu.List className="max-h-[270px] w-[280px] overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600">
                            <CommandMenu.Empty className="py-2 text-center">
                                No result
                            </CommandMenu.Empty>
                            <InsertCommands />
                            <MoveCommands />
                        </CommandMenu.List>
                    </CommandMenu.Command>
                </CommandMenu.Content>
            </CommandMenu>
            <RegisterInsertCommands />
            <RegisterMoveCommand />
        </>
    );
}

const iconProps: React.ComponentPropsWithoutRef<typeof H1Icon> = {
    size: 'md',
    className: 'fill-foreground',
};

function InsertCommands() {
    return (
        <CommandMenu.Group
            heading="Insert"
            className="px-1 pt-2 text-xs font-bold text-muted-foreground"
        >
            {INSERT_COMMAND_ITEMS.map((item) => {
                return <CommandItem key={item.name} {...item} />;
            })}
        </CommandMenu.Group>
    );
}

function MoveCommands() {
    return (
        <CommandMenu.Group
            heading="Move"
            className="px-1 pt-2 text-xs font-bold text-muted-foreground"
        >
            {MOVE_COMMAND_ITEMS.map((item) => {
                return <CommandItem key={item.name} {...item} />;
            })}
        </CommandMenu.Group>
    );
}

type CommandItemType = {
    name: string;
    description: string;
    icon: React.ReactNode;
    onSelect: (editor: LexicalEditor, value: string) => void;
};

function CommandItem({ name, description, icon, onSelect }: CommandItemType) {
    const [editor] = useLexicalComposerContext();
    return (
        <CommandMenu.Item
            value={name + ' ' + description}
            onSelect={(value) => {
                onSelect(editor, value);
            }}
            className="my-1 flex cursor-pointer rounded-md px-1 py-2 data-[selected]:bg-muted"
        >
            <div className="rounded-md border p-1">{icon}</div>
            <div className="px-2 py-1">
                <div className="text-lg font-medium text-foreground">
                    {name}
                </div>
                <div className="text-xs text-foreground/60">{description}</div>
            </div>
        </CommandMenu.Item>
    );
}

const INSERT_COMMAND_ITEMS: CommandItemType[] = [
    {
        name: 'Heading 1',
        description: 'Title level heading',
        icon: <H1Icon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                headingTag: 'h1',
            }),
    },
    {
        name: 'Heading 2',
        description: 'Second level heading',
        icon: <H2Icon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                headingTag: 'h2',
            }),
    },
    {
        name: 'Heading 3',
        description: 'Third level heading',
        icon: <H3Icon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                headingTag: 'h3',
            }),
    },
    {
        name: 'Ordered List',
        description: 'Numbered list',
        icon: <OlIcon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_LIST_COMMAND, { type: 'number' }),
    },
    {
        name: 'Unordered List',
        description: 'Bullet list',
        icon: <UlIcon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_LIST_COMMAND, { type: 'bullet' }),
    },
    {
        name: 'Code',
        description: 'Write some code',
        icon: <CodeIcon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_CODE_COMMAND, {
                language: 'JavaScript',
            }),
    },
];

const MOVE_COMMAND_ITEMS: CommandItemType[] = [
    {
        name: 'Move Up',
        description: 'Move selected node up',
        icon: <MoveUpIcon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(MOVE_SELECTED_NODE_COMMAND, { dir: 'up' }),
    },
    {
        name: 'Move Down',
        description: 'Move selected node down',
        icon: <MoveDownIcon {...iconProps} />,
        onSelect: (editor) =>
            editor.dispatchCommand(MOVE_SELECTED_NODE_COMMAND, { dir: 'down' }),
    },
];
