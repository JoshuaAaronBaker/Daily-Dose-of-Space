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
      $image.setAttribute('src', apod.hdurl);
      $explanation.textContent = apod.explanation;
    });
    xhr.send();
  }
  getApod();
}
$dateForm.addEventListener('submit', handleSubmit);

// function getApod() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', fullQuery);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     var apod = xhr.response;
//     if (apodDate === apod.date) {
//       $date.textContent = apod.date;
//     } else if (apodDate !== apod.date) {
//       $date.textContent = apodDate;
//     }
//     $title.textContent = apod.title;
//     $image.setAttribute('src', apod.hdurl);
//     $explanation.textContent = apod.explanation;
//   });
//   xhr.send();
// }
// getApod();

var $button = document.querySelector('.cta');
var $home = document.querySelector('.view');
var $entries = document.querySelector('.entries');
var $navHome = document.querySelector('.header-home');

function handleNavHomeClick(event) {
  data.view = 'home-page';
  swapViews();
}
$navHome.addEventListener('click', handleNavHomeClick(event));

function handleClick(event) {
  data.view = 'entries';
  swapViews();
}
$button.addEventListener('click', handleClick);

function swapViews() {
  if (data.view === 'entries') {
    $entries.className = 'entries';
    $home.className = 'hidden';
  } else if (data.view === 'home-page') {
    $entries.className = 'hidden';
    $home.className = 'home-page';
  }
}

// function swapViewToEntries(event) {
//   data.view = 'entries';
//   swapViews();
// }
// $headerEntries.addEventListener('click', swapViewToEntries);

function swapViewToHome(event) {
  data.view = 'home-page';
  swapViews();
}
$navHome.addEventListener('click', swapViewToHome);
