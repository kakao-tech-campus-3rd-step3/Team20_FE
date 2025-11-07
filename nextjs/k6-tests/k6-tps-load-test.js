import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-arrival-rate', 
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 150,  
      maxVUs: 400, 
      stages: [
        { duration: '1m', target: 100 },  
        { duration: '3m', target: 100 },   
        { duration: '1m', target: 150 },  
        { duration: '3m', target: 150 },  
        { duration: '1m', target: 0 },   
      ],
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<2000'],
    errors: ['rate<0.05'],
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
      'User-Agent': 'k6-tps-load-test',
    },
    timeout: '30s',
  });

  const result = check(response, {
    'status is 200': (r) => r.status === 200,
  });
  errorRate.add(!result);
}
