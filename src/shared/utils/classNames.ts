// src/shared/utils/classNames.ts
export function classNames(
    ...values: Array<string | undefined | null | false>
): string {
    return values.filter(Boolean).join(' ');
}