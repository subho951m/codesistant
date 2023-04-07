const handleDataSubmit = (data, setCloseThisTab) => {
  const newMethodCF = []
  for (let i = 0; i < data.length; i++) {
    const tagsArray = []
    for (let j = 0; j < data[i].tags.length; j++) {
      tagsArray.push(data[i].tags[j].value)
    }
    const obj = {
      ratingFrom: data[i].ratingFrom,
      ratingTo: data[i].ratingTo,
      tags: tagsArray,
    }
    newMethodCF.push(obj)
  }
  //console.log(newMethodCF)
  chrome.storage.sync.set(
    { methodCF: newMethodCF, isNewMethodCFSet: 'yes' },
    function () {
      // data has been set
      // start closing of this tab
      setCloseThisTab(true)
      setTimeout(() => {
        window.close()
      }, 2000)
    }
  )
}
export default handleDataSubmit
