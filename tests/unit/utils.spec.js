import { calculateSum, createFrames } from '../../src/utils/game.ts';

describe.skip('calculateSum', () => {
    test('5|2, 7|1, 3|6 should give the output 24', () => {
        const rolls = [5, 2, 7, 1, 3, 6];
        expect(calculateSum(rolls)).toBe(24);
    });

    test('strike, spare, 4|0 should give the output 38', () => {
        const rolls = [10, 5, 5, 4, 0];
        expect(calculateSum(rolls)).toBe(38);
    });

    test('5|5, 4|0, 6|3 at stop index 1 should give the output ??', () => {
        const rolls = [5, 5, 4, 6, 3];
        expect(calculateSum(rolls, 1)).toBe(14);
    });

    test('strike should give the output 10 (waiting for rolls)', () => {
        const rolls = [10];
        expect(calculateSum(rolls)).toBe(10);
    });

    test('all strikes should give the output 0', () => {
        const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        expect(calculateSum(rolls)).toBe(0);
    });

    test('all misses should give the output 0 :(', () => {
        const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        expect(calculateSum(rolls)).toBe(300);
    });
});

describe('createFrames', () => {
    test('should work', () => {
        const rolls = [10, 5, 5, 4, 0, 1];
        const frames = createFrames(rolls);
        console.log(frames);
        expect(frames.length).toBe(4);
    });
});
