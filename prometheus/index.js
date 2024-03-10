const client = require("prom-client");
const defaultLabelProps = {
  app: "hiringseed-api",
};

function MetricsClient({ labelProps = {} } = {}) {
  const register = new client.Registry();
  register.setDefaultLabels({
    ...defaultLabelProps,
    ...labelProps,
  });

  client.collectDefaultMetrics({ register });

  const httpRequestDurationMicroseconds = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in microseconds",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  });

  register.registerMetric(httpRequestDurationMicroseconds);

  return register;
}

module.exports = MetricsClient;
