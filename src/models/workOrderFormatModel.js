const mongoose = require('mongoose')

const workOrderFormat = new mongoose.Schema(
   {
      entranceDate: {
         type: String,
         required: [true, 'Please enter the name of the army!'],
      },
      exitDate: {
         type: String,
      },
      activityDescription: {
         type: String,
      },
      remark: {
         type: String,
      },
      mechanicName: {
         type: String,
         required: [true, 'Please enter the name of commander of the army!'],
      },
      approvedBy: {
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

module.exports = mongoose.model('WorkOrderFormat', workOrderFormat)
