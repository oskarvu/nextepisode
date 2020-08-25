const apiBaseURL = 'https://api.themoviedb.org/3/'

export default {
  queryType: {
    SEARCH: 'search',
    TV: 'tv',
  },
  keyField: `api_key=${process.env.REACT_APP_API_KEY}`,
  searchURL: `${apiBaseURL}search/tv?`,
  tvDataURL: `${apiBaseURL}tv/`,
  fetchDelay: 200,
  searchFields: '&language=en-US&include-adult=false',
  tvFields: '&language=en-US',
}
