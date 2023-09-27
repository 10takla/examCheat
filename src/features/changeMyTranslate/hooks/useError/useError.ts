import { useCallback, useState } from 'react';

export default (arr: string[], deps: any[], index?: number) => {
    const [error, setError] = useState<string | null>(null);

    const resolveSymbols = '-';

    const rule = RegExp(`^[а-яёА-ЯЁ ${resolveSymbols}]+$`);

    const checkForCorrect = useCallback((translate: string) => {
        if (index !== undefined) {
            arr.splice(index);
        }
        if (!rule.test(translate)) {
            setError('Слово должно быть на русском языке');
        } else if (arr.includes(translate)) {
            setError('Перевод уже существует');
        } else {
            setError(null);
        }
    }, [arr, rule]);
    return [checkForCorrect, error] as [(translate: string) => void, string | null];
};
