import { ISeriesRepository } from "../repositories/series";
import { TBook, TSeries } from "../../types";

export class SeriesRegistrar {
  private seriesRepository: ISeriesRepository
  constructor (seriesRepository: ISeriesRepository) {
    this.seriesRepository = seriesRepository
  }
  async register (book: TBook) {
    const name = book.title
      .replace(/(\(|（)(.+)(\)|）)/g, '').trim() // （...）を削除
      .replace(/[0-9]*$/, '').trim()            // 末尾の巻数を削除

    const series: TSeries = {
      name
    }

    return await this.seriesRepository.add(series)
  }
}