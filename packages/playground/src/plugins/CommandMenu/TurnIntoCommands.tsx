import {
    Fa1,
    Fa2,
    Fa3,
    FaHeading,
    FaListOl,
    FaListUl,
    FaParagraph,
    FaQuoteRight,
} from 'react-icons/fa6';
import {
    TURN_INTO_HEADING_COMMAND,
    TURN_INTO_LIST_COMMAND,
    TURN_INTO_PARAGRAPH_COMMAND,
    TURN_INTO_QUOTE_COMMAND,
} from 'veridical/commands';
import { CommandMenuPlugin as CommandMenu } from 'veridical/plugins';
import SmallCommandItem, { SmallCommandItemProps } from './SmallCommandItem';

export default function TurnIntoCommands() {
    return (
        <CommandMenu.Group
            heading="Turn Into"
            className="px-1 pt-2 text-xs font-bold text-muted-foreground"
        >
            {TURN_INTO_COMMAND_ITEMS.map((item) => {
                return <SmallCommandItem key={item.name} {...item} />;
            })}
        </CommandMenu.Group>
    );
}

function H1() {
    return (
        <div className="relative flex items-end">
            <FaHeading className="text-lg text-foreground pl-1" />
            <Fa1 className="text-foreground pr-0.5" />
        </div>
    );
}

function H2() {
    return (
        <div className="relative flex items-end">
            <FaHeading className="text-foreground text-lg pl-1" />
            <Fa2 className="text-foreground pr-0.5" />
        </div>
    );
}
function H3() {
    return (
        <div className="relative flex items-end">
            <FaHeading className="text-foreground text-lg pl-1" />
            <Fa3 className="text-foreground pr-0.5" />
        </div>
    );
}

const iconClassName = 'text-lg text-foreground';

const TURN_INTO_COMMAND_ITEMS: SmallCommandItemProps[] = [
    {
        name: 'Heading 1',
        value: 'Turn into Heading 1',
        icon: <H1 />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_HEADING_COMMAND, {
                headingTag: 'h1',
            }),
    },
    {
        name: 'Heading 2',
        value: 'Turn into Heading 2',
        icon: <H2 />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_HEADING_COMMAND, {
                headingTag: 'h2',
            }),
    },
    {
        name: 'Heading 3',
        value: 'Turn into Heading 3',
        icon: <H3 />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_HEADING_COMMAND, {
                headingTag: 'h3',
            }),
    },
    {
        name: 'Paragraph',
        value: 'Turn into paragraph',
        icon: <FaParagraph className={iconClassName} />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_PARAGRAPH_COMMAND, {}),
    },
    {
        name: 'Ordered list',
        value: 'Turn into ordered list',
        icon: <FaListOl className={iconClassName} />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_LIST_COMMAND, {
                listType: 'number',
            }),
    },
    {
        name: 'Unordered list',
        value: 'Turn into unordered list',
        icon: <FaListUl className={iconClassName} />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_LIST_COMMAND, {
                listType: 'bullet',
            }),
    },
    {
        name: 'quote',
        value: 'Turn into quote',
        icon: <FaQuoteRight className={iconClassName} />,
        onSelect: (editor) =>
            editor.dispatchCommand(TURN_INTO_QUOTE_COMMAND, {}),
    },
];
