import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import { TDetailAnime, TJikanAnime } from "~/types";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { gofetch, Response } from "~/utils";

export class DetailAnime extends AnimeStructure<TDetailAnime> {
  private detailAnime: TDetailAnime = {
    title: "",
    score: 0,
    type: "",
    status: "",
    totalEpisode: 0,
    duration: "",
    aired: "",
    studio: "",
    genres: [],
    trailerUrl: "",
    synopsis: "",
    rating: "",
    coverImg: "",
    episodes: [],
  };

  protected async extractHTML(html: string): Promise<TDetailAnime> {
    const $ = cheerio.load(html);

    // remove unnecesary element
    $(".episodelist:last").remove();

    // populate episodes
    $(".episodelist ul li").each((_, e) => {
      const episode = $(e).find("a").text();
      const date = $(e).find(".zeebr").text();
      const href = $(e).find("a").attr("href") || "";

      this.detailAnime.episodes.push({ episode, date, href });
    });

    // get title and remove value after title
    const rawTitle = $(".episodelist ul li").find("a").last().text();
    const splittedTitle = rawTitle.split(" ");

    for (let i = splittedTitle.indexOf("Episode"); i < splittedTitle.length; i++) {
      splittedTitle.splice(i);
    }
    const title = splittedTitle.join(" ");

    // get details
    const jikanRes = await gofetch({ baseUrl: Env.jikanUrl }, `/anime?q=${title}`);
    const details = (jikanRes?.data as { data: TJikanAnime[] }).data.find((anime) => anime.title === title);

    if (!details) {
      throw new Response(404, "Anime not found");
    }

    const genres = $(".infozingle")
      .find("p")
      .last()
      .text()
      .replace("Genre:", "")
      .split(",")
      .filter((genre) => genre.trim());

    // populate instances
    this.detailAnime.title = title;
    this.detailAnime.score = details.score;
    this.detailAnime.studio = details.studios[0].name;
    this.detailAnime.status = details.status;
    this.detailAnime.type = details.type;
    this.detailAnime.synopsis = details.synopsis;
    genres.map((genre) => this.detailAnime.genres.push({ name: genre.trim() }));
    this.detailAnime.totalEpisode = details.episodes;
    this.detailAnime.duration = details.duration;
    this.detailAnime.aired = details.aired.string;
    this.detailAnime.rating = details.rating;
    this.detailAnime.trailerUrl = details.trailer.embed_url;
    this.detailAnime.coverImg = details.images.jpg.large_image_url;

    return this.detailAnime;
  }

  async get(animeTitle: string): Promise<Response> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, `/anime/${animeTitle}`).catch((error) => {
      console.log(error);
    });

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const animes = await this.extractHTML(String(page.data)).catch((error) => {
      console.log(error);
    });

    return new Response(200, "ok", animes);
  }
}
