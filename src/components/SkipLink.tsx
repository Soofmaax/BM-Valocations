import { MouseEvent } from 'react';

export default function SkipLink() {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.getElementById('main-content') as HTMLDivElement | null;
    if (main) {
      main.focus();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-white focus:text-gray-900 focus:border focus:rounded"
    >
      Skip to content
    </a>
  );
}