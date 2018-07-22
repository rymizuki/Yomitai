import { TSeries, TSeriesList } from "../../types";

export interface ISeriesRepository {
  add (series: TSeries): Promise<TSeries>
  search (): Promise<TSeriesList>
}