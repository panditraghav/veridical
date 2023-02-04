import { createCommand, LexicalNode } from 'lexical';
import { ImageNode } from '@veridical/nodes';

const ADD_NODE_DIALOG_COMMAND = createCommand<{
    selectedNode?: LexicalNode | null;
}>();

const IMAGE_DIALOG_COMMAND = createCommand<{
    imageNode?: ImageNode | null;
    action: 'edit' | 'add';
}>();

export { ADD_NODE_DIALOG_COMMAND, IMAGE_DIALOG_COMMAND };
