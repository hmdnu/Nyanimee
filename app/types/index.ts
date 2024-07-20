export type TOngoingAnimes = {
  title: string;
  episode: string;
  coverImg: string;
  href: string;
  day: string;
};

export type TDetailAnime = {
  title: string;
  japanese: string;
  score: string;
  producer: string;
  type: string;
  status: string;
  totalEpisode: string;
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
  href: string;
};

export type TError = {
  error: string;
  status: number | undefined;
};

export type TDownloadAnimeUrl = {
  title: string;
  downloadUrl: TDownloadUrl[];
};

export type TDownloadUrl = {
  resolution: string;
  provider: TDownloadProvider[];
  size: string;
};

export type TDownloadProvider = {
  provider: string;
  href: string;
};
