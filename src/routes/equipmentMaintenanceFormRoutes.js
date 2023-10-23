const express = require('express')
const authController = require('../controllers/authController')
const equipmentMaintenanceController = require('../controllers/equipmentMaintenanceFormController')
const router = express.Router()

router.use(authController.ProtectRoutes)

router
   .route('/')
   .get(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.getAllEquipmentMaintenanceForms)
   .get(authController.restrictTo('inspector'), equipmentMaintenanceController.getEMFToInspector)
   .get(authController.restrictTo('mechanic'), equipmentMaintenanceController.getEMFToMechanic)
   .post(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.createEquipmentMaintenanceForm)

router
   .route('/:id')
   .get(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.getEquipmentMaintenanceForm)
   .get(authController.restrictTo('inspector'), equipmentMaintenanceController.getSingleEMFToInspector)
   .get(authController.restrictTo('mechanic'), equipmentMaintenanceController.getSingleEMFToMechanic)
   // .patch(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.updateEquipmentMaintenanceForm)
   .patch(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.ConfirmEMFByEqAdmin)
   .patch(authController.restrictTo('inspector'), equipmentMaintenanceController.approveEMFByInspector)
   .patch(authController.restrictTo('inspector'), equipmentMaintenanceController.remarkForEMFByInspector)
   .patch(authController.restrictTo('mechanic'), equipmentMaintenanceController.confirmEMFByMechanic)
   .delete(authController.restrictTo('eqAdmin'), equipmentMaintenanceController.deleteEquipmentMaintenanceForm)

// Route for the eqAdmin to confirm an equipmentMaintenanceForm that will be viewed by the inspector ✔
// Route for the inspector to view equipmentMaintenanceForm confirmed or sent by eqAdmin ✔
// Route for the inspector to approve equipmentMaintenanceForm - then this gets sent to mechanic ✔
// Route for the inspector to write remark on equipmentMaintenanceForm
// Route for the mechanic to view equipmentMaintenanceForm sent by eqAdmin??? inspector  ✔
// Route for the mechanic to confirm he finished the job - after this only eqadmin can see the EMF ✔
// Count documents...

module.exports = router
