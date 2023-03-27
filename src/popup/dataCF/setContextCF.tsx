const setContextCF = (
  setContextProblemsCF,
  setContextStatusCF,
  setShouldDisplayData
) => {
  chrome.storage.sync.get(
    ['methodCF', 'weekCF', 'favouriteCF', 'dailyCF', 'solvedCF'],
    function (dataCF) {
      setContextProblemsCF((element) => ({
        ...element,
        methodCF: dataCF.methodCF,
        weekCF: dataCF.weekCF,
        favouriteCF: dataCF.favouriteCF,
        dailyCF: dataCF.dailyCF,
        solvedCF: dataCF.solvedCF,
      }))
      setContextStatusCF((element) => ({
        ...element,
        methodCF: dataCF.methodCF,
        weekCF: dataCF.weekCF,
        favouriteCF: dataCF.favouriteCF,
        dailyCF: dataCF.dailyCF,
        solvedCF: dataCF.solvedCF,
      }))
      // console.log(dataCF.methodCF)
      setShouldDisplayData(true)
      console.log('Now time to display data')
      // now it is correct time to display data
    }
  )
}

export default setContextCF
