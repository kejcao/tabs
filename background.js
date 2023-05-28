function update(_) {
  chrome.tabs.query({}, tabs => {
    chrome.windows.getAll({}, wins => {
      const incogs = wins.filter(w => w.incognito).length;
      chrome.action.setBadgeText({ text: tabs.length.toString() });
      chrome.action.setTitle({
        title: `${wins.length} windows (${incogs} incognito) and ${tabs.length} tabs`
      });
    });
  });
}

update();
chrome.tabs.onCreated.addListener(update);
chrome.tabs.onRemoved.addListener(update);
chrome.windows.onCreated.addListener(update);
chrome.windows.onRemoved.addListener(update);
