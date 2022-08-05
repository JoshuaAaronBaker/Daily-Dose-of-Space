/* exported data */
var data = {
  view: 'home-page',
  savedImages: [],
  nextEntryId: 1
};

var previousDataJson = localStorage.getItem('ajax-local-storage');

if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

function storeItems(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-local-storage', dataJSON);
}

window.addEventListener('beforeunload', storeItems);
