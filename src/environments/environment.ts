// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isLocal: true,
  isShowTestBar: false,
  // baseApiUrl: 'http://dbguardreg-api.bezeq.co.il/api',
  baseApiUrl: 'http://localhost:55272/api',
  loggerApiUrl: 'https://tlogger-api.bezeq.co.il/api/data/SendData',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
