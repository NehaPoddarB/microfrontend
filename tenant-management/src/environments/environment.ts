

export const environment = {
  production: false,
  appVersion: '1.0.0',
  api: {
    baseUrl: 'http://localhost:5000/',
    routes: {
      createTenant: {endpoint: 'tenants', method: 'POST'},
      getTenant: {endpoint: 'tenants/', method: 'GET'},
      updateTenant: {endpoint: 'tenants/', method: 'PATCH'},
      deleteTenant: {endpoint: 'tenants/status/', method: 'PATCH'}
    }
  }
};


