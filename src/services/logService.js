import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn: "https://15a38c2072bb4c57b1fe5ecc7b437fd8@o1113861.ingest.sentry.io/6388673",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

const log = (error) => {
  Sentry.captureException(error);
};

const logger = { init, log };

export default logger;
