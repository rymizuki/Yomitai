"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const book_finder_1 = require("./domain/entities/book-finder");
const books_1 = require("./infra/repositories/books");
const series_registrar_1 = require("./domain/entities/series-registrar");
const series_1 = require("./infra/repositories/series");
const router = new koa_router_1.default();
router.get('/api/', (ctx) => {
    ctx.body = { message: 'hello world' };
});
router.get('/api/books', async (ctx) => {
    const { field, keyword, period } = ctx.query;
    console.log('book', field, keyword, period);
    try {
        const finder = new book_finder_1.BookFinder(new books_1.BooksRepository());
        const books = await finder.find(field, keyword, period);
        ctx.body = {
            rows: books
        };
    }
    catch (error) {
        console.error(error);
        if (error.message) {
            ctx.body = { error: error.message };
        }
        else {
            ctx.body = { error };
        }
    }
});
router.post('/api/series', async (ctx) => {
    const book = ctx.request.body;
    if (!book) {
        ctx.body = {};
    }
    else {
        try {
            const registrar = new series_registrar_1.SeriesRegistrar(new series_1.SeriesRepository());
            await registrar.register(book);
            ctx.body = { book };
        }
        catch (error) {
            ctx.body = { error };
        }
    }
});
router.get('/api/series', async (ctx) => {
    try {
        const repos = new series_1.SeriesRepository();
        const rows = await repos.search();
        ctx.body = { rows };
    }
    catch (error) {
        ctx.body = { error };
    }
});
exports.default = router;
