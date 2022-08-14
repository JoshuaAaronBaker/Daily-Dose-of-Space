var queryUrl = 'https://api.nasa.gov/planetary/apod?';
var queryKey = 'api_key=23eAmuQLwkYYgp8LLJPj7PSkGxNNKAx1eEbhq5e8';
var queryDate = '&date=';
var fullQuery = queryUrl + queryKey;
var $date = document.querySelector('.date');
var $title = document.querySelector('.title');
var $image = document.querySelector('.image');
var $explanation = document.querySelector('.explanation');
var $dateForm = document.querySelector('.date-selected');
var $selectedDate = document.querySelector('#date');
var $button = document.querySelector('.cta');
var $navHome = document.querySelector('.header-home');
var $calendar = document.querySelector('.calendar');
var $video = document.querySelector('.video');
var $saveButton = document.getElementById('save-button');
var $view = document.querySelectorAll('.view');
var $domRow = document.querySelector('.dom-row');
var $favorites = document.querySelector('.header-favs');
var $modalDate = document.querySelector('.modal-date');
var $modalImage = document.querySelector('.modal-image');
var $modalTitle = document.querySelector('.modal-title');
var $modalExplanation = document.querySelector('.modal-explanation');
var $closeButton = document.getElementById('close-button');
var $removeButton = document.querySelector('.remove-button');

function handleClick(event) {
  data.view = 'entries';
  viewSwap('entries');

  function getApodCurrent() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fullQuery);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var apod = xhr.response;
      $calendar.value = apod.date;
      $date.textContent = apod.date;
      $title.textContent = apod.title;
      if (apod.media_type === 'image') {
        $video.setAttribute('src', '');
        $image.setAttribute('src', apod.hdurl);
      } else if (apod.media_type === 'video') {
        $image.setAttribute('src', '');
        $video.className = 'video';
        $video.setAttribute('src', apod.url);
      }
      $explanation.textContent = apod.explanation;
      $saveButton.className = 'save-button';
    });
    xhr.send();
  }
  getApodCurrent();
}
$button.addEventListener('click', handleClick);

function handleSubmit(event) {
  event.preventDefault();
  var submitDate = $selectedDate.value;
  function getApod() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fullQuery + queryDate + submitDate);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var apod = xhr.response;
      $date.textContent = submitDate;
      $title.textContent = apod.title;
      if (apod.media_type === 'image') {
        $video.setAttribute('src', '');
        $image.setAttribute('src', apod.hdurl);
        $video.className = 'video hidden';
      } else if (apod.media_type === 'video') {
        $image.setAttribute('src', '');
        $video.className = 'video';
        $video.setAttribute('src', apod.url);
      }
      $explanation.textContent = apod.explanation;
      $saveButton.className = 'save-button';
    });
    xhr.send();
  }
  getApod();
}
$dateForm.addEventListener('submit', handleSubmit);

function saveInfo(event) {
  var dataOnScreen = {
    title: $title.textContent,
    date: $date.textContent,
    image: $image.getAttribute('src'),
    video: $video.getAttribute('src'),
    explanation: $explanation.textContent
  };
  for (var i = 0; i < data.savedImages.length; i++) {
    if (data.savedImages[i].title === dataOnScreen.title) {
      return null;
    }
  }
  var $colThird = document.createElement('div');
  $colThird.setAttribute('class', 'column-third');
  var $frame = document.createElement('div');

  $frame.setAttribute('class', 'frame');
  $colThird.appendChild($frame);

  var $savedImage = document.createElement('img');
  $savedImage.setAttribute('src', dataOnScreen.image);
  $savedImage.setAttribute('class', 'saved-image');
  $frame.appendChild($savedImage);

  dataOnScreen.imageId = data.nextEntryId;
  data.nextEntryId++;
  $domRow.prepend($colThird);
  data.savedImages.unshift(dataOnScreen);
  swapToFavs(event);
}
$saveButton.addEventListener('click', saveInfo);

function swapToFavs(event) {
  data.view = 'saved-images';
  viewSwap('saved-images');
}
$favorites.addEventListener('click', swapToFavs);

function handleDomContent(event) {
  for (var i = 0; i < data.savedImages.length; i++) {

    var $colThird = document.createElement('div');
    $colThird.setAttribute('class', 'column-third');
    var $frame = document.createElement('div');

    $frame.setAttribute('class', 'frame');
    $colThird.appendChild($frame);

    var $savedImage = document.createElement('img');
    $savedImage.setAttribute('src', data.savedImages[i].image);
    $savedImage.setAttribute('class', 'saved-image');
    $frame.appendChild($savedImage);

    $domRow.append($colThird);
  }
}
window.addEventListener('DOMContentLoaded', handleDomContent);

function showFullInfo(event) {
  for (var i = 0; i < data.savedImages.length; i++) {
    if (event.target.getAttribute('src') === data.savedImages[i].image) {
      data.currentImage = data.savedImages[i];
      $modalDate.textContent = data.savedImages[i].date;
      $modalImage.setAttribute('src', data.savedImages[i].image);
      $modalTitle.textContent = data.savedImages[i].title;
      $modalExplanation.textContent = data.savedImages[i].explanation;
      viewModal(event);
    }
  }
  return null;

}
$domRow.addEventListener('click', showFullInfo);

function removeData(event) {
  if (event.target.className === 'remove-button') {
    for (var i = 0; i < data.savedImages.length; i++) {
      if (data.currentImage === data.savedImages[i]) {
        data.savedImages.splice(i, 1);
        $domRow.children[i].remove();
        closeModal(event);
      }
    }
  }
}
$removeButton.addEventListener('click', removeData);

function closeModal(event) {
  data.view = 'saved-images';
  swapToFavs(event);
}
$closeButton.addEventListener('click', closeModal);

function viewModal(event) {
  data.view = 'modal-view';
  viewSwap('modal-view');
}

function viewSwap(event) {
  for (var i = 0; i < $view.length; i++) {
    if (event === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}
function swapViewToHome(event) {
  data.view = 'home-page';
  viewSwap('home-page');
}
$navHome.addEventListener('click', swapViewToHome);
