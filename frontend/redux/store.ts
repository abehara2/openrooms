/**
 * @file Initializing a redux store.
 */

import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Action } from "./actions";
import { initialState, reducer, ReducerState } from "./reducer";

/**
 * Initializes the redux store.
 * @param state the initial state.
 * @returns the initial store.
 */
export const initializeStore = (
  state: ReducerState = initialState
): Store<ReducerState, Action> =>
  createStore(reducer, state, composeWithDevTools(applyMiddleware()));
