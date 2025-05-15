import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://35f1aae8eed9d368273b6b10d82dc53a@o4509320908177409.ingest.us.sentry.io/4509320909815808",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
    }),
  ],
});