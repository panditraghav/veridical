# Plugins for veridical

See [VeridicalEditorPlugins.tsx](https://github.com/panditraghav/veridical/blob/main/packages/veridical/src/VeridicalEditorPlugins.tsx) for usage of all these plugins along with many plugins from `lexical` and `@lexical/react`

## AddLinkDialogPlugin

Shows a dialog to input link whenever a link node is created.

## AddNodeDialogPlugin

Registers command to show AddNodeDialog

```tsx
import { ADD_NODE_DIALOG_COMMAND } from '@veridical/utils';

editor.dispatchCommand(ADD_NODE_DIALOG_COMMAND, {
    selectedNode: node, // New node will be added after this node.
});
```

## AddNodeShortcutPlugin

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

## AutoLinkPlugin

Creates links according to link's regex, uses `@lexical/react/LexicalAutoLinkPlugin`

## CodeActionMenuLeft

A menu container is placed at code node's top left corner on hover, any React Component can be passed as children.

## CodeActionMenuRight

Same as code action menu left.

## CodeHighlightPlugin

Highlights code using `registerCodeHighlighting` from `@lexical/code`

## HighlightMenuPlugin

Shows editing option menu when some text is highlighted.

## ImageDialogPlugin

Registers command to show image dialog

```tsx
import { IMAGE_DIALOG_COMMAND } from '@veridical/utils';

editor.dispatchCommand(IMAGE_DIALOG_COMMAND, {
    imageNode: imgNode,
    action: 'add', // add or edit
});
```

## ImagePlugin

When new image node is created shows dialog for it.

## MarkdownPlugin

Adds markdown shortcuts, example type `## ` at beginning of paragraph to convert it to Heading 2.

Using `@lexical/react/LexicalMarkdownShortcutPlugin` and some custom `MARKDOWN_TRANSFORMERS` from `@veridical/utils`

## OpenLinkPlugin

Shows tooltip to open link when cursor is on link.

## PrettierPlugin

Prettify code on pressing `Alt + Shift + F` (by default).
