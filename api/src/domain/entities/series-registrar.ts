import { ISeriesRepository } from "../repositories/series";
import { TBook, TSeries } from "../../types";

export class SeriesRegistrar {
  private seriesRepository: ISeriesRepository
  constructor (seriesRepository: ISeriesRepository) {
    this.seriesRepository = seriesRepository
  }
  async register (book: TBook) {
    const series: TSeries = {
      name: book.title
    }
    console.log(series)
    return await this.seriesRepository.add(series)
  }
}