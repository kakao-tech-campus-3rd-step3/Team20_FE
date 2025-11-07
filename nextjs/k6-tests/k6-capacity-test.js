import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from 'k6/metrics';

const errorRate = new Rate('errors');
const successfulRequests = new Counter('successful_requests');

export const options = {
  scenarios: {
    capacity_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      
      stages: [
        { duration: '1m', target: 300 },   
        { duration: '2m', target: 300 },   
        { duration: '1m', target: 600 },   
        { duration: '2m', target: 600 }, 
        { duration: '1m', target: 900 },   
        { duration: '2m', target: 900 },   
        { duration: '1m', target: 1000 },
        { duration: '2m', target: 1000 },
        { duration: '1m', target: 0 },
      ],
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<5000'],  
    errors: ['rate<0.1'],                
  },
};

const endpoints = [
  '/',
  '/content/421928',
  '/content/803796',
  '/location/15059',
];

export default function () {
  const pageViews = Math.floor(Math.random() * 3) + 2;
  
  for (let i = 0; i < pageViews; i++) {
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const url = `https://kspot.site${endpoint}`;
    
    const response = http.get(url, {
      headers: {
        'User-Agent': 'k6-capacity-test',
      },
      timeout: '30s',
    });
    
    const result = check(response, {
      'status is 200': (r) => r.status === 200,
    });
    
    if (result) {
      successfulRequests.add(1);
    }
    
    errorRate.add(!result);

    sleep(Math.random() * 7 + 3);
  }

  sleep(Math.random() * 2 + 1);
}

export function handleSummary(data) {
  console.log('\n========================================');
  console.log('용량 테스트 결과 요약');
  console.log('========================================');
  
  const metrics = data.metrics;
  
  console.log(`\n 요청 통계:`);
  console.log(`  - 총 요청 수: ${metrics.http_reqs.values.count}`);
  console.log(`  - 성공 요청: ${metrics.successful_requests.values.count}`);
  console.log(`  - 실패율: ${(metrics.errors.values.rate * 100).toFixed(2)}%`);
  
  console.log(`\n  응답 시간:`);
  console.log(`  - 평균: ${metrics.http_req_duration.values.avg.toFixed(2)}ms`);
  console.log(`  - 중간값: ${metrics.http_req_duration.values.med.toFixed(2)}ms`);
  console.log(`  - 95백분위: ${metrics.http_req_duration.values['p(95)'].toFixed(2)}ms`);
  console.log(`  - 99백분위: ${metrics.http_req_duration.values['p(99)'].toFixed(2)}ms`);
  console.log(`  - 최대: ${metrics.http_req_duration.values.max.toFixed(2)}ms`);
  
  console.log(`\n 동시 사용자:`);
  console.log(`  - 최대: ${metrics.vus_max.values.max}`);
  
  console.log(`\n TPS (초당 요청 수):`);
  console.log(`  - 평균: ${metrics.http_reqs.values.rate.toFixed(2)}`);
  
  console.log('\n========================================\n');
  
  return {
    'stdout': JSON.stringify(data, null, 2),
  };
}
