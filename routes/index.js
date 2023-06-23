const router = require('express').Router();

const cors = require('cors');
const { celebrate } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { rateLimiter } = require('../middlewares/rateLimiter');
const centralizedErrorHandler = require('../middlewares/centralizedErrorHandler');
const NotFoundError = require('../utils/errors/not-found-err');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3006',
  'http://127.0.0.1:3006',
  'http://mestofront.anstpov.nomoredomains.monster',
  'https://mestofront.anstpov.nomoredomains.monster',
];

const { JoiBodyEmailPassword, JoiBodyEmailPasswordName } = require('../utils/validationConstants');

router.use(requestLogger); // подключаем логгер запросов

router.use(rateLimiter); // Use to limit repeated requests to public APIs and/or endpoints

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(cors({
  origin: allowedCors,
  credentials: true,
})); // подключаем CORS

router.post('/signin', celebrate(JoiBodyEmailPassword), login);
router.post('/signup', celebrate(JoiBodyEmailPasswordName), createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

router.use(centralizedErrorHandler); // центральный обработчик ошибок

module.exports = router;
