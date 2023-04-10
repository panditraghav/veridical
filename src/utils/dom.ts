import { $getRoot, LexicalEditor } from 'lexical';
export function isHTMLElement(x: any): x is HTMLElement {
    return x instanceof HTMLElement;
}
export interface Offset {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}

export function isAboveOrBelowCenter(
    ev: MouseEvent,
    element: HTMLElement,
): 'above' | 'below' {
    const { y: elementY, height: elementHeight } =
        element.getBoundingClientRect();
    const { y: mouseY } = ev;

    const top = elementY;
    const bottom = elementY + elementHeight;
    const center = top + (bottom - top) / 2;

    if (mouseY >= center) {
        return 'below';
    } else {
        return 'above';
    }
}

export function getTopLevelNodeKey(editor: LexicalEditor): string[] {
    return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
}

export function getHoveredDOMNode(
    ev: MouseEvent,
    editor: LexicalEditor,
    offset?: Offset,
): { lexicalDOMNode: HTMLElement | null; key: string | null } {
    const topKeys = getTopLevelNodeKey(editor);
    let lexicalDOMNode: HTMLElement | null = null;
    let low = 0;
    let high = topKeys.length - 1;
    let key = topKeys[Math.floor((low + high) / 2)];

    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const element = editor.getElementByKey(topKeys[middle]);
        if (!element) return { lexicalDOMNode, key: null };
        if (isMouseInside(element, ev, offset)) {
            lexicalDOMNode = element;
            key = topKeys[middle];
            break;
        }

        switch (isAboveOrBelowCenter(ev, element)) {
            case 'above':
                high = middle - 1;
                break;
            case 'below':
                low = middle + 1;
                break;
        }
    }
    return { lexicalDOMNode, key };
}

export function isMouseInside(
    element: HTMLElement | null,
    ev: MouseEvent,
    offset?: Offset,
): boolean {
    if (!element) return false;
    const elementRect = element.getBoundingClientRect();
    const { x: mouseX, y: mouseY } = ev;
    const {
        x: elementX,
        y: elementY,
        width: elementWidth,
        height: elementHeight,
    } = elementRect;
    if (
        mouseX >= elementX + (offset?.left || 0) &&
        mouseX <= elementX + elementWidth + (offset?.right || 0) &&
        mouseY >= elementY + (offset?.top || 0) &&
        mouseY <= elementY + elementHeight + (offset?.bottom || 0)
    ) {
        return true;
    }
    return false;
}
