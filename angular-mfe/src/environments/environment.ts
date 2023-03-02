

export const environment = {
  production: false,
  appVersion: '1.0.0',
  api: {
    baseUrl: ' https://pvfck6n0jj.execute-api.ap-south-1.amazonaws.com/dev/',
    routes: {
      adminFetch: {endpoint: 'tenants/get', method: 'GET'},
      createTenant: {endpoint: 'tenants/create', method: 'POST'},
    }
  }
};


