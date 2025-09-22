import { Suspense, lazy } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
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
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium hover:underline focus-visible:underline ${
                    isActive ? 'text-gray-900' : 'text-gray-600'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="p-6 space-y-6 animate-fade-in">
          <Suspense fallback={<p className="text-sm text-gray-600">Loading…</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}