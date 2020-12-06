import { Frame, Game, GameState, Roll } from '@/types/scoring.ts';
import { v4 as uuid } from 'uuid';

const UNROLLED = -1;

export const isRolled = (...rolls: Roll[]): boolean => rolls.every((roll) => roll !== UNROLLED);
export const isStrike = (roll: Roll): boolean => (isRolled(roll) ? roll === 10 : false);
export const isSpare = (roll1: Roll, roll2: Roll): boolean =>
    isRolled(roll1, roll2) ? roll1 + roll2 === 10 : false;

const createGetRollAtIndex = (rolls: Roll[]) => (index: number) =>
    index < 0 || index >= rolls.length ? UNROLLED : rolls[index];

export const createNewFrame = (
    roll1: Roll = UNROLLED,
    roll2: Roll = UNROLLED,
    roll3: Roll = UNROLLED,
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

// Calculates the sum of rolls, up until stopIndex (if passed)
export const calculateSum = (rolls: Roll[]): any => {
    const getRollAtIndex = createGetRollAtIndex(rolls);
    const frames: Frame[] = [];

    let totalSum = 0;
    let rollIndex = 0;
    const frameSums = [];
    for (let frame = 0; frame < 10; frame++) {
        const isLastFrame = frame === 10;
        const newFrame = createNewFrame();

        const prevRoll = getRollAtIndex(rollIndex - 1);
        const currRoll = getRollAtIndex(rollIndex);
        const nextRoll = getRollAtIndex(rollIndex + 1);
        const nextnextRoll = getRollAtIndex(rollIndex + 2);

        let rollSum = currRoll;

        console.log('isRolled', rollIndex, isRolled(currRoll));
        if (!isRolled(currRoll)) {
            console.log('STOP AT', rollIndex);
            break;
        }
        if (isStrike(currRoll)) {
            // Strike
            console.log('Strike at', rollIndex);
            if (isRolled(nextRoll)) {
                rollSum += nextRoll;
            }
            if (isRolled(nextnextRoll)) {
                rollSum += nextnextRoll;
            }
            rollIndex++;
        } else if (isSpare(currRoll, nextRoll)) {
            // isRolled(prevRoll)
            // Spare
            console.log('Spare at', rollIndex);
            if (isRolled(nextRoll)) {
                rollSum += nextRoll;
            }
            if (isRolled(nextnextRoll)) {
                rollSum += nextnextRoll;
            }
            rollIndex += 2;
        } else {
            // Normal
            console.log('Normal at', rollIndex);
            if (isRolled(nextRoll)) {
                rollSum += nextRoll;
            }
            rollIndex += 2;
        }
        totalSum += rollSum;
        newFrame.total = totalSum;
        newFrame.roll1 = currRoll;
        newFrame.roll2 = isStrike(currRoll) ? 0 : nextRoll;
        newFrame.roll3 = isLastFrame ? nextnextRoll : UNROLLED;

        frames.push(newFrame);
    }
    return { sum: totalSum, frames };
};

// export const createFrames = (rolls: Roll[]): Frame[] => {
//     // [10, 5, 5, 4, 0]
//     // [10]

//     console.log('rolls', rolls);

//     let rollIndex = 0;
//     for (let i = 1; i <= 10; i++) {
//         if (rollIndex >= rolls.length) break;

//         // const isLastFrame = frames.length / 2 > 10;
//         const isLastFrame = i === 10;
//         const currRoll = getRollAtIndex(rollIndex);
//         const nextRoll = getRollAtIndex(rollIndex + 1);
//         const nextnextRoll = getRollAtIndex(rollIndex + 2);
//         const total = calculateSum(rolls.slice(0, rollIndex + 1));

//         if (isLastFrame) {
//             frames.push({
//                 roll1: currRoll,
//                 roll2: nextRoll,
//                 roll3: nextnextRoll,
//                 total,
//             });
//             rollIndex++;
//             continue;
//         }
//         if (isStrike(currRoll)) {
//             frames.push({
//                 roll1: currRoll,
//                 roll2: 0,
//                 roll3: UNROLLED,
//                 total,
//             });
//             rollIndex++;
//             continue;
//         }
//         frames.push({
//             roll1: currRoll,
//             roll2: nextRoll,
//             roll3: UNROLLED,
//             total,
//         });
//         rollIndex += 2;
//     }

//     console.log('frames', frames);
//     return frames;
// };

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

// How many pins are left on the frame
// export const calculatePinsLeft = () => {};
