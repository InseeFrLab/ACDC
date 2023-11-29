/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';

class ErrorBoundary extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { hasError: false };

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong. Please try again</h1>
          <h3>If the issue persists, feel free to send me a message</h3>
        </>
      );
    }

    // @ts-expect-error - children is a prop
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
