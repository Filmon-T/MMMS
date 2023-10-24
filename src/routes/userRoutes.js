const express = require('express')

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.use(authController.ProtectRoutes) //Protects all routes after this middleware (requires login)

router.post('/eqAdmin/signup', authController.restrictTo('eqAdmin'), authController.signupEmployeeByEqAdmin)

router.get('/me', userController.getMe, userController.getUser)
router.patch('/updateMyPassword', authController.updatePassword)
router.patch('/updateMe', userController.updateMe)
router.patch('/deleteMe', userController.deleteMe)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

module.exports = router
