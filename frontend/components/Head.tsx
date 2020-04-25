/**
 * @file A modular extension to Next's Head component.
 */

import React, { Component, Props, ReactNode } from "react";

import NextHead from "next/head";

/**
 * The possible props passed to Head.
 * @property title - a string.
 * @property description - a string.
 * @property keyword - a string containing comma-separated values.
 */
interface HeadProps extends Props<Component> {
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * Injects information into the <head> tag.
 */
export default class Head extends Component<HeadProps> {
  /**
   * Renders the component.
   */
  render(): ReactNode {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={
            this.props.description ||
            "A React boilerplate written in TypeScript with support for Next.js, Redux, and SCSS"
          }
        />
        <meta
          name="keywords"
          content={
            this.props.keywords || "React, Next, Redux, SCSS, Boilerplate"
          }
        />
        <meta name="author" content="Arpan Laha" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {`${
            this.props.title ? `${this.props.title} | ` : ""
          }React Boilerplate`}
        </title>
      </NextHead>
    );
  }
}
