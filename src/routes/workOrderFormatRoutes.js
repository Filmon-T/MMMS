const express = require('express')
const authController = require('../controllers/authController')
const workOrderFormat = require('../controllers/workOrderFormatController')

const router = express.Router()

router.use(authController.ProtectRoutes)

router
   .route('/')
   .get(authController.restrictTo('mechanic'), workOrderFormat.getAllWorkOrderFormat)
   .post(authController.restrictTo('mechanic'), workOrderFormat.createWorkOrderFormat)

// Route for the inspector to approve a workOrderFOrmat
router
   .route('/:id')
   .get(authController.restrictTo('mechanic'), workOrderFormat.getWorkOrderFormat)
   .patch(authController.restrictTo('mechanic'), workOrderFormat.updateWorkOrderFormat)
   .delete(authController.restrictTo('mechanic'), workOrderFormat.deleteWorkOrderFormat)

module.exports = router
