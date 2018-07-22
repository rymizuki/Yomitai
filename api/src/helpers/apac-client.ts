import { OperationHelper, TOperationParams } from 'apac'
import { map, get, isArray } from 'lodash'
import { TBook, TBooks } from '../domain/entities/book-finder';

export type TAPACClientConfig = {
  accessKeyId: string,
  accessSecretKey: string,
  associateTag: string,
}

export interface TAPACClientSearchBooksParams {
  author?: string,
  title?: string,
  keyword?: string,
  period?: string,
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
  async searchBooks (args: TAPACClientSearchBooksParams) {
    // TODO: この辺は外部から呼び出せると嬉しい
    const params = {
      binding: 'kindle',
      title: `not 月刊`,
      author: args.author,
      pubdate: args.period ? `during ${ args.period }` : undefined,
    }
    if (args.title) params.title = `(${ args.title } and ${ params.title }`
    
    const query: TOperationParams = {
      SearchIndex: 'Books',
      ResponseGroup: 'Images,ItemAttributes',
      Sort: 'daterank',
      Power: map(params, (value: string, key: string) => {
        return value ? `${ key }:${ value }` : ''
      }).join(' and '),
    }
    if (args.keyword) query.Keywords = args.keyword

    console.log('query', query)

    return await this.helper.execute('ItemSearch', query)
      .then((res) => {
        if (res.result.ItemSearchResponse &&
            res.result.ItemSearchResponse.Items && 
            res.result.ItemSearchResponse.Items.Item) {
          let items = res.result.ItemSearchResponse.Items.Item
          if (!isArray(items)) items = [ items ]
          console.log(JSON.stringify(items, null, 2))

          const rows: TBooks = items.map(({ DetailPageURL, ItemAttributes, ImageSets }): TBook => {
            if (!ItemAttributes) throw new Error('ItemAttribute is not defined')

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
              images: ImageSets ? {
                thumbnail: {
                  url: ImageSets.ImageSet.ThumbnailImage.URL,
                  width: ImageSets.ImageSet.ThumbnailImage.Width._,
                  height: ImageSets.ImageSet.ThumbnailImage.Height._,
                }
              } : null
            }
          })
          // console.log(rows)
          return rows
        } else if (get(res, 'result.ItemSearchResponse.Items')) {
          // console.log(res.result.ItemSearchResponse.Items)
          return []
        } else if (get(res, 'result.ItemSearchErrorResponse')) {
          console.error(JSON.stringify(res.result, null, 2))
          throw new Error(res.result.ItemSearchErrorResponse.Error.Message)
        } else {
          throw new Error('something wrong')
        }
      })
  }
}