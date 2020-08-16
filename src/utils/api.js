import apiConfig from '../api/config'

const {
  keyField,
  searchURL,
  tvDataURL,
  searchFields,
  tvFields,
  queryType,
} = apiConfig

export function getApiURL(query, type) {
  switch (type) {
    case queryType.search:
      return `${searchURL}${keyField}${searchFields}&query=${encodeURI(query)}`
    case queryType.tv:
      return `${tvDataURL}${query}?${keyField}${tvFields}`
    default:
      return ''
  }
}

export async function fetchFromTMDB(apiQuery) {
  try {
    const response = await fetch(apiQuery)
    return await response.json()
  } catch (e) {
    console.error(e)
    return []
  }
}
