/**
 * @file The home page.
 */

import React, { ChangeEvent, Component, Props, ReactNode } from "react";

import { Example, Head, LoadWrapper } from "../components";

import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { setExample } from "../redux/actions";
import { ReducerState } from "../redux/reducer";

import "../public/style.scss";

/**
 * Fetches Redux state and assigns it to props.
 * @param state the Redux state.
 * @returns the fetched state props.
 */
const mapStateToProps = (state: ReducerState): AppReduxStateProps => ({
  example: state.example
});

/**
 * Fetchs Redux actions and assigns them to props.
 * @param dispatch the Redux dispatch.
 * @returns the fetched action props.
 */
const mapDispatchToProps = (dispatch: Dispatch): AppReduxActionProps =>
  bindActionCreators({ setExample }, dispatch);

/**
 * App props derived from mapStateToProps
 * @property example - a string
 */
interface AppReduxStateProps {
  example: string;
}

/**
 * App props derived from mapDispatchToProps
 * @property setExample - an action setting example
 */
interface AppReduxActionProps {
  setExample: (example: string) => void;
}

/**
 * The props belonging to App, extending AppReduxStateProps and AppReduxActionProps
 */
interface AppProps
  extends Props<Component>,
    AppReduxStateProps,
    AppReduxActionProps {}

/**
 * THe state of the App.
 * @property newExample - the inputted new example.
 * @Propert message - the loaded message.
 */
interface AppState {
  newExample: string;
  message: string | null;
}

/**
 * The home page.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
      super(props);
      this.state = {
        newExample: this.props.example,
        message: null
      };
    }

    /**
     * Called when the input text changes.
     * Sets this.state.newExample to the inputted text.
     */
    updateExample = (event: ChangeEvent<HTMLInputElement>): void => {
      this.setState({ newExample: event.target.value });
    };

    /**
     * Called when the submit button is clicked.
     * Passes in the current value of this.state.newExample to this.props.setExample.
     */
    handleSubmit = (): void => this.props.setExample(this.state.newExample);

    /**
     * An example function for loading data.
     */
    loadMessage = async (): Promise<void> => {
      /**
       * A helper method for sleeping for a designated length of time time.
       * @param ms the milliseconds to sleep for.
       */
      function sleep(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const timeOut = 2000;
      await sleep(timeOut);
      this.setState({ message: "Loaded!" });
    };

    /**
     * Renders the component.
     */
    render(): ReactNode {
      return (
        <div className="App">
          <Head />
          <Example />
          <h2>
            <label>
              Enter new example text below:
              <br />
              <input
                type="text"
                value={this.state.newExample}
                onChange={this.updateExample}
              ></input>
            </label>
          </h2>
          <button onClick={this.handleSubmit}>Submit</button>
          <br />
          <h2>Below is an example LoadWrapper-wrapped message: </h2>
          <LoadWrapper
            loadFunction={this.loadMessage}
            loadState="Wait 2 seconds"
            resolvedState={this.state.message}
          />
        </div>
      );
    }
  }
);
