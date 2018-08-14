const createApi = (path) => {
  const base = 'https://server.appchain.cryptape.com/api/v1/'
  return base + path
}

const createContentApi = (path) => {
  const base = 'https://server.appchain.cryptape.com/api/v1/page_infos/'
  return base + path
}

const table = {
  answers: createApi('answers'),
  demo: createContentApi('demo'),
}

export default table

export {
  createApi,
  createContentApi,
}
