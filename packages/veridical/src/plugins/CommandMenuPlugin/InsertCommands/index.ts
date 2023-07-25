import { InsertCodeCommand } from './Code';
import {
    InsertHeading1Command,
    InsertHeading2Command,
    InsertHeading3Command,
} from './Heading';
export * from './Heading';
export * from './Code';

export const InsertCommands = {
    Heading1: InsertHeading1Command,
    Heading2: InsertHeading2Command,
    Heading3: InsertHeading3Command,
    Code: InsertCodeCommand,
};
