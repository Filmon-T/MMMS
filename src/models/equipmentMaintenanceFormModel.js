const mongoose = require('mongoose')

const equipmentMaintenanceSchema = new mongoose.Schema(
   {
      OperatorName: {
         type: String,
         required: [true, 'Please enter operator name!'],
      },
      OperatorType: {
         type: String,
         required: [true, 'Please specify the operator type!'],
      },
      PlateNumber: {
         type: String,
         required: [true, 'Please enter the plate number!'],
      },
      Remark: {
         type: String,
      },
      ApprovedBy: {
         type: String,
      },
      report: {
         type: String,
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
      toObj: {
         virtuals: true,
      },
   }
)

module.exports = mongoose.model(
   'EquipmentMaintenance',
   equipmentMaintenanceSchema
)
