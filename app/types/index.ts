export type TBaseAnime = {
  title: string;
  coverImg: string;
  href: string;
  episode?: string;
  day?: string;
  totalEpisode?: string;
  score?: string;
  status?: string;
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
  streamUrl: string;
  downloadUrl: TDownloadUrl[];
};

export type TDownloadUrl = {
  resolution: string;
  providers: TDownloadProvider[];
  size: string;
};

export type TDownloadProvider = {
  provider: string;
  href: string;
};

export type TAnimeLists = {
  alphabet: string;
  animes: TAnime[];
};

export type TAnime = {
  title: string;
  href: string;
};
