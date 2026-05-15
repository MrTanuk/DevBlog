export interface Post {
   id: string;
   title: string;
   content: string;
   createdAt: string;
   updatedAt?: string;
}

export interface JikanAnime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  type: string;
  episodes: number | null;
  status: string;
  score: number;
  rank: number;
  synopsis: string;
  year: number | null;
  genres: Array<{ mal_id: number; name: string }>;
}

export interface JikanResponse {
  data: JikanAnime[];
}
