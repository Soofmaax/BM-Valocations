import { Suspense, lazy } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import AppErrorBoundary from './components/ErrorBoundary';
import SkipLink from './components/SkipLink';
import RouteAnnouncer from './components/RouteAnnouncer';
import RouteFocusHandler from './components/RouteFocusHandler';
import Footer from './components/Footer';
import ConstructionNotice from './components/ConstructionNotice';

const Home = lazy(() => import('./pages/Home'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Support = lazy(() => import('./pages/Support'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <ConstructionNotice />
      <SkipLink />
      {!isHome && (
        <header className="p-6 border-b bg-white">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                <Link to="/" className="hover:opacity-90 focus-visible:underline">
                  BM-VA Locations
                </Link>
              </h1>
              <p className="text-sm text-gray-500">Premium car rental services</p>
            </div>

            <nav aria-label="Primary" className="flex gap-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm font-medium hover:underline focus-visible:underline ${
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Home
              </NavLink>
              <NavLink
                to="/fleet"
                className={({ isActive }) =>
                  `text-sm font-medium hover:underline focus-visible:underline ${
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Fleet
              </NavLink>
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `text-sm font-medium hover:underline focus-visible:underline ${
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Support
              </NavLink>
            </nav>
          </div>
        </header>
      )}

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className={`${isHome ? '' : 'p-6 space-y-6'} animate-fade-in`}
      >
        <RouteAnnouncer />
        <RouteFocusHandler />
        <AppErrorBoundary>
          <Suspense fallback={<p className="text-sm text-gray-600">Loading…</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/support" element={<Support />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </main>

      {!isHome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}