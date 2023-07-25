# Veridical

Veridical is a set of [lexical plugins](https://lexical.dev/docs/react/plugins) that can be used to make a WYSIWYG (What You See Is What You Get) Editor.
Check out veridical at [https://panditraghav.github.io/veridical](https://panditraghav.github.io/veridical)

## Install

```
npm install veridical lexical @lexical/react
```

## Plugins

Veridical provides you many plugins like `CommandMenuPlugin` and `SlashCommandMenuPlugin` so that you can build better user experience for your editor.

### 1. CommandMenuPlugin

This plugins helps you build notion like command menu.

```tsx
// plugins/CommandMenu
import { CommandMenuPlugin as CommandMenu } from 'veridical/plugins/CommandMenuPlugin';
import {
    InsertCommands as Insert,
    RegisterInsertCodeCommand,
    RegisterInsertHeadingCommand,
} from 'veridical/plugins/CommandMenuPlugin';

export default function CommandMenuPlugin() {
    return (
        <>
            <CommandMenu>
                <CommandMenu.Content className="CommandMenuContent">
                    <CommandMenu.Command
                        defaultValue="Heading 1"
                        className="CommandMenuCommand"
                    >
                        <CommandMenu.List className="CommandMenuList">
                            <CommandMenu.Empty className="CommandMenuEmpty">
                                No result
                            </CommandMenu.Empty>
                            <CommandMenu.Group
                                heading="Insert nodes"
                                className="CommandMenuGroup"
                            >
                                <Insert.Heading1
                                    classNames={CommandItemClassNames}
                                />
                                <Insert.Heading2
                                    classNames={CommandItemClassNames}
                                />
                                <Insert.Heading3
                                    classNames={CommandItemClassNames}
                                />
                                <Insert.Code
                                    classNames={CommandItemClassNames}
                                />
                            </CommandMenu.Group>
                        </CommandMenu.List>
                    </CommandMenu.Command>
                </CommandMenu.Content>
            </CommandMenu>
            <RegisterInsertCodeCommand />
            <RegisterInsertHeadingCommand />
        </>
    );
}
```

You can use this plugin in the editor.

```tsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import CommandMenuPlugin from '../plugins/CommandMenu';
import {
    HoveredNodeOptions,
    HoveredNodeProvider,
    SlashCommandMenuPlugin,
} from 'veridical';

function initializeEditor() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
        const h1 = $createHeadingNode('h1');
        h1.append($createTextNode('Hello World'));
        root.append(h1);
    }
}

export default function Editor() {
    return (
        <LexicalComposer
            initialConfig={{
                namespace: 'playground',
                theme: lexicalTheme,
                nodes: defaultEditorNodes,
                editable: true,
                onError: (error: any) => console.log(error),
                editorState: editorState || initializeEditor,
            }}
        >
            <div className="mb-24 w-full px-4 md:mx-auto md:w-8/12">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="focus:outline-none" />
                    }
                    placeholder={
                        <div className="text-muted-foreground relative left-0 top-[-35px] z-[-10]">
                            Press / for commands
                        </div>
                    }
                    ErrorBoundary={VeridicalErrorBoundary}
                />
                <ListPlugin />
                <CodeHighlightPlugin />
                <AutoFocusPlugin />
                <AutoLinkPlugin />
                <LinkPlugin />
                <HistoryPlugin />
                <TabIndentationPlugin />
                <HoveredNodeProvider offset={{ left: -50, top: 4 }}>
                    <HoveredNodeOptions
                        offset={{ left: -50, top: 4 }}
                        className="HoveredNodeOptions"
                    >
                        <AddNodeButton />
                        <DraggableNodeButton />
                    </HoveredNodeOptions>
                </HoveredNodeProvider>
                <MarkdownPlugin />
                <CommandMenuPlugin />
                <SlashCommandMenuPlugin />
            </div>
        </LexicalComposer>
    );
}
```
