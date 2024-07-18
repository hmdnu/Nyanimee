export type TOngoingAnimes = {
  title: string;
  episode: string;
  coverImg: string;
  href: string;
};

export type TDetailAnime = {
  title: string;
  japanese: string;
  score: string;
  producer: string;
  status: string;
  totalEpisode: string;
  type: string;
  duration: string;
  releaseDate: string;
  studio: string;
  genres: string;
  coverImg: string;
  synopsis?: string;
  episodes?: TDetailAnimeEpisodes[];
};

export type TDetailAnimeEpisodes = {
  episode: string;
  date: string;
};

export type TError = {
  error: string;
  status: number | undefined;
};
