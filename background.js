chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id === activeInfo.tabId) {
          // Unpause the video on the newly activated tab
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: unpauseVideo
          });
        } else {
          // Pause the video on inactive tabs
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: pauseVideo
          });
        }
      });
    });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && !tab.active) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: pauseVideo
      });
    }
  });


  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url && !tab.url.startsWith("chrome://")) {
        // Run content script only if it's not a chrome:// page
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
      }
    });
  });
  
  function pauseVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  
  function unpauseVideo() {
    const video = document.querySelector('video');
    if (video && video.paused) {
      video.play();
    }
  }
  