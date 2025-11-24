import { FilterTrsStateType } from "./FilterTrsStateContext.types";

/**
 * Remove one id of an array

*/
type RemoveOneId<T extends string = string> = (array: T[], idToRm: T) => T[];
/**
 * Add one id to an array
 */
type AddOneId<T extends string = string> = (array: T[], idToAdd: T) => T[];

/**
 * update min and max amount helper
 */
type SetAmountHandler = (n: number) => number | null;
type QueryKeys = keyof FilterTrsStateType;
type AddKey = <T extends QueryKeys>(key: T) => T;

export type { AddKey, AddOneId, RemoveOneId, SetAmountHandler };
