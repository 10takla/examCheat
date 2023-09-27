import { render, screen } from '@testing-library/react';
import { DifficultyLevel } from './DifficultyLevel';

describe('DifficultyLevel', () => {
    test('get green color for level 1', () => {
        render(<DifficultyLevel difficultyLevel={1} />);
        const block = screen.getByTestId('block');
        const computedStyles = window.getComputedStyle(block);
        expect(computedStyles.backgroundColor).toBe('rgb(0, 255, 0)');
    });
    test('get red yellow for level 5', () => {
        render(<DifficultyLevel difficultyLevel={5} />);
        const block = screen.getByTestId('block');
        const computedStyles = window.getComputedStyle(block);
        expect(computedStyles.backgroundColor).toBe('rgb(255, 255, 0)');
    });
    test('get red color for level 10', () => {
        render(<DifficultyLevel difficultyLevel={10} />);
        const block = screen.getByTestId('block');
        const computedStyles = window.getComputedStyle(block);
        expect(computedStyles.backgroundColor).toBe('rgb(255, 0, 0)');
    });
});
