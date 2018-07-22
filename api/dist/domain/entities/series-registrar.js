"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SeriesRegistrar {
    constructor(seriesRepository) {
        this.seriesRepository = seriesRepository;
    }
    async register(book) {
        const series = {
            name: book.title
        };
        return await this.seriesRepository.add(series);
    }
}
exports.SeriesRegistrar = SeriesRegistrar;
