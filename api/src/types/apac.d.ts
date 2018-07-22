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
    Keywords?: string,
    Power?: string,
  }
  type TOperationResponse = {
    result: {
      ItemSearchResponse?: TOperationResultItemSearch
      ItemSearchErrorResponse?: TOperationResultError
    }
  }
  type TOperationResultItemSearch = {
    Items: {
      Item: TOperationResultItemSearchItem[]
    }
  }
  type TOperationResultItemSearchItem = {
    ASIN: string,
    DetailPageURL: string,
    ItemLinks: {
      ItemLink: Array<{
        Description: string,
        URL: string
      }>
    },
    SmallImage?: TOperationResultItemImage,
    MediumImage?: TOperationResultItemImage,
    LargeImage?: TOperationResultItemImage,
    ImageSets?: {
      ImageSet: {
        $: {
          Category: string,
        },
        SwatchImage: TOperationResultItemImage,
        SmallImage: TOperationResultItemImage,
        ThumbnailImage: TOperationResultItemImage,
        TinyImage: TOperationResultItemImage,
        MediumImage: TOperationResultItemImage,
        LargeImage: TOperationResultItemImage,
        HiResImage: TOperationResultItemImage,
      },
    },
    ItemAttributes?: {
      Author: string[],
      Binding: string, // Kindle版
      Format: string,  // Kindle本
      IsAdultProduct: '0' | '1' ,
      Label: string,
      Languages: {
        Language: {
          Name: string,
          type: string,
        }
      },
      Manufacturer: string,
      NumberOfPages: string,
      ProductGroup: string,
      ProductTypeName: string,
      PublicationDate: string,
      Publisher: string,
      ReleaseDate: string,
      Studio: string,
      Title: string,
    }
  }
  type TOperationResultItemImage = {
    URL: string,
    Height: {
      _: number,
      $: {
        Units: 'pixels',
      }
    },
    Width: {
      _: number,
      $: {
        Units: 'pixels',
      }
    }
  }
  type TOperationResultError = any

  class OperationHelper {
    constructor (config: TOperationHelperConfig, options: TOperationHelperOptions)
    execute (operation: TOperationType, params: TOperationParams): Promise<TOperationResponse>
  }
}
