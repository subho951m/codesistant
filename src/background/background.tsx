chrome.runtime.onInstalled.addListener(() => {
  const currentTimeStamp = new Date()
  const currentDate = new Date(
    currentTimeStamp.getFullYear(),
    currentTimeStamp.getMonth(),
    currentTimeStamp.getDate()
  )
  chrome.storage.local.set({ codesistantInstalledDate: currentDate.toString() })
  chrome.storage.local.set({
    methodCF: [
      { ratingFrom: 1300, ratingTo: 1600, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp'] },
    ],
  })
  chrome.storage.local.set({ weekCF: [] })
  // weekCF: [
  //   {
  //     problem: { name: 'Three displays', contestId: 987, index: 'C' },
  //     fetchTag: {
  //       ratingFrom: 1300,
  //       ratingTo: 1600,
  //       tags: ['dp', 'implementation'],
  //     },
  //   },
  //   {
  //     problem: { name: 'Cyclic Permutations', contestId: 1391, index: 'C' },
  //     fetchTag: { ratingFrom: 1300, ratingTo: 1900, tags: ['dp'] },
  //   },
  // ],
  chrome.storage.local.set({ favouriteCF: [] })
  chrome.storage.local.set({
    dailyCF: [],
  })
  chrome.storage.local.set({ solvedCF: [] })
  //console.log('Extension is Installed')
  chrome.storage.local.get(['codesistantInstalledDate'], function (install) {
    if (install.codesistantInstalledDate) {
      // console.log('Background', new Date(install.codesistantInstalledDate))
    }
  })
})
