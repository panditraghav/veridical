import { $getSelection, $isRootNode, LexicalNode } from 'lexical';

export function $getTopLevelSelectedNode(): LexicalNode | null {
    const selection = $getSelection();
    const nodes = selection?.getNodes();
    const firstNode = nodes && nodes[0];

    if (!firstNode) return null;

    let parent = firstNode.getParent();
    if ($isRootNode(parent)) return firstNode;

    while (parent && !$isRootNode(parent.getParent())) {
        parent = parent.getParent();
    }
    return parent;
}
