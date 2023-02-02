import { createCommand, LexicalNode } from 'lexical';

const ADD_NODE_DIALOG_COMMAND = createCommand<{
    selectedNode?: LexicalNode | null;
}>();

export { ADD_NODE_DIALOG_COMMAND };
