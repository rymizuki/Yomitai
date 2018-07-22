"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apac_1 = require("apac");
const lodash_1 = require("lodash");
class APACClient {
    constructor({ accessKeyId, accessSecretKey, associateTag }) {
        this.helper = new apac_1.OperationHelper({
            locale: 'JP',
            awsId: accessKeyId,
            awsSecret: accessSecretKey,
            assocId: associateTag,
            maxRequestsPerSecond: 1,
            xml2jsOptions: {
                explicitArray: false
            }
        }, { locale: 'JP' });
    }
    async searchBooks(args) {
        // TODO: この辺は外部から呼び出せると嬉しい
        const params = {
            binding: 'kindle',
            title: `not 月刊`,
            author: args.author,
            pubdate: args.period ? `during ${args.period}` : undefined,
        };
        if (args.title)
            params.title = `(${args.title} and ${params.title}`;
        const query = {
            SearchIndex: 'Books',
            ResponseGroup: 'Images,ItemAttributes',
            Sort: 'daterank',
            Power: lodash_1.map(params, (value, key) => {
                return value ? `${key}:${value}` : '';
            }).join(' and '),
        };
        if (args.keyword)
            query.Keywords = args.keyword;
        console.log('query', query);
        return await this.helper.execute('ItemSearch', query)
            .then((res) => {
            if (res.result.ItemSearchResponse &&
                res.result.ItemSearchResponse.Items &&
                res.result.ItemSearchResponse.Items.Item) {
                let items = res.result.ItemSearchResponse.Items.Item;
                if (!lodash_1.isArray(items))
                    items = [items];
                // console.log(JSON.stringify(items, null, 2))
                const rows = items.map(({ DetailPageURL, ItemAttributes, ImageSets }) => {
                    if (!ItemAttributes)
                        throw new Error('ItemAttribute is not defined');
                    const { Title, Author, PublicationDate, } = ItemAttributes;
                    return {
                        title: Title,
                        author: lodash_1.isArray(Author) ? Author : [Author],
                        publicationDate: PublicationDate,
                        url: DetailPageURL,
                        images: ImageSets ? {
                            thumbnail: {
                                url: ImageSets.ImageSet.ThumbnailImage.URL,
                                width: ImageSets.ImageSet.ThumbnailImage.Width._,
                                height: ImageSets.ImageSet.ThumbnailImage.Height._,
                            }
                        } : null
                    };
                });
                // console.log(rows)
                return rows;
            }
            else if (lodash_1.get(res, 'result.ItemSearchResponse.Items')) {
                // console.log(res.result.ItemSearchResponse.Items)
                return [];
            }
            else if (lodash_1.get(res, 'result.ItemSearchErrorResponse')) {
                console.error(JSON.stringify(res.result, null, 2));
                throw new Error(res.result.ItemSearchErrorResponse.Error.Message);
            }
            else {
                throw new Error('something wrong');
            }
        });
    }
}
exports.APACClient = APACClient;
