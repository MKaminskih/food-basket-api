// src/shared/constants.ts
import * as path from 'path';

// Корневая папка проекта
const ROOT_DIR = process.cwd();

// Папка с данными
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Папка со списками покупок
export const LISTS_DIR = path.join(DATA_DIR, 'lists');

export function getFilePath(fileName: string): string {
    return path.join(LISTS_DIR, fileName);
}
