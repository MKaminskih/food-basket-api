import { splitLines } from 'src/shared/utils/StringUtils';

export class List {
    private lines: string[];

    constructor(content: string | string[]) {
        this.lines = typeof content === 'string' ? splitLines(content) : content;
    }

    getLines(): string[] {
        return this.lines;
    }

    popLine(): string | undefined {
        return this.lines.pop();
    }
}
