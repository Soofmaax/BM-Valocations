import * as Sentry from '@sentry/react';
import { useCallback } from 'react';

function ErrorFallback() {
  const reload = useCallback(() => {
    window.location.reload();
  }, []);

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

export default function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return <Sentry.ErrorBoundary fallback={<ErrorFallback />}>{children}</Sentry.ErrorBoundary>;
}