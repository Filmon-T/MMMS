const WorkOrderFormat = require('../models/workOrderFormatModel')
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

exports.getAllWorkOrderFormat = factory.getAll(WorkOrderFormat)
exports.getWorkOrderFormat = factory.getOne(WorkOrderFormat)
exports.createWorkOrderFormat = factory.createOne(WorkOrderFormat)
exports.updateWorkOrderFormat = factory.updateOne(WorkOrderFormat)
exports.deleteWorkOrderFormat = factory.deleteOne(WorkOrderFormat)