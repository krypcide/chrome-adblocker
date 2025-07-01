window.onload = function () {
  const button = document.getElementById('toggle_button');

  function updateLabel() {
    const enabled = chrome.extension.getBackgroundPage().enabled;
    button.value = enabled ? "Enabled" : "Disabled";
    button.style.backgroundColor = enabled ? "green" : "red";
  }

  button.onclick = function () {
    const background = chrome.extension.getBackgroundPage();
    background.enabled = !background.enabled;
    updateLabel();
  };

  updateLabel();
};
document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.runtime.sendMessage(
        { type: 'GET_AD_COUNT', tabId: tabs[0].id },
        (response) => {
          document.getElementById('adCount').textContent = response?.count ?? 0;
        }
      );
    }
  });
});

