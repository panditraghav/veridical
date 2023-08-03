import {
    LinkPopoverPlugin as LinkPopover,
    CaretLinkPopoverPlugin,
    AutoLinkPlugin,
    useLinkPopoverPlugin,
} from 'veridical';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { BiLinkExternal } from 'react-icons/bi';

export default function LinkPlugins() {
    return (
        <>
            <LinkPopover>
                <LinkPopover.Content
                    sideOffset={8}
                    className="bg-foreground rounded-md py-2 px-2 data-[state=open]:animate-in data-[state=open]:ease-in-out data-[state=open]:fade-in data-[state=open]:duration-150 data-[state=open]:zoom-in-95 data-[state=open]:data-[side=top]:slide-in-from-bottom-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-200 flex space-x-1 items-center text-sm"
                >
                    <LinkPopover.Input
                        className="bg-foreground text-background focus:outline-none w-48"
                        placeholder="Type or paste a link"
                    />
                    <OpenLink />
                    <LinkPopover.Arrow className="fill-foreground" />
                </LinkPopover.Content>
            </LinkPopover>
            <CaretLinkPopoverPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
        </>
    );
}

function OpenLink() {
    const { url } = useLinkPopoverPlugin();
    return (
        <a
            href={url == '' ? undefined : url}
            target="_blank"
            aria-disabled={url === ''}
        >
            <BiLinkExternal
                className={`text-xl ${
                    url === '' ? 'fill-muted-foreground' : 'fill-background'
                }`}
            />
        </a>
    );
}
