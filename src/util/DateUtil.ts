import { parseISO } from 'date-fns';
import format from 'date-fns/format';

const currentDate = new Date();

export function getCurrentDateString(): string {
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    return formattedDate;
}

export function getCurrentMonthName(): string {
    return currentDate.toLocaleString('en-US', {
        month: 'long',
        timeZone: 'UTC',
    });
}

export function getCurrentMonthNumber(): number {
    return currentDate.getUTCMonth();
}

export function getMonthNumberFromString(dateString: string): number {
    const date = new Date(dateString).toISOString();
    return parseISO(date).getUTCMonth();
} 