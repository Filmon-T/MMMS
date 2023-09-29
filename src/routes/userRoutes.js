const express = require('express')

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const router = express.Router()

// router.use(authController.protect_vue)

router.post('/login', authController.login)
router.get('/logout', authController.protect_vue, authController.logout)

router.use(authController.protect) //Protects all routes after this middleware (requires login)

//!Move these routes to protedcted routes for admins ONLY

//--------------------!Move these routes to protedcted routes for admins ONLY-------------------
// TODO: Check restrict to if necessary

router.get('/me', userController.getMe, userController.getUser)

//Restricts all routes after this middleware to admins only

router.patch('/updateMyPassword', authController.updatePassword)
router.patch('/updateMe', userController.updateMe)
router.patch('/deleteMe', userController.deleteMe)
//////////////

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

module.exports = router
