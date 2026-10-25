import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 900,
  duration: '15s',
};

export default function () {
  const response = http.get('http://127.0.0.1:45965/health');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'API is healthy': (r) => r.body.includes('healthy'),
  });

  sleep(1);
}
