import { Link } from 'react-router-dom';

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.98 8.98H14v2.05h.07c.7-1.33 2.42-2.73 4.98-2.73 5.33 0 6.32 3.51 6.32 8.08V24h-5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.66V24h-5V8.98z"
      />
    </svg>
  );
}

function IconTwitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.483 11.24H17.31l-5.3-6.93-6.06 6.93H2.64l7.73-8.84L2.25 2.25h6.03l4.79 6.38 5.174-6.38zm-1.161 18.5h1.833L7.01 3.62H5.05l12.033 17.13z"
      />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.97.24 2.43.402.61.212 1.05.467 1.51.927.46.46.715.9.927 1.51.162.46.347 1.26.402 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.97-.402 2.43-.212.61-.467 1.05-.927 1.51-.46.46-.9.715-1.51.927-.46.162-1.26.347-2.43.402-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.97-.24-2.43-.402a4.042 4.042 0 0 1-1.51-.927 4.042 4.042 0 0 1-.927-1.51c-.162-.46-.347-1.26-.402-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.24-1.97.402-2.43.212-.61.467-1.05.927-1.51.46-.46.9-.715 1.51-.927.46-.162 1.26-.347 2.43-.402C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.152 0-3.524.012-4.763.069-.987.045-1.52.21-1.875.35-.472.183-.808.402-1.163.757-.355.355-.574.691-.757 1.163-.14.355-.305.888-.35 1.875-.057 1.239-.069 1.611-.069 4.763s.012 3.524.069 4.763c.045.987.21 1.52.35 1.875.183.472.402.808.757 1.163.355.355.691.574 1.163.757.355.14.888.305 1.875.35 1.239.057 1.611.069 4.763.069s3.524-.012 4.763-.069c.987-.045 1.52-.21 1.875-.35.472-.183.808-.402 1.163-.757.355-.355.574-.691.757-1.163.14-.355.305-.888.35-1.875.057-1.239.069-1.611.069-4.763s-.012-3.524-.069-4.763c-.045-.987-.21-1.52-.35-1.875-.183-.472-.402-.808-.757-1.163-.355-.355-.691-.574-1.163-.757-.355-.14-.888-.305-1.875-.35-1.239-.057-1.611-.069-4.763-.069zm0 2.7a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 1.8a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 8.5zm5.88-2.22a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24z"
      />
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 5.02 3.66 9.18 8.44 9.98v-7.06H7.9v-2.92h2.41v-2.23c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.49v1.91h2.64l-.42 2.92h-2.22v7.06c4.78-.8 8.44-4.96 8.44-9.98z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="mx-auto max-w-6xl p-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <Link to="/" className="font-medium text-gray-700 hover:underline">
            BM-VA Locations
          </Link>{' '}
          © {new Date().getFullYear()}
        </div>

        <nav aria-label="Social media" className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/NOM-DE-L-ENTREPRISE-PLACEHOLDER"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
          >
            <IconLinkedIn className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Twitter (X)"
            className="text-gray-500 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
          >
            <IconTwitter className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="text-gray-500 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
          >
            <IconInstagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
            className="text-gray-500 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
          >
            <IconFacebook className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}