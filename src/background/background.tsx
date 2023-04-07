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
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
      { ratingFrom: 1300, ratingTo: 1900, tags: ['dp', 'implementation'] },
    ],
  })
  chrome.storage.sync.set({
    weekCF: [
      {
        fetchTag: {
          ratingFrom: 1300,
          ratingTo: 1900,
          tags: ['dp', 'implementation'],
        },
        problem: {
          contestId: 289,
          index: 'B',
          name: 'Polo the Penguin and Matrix',
          points: 1000,
          rating: 1400,
        },
      },
      {
        fetchTag: {
          ratingFrom: 1300,
          ratingTo: 1900,
          tags: ['dp', 'implementation'],
        },
        problem: {
          contestId: 1401,
          index: 'D',
          name: 'Maximum Distributed Tree',
          points: 1750,
          rating: 1800,
        },
      },
      {
        fetchTag: {
          ratingFrom: 1300,
          ratingTo: 1900,
          tags: ['dp', 'implementation'],
        },
        problem: {
          contestId: 10,
          index: 'B',
          name: 'Cinema Cashier',
          rating: 1500,
        },
      },
      {
        fetchTag: {
          ratingFrom: 1300,
          ratingTo: 1900,
          tags: ['dp', 'implementation'],
        },
        problem: {
          contestId: 1494,
          index: 'C',
          name: '1D Sokoban',
          rating: 1900,
        },
      },
    ],
  })
  chrome.storage.sync.set({ favouriteCF: [] })
  chrome.storage.sync.set({
    dailyCF: [],
  })
  chrome.storage.sync.set({ solvedCF: [] })
  console.log('Extension is Installed')
  chrome.storage.sync.get(['codesistantInstalledDate'], function (install) {
    if (install.codesistantInstalledDate) {
      console.log('Background', new Date(install.codesistantInstalledDate))
    }
  })
})
