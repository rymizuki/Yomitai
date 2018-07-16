declare module 'state' {
  export type TRootState = {
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
}
