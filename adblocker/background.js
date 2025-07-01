var enabled = true;
var adCounts = {}; // Keeps track of blocked ads per tab

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (enabled) {
      console.log("Blocking:", details.url);
      if (details.tabId >= 0) {
        adCounts[details.tabId] = (adCounts[details.tabId] || 0) + 1;
      }
    }
    return { cancel: enabled };
  },
  { urls: blocked_domains },
  ["blocking"]
);

// Respond to popup requests for ad count
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_AD_COUNT') {
    const count = adCounts[message.tabId] || 0;
    sendResponse({ count });
  }
});

// Clean up when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  delete adCounts[tabId];
});

