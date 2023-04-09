# Nodes for veridical

## ImageNode

Node to display image

```tsx
const image = $createImageNode({
    src,
    altText,
    naturalWidth: parseInt(width),
    naturalHeight: parseInt(height),
    isMaxWidth: isMaxWidth,
});
```

-   naturalWidth and naturalHeight are used to find aspect ratio for suspense fallback.

### Theme

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
