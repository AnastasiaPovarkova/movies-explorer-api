module.exports = Object.freeze({
  urlRegular: /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/,
  allowedCors: [
    'http://localhost:3000',
    'http://localhost:3006',
    'http://front.diploma.anstpov.nomoreparties.sbs',
    'https://front.diploma.anstpov.nomoreparties.sbs',
  ],
});
