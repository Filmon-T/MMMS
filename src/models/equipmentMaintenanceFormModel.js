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
      confirmdByEqAdmin: {
         type: Boolean,
         default: false,
      }, //- action by eqadmin
      remark: {
         type: String, // inspector updates this - and only this
      },
      // -------------
      approvedByInspector: {
         type: Boolean, // inspector approves this -- when approved it goes to mechanic
         default: false,
      },
      confirmdByMechanic: {
         type: Boolean,
         default: false,
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
