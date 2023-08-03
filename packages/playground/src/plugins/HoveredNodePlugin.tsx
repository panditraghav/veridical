import { RxDragHandleDots2, RxPlus } from 'react-icons/rx';
import {
    AddNodeButton,
    DraggableNodeButton,
    HoveredNodeOptions,
    HoveredNodeProvider,
} from 'veridical';

export default function HoveredNodePlugin() {
    return (
        <HoveredNodeProvider offset={{ left: -50, top: 4 }}>
            <HoveredNodeOptions
                offset={{ left: -50, top: 4 }}
                className="data-[state=open]:duration-200 data-[state=open]:ease-in-out data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-90 flex justify-between space-x-1"
            >
                <AddNodeButton>
                    <RxPlus className="fill-muted-foreground hover:fill-foreground text-xl hover:bg-muted rounded-sm" />
                </AddNodeButton>
                <DraggableNodeButton>
                    <RxDragHandleDots2 className="fill-muted-foreground hover:fill-foreground text-xl hover:bg-muted mr-1" />
                </DraggableNodeButton>
            </HoveredNodeOptions>
        </HoveredNodeProvider>
    );
}
