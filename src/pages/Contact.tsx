import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="space-y-6 max-w-xl">
      <Helmet>
        <title>Contact — BM-VA</title>
        <meta
          name="description"
          content="Get in touch with BM-VA Locations regarding bookings, fleet information, or support."
        />
      </Helmet>

      <h2 id="contact-heading" className="text-xl font-semibold">
        Contact us
      </h2>
      <p className="text-gray-600">
        Have a question about bookings or our fleet? Send us a message.
      </p>

      <form
        className="bg-white border rounded-lg p-4 shadow-sm space-y-4"
        aria-describedby="contact-instructions"
      >
        <p id="contact-instructions" className="sr-only">
          All fields marked with * are required.
        </p>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            autoComplete="name"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email *
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 rounded bg-gray-900 text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
        >
          Send message
        </button>
      </form>
    </section>
  );
}