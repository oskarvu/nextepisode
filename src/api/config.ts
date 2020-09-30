const apiBaseURL = 'https://api.themoviedb.org/3/'

export const keyField = `api_key=${process.env.REACT_APP_API_KEY}`
export const searchURL = `${apiBaseURL}search/tv?`
export const searchResultsRenderLimit = 10
export const tvDataURL = `${apiBaseURL}tv/`
export const searchFields = '&language=en-US&include-adult=false'
export const tvFields = '&language=en-US'

export const backdropBaseUrl = 'https://image.tmdb.org/t/p/'
export const backdropSmall = 'w300'
export const backdropMedium = 'w780'
export const backdropLarge = 'w1280'

export const fetchDelay = 250
export const spinDelay = 150
