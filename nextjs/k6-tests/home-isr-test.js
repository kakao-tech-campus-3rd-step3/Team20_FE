import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 20,
      maxVUs: 250,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<3000'],
    errors: ['rate<0.05'],
    http_reqs: ['rate>95'],
  },
};

export default function () {
  const url = 'https://kspot.site/';

  const response = http.get(url, {
    headers: {
      'User-Agent': 'k6-home-isr-test',
    },
    timeout: '30s',
  });

  const result = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
    'response has content': (r) => r.body.length > 0,
    'has ISR content': (r) => r.body.includes('html'),
  });

  errorRate.add(!result);
}

export function handleSummary(data) {
  const tps = data.metrics.http_reqs.values.rate;

  return {
    'stdout': JSON.stringify({
      test: 'Home (ISR)',
      tps: tps.toFixed(2),
      avg_duration: data.metrics.http_req_duration.values.avg.toFixed(2),
      p95_duration: data.metrics.http_req_duration.values['p(95)'].toFixed(2),
      p99_duration: data.metrics.http_req_duration.values['p(99)'].toFixed(2),
      error_rate: (data.metrics.errors.values.rate * 100).toFixed(2) + '%',
      total_requests: data.metrics.http_reqs.values.count,
    }, null, 2),
  };
}
