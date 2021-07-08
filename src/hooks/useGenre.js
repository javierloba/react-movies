const useGenres = (selectedGenres) => {
    if(selectedGenres.length < 1) return "";

    const GenreIds = selectedGenres.map(g => g.id);
    return GenreIds.reduce((acc, currentValue) => acc + ',' + currentValue)
}

export default useGenres;