"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const router_1 = __importDefault(require("./router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const app = new koa_1.default();
app.use(koa_logger_1.default());
app.use(koa_bodyparser_1.default());
app.use(router_1.default.routes());
app.use(router_1.default.allowedMethods());
app.listen(3000);
console.log('listen');
