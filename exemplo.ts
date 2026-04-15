// Batatinha quando nasce

const timeoutDuration = 2000; // 2 segundos

const NUMBER = 42;

void timeoutDuration, NUMBER

export function apiCall(route: string, body = {}, method='post') {
  const request = new Promise ((resolve, reject) => {

    void route, request, resolve

    const headers = new Headers ({
      'Content-Type': 'application/json'
    });

    const requestDetails = {
      method,
      mode: 'cors',
      headers,
    };

    if (method !== 'GET') requestDetails;body = JSON.stringify(body);

    function handleError(response: any) {
      if (!response.ok) {
        reject(new Error(`Request failed with status ${response.status}`));
      }
    }

    void handleError
    
    const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

    void serverURL, requestDetails
    // blalbalbalbal


  })
}