import {
    Fa1,
    Fa2,
    Fa3,
    FaCode,
    FaHeading,
    FaListOl,
    FaListUl,
    FaParagraph,
    FaQuoteRight,
} from 'react-icons/fa6';
import { CommandMenuPlugin as CommandMenu } from 'veridical';
import {
    INSERT_CODE_COMMAND,
    INSERT_HEADING_COMMAND,
    INSERT_LIST_COMMAND,
    INSERT_PARAGRAPH_COMMAND,
    INSERT_QUOTE_COMMAND,
} from 'veridical/commands';
import { LargeCommandItemType, LargeCommandItem } from './LargeCommandItem';

export default function InsertCommands() {
    return (
        <CommandMenu.Group
            heading="Insert"
            className="px-1 pt-2 text-xs font-bold text-muted-foreground"
        >
            {INSERT_COMMAND_ITEMS.map((item) => {
                return <LargeCommandItem key={item.name} {...item} />;
            })}
        </CommandMenu.Group>
    );
}

const ICON_CLASSNAME = 'text-3xl text-foreground';

function H1() {
    return (
        <div className="relative flex items-end">
            <FaHeading className="text-foreground text-2xl pl-1" />
            <Fa1 className="text-foreground pr-0.5" />
        </div>
    );
}
function H2() {
    return (
        <div className="relative flex items-end">
            <FaHeading className="text-foreground text-2xl pl-1" />
            <Fa2 className="text-foreground pr-0.5" />
        </div>
    );
}
function H3() {
    return (
        <div className="relative flex items-end">
            <FaHeading className="text-foreground text-2xl pl-1" />
            <Fa3 className="text-foreground pr-0.5" />
        </div>
    );
}

const INSERT_COMMAND_ITEMS: LargeCommandItemType[] = [
    {
        name: 'Heading 1',
        description: 'Title level heading',
        icon: <H1 />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                headingTag: 'h1',
            }),
    },
    {
        name: 'Heading 2',
        description: 'Second level heading',
        icon: <H2 />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                headingTag: 'h2',
            }),
    },
    {
        name: 'Heading 3',
        description: 'Third level heading',
        icon: <H3 />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                headingTag: 'h3',
            }),
    },
    {
        name: 'Ordered List',
        description: 'Numbered list',
        icon: <FaListOl className={ICON_CLASSNAME} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_LIST_COMMAND, { type: 'number' }),
    },
    {
        name: 'Unordered List',
        description: 'Bullet list',
        icon: <FaListUl className={ICON_CLASSNAME} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_LIST_COMMAND, { type: 'bullet' }),
    },
    {
        name: 'Quote',
        description: 'Write a quote',
        icon: <FaQuoteRight className={ICON_CLASSNAME} />,
        onSelect: (editor) => editor.dispatchCommand(INSERT_QUOTE_COMMAND, {}),
    },
    {
        name: 'Code',
        description: 'Write some code',
        icon: <FaCode className={ICON_CLASSNAME} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_CODE_COMMAND, {
                language: 'JavaScript',
            }),
    },
    {
        name: 'Paragraph',
        description: 'Text node',
        icon: <FaParagraph className={ICON_CLASSNAME} />,
        onSelect: (editor) =>
            editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, {}),
    },
];
