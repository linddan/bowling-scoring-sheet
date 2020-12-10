import { Frame, Game, GameState, Roll } from '@/types/game';
import { v4 as uuid } from 'uuid';

export const UNROLLED = -1;
export const MAX_NO_PINS = 10;
export const MAX_NO_FRAMES = 10;

// Check if all rolls passed are rolled
export const isRolled = (...rolls: Roll[]): boolean => rolls.every((roll) => roll !== UNROLLED);
// Check if passed roll is a strike
export const isStrike = (roll: Roll): boolean => (isRolled(roll) ? roll === MAX_NO_PINS : false);
// Check if first two rolls are a spare
export const isSpare = (roll1: Roll, roll2: Roll): boolean =>
    isRolled(roll1, roll2) ? roll1 + roll2 === MAX_NO_PINS : false;
// Get roll value at a given index
export const createGetRollAtIndex = (rolls: Roll[]) => (index: number) =>
    rolls[index] === undefined ? UNROLLED : rolls[index];
// Get value to be added to sum from a roll
export const getAddValue = (roll: Roll) => (isRolled(roll) ? roll : 0);
// Check if game is finished based on status of last frame
export const isGameFinished = (frames: Frame[]): boolean => {
    if (frames.length !== MAX_NO_FRAMES) return false;
    const { roll1, roll2, roll3 } = frames[MAX_NO_FRAMES - 1];
    return isStrike(roll1) || isStrike(roll2) || isSpare(roll1, roll2)
        ? isRolled(roll3)
        : isRolled(roll2);
};

// Calculates the sum of rolls and creates frames
export const calculateSum = (
    rolls: Roll[]
): { sum: number; frames: Frame[]; isGameFinished: boolean } => {
    const frames: Frame[] = [];
    let gameSum = 0;
    let rollIndex = 0;

    // Create helper function to get roll value at a given index
    const getRollAtIndex = createGetRollAtIndex(rolls);

    for (let frame = 0; frame < MAX_NO_FRAMES; frame++) {
        const currRoll = getRollAtIndex(rollIndex);
        const nextRoll = getRollAtIndex(rollIndex + 1);
        const nextNextRoll = getRollAtIndex(rollIndex + 2);
        const isLastFrame = frame === MAX_NO_FRAMES - 1;
        const isStrikeFrame = isStrike(currRoll);
        const isSpareFrame = isSpare(currRoll, nextRoll);
        let frameSum = currRoll;

        // Stop the loop if no roll exists on this index
        if (!isRolled(currRoll)) break;

        if (isStrikeFrame || isSpareFrame) {
            frameSum += getAddValue(nextRoll);
            frameSum += getAddValue(nextNextRoll);
            rollIndex = isSpareFrame ? rollIndex + 2 : rollIndex + 1;
        } else {
            frameSum += getAddValue(nextRoll);
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

// Create a new, empty, game
export const createNewGame = (playerName: string): Game => ({
    id: uuid(),
    rolls: [],
    player: playerName || 'John Doe',
    total: 0,
    frames: [],
    gameState: GameState.Playing,
});

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
    if (frames.length === 0) return MAX_NO_PINS;

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
