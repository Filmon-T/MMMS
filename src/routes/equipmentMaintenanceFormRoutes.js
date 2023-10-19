const express = require('express')
const authController = require('../controllers/authController')
const equipmentMaintenanceController = require('../controllers/equipmentMaintenanceFormController')
const router = express.Router()

router.use(authController.ProtectRoutes)

router
   .route('/')
   .get(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.getAllEquipmentMaintenanceForms)
   .post(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.createEquipmentMaintenanceForm)

// Route for the eqAdmin to send an equipmentMaintenanceForm to inspector
// Route for the inspector to view equipmentMaintenanceForm sent by eqAdmin

// Route for writing remark for equipment maintenance form - by inspector
// Route for approving equipment maintenance form - by inspector

router
   .route('/:id')
   .get(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.getEquipmentMaintenanceForm)
   .patch(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.updateEquipmentMaintenanceForm)
   .delete(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.deleteEquipmentMaintenanceForm)

module.exports = router
