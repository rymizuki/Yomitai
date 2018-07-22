export type TSeries = {
  name: string
}
export type TSeriesList = TSeries[]

export type TBook = {
  title: string,
  author: Array<string>,
  publicationDate: string,
  url: string,
  images: null | {
    thumbnail: {
      url: string,
      width: number,
      height: number,
    }
  }
}
export type TBooks = Array<TBook>

export type TBookFinderCategory = 'any' | 'author' | 'title'