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
export function formatPaginatedResponse(apiResponse) {
  return {
    page: apiResponse.page,
    totalPages: apiResponse.total_pages,
    totalResults: apiResponse.total_results,
    results: apiResponse.results.map(mapTMDBMovie),
  };
}