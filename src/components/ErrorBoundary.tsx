import React from 'react';

function ErrorFallback() {
  const reload = () => {
    window.location.reload();
  };

  return (
    <section aria-labelledby="error-heading" className="space-y-4 py-12 text-center">
      <h2 id="error-heading" className="text-2xl font-semibold">
        Something went wrong
      </h2>
      <p className="text-gray-600 max-w-prose mx-auto">
        An unexpected error occurred. Please try again or reload the page.
      </p>
      <div>
        <button
          type="button"
          onClick={reload}
          className="inline-flex items-center px-3 py-2 rounded bg-gray-900 text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
        >
          Reload
        </button>
      </div>
    </section>
  );
}

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

class RawErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // Keep minimal: log to console for now; can integrate a reporter later.
    // eslint-disable-next-line no-console
    console.error('App error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

export default function AppErrorBoundary({ children }: Props) {
  return <RawErrorBoundary>{children}</RawErrorBoundary>;
}