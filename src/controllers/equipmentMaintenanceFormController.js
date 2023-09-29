const EquipmentMaintenanceForm = require('../models/equipmentMaintenanceFormModel')
const factory = require('./handlerFactory')

exports.setUserIds = (req, res, next) => {
   if (!req.body.user) {
      req.body.user = req.user.id
   }
   if (!req.body.sender) {
      req.body.sender = req.user.id
   }
   next()
}

exports.getAllEquipmentMaintenanceForms = factory.getAll(
   EquipmentMaintenanceForm
)
exports.getEquipmentMaintenanceForm = factory.getOne(EquipmentMaintenanceForm)
exports.createEquipmentMaintenanceForm = factory.createOne(
   EquipmentMaintenanceForm
)
exports.updateEquipmentMaintenanceForm = factory.updateOne(
   EquipmentMaintenanceForm
)
exports.deleteEquipmentMaintenanceForm = factory.deleteOne(
   EquipmentMaintenanceForm
)
