document.addEventListener("visibilitychange", () => {
    const video = document.querySelector("video");
    if (!video) return;
  
    if (document.visibilityState === "hidden") {
      // Pause the video when the tab is hidden
      if (!video.paused) {
        video.pause();
      }
    } else if (document.visibilityState === "visible") {
      // Unpause the video when the tab is visible again
      if (video.paused) {
        video.play();
      }
    }
  });