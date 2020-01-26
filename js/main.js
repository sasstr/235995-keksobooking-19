'use strict';

var ADS_AMOUNT = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var typesOfLodging = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var times = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var LocationX = {
  MIN: 250,
  MAX: 1000
};

var LocationY = {
  MIN: 130,
  MAX: 630
};

var Price = {
  MIN: 1000,
  MAX: 10000
};

var Guest = {
  MIN: 1,
  MAX: 7
};

var Pin = {
  HEIGHT: 40,
  WIDTH: 40,
};

var offerTitles = ['a', 'b', 'c', 'd', 's', 'l', 'm', 'z'];

var rooms = [1, 2, 3, 100];

/**
 * Функция возращает случайное целое число между min и max - включительно
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number} случайное значение в заданном диапозоне
 */
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//  Функция возращает случайный элемент массива
/**
 *
 * @param {array} array массив
 * @return {any} возращает случайный элемент массива
 */
var getRendomItemOfArray = function (array) {
  return array[getRandomInteger(0, array.length)];
};

/** Функция возращает случайной длины массив от исходного массива
 *
 * @param {array} array массив
 * @return {array} возращает случайной длины массив от исходного массива
 */
var getRandomLengthArray = function (array) {
  return array.slice(0, getRandomInteger(1, array.length));
};

/** Функция перемешивает элементы массива
 *
 * @param {array} array массив
 * @return {array} клонированный массив с перемешанными элементами
 */
var shuffleElemetsOfArray = function (array) {
  var cloneArray = array.slice();
  var j;
  var temp;
  for (var i = 0; i < cloneArray.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = cloneArray[j];
    cloneArray[j] = cloneArray[i];
    cloneArray[i] = temp;
  }
  return cloneArray;
};


/** Функция создает объект с ссылкой на картинку аватарки
 *
 * @param {number} index
 * @return {object} создает объект с ссылкой на картинку аватарки
 */
var getImageSource = function (index) {
  var src = index + 1 <= 9 ? 'img/avatars/user0' + (index + 1) + '.png' : 'img/avatars/user' + index + '.png';
  return {
    avatar: src
  };
};

/** Функция создает одно объявление
 *
 * @param {number} index
 * @return {object} Объект с данными одного объявления
 */
var makeAd = function (index) {
  var location = {
    x: getRandomInteger(LocationX.MIN, LocationX.MAX),
    y: getRandomInteger(LocationY.MIN, LocationY.MAX),
  };

  var ad = {
    author: getImageSource(index),
    offer: {
      title: offerTitles[index],
      address: location.x,
      price: getRandomInteger(Price.MIN, Price.MAX),
      type: getRendomItemOfArray(typesOfLodging),
      rooms: getRendomItemOfArray(rooms),
      guests: getRandomInteger(Guest.MIN, Guest.MAX),
      checkin: getRendomItemOfArray(times),
      checkout: getRendomItemOfArray(times),
      features: getRandomLengthArray(shuffleElemetsOfArray(features)),
      description: '',
      photos: getRandomLengthArray(shuffleElemetsOfArray(photos)),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  };

  return ad;
};

/** Функция возращает массив объявлений
 *
 * @param {number} amountOfAds кол-во объявлений
 * @return {array} возращает массив объявлений
 */
var createAds = function (amountOfAds) {
  var ads = [];
  for (var i = 0; i < amountOfAds; i++) {
    ads.push(makeAd(i));
  }
  return ads;
};
// создаем массив объявлений
var ads = createAds(ADS_AMOUNT);

/** Функция создает элемент Пина объявления - кнопку
 *
 * @param {object} ad объект одного объявления
 * @return {element} создает элемент Пина объявления - кнопку
 */
var makePin = function (ad) {
  var btn = document.createElement('button');
  var image = document.createElement('img');

  btn.classList.add('map__pin');
  btn.style.left = (ad.location.x - Pin.WIDTH) / 2 + 'px';
  btn.style.top = (ad.location.y - Pin.HEIGHT) / 2 + 'px';

  image.width = 40;
  image.height = 40;
  image.draggable = false;
  image.alt = ad.offer.title;
  image.src = ad.author.avatar;

  btn.append(image);

  return btn;
};

/** Функция возращает готовый фрагмент объявлений для вставки в DOM
 * @return {element} возращает готовый фрагмент объявлений для вставки в DOM
 */
var renderPins = function () {
  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_AMOUNT; i++) {
    pinsFragment.appendChild(makePin(ads[i]));
  }
  return pinsFragment;
};

var mapPins = document.querySelector('.map__pins');

mapPins.appendChild(renderPins(ads));
