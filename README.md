# Veridical

Veridical is a WYSIWYG editor for blogs made using [lexical](https://lexical.dev)

Check it out at [veridical](https://panditraghav.github.io/veridical)

## Installation

**npm**

```sh
npm install veridical @veridical/plugins lexical @lexical/react
```

## How to use

### Basic editor setup

```jsx
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

-   [`lexicalTheme`](https://github.com/panditraghav/veridical/blob/main/packages/utils/src/theme/defaultLexicalTheme.ts) which is theme for html elements like heading, list, table... etc.
-   [`veridicalTheme`](https://github.com/panditraghav/veridical/blob/main/packages/utils/src/theme/defaultVeridicalTheme.ts) which is theme for editor ui components like Dialogs, Inputs etc.

#### Quick start

-   The css classes that you will add to these theme objects will be added to their respected components/elements

-   Above links contains themes made using [tailwindcss](https://tailwindcss.com/), you can copy those theme objects into your code. You can copy extended theme from from playground's [tailwind.config.cjs](https://github.com/panditraghav/veridical/blob/5f39b8203165c329145ee28d1146307ebd84727c/_playground/tailwind.config.cjs#L12-L66) and past it into your tailwind.config to get started faster.

## Plugins

Veridical has some helpful lexical [plugins](https://github.com/panditraghav/veridical/tree/main/packages/plugins) and [nodes](https://github.com/panditraghav/veridical/tree/main/packages/nodes)
