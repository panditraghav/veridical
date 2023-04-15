import { $isHeadingNode, HeadingNode } from '@lexical/rich-text';
import { $getRoot } from 'lexical';
import { $isImageNode, ImageNode } from '../nodes';

export function $getTitleNode(): HeadingNode | null {
    const childrenOfRoot = $getRoot().getChildren();
    let titleNode: HeadingNode | null = null;
    childrenOfRoot.forEach((child) => {
        if ($isHeadingNode(child) && child.getTag() === 'h1') {
            titleNode = child;
        }
    });
    return titleNode;
}

export function $getFirstImageNode(): ImageNode | null {
    const childrenOfRoot = $getRoot().getChildren();
    let imageNode: ImageNode | null = null;
    childrenOfRoot.forEach((child) => {
        if ($isImageNode(child)) {
            imageNode = child;
        }
    });
    return imageNode;
}
