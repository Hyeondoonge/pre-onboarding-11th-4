import { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    console.log(error.message);
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.fallback}</div>;
    }

    return this.props.children;
  }
}
