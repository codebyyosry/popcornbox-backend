// utils/tmdbMapper.js

// Base URL for TMDB images
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// --- Lightweight movie (list item) ---
export function mapTMDBMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null,
    releaseDate: movie.release_date || null,
    overview: movie.overview || null,
    voteAverage: movie.vote_average || 0,
  };
}

// --- Detailed movie (for getMovieDetails) ---
export function mapTMDBMovieDetails(movie) {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null,
    backdropUrl: movie.backdrop_path ? `${IMAGE_BASE}${movie.backdrop_path}` : null,
    releaseDate: movie.release_date || null,
    overview: movie.overview || null,
    voteAverage: movie.vote_average || 0,
    runtime: movie.runtime || null,
    genres: movie.genres ? movie.genres.map(g => g.name) : [],
    tagline: movie.tagline || null,
    status: movie.status || null,
    homepage: movie.homepage || null,
  };
}

// --- Credits (cast + crew) ---
export function mapTMDBCredits(credits) {
  return {
    cast: credits.cast.map(member => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profileUrl: member.profile_path ? `${IMAGE_BASE}${member.profile_path}` : null,
    })),
    crew: credits.crew.map(member => ({
      id: member.id,
      name: member.name,
      job: member.job,
      department: member.department,
    })),
  };
}

// --- Helpers for paginated responses ---
export function formatPaginatedResponse(apiResponse, mapper = mapTMDBMovie) {
  return {
    page: apiResponse.page,
    totalPages: apiResponse.total_pages,
    totalResults: apiResponse.total_results,
    data: apiResponse.results.map(mapper), // mapper can be movie, person, tv, etc.
  };
}

// --- Lightweight person (list item) ---
export function mapTMDBPerson(person) {
  return {
    id: person.id,
    name: person.name,
    profileUrl: person.profile_path ? `${IMAGE_BASE}${person.profile_path}` : null,
    knownFor: person.known_for_department || null,
    popularity: person.popularity || 0,
  };
}

// --- Detailed person ---
export function mapTMDBPersonDetails(person) {
  return {
    id: person.id,
    name: person.name,
    profileUrl: person.profile_path ? `${IMAGE_BASE}${person.profile_path}` : null,
    biography: person.biography || null,
    birthday: person.birthday || null,
    deathday: person.deathday || null,
    placeOfBirth: person.place_of_birth || null,
    popularity: person.popularity || 0,
    knownFor: person.known_for_department || null,
    alsoKnownAs: person.also_known_as || [],
    homepage: person.homepage || null,
  };
}



// --- Multi search (movies, tv, person) ---
export function mapTMDBMulti(item) {
  switch (item.media_type) {
    case "movie":
      return { ...mapTMDBMovie(item), mediaType: "movie" };
    case "tv":
      return { ...mapTMDBTV(item), mediaType: "tv" };
    case "person":
      return { ...mapTMDBPerson(item), mediaType: "person" };
     default:
      // Fallback for unexpected cases (future-proofing)
      return { 
        id: item.id, 
        name: item.name || item.title || null, 
        mediaType: item.media_type || "unknown" 
      };
  }
}


// --- Lightweight TV (list item) ---
export function mapTMDBTV(tv) {
  return {
    id: tv.id,
    name: tv.name,
    posterUrl: tv.poster_path ? `${IMAGE_BASE}${tv.poster_path}` : null,
    firstAirDate: tv.first_air_date || null,
    overview: tv.overview || null,
    voteAverage: tv.vote_average || 0,
  };
}

// --- Detailed TV ---
export function mapTMDBTVDetails(tv) {
  return {
    id: tv.id,
    name: tv.name,
    posterUrl: tv.poster_path ? `${IMAGE_BASE}${tv.poster_path}` : null,
    backdropUrl: tv.backdrop_path ? `${IMAGE_BASE}${tv.backdrop_path}` : null,
    firstAirDate: tv.first_air_date || null,
    lastAirDate: tv.last_air_date || null,
    overview: tv.overview || null,
    voteAverage: tv.vote_average || 0,
    numberOfSeasons: tv.number_of_seasons || 0,
    numberOfEpisodes: tv.number_of_episodes || 0,
    genres: tv.genres ? tv.genres.map((g) => g.name) : [],
    tagline: tv.tagline || null,
    status: tv.status || null,
    homepage: tv.homepage || null,
    inProduction: tv.in_production,
    originCountry: tv.origin_country || [],
    // --- Add seasons ---
    seasons: tv.seasons
      ? tv.seasons.map((season) => ({
          id: season.id,
          name: season.name,
          airDate: season.air_date || null,
          episodeCount: season.episode_count || 0,
          posterUrl: season.poster_path ? `${IMAGE_BASE}${season.poster_path}` : null,
          seasonNumber: season.season_number,
        }))
      : [],
  };
}