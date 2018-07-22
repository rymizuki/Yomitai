"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const apac_client_1 = require("../../helpers/apac-client");
const associateTag = process.env.APAC_ACCESS_KEY || '';
const accessKeyId = process.env.APAC_ACCESS_KEY || '';
const accessSecretKey = process.env.APAC_ACCESS_SECRET_KEY || '';
class BooksRepository {
    constructor() {
        this.client = new apac_client_1.APACClient({
            associateTag,
            accessKeyId,
            accessSecretKey,
        });
    }
    async search(...args) {
        const params = this.createSearchParam(args);
        return await this.client.searchBooks(params);
    }
    async searchByAuthor(keyword, period_category) {
        return await this.search('author', keyword, period_category);
    }
    async searchByTitle(keyword, period_category) {
        return await this.search('title', keyword, period_category);
    }
    createSearchParam(args) {
        let field = null;
        let period_category;
        let keyword;
        if (args.length == 2) {
            [keyword, period_category] = args;
        }
        else {
            [field, keyword, period_category] = args;
        }
        const params = {};
        // set keyword
        if (field == null || field == 'any') {
            params.keyword = keyword;
        }
        else {
            params[field] = keyword;
        }
        // set period
        if (period_category != null && period_category != 'all') {
            const format_table = {
                this_month: 'MM-YYYY',
                this_year: 'YYYY'
            };
            params.period = moment_1.default().format(format_table[period_category]);
        }
        return params;
    }
}
exports.BooksRepository = BooksRepository;
