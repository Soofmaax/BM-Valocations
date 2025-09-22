# Security Policy

## Supported versions

This is an actively developed project. Security fixes will be applied to `main`.

## Reporting a vulnerability

- Please do not open public issues for security problems.
- Report privately via email: security@bm-valocations.com (placeholder)
  - Include steps to reproduce, affected files/versions, and potential impact.
  - We aim to acknowledge within 5 business days.

## Guidelines

- Never commit secrets to the repository.
- Client-side env variables must be prefixed with `VITE_` (Vite exposes these).
- Rotate credentials regularly in your hosting/deployment platform.
- Use HTTPS in production and set appropriate security headers at the CDN/host level (CSP, HSTS, X-Content-Type-Options, Referrer-Policy).