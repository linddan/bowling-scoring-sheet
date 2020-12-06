import { Frame, Game, GameState, Roll } from '@/types/scoring.ts';
import { v4 as uuid } from 'uuid';

const UNROLLED = -1;

export const isRolled = (...rolls: Roll[]): boolean => rolls.every((roll) => roll !== UNROLLED);
export const isStrike = (roll: Roll): boolean => (isRolled(roll) ? roll === 10 : false);
export const isSpare = (roll1: Roll, roll2: Roll): boolean =>
    isRolled(roll1, roll2) ? roll1 + roll2 === 10 : false;

const createGetRollAtIndex = (rolls: Roll[]) => (index: number) =>
    index < 0 || index >= rolls.length ? UNROLLED : rolls[index];

// Create a new, empty, game
export const createNewGame = (playerName: string): Game => ({
    id: uuid(),
    rolls: [],
    player: playerName || 'John Doe',
    total: 0,
    gameState: GameState.Playing,
});

// Calculates the sum of rolls, up until stopIndex (if passed)
export const calculateSum = (rolls: Roll[]): { sum: number; frames: Frame[] } => {
    const frames: Frame[] = [];
    const getRollAtIndex = createGetRollAtIndex(rolls);
    const geAddValue = (roll: Roll) => (isRolled(roll) ? roll : 0);

    let gameSum = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
        const isLastFrame = frame === 10;
        const currRoll = getRollAtIndex(rollIndex);
        const nextRoll = getRollAtIndex(rollIndex + 1);
        const nextNextRoll = getRollAtIndex(rollIndex + 2);
        const isStrikeFrame = isStrike(currRoll);
        const isSpareFrame = isSpare(currRoll, nextRoll);
        let frameSum = currRoll;

        if (!isRolled(currRoll)) break;

        if (isStrikeFrame || isSpareFrame) {
            frameSum += geAddValue(nextRoll);
            frameSum += geAddValue(nextNextRoll);
            rollIndex = isSpareFrame ? rollIndex + 2 : rollIndex + 1;
        } else {
            frameSum += geAddValue(nextRoll);
            rollIndex += 2;
        }

        // Update total sum
        gameSum += frameSum;

        // Add current frame to list
        frames.push({
            roll1: currRoll,
            roll2: isStrikeFrame ? 0 : nextRoll,
            roll3: isLastFrame ? nextNextRoll : UNROLLED,
            total: gameSum,
        });
    }
    return { sum: gameSum, frames };
};

// What symbol/number to show in the frame
export const getRollResultSymbols = (
    roll1: Roll,
    roll2: Roll,
    roll3: Roll
): Array<string | number> => {
    // If user has 2 strikes in 10th frame
    if (isRolled(roll3)) {
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
