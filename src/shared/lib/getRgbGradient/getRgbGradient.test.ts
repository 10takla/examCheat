import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';

describe('getRgbGradient', () => {
    test('check degree', () => {
        expect(getRgbGradient(3, 9)).toBe([0, 255, 0]);
    });
});
