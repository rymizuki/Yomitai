import { OperationHelper } from 'apac'
import { defaults, map, get, isArray } from 'lodash'
import { TBook, TBooks } from '../domain/entities/book-finder';

export type TAPACClientConfig = {
  accessKeyId: string,
  accessSecretKey: string,
  associateTag: string,
}

export class APACClient {
  private helper: OperationHelper
  constructor ({ accessKeyId, accessSecretKey, associateTag }: TAPACClientConfig) {
    this.helper = new OperationHelper({
      locale: 'JP',
      awsId: accessKeyId,
      awsSecret: accessSecretKey,
      assocId: associateTag,
      maxRequestsPerSecond: 1,
      xml2jsOptions:  {
        explicitArray: false
      }
    }, { locale: 'JP' })
  }
  async searchBooks (args: { author?: string }) {
    const params = defaults(args, {
      title: 'not 月刊',
      binding: 'kindle',
    })
    return await this.helper.execute('ItemSearch', {
      SearchIndex: 'Books',
      ResponseGroup: 'ItemAttributes',
      Power: map(params, (value: string, key: string) => {
        return `${ key }:${ value }`
      }).join(' and '),
    })
      .then((res) => {
        if (get(res, 'result.ItemSearchResponse.Items.Item')) {
          // console.log(res.result.ItemSearchResponse.Items.Item)

          let items = res.result.ItemSearchResponse.Items.Item
          if (!isArray(items)) items = [ items ]

          const rows: TBooks = items.map(({ DetailPageURL, ItemAttributes }: any): TBook => {
            const {
              Title,
              Author,
              PublicationDate,
            } = ItemAttributes
            return {
              title: Title,
              author: isArray(Author) ? Author : [Author],
              publicationDate: PublicationDate,
              url: DetailPageURL,
            }
          })
          // console.log(rows)
          return rows
        } else if (get(res, 'result.ItemSearchResponse.Items')) {
          // console.log(res.result.ItemSearchResponse.Items)
          return []
        } else if (get(res, 'result.ItemSearchErrorResponse')) {
          // console.error(JSON.stringify(res.result, null, 2))
          throw new Error(res.result.ItemSearchErrorResponse.Error.Message)
        } else {
          throw new Error(res)
        }
      })
  }
}