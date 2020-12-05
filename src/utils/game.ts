import { Frame, Game, GameState } from '@/types/scoring.ts';
import { v4 as uuid } from 'uuid';

export const isStrike = (roll: number): boolean => roll === 10;
export const isSpare = (roll1: number, roll2: number): boolean => roll1 + roll2 === 10;

export const createNewFrame = (
    roll1: number,
    roll2: number,
    roll3: number | null = null,
    total = 0
): Frame => ({
    roll1,
    roll2,
    roll3,
    total,
});

// Create a new, empty, game
export const createNewGame = (playerName: string): Game => ({
    id: uuid(),
    rolls: [],
    player: playerName || 'John Doe',
    total: 0,
    gameState: GameState.Playing,
});

// Convert 1d roll array to a 2d array of 2x rolls (3 for 10th frame)
export const createFrameRolls = (rolls: number[]): number[][] => {
    const newRolls = Array(10).fill(Array(2).fill(undefined));
    let frameIndex = 0;
    for (let i = 0; i < rolls.length; i++) {
        if (frameIndex === 9) {
            newRolls[frameIndex] = [rolls[i], rolls[i + 1], rolls[i + 2]];
            break;
        } else if (rolls[i] === 10) {
            newRolls[frameIndex] = [10, 0];
        } else {
            newRolls[frameIndex] = [rolls[i], rolls[i + 1]];
            i++;
        }
        frameIndex++;
    }
    return newRolls;
};

// Calculates the sum of rolls, up until stopIndex (if passed)
export const calculateSum = (rolls: number[], stopIndex: number): number => {
    let totalSum = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
        let rollSum = rolls[rollIndex];

        // Break if this roll doesn't exist yet, or we hit stopIndex
        if (rollSum === undefined || rollIndex > stopIndex) break;

        if (rollSum > 9) {
            // Strike
            if (rolls[rollIndex + 2]) {
                rollSum += rolls[rollIndex + 2];
            }
        } else {
            // Normal - add this and next roll
            if (rolls[rollIndex + 1]) {
                rollSum += rolls[rollIndex + 1];
                rollIndex = rollIndex + 1;
            }
        }
        if (rollSum > 9) {
            // Spare or strike - add the next frame's roll
            if (rolls[rollIndex + 1]) {
                rollSum += rolls[rollIndex + 1];
            }
        }

        totalSum += rollSum;
        rollIndex = rollIndex + 1;
    }
    return totalSum;
};

export const isLastFrame2 = (index: number, rolls: number[]): boolean => {
    //[X, X, X, X, X, X, X, X, X]
    const noOfStrikes = rolls.filter(isStrike).length;
    console.log('noOfStrikes', noOfStrikes);
    const frameIndex = Math.floor((index + noOfStrikes * 2) / 2);
    console.log('frameIndex', frameIndex);

    if (frameIndex > 10) {
        throw Error('Frame overflow');
    }

    return frameIndex === 10;
};

export const createFrames = (rolls: number[]): Frame[] => {
    // [10, 5, 5, 4, 0]
    // [10]

    const frames: Frame[] = [];

    // const newRolls = [...rolls].reduce<number[]>((acc, roll): number[] => {
    //     const isNotLastFrame = acc.length / 2 !== 10;
    //     if (isStrike(roll) && isNotLastFrame) {
    //         acc.push(roll, 0);
    //     } else {
    //         acc.push(roll);
    //     }
    //     return acc;
    // }, []);

    // Create a new array, inserting a 0 roll after every strike
    // const newRolls = [...rolls].reduce<number[]>((acc, roll): number[] => {
    //     const isNotLastFrame = acc.length / 2 < 10;
    //     isStrike(roll) && isNotLastFrame ? acc.concat(roll, 0) : acc.concat(roll);
    // }, []);

    const totals: number[] = rolls.map((_, index, arr): number => {
        return calculateSum(arr, index);
    });

    console.log('rolls', rolls);
    console.log('totals', totals);

    for (let i = 0; i < rolls.length; i++) {
        const isLastFrame = frames.length / 2 > 10;
        const currRoll = rolls[i];
        const nextRoll = rolls[i + 1] === undefined ? null : rolls[i + 1];
        const nextnextRoll = rolls[i + 2] === undefined ? null : rolls[i + 2];

        if (isLastFrame) {
            frames.push({
                roll1: currRoll,
                roll2: nextRoll,
                roll3: nextnextRoll,
                total: totals[totals.length - 1],
            });
            break;
        } else if (isStrike(currRoll)) {
            frames.push({ roll1: currRoll, roll2: 0, roll3: null, total: totals[i] });
        } else {
            const total = nextRoll === null ? totals[i] : totals[i + 1];
            frames.push({ roll1: currRoll, roll2: nextRoll, roll3: null, total });
            i++;
        }
    }

    console.log('frames', frames);
    return frames;
};

// What symbol/number to show in the frame
export const getRollResultSymbols = (
    roll1: number,
    roll2: number,
    roll3: number
): Array<string | number | undefined> => {
    // If user has 2 strikes in 10th frame
    if (roll3 !== undefined) {
        return ['X', 'X', roll3];
    }
    if (isStrike(roll1)) {
        return ['X', ''];
    } else if (isSpare(roll1, roll2)) {
        return [roll1, '/'];
    } else {
        return [roll1, roll2, roll3];
    }
};

// Check that all passed rolls have been rolled
export const hasRolled = (...rolls: number[]) => rolls.every((roll) => roll !== undefined);

// How many pins are left on the frame
export const calculatePinsLeft = (frames: number[][]): number => {
    const currRollFrame =
        frames.find((frame) => frame[1] === undefined) ||
        frames.find((frame) => frame[0] === undefined && frame[1] === undefined);

    if (!currRollFrame) {
        return 10;
    }
    return 10 - (currRollFrame[0] || 0) - (currRollFrame[1] || 0);
};
