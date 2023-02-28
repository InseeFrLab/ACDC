/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
          <h3>If the issue persist please send me a message</h3>
        </>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
