const express = require('express')
const authController = require('../controllers/authController')
const workOrderFormat = require('../controllers/workOrderFormatController')

const router = express.Router()

router.use(authController.ProtectRoutes)

router
   .route('/')
   .get(authController.restrictTo('eqAdmin'), workOrderFormat.getAllWorkOrderFormat)
   .post(authController.restrictTo('eqAdmin'), workOrderFormat.createWorkOrderFormat)
router
   .route('/:id')
   .get(authController.restrictTo('eqAdmin'), workOrderFormat.getWorkOrderFormat)
   .patch(authController.restrictTo('eqAdmin'), workOrderFormat.updateWorkOrderFormat)
   .delete(authController.restrictTo('eqAdmin'), workOrderFormat.deleteWorkOrderFormat)

module.exports = router
