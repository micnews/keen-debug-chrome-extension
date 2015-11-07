var keenHostInput = document.getElementById('keen-host');
var saveBtn = document.getElementById('save');
var statusEl = document.getElementById('status');

saveBtn.onclick = saveKeenHost;
function saveKeenHost () {
  chrome.storage.sync.set({
    keenHost: keenHostInput.value
  }, function () {
    statusEl.innerHTML = 'Keen Host saved!'
  });
}

chrome.storage.sync.get('keenHost', function (results) {
  keenHostInput.value = results.keenHost;
});
