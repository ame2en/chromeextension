chrome.tabs.onActivated.addListener(() => {
    chrome.tabs.query({ active: false, currentWindow: true }, (tabs) => {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: pauseVideo
        });
      });
    });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active === false) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: pauseVideo
      });
    }
  });
  
  function pauseVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  