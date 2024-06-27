const express = require('express');
const router = express.Router();
const clubs = require('../controllers/clubs');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateClub } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(clubs.index))
    .post(isLoggedIn, upload.array('image'), validateClub, catchAsync(clubs.createClub))

router.get('/new', isLoggedIn, clubs.renderNewForm);

router.route('/:id')
    .get(catchAsync(clubs.showClub))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateClub, catchAsync(clubs.updateClub))
    .delete(isLoggedIn, isAuthor, catchAsync(clubs.deleteClub))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(clubs.renderEditForm))


module.exports = router;