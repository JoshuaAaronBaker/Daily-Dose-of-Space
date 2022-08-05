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
var $home = document.querySelector('.view');
var $entries = document.querySelector('.entries');
var $navHome = document.querySelector('.header-home');
var $calendar = document.querySelector('.calendar');
var $video = document.querySelector('.video');
var $saveButton = document.getElementById('save-button');

function handleNavHomeClick(event) {
  data.view = 'home-page';
  swapViews();
}
$navHome.addEventListener('click', handleNavHomeClick(event));

function handleClick(event) {
  data.view = 'entries';
  swapViews();

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
  data.savedImages.unshift(dataOnScreen);
}
$saveButton.addEventListener('click', saveInfo);

function swapViews() {
  if (data.view === 'entries') {
    $entries.className = 'entries';
    $home.className = 'hidden';
  } else if (data.view === 'home-page') {
    $entries.className = 'hidden';
    $home.className = 'home-page';
  }
}

function swapViewToHome(event) {
  data.view = 'home-page';
  swapViews();
}
$navHome.addEventListener('click', swapViewToHome);
