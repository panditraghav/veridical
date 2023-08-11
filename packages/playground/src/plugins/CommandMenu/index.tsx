import { MdMoveDown, MdMoveUp } from 'react-icons/md';
import { MOVE_SELECTED_NODE_COMMAND } from 'veridical/commands';
import {
    CommandMenuPlugin as CommandMenu,
    SlashCommandMenuPlugin,
} from 'veridical/plugins';
import InsertCommands from './InsertCommands';
import SmallCommandItem, { SmallCommandItemProps } from './SmallCommandItem';
import TurnIntoCommands from './TurnIntoCommands';

export default function CommandMenuPlugin() {
    return (
        <>
            <CommandMenu>
                <CommandMenu.Content className="data-[state=open] flex h-[270px] flex-col data-[side=top]:justify-end  data-[state=closed]:duration-200 data-[state=open]:duration-150 data-[state=closed]:ease-out data-[state=open]:ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=open]:zoom-in-95">
                    <CommandMenu.Command className="box-border flex flex-col rounded-md border border-border bg-background">
                        <CommandMenu.List className="max-h-[270px] w-[280px] overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600">
                            <CommandMenu.Empty className="py-2 text-center">
                                No result
                            </CommandMenu.Empty>
                            <InsertCommands />
                            <MoveCommands />
                            <TurnIntoCommands />
                        </CommandMenu.List>
                    </CommandMenu.Command>
                </CommandMenu.Content>
            </CommandMenu>
            <SlashCommandMenuPlugin />
        </>
    );
}

function MoveCommands() {
    return (
        <CommandMenu.Group
            heading="Move"
            className="px-1 pt-2 text-xs font-bold text-muted-foreground"
        >
            {MOVE_COMMAND_ITEMS.map((item) => {
                return <SmallCommandItem key={item.name} {...item} />;
            })}
        </CommandMenu.Group>
    );
}

const ICON_CLASSNAME = 'text-xl text-foreground';

const MOVE_COMMAND_ITEMS: SmallCommandItemProps[] = [
    {
        name: 'Move Up',
        value: 'move up',
        icon: <MdMoveUp className={ICON_CLASSNAME} />,
        onSelect: (editor) =>
            editor.dispatchCommand(MOVE_SELECTED_NODE_COMMAND, { dir: 'up' }),
    },
    {
        name: 'Move Down',
        value: 'move down',
        icon: <MdMoveDown className={ICON_CLASSNAME} />,
        onSelect: (editor) =>
            editor.dispatchCommand(MOVE_SELECTED_NODE_COMMAND, { dir: 'down' }),
    },
];
