chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('%cKEEN DEBUG:', 'font-weight:bold;');
  console.log('%ccollection:  %s', 'color:green;', msg.collection);
  console.log('%cdata:        %O',' color:green;', msg.data);
});
