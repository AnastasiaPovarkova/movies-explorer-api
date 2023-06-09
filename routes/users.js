const router = require('express').Router();
const { celebrate } = require('celebrate');

const { JoiBodyNameEmail } = require('../utils/validationConstants');
const { aboutUser, updateUserInfo } = require('../controllers/users');

router.get('/me', aboutUser);
router.patch('/me', celebrate(JoiBodyNameEmail), updateUserInfo);

module.exports = router;
