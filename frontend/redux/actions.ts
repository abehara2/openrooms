/**
 * @file Defining Redux actions.
 */

/**
 * The action operating on our reducer.
 * @property type - the type of the action.
 * @property value - the value carried by the action.
 */
export interface Action {
  type: ActionTypes;
  value: any;
}

/**
 * The possible action types.
 * @member SET_EXAMPLE
 */
export enum ActionTypes {
  SET_EXAMPLE = "SET_EXAMPLE"
}

/**
 * An example action.
 * @param example the example value.
 * @return the action containing the example value.
 */
export const setExample = (example: string): Action => ({
  type: ActionTypes.SET_EXAMPLE,
  value: example
});
