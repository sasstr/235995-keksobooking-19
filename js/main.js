'use strict';

var AD_AMOUNT = 8;

var typesOfLodging= [
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

var Guests = {
  MIN: 1,
  MAX: 7
}

var lodgingPrices = [
  {
    type: 'Бунгало',
    price: 0,
  },
  {
    type: 'Квартира',
    price: 1000,
  },
  {
    type: 'Дом',
    price: 5000,
  },
  {
    type: 'Дворец',
    price: 10000,
  }
]

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
 * @param {array} array
 * @return {*}
 */
var getRendomItemOfArray = function (array) {
  return array[getRandomInteger(0, array.length)];
};

/** Функция возращает случайной длины массив от исходного массива
 *
 * @param {array} array
 * @return {array}
 */
var getRandomLengthArray = function (array) {
  return array.slice(0, getRandomInteger(1, array.length));
};

//  Функция перемешивает элементы массива
/**
 *
 * @param {array} array
 * @return {array}
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


/** Функция
 *
 * @param {number} index
 * @return {object}
 */
var getImageSource = function (index) {
  var src = index <= 9 ? 'img/avatars/user0' + index + '.png' : 'img/avatars/user' + index + '.png';
  return {
    avatar: src
  };
};

var makeAd = function (index) {
  var location = {
    x: getRandomInteger(LocationX.MIN, LocationX.MAX),
    y: getRandomInteger(LocationY.MIN, LocationY.MAX),
  };

  var ad = {
    author: getImageSource(index),
    offer: {
      address: location.x,
      price: getRandomInteger(Price.MIN, Price.MAX),
      type: getRendomItemOfArray(typesOfLodging),
      rooms: getRendomItemOfArray(rooms),
      guests: getRandomInteger(Guests.MIN, Guests.MAX),
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
