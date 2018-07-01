
const createApi = (path) => {
  const base = '//47.97.171.140:8088/api/v1/'
  return base + path
}

const createContentApi = (path) => {
  const base = '//47.97.171.140:8088/api/v1/page_infos/'
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