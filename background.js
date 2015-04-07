var debug = false;
var hasAPIs = chrome.webRequest;
var updateBadge = function () {
  chrome.browserAction.setTitle({
    title: debug ? 'Keen debug: ON' : 'Keen debug: OFF'
  });
  chrome.browserAction.setBadgeBackgroundColor({
    color: debug ? '#0f0' : '#f00'
  });
  chrome.browserAction.setBadgeText({
    text: debug ? 'ON' : 'OFF'
  });
}

function queryStringToObject(queryString) {
  var queryObj = {};
  var querySplit = queryString.split('&');
  querySplit.forEach(function (queryItem) {
    var itemObj = queryItem.split('=');
    queryObj[itemObj[0]] = itemObj[1];
  });

  return queryObj;
}

function parseKeenUrl(url) {
  var splitUrl = url.split('?');
  var queryObj = queryStringToObject(splitUrl[1]);
  var urlParts = splitUrl[0].split('/');

  var data = queryObj.data.replace('%3D', '');
  var collection = urlParts[urlParts.length - 1];

  return {
    data: JSON.parse(window.atob(data)),
    collection: collection
  }
}

updateBadge();

// Toggle debug mode on icon click
chrome.browserAction.onClicked.addListener(
  function(tab) {
    debug = !debug;
    updateBadge();
    chrome.tabs.update(tab.id, {url: tab.url, selected: tab.selected}, null);
      hasAPIs && chrome.webRequest.handlerBehaviorChanged();
  }
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details, callback) {
      if (debug) {
        var keenData = parseKeenUrl(details.url);
        chrome.tabs.sendMessage(details.tabId, keenData);
      }
    },
    {urls: ['https://api.keen.io/*']}
);
