const mongoose = require('mongoose')

const workOrderFormat = new mongoose.Schema(
   {
      entranceDate: {
         type: String,
         required: [true, 'Please enter the entrance date!'],
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

module.exports = mongoose.model('WorkOrderFormat', workOrderFormat)
