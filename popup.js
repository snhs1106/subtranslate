document.addEventListener('DOMContentLoaded', function () {
  const grabUrlButton = document.getElementById('grabUrl');
  const urlDisplay = document.getElementById('urlDisplay');

  grabUrlButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      const url = tab.url;
      urlDisplay.textContent = url;
    });
  });
});