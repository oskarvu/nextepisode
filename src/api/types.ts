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
  lastAirDate: string | null;
  lastEpisode: Episode | null;
  nextEpisode: Episode | null;
}

export interface SearchResult {
  name: string;
  firstAirDate: string;
  id: number;
}

export enum Status {
  Rumored = "rumored",
  Planned = "planned",
  InProduction = "in production",
  PostProduction = "post production",
  Released = "released",
  Cancelled = "cancelled",
  ReturningSeries = "returning series",
  Ended = "ended",
}

export enum ApiQueryType {
  Search = "search",
  TV = "tv",
}
