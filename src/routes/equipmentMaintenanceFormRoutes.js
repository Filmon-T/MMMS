const express = require('express')
const authController = require('../controllers/authController')
const equipmentMaintenanceController = require('../controllers/equipmentMaintenanceFormController')
const router = express.Router()

router.use(authController.ProtectRoutes)

router
   .route('/')
   .get(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.getAllEquipmentMaintenanceForms)
   .post(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.createEquipmentMaintenanceForm)

// Route for approving equipment maintenance form - by inspector

router
   .route('/:id')
   .get(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.getEquipmentMaintenanceForm)
   .patch(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.updateEquipmentMaintenanceForm)
   .delete(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.deleteEquipmentMaintenanceForm)

module.exports = router
