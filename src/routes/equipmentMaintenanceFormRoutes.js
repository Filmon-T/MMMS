const express = require('express')
const authController = require('../controllers/authController')
const equipmentMaintenanceController = require('../controllers/equipmentMaintenanceFormController')
const router = express.Router()

router.use(authController.protect_vue)

router
   .route('/')
   .get(equipmentMaintenanceController.getAllEquipmentMaintenanceForms)
   .post(
      authController.restrictTo('admin'),
      equipmentMaintenanceController.setUserIds,
      equipmentMaintenanceController.createEquipmentMaintenanceForm
   )
router
   .route('/:id')
   .get(equipmentMaintenanceController.getEquipmentMaintenanceForm)
   .patch(
      authController.restrictTo('admin'),
      equipmentMaintenanceController.updateEquipmentMaintenanceForm
   )
   .delete(
      authController.restrictTo('admin'),
      equipmentMaintenanceController.deleteEquipmentMaintenanceForm
   )

module.exports = router
