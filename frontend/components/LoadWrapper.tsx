/**
 * @file A wrapper component for rendering data that needs to be loaded.
 */

import { Component, Props, ReactNode } from "react";

/**
 * The possible statuses of this.props.loadFunction.
 * @member INITIAL
 * @member LOADING
 * @member RESOLVED
 * @member ERROR
 */
enum LoadState {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  RESOLVED = "RESOLVED",
  ERROR = "ERROR"
}

/**
 * The possible props passed to LoadWrapper.
 * @property loadFunction - the async function being loaded.
 * @property loadState - the optional ReactNode to be rendered while loadFunction is loading.
 * @property resolvedState - the ReactNode to be rendered once loadFunction resolves.
 * @property errorState - the optional ReactNode to be rendered if loadFunction throws an Error.
 *
 */
interface LoaderProps extends Props<Component> {
  loadFunction: (...args: any[]) => Promise<void>;
  loadState?: ReactNode;
  resolvedState: ReactNode;
  errorState?: ReactNode;
}

/**
 * Internal state of the Loader.
 * @property loadState - a LoadState corresponding to the current status of this.props.loadFunction.
 * @property error - the caught Error, if any.
 */
interface LoaderState {
  loadState: LoadState;
  error: Error | null;
}

/**
 * Wraps loading functionality.
 * Displays specified state after calling this.props.loadFunction, with options for custom loading and error states.
 */
export default class LoadWrapper extends Component<LoaderProps, LoaderState> {
  constructor(props: LoaderProps) {
    super(props);
    this.state = {
      loadState: LoadState.INITIAL,
      error: null
    };
  }

  /**
   * Called immediately after the component is inserted into the DOM tree.
   * Calls this.props.loadFunction and manages this.state.loadState.
   */
  async componentDidMount(): Promise<void> {
    this.setState({ loadState: LoadState.LOADING });
    try {
      await this.props.loadFunction();
      this.setState({ loadState: LoadState.RESOLVED });
    } catch (error) {
      this.setState({ loadState: LoadState.ERROR, error: error });
    }
  }

  /**
   * Renders the component.
   */
  render(): ReactNode {
    switch (this.state.loadState) {
      case LoadState.INITIAL: {
        return null;
      }
      case LoadState.LOADING: {
        return this.props.loadState || "Loading...";
      }
      case LoadState.RESOLVED: {
        return this.props.resolvedState;
      }
      case LoadState.ERROR: {
        return (
          this.props.errorState ||
          (this.state.error !== null && this.state.error.message) ||
          "An error was encountered."
        );
      }
      default: {
        return null;
      }
    }
  }
}
