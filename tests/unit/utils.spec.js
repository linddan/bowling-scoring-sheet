import { calculateSum } from '../../src/utils/game.ts';

describe('calculateSum', () => {
    test('5|2, 7|1, 3|6 should give the output 24', () => {
        const rolls = [5, 2, 7, 1, 3, 6];
        const { sum, frames } = calculateSum(rolls);

        console.log('rolls', rolls);
        console.log('frames', frames);
        console.log('sum', sum);
        expect(sum).toBe(24);
    });

    test('strike, spare, 4|0 should give the output 38', () => {
        const rolls = [10, 5, 5, 4, 0];
        const { sum, frames } = calculateSum(rolls);
        console.log('rolls', rolls);
        console.log('frames', frames);
        console.log('sum', sum);
        expect(sum).toBe(38);
    });

    test('5|5, 4|0, 6|3 at stop index 1 should give the output ??', () => {
        const rolls = [5, 5, 4, 6, 3];
        const { sum, frames } = calculateSum(rolls);
        console.log('rolls', rolls);
        console.log('frames', frames);
        console.log('sum', sum);
        expect(sum).toBe(30);
    });

    test('strike should give the output 10 (waiting for rolls)', () => {
        const rolls = [10];
        const { sum, frames } = calculateSum(rolls);
        console.log('rolls', rolls);
        console.log('frames', frames);
        console.log('sum', sum);
        expect(sum).toBe(10);
    });

    test('all strikes should give the output 0 :(', () => {
        const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const { sum, frames } = calculateSum(rolls);
        console.log('rolls', rolls);
        console.log('frames', frames);
        console.log('sum', sum);
        expect(sum).toBe(0);
    });

    test('all strikes should give the output 300 :)', () => {
        const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        const { sum, frames } = calculateSum(rolls);
        console.log('rolls', rolls);
        console.log('frames', frames);
        console.log('sum', sum);
        expect(sum).toBe(300);
    });
});

// describe('createFrames', () => {
//     test('should work', () => {
//         const rolls = [10, 5, 5, 4, 0, 1];
//         const frames = createFrames(rolls);
//         console.log(frames);
//         expect(frames.length).toBe(4);
//     });
// });
