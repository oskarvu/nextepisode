import apiConfig from '../api/config'

export function getQueryText(inputText) {
  return `${apiConfig.searchURL}tv?api_key=${apiConfig.key}${
    apiConfig.options
  }&query=${encodeURI(inputText)}`
}

export async function fetchMovies(apiQuery) {
  try {
    const response = await fetch(apiQuery)
    const data = await response.json()
    return data.results
  } catch (e) {
    console.error(e)
    return []
  }
}
