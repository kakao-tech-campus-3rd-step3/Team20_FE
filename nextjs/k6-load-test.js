import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '5m', target: 50 },
    { duration: '10m', target: 50 },
    { duration: '3m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<2000'],
    errors: ['rate<0.05'],
    http_reqs: ['rate>10'],
  },
};

const endpoints = [
  '/',
  '/content/421928',
  '/content/803796',
  '/location/15059',
];

export default function () {
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const url = `https://kspot.site${endpoint}`;

  const response = http.get(url, {
    headers: {
      'User-Agent': 'k6-load-test',
    },
    timeout: '30s',
  });

  const result = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
    'response has content': (r) => r.body.length > 0,
  });

  errorRate.add(!result);

  sleep(Math.random() * 2 + 1);
}