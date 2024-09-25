import * as cheerio from "cheerio";
import { TEnv } from "~/utils/env";
import { TDetailAnime, TDetailAnimeEpisodes, TJikanAnime } from "~/types";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { gofetch, Response } from "~/utils";

export class DetailAnime extends AnimeStructure<TDetailAnime> {
  #env: TEnv;

  constructor(env: TEnv) {
    super();
    this.#env = env;
  }

  protected async extractHTML(html: string): Promise<TDetailAnime> {
    const $ = cheerio.load(html);

    // remove unnecesary element
    $(".episodelist:last").remove();

    const episodes: TDetailAnimeEpisodes[] = [
      {
        episode: "",
        date: "",
        href: "",
      },
    ];
    // populate episodes
    $(".episodelist ul li").each((_, e) => {
      const episode = $(e).find("a").text();
      const date = $(e).find(".zeebr").text();
      const href = $(e).find("a").attr("href") || "";

      episodes.push({ episode, date, href });
    });

    // get title and remove value after title
    const rawTitle = $(".episodelist ul li").find("a").last().text();
    const splittedTitle = rawTitle.split(" ");

    for (let i = splittedTitle.indexOf("Episode"); i < splittedTitle.length; i++) {
      splittedTitle.splice(i);
    }
    const title = splittedTitle.join(" ");

    // get details
    const jikan = await gofetch({ baseUrl: this.#env.jikanUrl }, `/anime?q=${title}`);
    const res = jikan?.data as { data: TJikanAnime[] };

    const details = res.data.find((anime) => anime.title === title) || res.data[0];

    if (!details) {
      throw new Response(404, "Anime not found");
    }

    const genres = $(".infozingle")
      .find("p")
      .last()
      .text()
      .replace("Genre:", "")
      .split(",")
      .map((genre) => genre.trim());

    // populate instances
    const animeGenre: { name: string }[] = [];
    genres.map((genre) => animeGenre.push({ name: genre.trim() }));

    return {
      title: title,
      score: details.score,
      studio: details.studios[0].name,
      status: details.status,
      type: details.type,
      synopsis: details.synopsis,
      genres: animeGenre,
      totalEpisode: details.episodes,
      duration: details.duration,
      aired: details.aired.string,
      rating: details.rating,
      trailerUrl: details.trailer.embed_url,
      coverImg: details.images.jpg.large_image_url,
      episodes,
    };
  }

  async get<T>(animeTitle: string): Promise<Response<T>> {
    const page = await gofetch({ baseUrl: this.#env.baseUrl }, `/anime/${animeTitle}`).catch((error) => {
      console.log(error);
    });

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const animes = await this.extractHTML(String(page.data)).catch((error) => {
      console.log(error);
    });

    return new Response<T>(200, "ok", animes as T);
  }
}
