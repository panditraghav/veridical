# Veridical

Veridical is a set of [lexical plugins](https://lexical.dev/docs/react/plugins) and nodes that can be used to make a WYSIWYG (What You See Is What You Get) Editor.
Check out veridical at [https://panditraghav.github.io/veridical](https://panditraghav.github.io/veridical)

## Features

-   CommandMenuPluign - Build notion like command menu
-   SlashCommandMenuPlugin - Open command menu by typing '/'
-   FloatingActionMenuPlugin - Floating action menu for selected text
-   LinkPopoverPlugin - Popover to add links
-   CaretLinkPopoverPlugin - Opens popover when caret is on a `LinkNode`
-   HoveredNodeOptionsPlugin - Shows node options (Add, Drag) on left side of hovered node.
-   PrettierPlugin - Formats code (on pressing `Alt+Shift+F` by default)

## Upcoming features

-   Image Support
-   Table Support

## Basic Editor Setup

```tsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import {
    CodeHighlightPlugin,
    defaultEditorNodes,
    ImagePlugin,
    MarkdownPlugin,
    PrettierPlugin,
    RegisterVeridicalCommands,
} from 'veridical';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import CommandMenuPlugin from '../plugins/CommandMenu';

export default function Editor() {
    return (
        <LexicalComposer
            initialConfig={{
                namespace: 'playground',
                theme: lexicalTheme,
                nodes: defaultEditorNodes,
                editable: true,
                onError: (error: any) => console.log(error),
                //editorState: editorState || initializeEditor,
            }}
        >
            <RegisterVeridicalCommands />
            <div className="mb-24 w-full px-4 md:mx-auto md:w-8/12">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="focus:outline-none" />
                    }
                    placeholder={
                        <div className="relative left-0 top-[-35px] z-[-10] text-muted-foreground">
                            Press / for commands
                        </div>
                    }
                    ErrorBoundary={YourErrorBoundary}
                />
                <MarkdownPlugin />
                <ListPlugin />
                <CodeHighlightPlugin />
                <AutoFocusPlugin />
                <PrettierPlugin />
                <HistoryPlugin />
                <TabIndentationPlugin />
                <ImagePlugin />
                <LinkPlugins />
                <CommandMenuPlugin />
            </div>
        </LexicalComposer>
    );
}
```

## Plugins

See [lexical plugins](https://lexical.dev/docs/react/plugins) for more information.

### CommandMenuPlugin

The command menu plugin is built using [cmdk](https://cmdk.paco.me/) and [@radix-ui/popover](https://www.radix-ui.com/primitives/docs/components/popover).

#### Usage

```tsx
import 'style.css'; // Your own styles
import {
    CommandMenuPlugin as CommandMenu,
    SlashCommandMenuPlugin,
} from 'veridical/plugins';

import {
    INSERT_HEADING_COMMAND,
    INSERT_CODE_COMMAND,
    INSERT_LIST_COMMAND,
    INSERT_PARAGRAPH_COMMAND,
    INSERT_QUOTE_COMMAND,
} from 'veridical/commands';

import { LexicalEditor } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function CommandMenuPlugin() {
    return (
        <>
            <CommandMenu>
                <CommandMenu.Content className="CommandMenuContent">
                    <CommandMenu.Command className="CommandMenuCommand">
                        <CommandMenu.List className="CommandMenuList">
                            <CommandMenu.Empty className="CommandMenuEmpty">
                                No result
                            </CommandMenu.Empty>
                            <InsertCommands />
                        </CommandMenu.List>
                    </CommandMenu.Command>
                </CommandMenu.Content>
            </CommandMenu>
            <SlashCommandMenuPlugin />
        </>
    );
}

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
            className="LargeCommandItem"
        >
            <div>{icon}</div>
            <div className="LargeCommandItemText">
                <div className="LargeCommandItemName">{name}</div>
                <div className="LargeCommandItemDescription">{description}</div>
            </div>
        </CommandMenu.Item>
    );
}

function InsertCommands() {
    return (
        <CommandMenu.Group heading="Insert" className="CommandMenuGroup">
            {INSERT_COMMAND_ITEMS.map((item) => {
                return <LargeCommandItem key={item.name} {...item} />;
            })}
        </CommandMenu.Group>
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
];
```

## Veridical Commands

You can dispatch any commands using `editor.dispatchCommand()` which you can get from `useLexicalComposerContext()`.
Checkout [lexical commands](https://lexical.dev/docs/concepts/commands) for more information

```tsx
import { INSERT_HEADING_COMMAND } from 'veridical/commands';

function YourComponentInsideLexicalComposer() {
    const [editor] = useLexicalComposerContext();
    return (
        <div
            onClick={(ev) =>
                editor.dispatchCommand(INSERT_HEADING_COMMAND, {
                    headingTag: 'h1',
                })
            }
        >
            Some Component
        </div>
    );
}
```

### Insert Commands

-   INSERT_HEADING_COMMAND
-   INSERT_PARAGRAPH_COMMAND
-   INSERT_CODE_COMMAND
-   INSERT_LIST_COMMAND
-   INSERT_QUOTE_COMMAND

### Turn Into Commands

-   TURN_INTO_HEADING_COMMAND
-   TURN_INTO_LIST_COMMAND
-   TURN_INTO_PARAGRAPH_COMMAND
-   TURN_INTO_QUOTE_COMMAND

### Move Command

-   MOVE_SELECTED_NODE_COMMAND

### Command Menu

-   OPEN_COMMAND_MENU

### Link Popover

-   LINK_POPOVER_COMMAND

## Goal of project

The goal of the project is a editor which can be installed as `npm` package and is easy to integrate into your react project. It must be customizable and have a composable API.
