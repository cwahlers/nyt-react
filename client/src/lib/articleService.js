const baseUrl = '/articles'; //because of the proxy in package.json of the client/package.json it'll know to use localhost:3001 before /songs on your dev environment - THIS IS NOT A NPM THING - this is a create-react-app thing


export const __loadArticles = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}

export const __loadArticle = (_id) => {
  return fetch(`${baseUrl}/one/${_id}`)
    .then(res => res.json())
}

export const __createArticle = (article) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  }).then(res => res.json())
}

export const __updateArticle = (article, _id) => {
  return fetch(`${baseUrl}/${_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(article)
  }).then(res => res.json())
}

//this is the route we're hitting on our express api
  //songs/votes/:id/:direction
export const __voteOnArticle = (_id, direction) => {
  return fetch(`${baseUrl}/votes/${_id}/${direction}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

export const __destroyArticle = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}