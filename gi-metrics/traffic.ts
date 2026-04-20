let requests = 0;
let errors = 0;

export function trackRequest() {
  requests++;
}

export function trackError() {
  errors++;
}

export function getTrafficMetrics() {
  return {
    requests,
    errors
  };
}

