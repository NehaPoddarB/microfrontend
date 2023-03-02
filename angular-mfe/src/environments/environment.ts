

export const environment = {
  production: false,
  appVersion: '1.0.0',
  api: {
    baseUrl: 'https://84khoxe5a8.execute-api.ap-south-1.amazonaws.com/dev/',
    routes: {
      createTenant: {endpoint: 'tenants', method: 'POST'},
      getTenant: {endpoint: 'tenants/', method: 'GET'},
      updateTenant: {endpoint: 'tenants/', method: 'PATCH'},

    }
  }
};


