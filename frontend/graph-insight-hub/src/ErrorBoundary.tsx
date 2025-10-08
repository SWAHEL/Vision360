import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: any };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: any) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ whiteSpace: "pre-wrap", color: "#ff8b8b", padding: 16 }}>
          {String(this.state.error?.stack || this.state.error)}
        </pre>
      );
    }
    return this.props.children;
  }
}
