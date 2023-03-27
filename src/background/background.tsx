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
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
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
  // chrome.storage.sync.set({ codesistantInstalledDate: new Date() })
  // chrome.storage.sync.set({ codesistantInstalledDate: new Date() })
  // chrome.storage.sync.set({ codesistantInstalledDate: new Date() })
  // chrome.storage.sync.set({ codesistantInstalledDate: new Date() })
  console.log('Extension is Installed')
  chrome.storage.sync.get(['codesistantInstalledDate'], function (install) {
    if (install.codesistantInstalledDate) {
      console.log('Background', new Date(install.codesistantInstalledDate))
    }
  })
})