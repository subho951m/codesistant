chrome.runtime.onInstalled.addListener(() => {
  const currentTimeStamp = new Date()
  const currentDate = new Date(
    currentTimeStamp.getFullYear(),
    currentTimeStamp.getMonth(),
    currentTimeStamp.getDate()
  )
  chrome.storage.sync.set({ codesistantInstalledDate: currentDate.toString() })
  chrome.storage.sync.set({
    methodCF: [
      { ratingFrom: 1300, ratingTo: 1600, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp'] },
    ],
  })
  chrome.storage.sync.set({
    weekCF: [],
  })
  chrome.storage.sync.set({ favouriteCF: [] })
  chrome.storage.sync.set({
    dailyCF: [],
  })
  chrome.storage.sync.set({ solvedCF: [] })
  //console.log('Extension is Installed')
  chrome.storage.sync.get(['codesistantInstalledDate'], function (install) {
    if (install.codesistantInstalledDate) {
      //console.log('Background', new Date(install.codesistantInstalledDate))
    }
  })
})
