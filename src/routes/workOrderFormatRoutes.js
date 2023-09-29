const express = require('express')
const authController = require('../controllers/authController')
const workOrderFormat = require('../controllers/workOrderFormatController')

const router = express.Router()

router.use(authController.protect_vue)

router
   .route('/')
   .get(workOrderFormat.getAllWorkOrderFormat)
   .post(
      authController.restrictTo('admin'),
      workOrderFormat.setUserIds,
      workOrderFormat.createWorkOrderFormat
   )
router
   .route('/:id')
   .get(workOrderFormat.getWorkOrderFormat)
   .patch(
      authController.restrictTo('admin'),
      workOrderFormat.updateWorkOrderFormat
   )
   .delete(
      authController.restrictTo('admin'),
      workOrderFormat.deleteWorkOrderFormat
   )

module.exports = router
