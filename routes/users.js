const router = require('express').Router();
const { celebrate } = require('celebrate');

const { JoiBodyName } = require('../utils/validationConstants');
const { aboutUser, updateUserInfo } = require('../controllers/users');

router.get('/me', aboutUser);
router.patch('/me', celebrate(JoiBodyName), updateUserInfo);

module.exports = router;
