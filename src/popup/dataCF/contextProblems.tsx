const contextProblems = (setContextProblemsCF, setShouldDisplayData) => {
  chrome.storage.local.get(
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
      //console.log(dataCF.dailyCF)
      setShouldDisplayData((element) => ({ ...element, problems: true }))
      //console.log('Now time to display data')
      // now it is correct time to display data
    }
  )
}

export default contextProblems
