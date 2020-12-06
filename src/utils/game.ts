import { Frame, Game, GameState, Roll } from '@/types/game';
import { v4 as uuid } from 'uuid';

export const UNROLLED = -1;
export const MAX_NO_PINS = 10;
export const MAX_NO_FRAMES = 10;

export const isRolled = (...rolls: Roll[]): boolean => rolls.every((roll) => roll !== UNROLLED);
export const isStrike = (roll: Roll): boolean => (isRolled(roll) ? roll === MAX_NO_PINS : false);
export const isSpare = (roll1: Roll, roll2: Roll): boolean =>
    isRolled(roll1, roll2) ? roll1 + roll2 === MAX_NO_PINS : false;

const createGetRollAtIndex = (rolls: Roll[]) => (index: number) =>
    index < 0 || index >= rolls.length ? UNROLLED : rolls[index];

// Create a new, empty, game
export const createNewGame = (playerName: string): Game => ({
    id: uuid(),
    rolls: [],
    player: playerName || 'John Doe',
    total: 0,
    frames: [],
    gameState: GameState.Playing,
});

const isGameFinished = (frames: Frame[]): boolean => {
    if (frames.length !== MAX_NO_FRAMES) return false;
    const { roll1, roll2, roll3 } = frames[MAX_NO_FRAMES - 1];
    return isStrike(roll1) || isStrike(roll2) || isSpare(roll1, roll2)
        ? isRolled(roll3)
        : isRolled(roll2);
};

// Calculates the sum of rolls, up until stopIndex (if passed)
export const calculateSum = (
    rolls: Roll[]
): { sum: number; frames: Frame[]; isGameFinished: boolean } => {
    const frames: Frame[] = [];
    const getRollAtIndex = createGetRollAtIndex(rolls);
    const geAddValue = (roll: Roll) => (isRolled(roll) ? roll : 0);

    let gameSum = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < MAX_NO_FRAMES; frame++) {
        const isLastFrame = frame === MAX_NO_FRAMES - 1;
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
            roll2: isLastFrame ? nextRoll : isStrikeFrame ? 0 : nextRoll,
            roll3: isLastFrame ? nextNextRoll : UNROLLED,
            total: gameSum,
        });
    }
    return { sum: gameSum, frames, isGameFinished: isGameFinished(frames) };
};

// What symbol/number to show in the frame
export const getRollResultSymbols = (
    roll1: Roll,
    roll2: Roll,
    roll3: Roll
): Array<string | number> => {
    const roll1Symbol = isStrike(roll1) ? 'X' : roll1;
    const roll2Symbol = isStrike(roll2)
        ? 'X'
        : isStrike(roll1)
        ? ''
        : isSpare(roll1, roll2)
        ? '/'
        : roll2;
    const roll3Symbol = isStrike(roll3) ? 'X' : roll3;

    const getUnrolledValue = (roll: Roll | string): string | number =>
        roll === UNROLLED ? '' : roll;

    return [
        getUnrolledValue(roll1Symbol),
        getUnrolledValue(roll2Symbol),
        getUnrolledValue(roll3Symbol),
    ];
};

// How many pins are left on the frame
export const getPinsLeft = (frames: Frame[]) => {
    // First frame
    if (frames.length === 0) return 10;

    const isLastFrame = frames.length === MAX_NO_FRAMES;
    const { roll1, roll2 } = frames[frames.length - 1];

    if (isLastFrame) {
        //TODO: Add logic to return correct amount
        return 10;
    } else if (isRolled(roll1, roll2)) {
        // New frame started
        return 10;
    } else {
        return 10 - roll1;
    }
};
