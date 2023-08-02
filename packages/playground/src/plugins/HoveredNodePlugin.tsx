import {
    AddNodeButton,
    DraggableNodeButton,
    HoveredNodeOptions,
    HoveredNodeProvider,
} from 'veridical';
import { AddIcon, DragIcon } from '../components/Icons';

export default function HoveredNodePlugin() {
    return (
        <HoveredNodeProvider offset={{ left: -50, top: 4 }}>
            <HoveredNodeOptions
                offset={{ left: -50, top: 4 }}
                className="data-[state=open]:duration-200 data-[state=open]:ease-in-out data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-90 flex justify-between space-x-1"
            >
                <AddNodeButton>
                    <AddIcon className="fill-muted-foreground hover:fill-foreground" />
                </AddNodeButton>
                <DraggableNodeButton>
                    <DragIcon className="fill-muted-foreground hover:fill-foreground" />
                </DraggableNodeButton>
            </HoveredNodeOptions>
        </HoveredNodeProvider>
    );
}
