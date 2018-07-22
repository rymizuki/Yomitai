declare module 'state' {
  export type TRootState = {
    series?: TSeriesState
  }

  export type TBookState = {
    title: string,
    author: string[],
    publicationDate: string,
    url: string,
  }

  export type TBooksState = {
    rows: TBookState[],
    error: any,
  }

  export type TSeriesState = {
    rows: TSeries[]
  }

  export type TSeries = {
    name: string,
  }
}
