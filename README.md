# Veridical

This is a WYSIWYG editor using which you can create a blog or other content based application and have a medium-like editor in it!

## Installation

**npm**

```sh
npm install veridical
```

**yarn**

```sh
yarn add veridical
```

## Usage

### Basic usage

```jsx
import { Veridical, VeridicalEditorPlugins } from 'veridical';

const editortheme: VeridicalThemeClasses = {
    // .... Theme classes
}

export default function App() {
    const initialConfig = {
        namespace: 'new-post-editor',
        theme: editorTheme,
    };

    return (
        <Veridical initialConfig={initialConfig}>
            <VeridicalEditorPlugins />
        </Veridical>
    );
}
```

### Customization

```jsx
import { VeridicalBase, InitialConfig } from 'veridical';
import {
    AddNodeButtonPlugin,
    MarkdownPlugin,
    TreeViewPlugin,
    CodeActionPlugin,
    CodeHighlightPlugin,
    PrettierPlugin,
    DraggableNodeButton,
    HighlightMenuPlugin,
    HoverMenuPlugin,
    AddNodeShortcutPlugin,
    ImagePlugin,
    RichTextPlugin,
    ListPlugin,
} from '@veridical/plugins';
import { defaultEditorNodes } from '@veridical/nodes';

export default function App() {
    const initialConfig: InitialConfig = {
        namespace: 'my-editor',
        nodes: defaultEditorNodes,
        onError: (error) => console.log(error),
        theme: defaultVeridicalTheme,
        editable: true,
    };
    return (
        <VeridicalBase initialConfig={initialConfig}>
            <div className={'DefaultEditorTheme__EditorContainer'}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            readOnly={false}
                            className={'DefaultEditorTheme__ContentEditable'}
                        />
                    }
                    placeholder={
                        <Placeholder text="Press Ctrl + k for command..." />
                    }
                />
                <ListPlugin />
                <CodeHighlightPlugin />
                {config.editable && (
                    <>
                        <CodeActionPlugin />
                        <PrettierPlugin />
                        <HighlightMenuPlugin />
                        <HoverMenuPlugin offset={{ left: -50, top: 4 }}>
                            <AddNodeButtonPlugin />
                            <DraggableNodeButton />
                        </HoverMenuPlugin>
                        <AddNodeShortcutPlugin />
                        <MarkdownPlugin />
                        <ImagePlugin />
                    </>
                )}
            </div>
        </VeridicalBase>
    );
}
```

You can change the theme in initail config, nodes and plugins according to your needs.
