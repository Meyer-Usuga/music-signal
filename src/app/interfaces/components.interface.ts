export interface Author {
  name: string;
  image: string;
}

export interface Song {
  title: string;
  author: Author;
  cover: string;
}
