const mongoose = require('mongoose')

const equipmentMaintenanceSchema = new mongoose.Schema(
   {
      operatorName: {
         type: String,
         required: [true, 'Please enter operator name!'],
      },
      operatorType: {
         type: String,
         required: [true, 'Please specify the operator type!'],
      },
      plateNumber: {
         type: String,
         required: [true, 'Please enter the plate number!'],
      },
      remark: {
         type: String, // inspector updates this
      },
      // -------------
      approvedBy: {
         type: String, // inspector approves this -- when approved ot goes to mechanic
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
   },
)

module.exports = mongoose.model('EquipmentMaintenance', equipmentMaintenanceSchema)
