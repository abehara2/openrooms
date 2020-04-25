/**
 * @file Defining the the Redux state and reducer.
 */

import { Action, ActionTypes } from "./actions";

/**
 * The state managed by the reducer.
 * @property example - a string.
 */
export interface ReducerState {
  example: string;
}

/**
 * The initial state fed into the reducer.
 */
export const initialState: ReducerState = {
  example: "example"
};

/**
 * The reducer function.
 * @param state the previous state.
 * @param action the incoming action.
 * @returns the new state.
 */
export const reducer = (
  state: ReducerState = initialState,
  action: Action
): ReducerState => {
  switch (action.type) {
    case ActionTypes.SET_EXAMPLE:
      return {
        ...state,
        example: action.value
      };
    default:
      return state;
  }
};
