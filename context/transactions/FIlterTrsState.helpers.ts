import {
  AddKey,
  AddOneId,
  RemoveOneId,
  SetAmountHandler,
} from "./types/FilterTrsStateContext.helpers.types";
/**
 * remove one index of the array and type of index is string
 */
const removeOneId: RemoveOneId = function (array, idToRm) {
  return array.filter((item) => {
    return item != idToRm;
  });
};
/**
 * add one index to the array and type of index is string
 */
const addOneId: AddOneId = function (array, idToAdd) {
  return [...array, idToAdd];
};
/**
 * this method helps to make safe query keys 
 */
const addKey: AddKey = function (key) {
  return key;
};
/**
 * when amount is 0 it returns null to remove min or max amount query
 */
const setAmountHandler: SetAmountHandler = (amount) => {
  return amount !== 0 ? amount : null;
};

export { addKey, removeOneId, addOneId, setAmountHandler };
