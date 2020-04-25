/**
 * An example componenting interfacing with Redux.
 */

import React, { Component, Props, ReactNode } from "react";

import { connect } from "react-redux";
import { ReducerState } from "../redux/reducer";

/**
 * Fetches Redux state and assigns it to props.
 * @param state the Redux state.
 * @returns the fetched state props.
 */
const mapStateToProps = (state: ReducerState): ExampleReduxProps => ({
  example: state.example
});

/**
 * Props introduced by mapStateToProps.
 * NOTE: in this case, ExampleReduxProps is separated from ExampleProps to differentiate between Redux and normal props.
 * @property example - our example Redux state.
 */
interface ExampleReduxProps {
  example: string;
}

/**
 * Extends default component props with ExampleReduxProps.
 */
interface ExampleProps extends Props<Component>, ExampleReduxProps {}

/**
 * A component to show off the current Redux state.
 */
export default connect(mapStateToProps)(
  class Example extends Component<ExampleProps> {
    /**
     * Renders the component.
     */
    render(): ReactNode {
      return <h1>The current Redux state is: {this.props.example}</h1>;
    }
  }
);
