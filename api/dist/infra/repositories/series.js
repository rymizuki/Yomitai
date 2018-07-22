"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rows = [];
class SeriesRepository {
    constructor() {
    }
    async add(series) {
        rows.push(series);
        return series;
    }
    async search() {
        return rows;
    }
}
exports.SeriesRepository = SeriesRepository;
