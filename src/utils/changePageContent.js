import {deepClone} from './tools'

const changeObjList = (content) => {
  const { originalList, key, list} = content
  originalList.forEach((l, i) => {
    l[key] = list[i]
  })
}


const pageChanged = (page, changeFunction) => {
  const p = deepClone(page)

  changeFunction(p)

  // log(p)
  // log(page)
  return p
}

export {changeObjList, pageChanged}