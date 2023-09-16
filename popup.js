document.addEventListener('DOMContentLoaded', function () {
  const grabUrlButton = document.getElementById('grabUrl');
  const urlDisplay = document.getElementById('urlDisplay');
  const test = document.getElementById('grabUrl')

  test.addEventListener(
    "mouseenter",
    (event) => {
      event.target.style.color = "purple";
      // setTimeout(())
    }
  )

  grabUrlButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      const url = tab.url;
      urlDisplay.textContent = url;
    });
  });
});



