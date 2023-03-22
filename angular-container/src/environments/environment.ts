
export const environment = {
  production: false,
  appVersion: '1.0.0',
  api: {
    baseUrl: 'https://84khoxe5a8.execute-api.ap-south-1.amazonaws.com/dev/',
    routes: {
      login: {endpoint: 'login', method: 'POST'},
      refresh: {endpoint: 'refreshToken', method: 'POST'}
    }
  }
};



