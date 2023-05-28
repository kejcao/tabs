chrome.windows.getAll({}, wins => {
  document.querySelector('#wins').textContent = wins.length.toString();
  document.querySelector('#incog').textContent = wins.filter(w => w.incognito).length.toString();
})

chrome.tabs.query({}, tabs => {
  document.querySelector('#tabs').textContent = tabs.length.toString();

  let urls = {};
  for (const t of tabs) {
    const host = new URL(t.url).hostname;
    if (!(host in urls)) {
      urls[host] = 0;
    }
    urls[host] += 1;
  }

  urls = Object.entries(urls).sort((lhs, rhs) => {
    return rhs[1] - lhs[1];
  }).slice(0, 10);

  for (const [url, cnt] of urls) {
    const div = document.createElement('div');
    const code = document.createElement('code');

    const b = document.createElement('b');
    b.textContent = cnt.toString();
    code.appendChild(b)
    code.appendChild(document.createTextNode(` ${url}`))

    div.appendChild(code);
    div.style.textAlign = 'center';
    document.querySelector('#sites').appendChild(div);
  }
})
