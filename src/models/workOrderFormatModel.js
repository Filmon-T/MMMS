const mongoose = require('mongoose')

const workOrderFormat = new mongoose.Schema(
   {
      // Reference id for the EMF
      emfId: { type: mongoose.Schema.ObjectId, ref: 'EquipmentMaintenance' },

      entranceDate: {
         type: String,
         required: [true, 'Please enter the entrance date!'], // manually registered
      },

      activityDescription: {
         type: String,
         required: [true, 'Please enter the description of the activity!'],
      },

      mechanicName: {
         type: String,
         required: [true, 'Please enter the name of the mechanic!'],
      },

      // -----------------
      approvedBy: {
         type: String,
      },
      exitDate: {
         type: String,
      },
      remark: {
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
   },
)

workOrderFormat.pre(/^find/, function (next) {
   this.populate({
      path: 'emfId',
      select: '-__v',
   })
   next()
})

module.exports = mongoose.model('WorkOrderFormat', workOrderFormat)
