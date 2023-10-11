const express = require('express')
const authController = require('../controllers/authController')
const workOrderFormat = require('../controllers/workOrderFormatController')

const router = express.Router()

router.use(authController.protect_vue)

router
   .route('/')
   .get(workOrderFormat.getAllWorkOrderFormat)
   .post(
      authController.restrictTo('eqAdmin'),
      workOrderFormat.setUserIds,
      workOrderFormat.createWorkOrderFormat
   )
router
   .route('/:id')
   .get(workOrderFormat.getWorkOrderFormat)
   .patch(
      authController.restrictTo('eqAdmin'),
      workOrderFormat.updateWorkOrderFormat
   )
   .delete(
      authController.restrictTo('eqAdmin'),
      workOrderFormat.deleteWorkOrderFormat
   )

module.exports = router
