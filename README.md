# Veridical

Veridical is a WYSIWYG editor for blogs made using [lexical](https://lexical.dev)

Check it out at [veridical](https://panditraghav.github.io/veridical)

## Installation

**npm**

```sh
npm install veridical
```

## How to use

### Basic editor setup

```tsx
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import { EditorThemeClasses } from 'lexical';

const lexicalTheme: EditorThemeClasses = {
    // Theme for html elements
};

const veridicalTheme: VeridicalEditorTheme = {
    // Theme for ui components
};

export default function App() {
    const initialConfig = {
        namespace: 'new-post-editor',
        lexicalTheme,
        veridicalTheme,
    };

    return (
        <Veridical initialConfig={initialConfig}>
            <VeridicalEditorPlugins />
        </Veridical>
    );
}
```

### Theming

The `initialConfig` requires two theme objects.

-   [`lexicalTheme`](https://github.com/panditraghav/veridical/blob/main/packages/playground/src/theme/lexicalTheme.ts) which is theme for html elements like heading, list, table... etc.
-   [`veridicalTheme`](https://github.com/panditraghav/veridical/blob/main/packages/playground/src/theme/veridicalTheme.ts) which is theme for editor ui components like Dialogs, Inputs etc.

#### Quick start

-   The css classes that you will add to these theme objects will be added to their respected components/elements

-   Above links contains themes made using [tailwindcss](https://tailwindcss.com/), you can copy those theme objects into your code. You can copy extended theme from from playground's [tailwind.config.cjs](https://github.com/panditraghav/veridical/blob/5f39b8203165c329145ee28d1146307ebd84727c/_playground/tailwind.config.cjs#L12-L66) and past it into your tailwind.config to get started faster.

## Plugins for veridical

-   [AddLinkDialogPlugin](#AddLinkDialogPlugin)
-   [AddNodeDialogPlugin](#AddNodeDialogPlugin)
-   [AddNodeShortcutPlugin](#AddNodeShortcutPlugin)
-   [AutoLinkPlugin](#AutoLinkPlugin)
-   [CodeActionMenuLeft](#CodeActionMenuLeft)
-   [CodeActionMenuRight](#CodeActionMenuRight)
-   [CodeHighlightPlugin](#CodeHighlightPlugin)
-   [HighlightMenuPlugin](#HighlightMenuPlugin)
-   [HoverMenuPlugin](#HoverMenuPlugin)
-   [HoverBlockOptions](#HoverBlockOptions)
-   [ImageActionMenuRight](#ImageActionMenuRight)
-   [ImageDialogPlugin](#ImageDialogPlugin)
-   [ImagePlugin](#ImagePlugin)
-   [MarkdownPlugin](#MarkdownPlugin)
-   [OpenLinkPlugin](#OpenLinkPlugin)
-   [PrettierPlugin](#PrettierPlugin)

See [VeridicalEditorPlugins.tsx](https://github.com/panditraghav/veridical/blob/main/packages/veridical/src/veridical/VeridicalEditorPlugins.tsx) for usage of all these plugins along with many plugins from `lexical` and `@lexical/react`

### AddLinkDialogPlugin

Shows a dialog to input link whenever a link node is created.

### AddNodeDialogPlugin

Registers command to show AddNodeDialog

```tsx
import { ADD_NODE_DIALOG_COMMAND } from 'veridical';

editor.dispatchCommand(ADD_NODE_DIALOG_COMMAND, {
    selectedNode: node, // New node will be added after this node.
});
```

### AddNodeShortcutPlugin

Registers a shortcut to dispatchCommand for AddNodeDialog

```tsx
export default function Editor() {
    function isKeydown(ev: KeyboardEvent) {
        if (ev.ctrlKey && ev.key === 'k') return true;
        return false;
    }
    return (
        <Veridical>
            <AddNodeShortcutPlugin isKeydown={isKeydown} />
        </Veridical>
    );
}
```

### AutoLinkPlugin

Creates links according to link's regex, uses `@lexical/react/LexicalAutoLinkPlugin`

### CodeActionMenuLeft

A menu container is placed at code node's top left corner on hover, any React Component can be passed as children.

### CodeActionMenuRight

Same as code action menu left.

### CodeHighlightPlugin

Highlights code using `registerCodeHighlighting` from `@lexical/code`

### HighlightMenuPlugin

Shows editing option menu when some text is highlighted.

### ImageDialogPlugin

Registers command to show image dialog

```tsx
import { IMAGE_DIALOG_COMMAND } from 'veridical';

editor.dispatchCommand(IMAGE_DIALOG_COMMAND, {
    imageNode: imgNode,
    action: 'add', // add or edit
});
```

### ImagePlugin

When new image node is created shows dialog for it.

### MarkdownPlugin

Adds markdown shortcuts, example type `### ` at beginning of paragraph to convert it to Heading 2.

Using `@lexical/react/LexicalMarkdownShortcutPlugin` and some custom `MARKDOWN_TRANSFORMERS` from `veridical`

### OpenLinkPlugin

Shows tooltip to open link when cursor is on link.

### PrettierPlugin

Prettify code on pressing `Alt + Shift + F` (by default).

## Nodes for veridical

### ImageNode

Node to display image

```tsx
import { $createImageNode } from 'veridical';
const image = $createImageNode({
    src,
    altText,
    naturalWidth: parseInt(width),
    naturalHeight: parseInt(height),
    isMaxWidth: isMaxWidth,
});
```

-   naturalWidth and naturalHeight are used to find aspect ratio for suspense fallback.

### Theme image

```typescript
export const veridicalTheme: VeridicalThemeClasses = {
    veridicalImage: {
        image: 'w-full h-[420px] rounded-sm cursor-pointer',
        selected: 'box-border border-2 border-editor-button-primary',
        container: 'flex flex-row justify-center my-4 mx-0',
        fallback: 'bg-gray-600 animate-pulse h-[420px]',
    },
};
```
