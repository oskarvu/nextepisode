export interface Episode {
  airDate: string;
  episode: number;
  name: string;
  season: number;
}

export interface Movie {
  name: string;
  status: string;
  id: number;
  backdrop: string | null;
  inProduction: boolean;
  lastAirDate: string;
  lastEpisode: Episode | null;
  nextEpisode: Episode | null;
}

export interface SearchResult {
  name: string;
  firstAirDate: string;
  id: number;
}

export enum Status {
  Rumored = "RUMORED",
  Planned = "PLANNED",
  InProduction = "IN_PRODUCTION",
  PostProduction = "POST_PRODUCTION",
  Released = "RELEASED",
  Cancelled = "CANCELLED",
}

export enum ApiQueryType {
  Search = "SEARCH",
  TV = "TV",
}
