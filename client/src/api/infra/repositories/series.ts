import { ISeriesRepository } from "../../domain/repositories/series";
import { TSeries, TSeriesList } from "../../types";

const rows: TSeriesList = []

export class SeriesRepository implements ISeriesRepository {
  constructor () {
  }
  async add (series: TSeries) {
    rows.push(series)
    return series
  }
  async search () {
    console.log(rows)
    return rows
  }
}