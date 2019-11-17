export const environment = {
  production: true,
  isLocal: false,
  isShowTestBar: false,
  baseApiUrl: 'https://bguardreg-api.bezeq.co.il/api',
  loggerApiUrl: 'https://logger-api.bezeq.co.il/api/data/SendData',
  wwwBezeqSite: 'https://www.bezeq.co.il/internetandphone/appsandservices/bguard/support/',
  webTrends: {
    appId: 'Bguard'
  },
  loggerApiData: {
    general: {
      appId: 'Bguard',
      app_side: 'client_side'
    },
    httpLogs: {
      type: 'HttpRequest_Error'
    },
    httpF5Logs: {
      type: 'F5_Error'
    },
    events: {
      type: 'events_trace',
    }
  },
  errorMessages: {
    defaultErrorMessage: 'חלה תקלה אנא נסו שוב מאוחר יותר'
  },
  times: {
    EachTimeCheckOrderResult: 3000,
    TotalTimeCheckOrderResult: 60000
  }
};
