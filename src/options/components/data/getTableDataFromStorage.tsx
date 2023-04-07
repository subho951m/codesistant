import { v4 as uuid } from 'uuid'

const getTableDataFromStorage = (setRows, methodCF, setIsGettingStorage) => {
  const newRows = []
  for (let i = 0; i < methodCF.length; i++) {
    let obj = {
      id: uuid(),
      ratingFrom: methodCF[i].ratingFrom,
      ratingTo: methodCF[i].ratingTo,
      tags: [],
    }
    const tagsArray = []
    for (let j = 0; j < methodCF[i].tags.length; j++) {
      const tagObj = {
        value: methodCF[i].tags[j],
        label: methodCF[i].tags[j],
      }
      tagsArray.push(tagObj)
    }
    obj = { ...obj, tags: tagsArray }
    newRows.push(obj)
  }
  setRows(newRows)
  setIsGettingStorage(false)
}
export default getTableDataFromStorage
