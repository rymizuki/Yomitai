declare module 'apac' {
  type TOperationHelperConfig = {
    locale: string,
    awsId: string,
    awsSecret: string,
    assocId: string,
    maxRequestsPerSecond: number,
    xml2jsOptions?: {
      explicitArray?: boolean,
    }
  }
  type TOperationHelperOptions = {
    locale: string,
  }
  type TOperationType = 'ItemSearch'
  type TOperationParams = {
    SearchIndex: 'Books',
    ResponseGroup?: string,
    Sort?: string,
    Power?: string,
  }

  class OperationHelper {
    constructor (config: TOperationHelperConfig, options: TOperationHelperOptions)
    execute (operation: TOperationType, params: TOperationParams): Promise<any>
  }
}
