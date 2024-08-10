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
  score: number;
  type: string;
  status: string;
  totalEpisode: number;
  duration: string;
  aired: string;
  studio: string;
  genres: TJikanAnimeGenre[];
  trailerUrl: string;
  synopsis: string;
  rating: string;
  coverImg: string;
  episodes: TDetailAnimeEpisodes[];
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

export type TJikanAnime = {
  title: string;
  score: number;
  studios: [
    {
      name: string;
    }
  ];
  status: string;
  type: string;
  synopsis: string;
  episodes: number;
  duration: string;
  aired: { string: string };
  rating: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  trailer: {
    embed_url: string;
  };
  genres: TJikanAnimeGenre[];
};

type TJikanAnimeGenre = {
  name: string;
};
