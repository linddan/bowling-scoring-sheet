import { calculateSum } from '../../src/utils/game.ts';

describe('frame list', () => {
    test('5|2, 7|1, 3|6 should give correct frame list', () => {
        const rolls = [5, 2, 7, 1, 3, 6];
        const { frames } = calculateSum(rolls);
        expect(frames).toMatchObject([
            { roll1: 5, roll2: 2, roll3: -1, total: calculateSum(rolls.slice(0, 2)).sum },
            { roll1: 7, roll2: 1, roll3: -1, total: calculateSum(rolls.slice(0, 4)).sum },
            { roll1: 3, roll2: 6, roll3: -1, total: calculateSum(rolls).sum },
        ]);
    });
    //TODO: Test strikes, spares, last frame
});

describe('sum', () => {
    test('5|2, 7|1, 3|6 should give the output 24', () => {
        const rolls = [5, 2, 7, 1, 3, 6];
        const { sum } = calculateSum(rolls);

        expect(sum).toBe(24);
    });

    test('strike, spare, 4|0 should give the output 38', () => {
        const rolls = [10, 5, 5, 4, 0];
        const { sum } = calculateSum(rolls);
        expect(sum).toBe(38);
    });

    test('5|5, 4|0, 6|3 at stop index 1 should give the output ??', () => {
        const rolls = [5, 5, 4, 6, 3];
        const { sum } = calculateSum(rolls);
        expect(sum).toBe(30);
    });

    test('strike should give the output 10 (waiting for rolls)', () => {
        const rolls = [10];
        const { sum } = calculateSum(rolls);
        expect(sum).toBe(10);
    });

    test('all strikes should give the output 0 :(', () => {
        const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const { sum } = calculateSum(rolls);
        expect(sum).toBe(0);
    });

    test('all strikes should give the output 300 :)', () => {
        const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        const { sum } = calculateSum(rolls);
        expect(sum).toBe(300);
    });

    test('last frame no strikes', () => {
        const prevRolls = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; //36
        const lastFrameRolls = [5, 2]; // 7
        const rolls = [...prevRolls, ...lastFrameRolls];

        const { sum } = calculateSum(rolls);
        expect(sum).toBe(43);
    });
    test('last frame one strike', () => {
        const prevRolls = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; //36
        const lastFrameRolls = [10, 2]; // 7
        const rolls = [...prevRolls, ...lastFrameRolls];

        const { sum } = calculateSum(rolls);
        expect(sum).toBe(48);
    });
    test('last frame two strikes', () => {
        const prevRolls = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; //36
        const lastFrameRolls = [10, 10, 2]; // 7
        const rolls = [...prevRolls, ...lastFrameRolls];

        const { sum } = calculateSum(rolls);
        expect(sum).toBe(58);
    });
    test('last frame three strikes', () => {
        const prevRolls = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; //36
        const lastFrameRolls = [10, 10, 10]; // 7
        const rolls = [...prevRolls, ...lastFrameRolls];

        const { sum } = calculateSum(rolls);
        expect(sum).toBe(66);
    });
});
