import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFBF0' }}>
          <span style={{ fontSize: 48 }}>🛕</span>
          <h1 style={{ fontSize: 24, marginBottom: 12, color: '#1A1A1A' }}>Something went wrong</h1>
          <p style={{ color: '#6B7280', marginBottom: 24, maxWidth: 400 }}>{this.state.error?.message || 'An unexpected error occurred'}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #FF9933, #E65100)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
