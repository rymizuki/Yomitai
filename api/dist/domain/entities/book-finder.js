"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookFinder {
    constructor(booksRepository) {
        this.booksRepository = booksRepository;
    }
    async find(category, keyword, period_category) {
        if (category == 'author') {
            return this.booksRepository.searchByAuthor(keyword, period_category);
        }
        else if (category == 'title') {
            return this.booksRepository.searchByTitle(keyword, period_category);
        }
        else {
            return this.booksRepository.search(keyword, period_category);
        }
    }
}
exports.BookFinder = BookFinder;
