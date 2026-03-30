import { format, parse, isValid, isDate } from 'date-fns';

const baseDate = new Date();
const fileNameFormat: string = 'dd-MM-yyyy';
// Поддерживаемые форматы (в порядке приоритета)
const formats = [fileNameFormat, 'dd.MM.yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy'];

/**
 * Проверяет корректность даты и её соответствие формату fileNameFormat
 * @param dateStr строковое значение даты в формате fileNameFormat
 * @returns true корректная дата, иначе false
 */
export const isCorrectDate = (dateStr: string) => {
    const date = parse(dateStr, fileNameFormat, baseDate);
    if (!isValid(date)) {
        return false;
    }
    const parsedStr = format(date, fileNameFormat);
    return dateStr === parsedStr;
};

/**
 * Сортирует по возрастанию даты
 * @param date1 строковое значение даты в формате fileNameFormat
 * @param date2 строковое значение даты в формате fileNameFormat
 */
export const sortAscend = (date1: string, date2: string) => {
    return (
        parse(date1, fileNameFormat, baseDate).getTime() -
        parse(date2, fileNameFormat, baseDate).getTime()
    );
};

/**
 * Проверяет валидность даты и приводит к единому формату ДД-ММ-ГГГГ
 * @param date - строка с датой в одном из поддерживаемых форматов
 * @returns строку даты в формате ДД-ММ-ГГГГ
 * @throws ошибку с текстом 'Введена некорректная дата' если дата невалидна
 */
export function checkValidDate(date: string): string {
    if (isDate(date)) return format(date, fileNameFormat);

    for (const fmt of formats) {
        const dateValue = parse(date, fmt, baseDate);
        if (isValid(dateValue)) {
            return format(dateValue, fileNameFormat);
        }
    }

    throw new Error('Введена некорректная дата');
}
