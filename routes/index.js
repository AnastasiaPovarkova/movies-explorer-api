const router = require('express').Router();
const helmet = require('helmet');

const { celebrate, errors } = require('celebrate');
const cors = require('../middlewares/cors');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const { login, createUser, exit } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { rateLimiter } = require('../middlewares/rateLimiter');
const centralizedErrorHandler = require('../middlewares/centralizedErrorHandler');
const NotFoundError = require('../utils/errors/not-found-err');

const { JoiBodyEmailPassword, JoiBodyEmailPasswordName } = require('../utils/validationConstants');

router.use(helmet()); // Helmet helps secure Express apps by setting HTTP response headers.
router.use(rateLimiter); // Use to limit repeated requests to public APIs and/or endpoints

router.use(cors);

router.use(requestLogger); // подключаем логгер запросов

router.post('/signin', celebrate(JoiBodyEmailPassword), login);
router.post('/signup', celebrate(JoiBodyEmailPasswordName), createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.get('/logout', exit);

router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

router.use(errorLogger); // подключаем логгер ошибок

router.use(errors()); // обработчик ошибок celebrate

router.use(centralizedErrorHandler); // центральный обработчик ошибок

module.exports = router;
