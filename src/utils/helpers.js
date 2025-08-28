// helper to map favorite into a TMDB-like format
export function mapFavorite(fav) {
  return {
    id: fav.tmdbId,             // TMDB ID
    type: fav.type,              // movie | tv | person
    title: fav.title,            // movie title, tv name, or person name
    posterUrl: fav.posterUrl,    // poster or profile image
    releaseDate: fav.releaseDate || null, // release date / firstAirDate / null for persons
    addedAt: fav.addedAt,        // when user added to favorites
  };
}