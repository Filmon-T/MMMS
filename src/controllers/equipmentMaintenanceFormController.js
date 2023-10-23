const EquipmentMaintenanceForm = require('../models/equipmentMaintenanceFormModel')
const AppError = require('../utils/appError')
const ApiFeatures = require('../utils/apiFeatures')
const factory = require('./handlerFactory')

exports.getAllEquipmentMaintenanceForms = factory.getAll(EquipmentMaintenanceForm)
exports.getEquipmentMaintenanceForm = factory.getOne(EquipmentMaintenanceForm)
exports.createEquipmentMaintenanceForm = factory.createOne(EquipmentMaintenanceForm)
exports.updateEquipmentMaintenanceForm = factory.updateOne(EquipmentMaintenanceForm)
exports.deleteEquipmentMaintenanceForm = factory.deleteOne(EquipmentMaintenanceForm)

exports.countEMF = catchAsync(async (req, res, next) => {
   // EquipmentMaintenanceForm.countDocuments({ momentDateOnly: today}, function (err, count) {
   EquipmentMaintenanceForm.countDocuments({}, function (err, count) {
      res.status(200).json({
         status: 'success',
         result: count,
      })
      if (err) {
         return next(new AppError(err, 400))
      }
   })
})

exports.ConfirmEMFByEqAdmin = catchAsync(async (req, res, next) => {
   const EMF = await EquipmentMaintenanceForm.findOne({
      _id: req.params.id,
   })

   const EMFId = req.params.id
   if (!EMF) {
      return next(new AppError('No EMF found with that Id!', 404))
   }
   let changeStatus
   if (EMF.confirmdByEqAdmin == true) {
      changeStatus = false
   }
   if (EMF.confirmdByEqAdmin == false) {
      changeStatus = true
   }
   const updatedEMF = await EquipmentMaintenanceForm.findByIdAndUpdate(
      EMFId,
      {
         confirmdByEqAdmin: changeStatus,
      },
      {
         new: true,
         runValidators: true,
      },
   )

   if (!updatedEMF) {
      return next(new AppError('No EMF found with that Id', 404))
   }

   res.status(200).json({
      status: 'success',
      doc: updatedEMF,
   })
})

exports.getEMFToInspector = catchAsync(async (req, res, next) => {
   // const EMF = await EquipmentMaintenanceForm.find({ confirmdByEqAdmin: true })

   let filter = {}
   filter.confirmdByEqAdmin = true
   filter.confirmdByMechanic = false

   const features = new ApiFeatures(EquipmentMaintenanceForm.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
   const EMF = await features.query

   if (!EMF) {
      return next(new AppError('No EMF found!', 404))
   }

   res.status(200).json({
      status: 'success',
      result: EMF.length,
      doc: EMF,
   })
})

exports.getEMFToMechanic = catchAsync(async (req, res, next) => {
   // const EMF = await EquipmentMaintenanceForm.find({ confirmdByEqAdmin: true })

   let filter = {}
   filter.confirmdByEqAdmin = true
   filter.approvedByInspector = true
   filter.confirmdByMechanic = false

   const features = new ApiFeatures(EquipmentMaintenanceForm.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
   const EMF = await features.query

   if (!EMF) {
      return next(new AppError('No EMF found!', 404))
   }

   res.status(200).json({
      status: 'success',
      result: EMF.length,
      doc: EMF,
   })
})

exports.getSingleEMFToInspector = catchAsync(async (req, res, next) => {
   const EMF = await EquipmentMaintenanceForm.findOne({ _id: req.params.id, confirmdByMechanic: false })

   if (!EMF) {
      return next(new AppError('No EMF found!', 404))
   }
   if (EMF.confirmdByEqAdmin == false) {
      return next(new AppError('The requested EMF hasn`t been confirmed!', 401))
   }

   res.status(200).json({
      status: 'success',
      doc: EMF,
   })
})

exports.getSingleEMFToMechanic = catchAsync(async (req, res, next) => {
   const EMF = await EquipmentMaintenanceForm.findOne({ _id: req.params.id, confirmdByMechanic: false })

   if (!EMF) {
      return next(new AppError('No EMF found!', 404))
   }
   if (EMF.confirmdByEqAdmin == false || EMF.approvedByInspector == false) {
      return next(new AppError('The requested EMF hasn`t been confirmed!', 401))
   }

   res.status(200).json({
      status: 'success',
      doc: EMF,
   })
})

exports.approveEMFByInspector = catchAsync(async (req, res, next) => {
   const EMF = await EquipmentMaintenanceForm.findOne({
      _id: req.params.id,
   })

   const EMFId = req.params.id
   if (!EMF) {
      return next(new AppError('No EMF found with that Id!', 404))
   }
   if (EMF.confirmdByEqAdmin == false) {
      return next(new AppError('EMF hasn`t been confirmed by equipment adminstrator!', 401))
   }

   let changeStatus
   if (EMF.approvedByInspector == true) {
      changeStatus = false
   }
   if (EMF.approvedByInspector == false) {
      changeStatus = true
   }
   const updatedEMF = await EquipmentMaintenanceForm.findByIdAndUpdate(
      EMFId,
      {
         approvedByInspector: changeStatus,
      },
      {
         new: true,
         runValidators: true,
      },
   )

   if (!updatedEMF) {
      return next(new AppError('No EMF found with that Id', 404))
   }

   res.status(200).json({
      status: 'success',
      doc: updatedEMF,
   })
})

exports.remarkForEMFByInspector = catchAsync(async (req, res, next) => {
   const EMF = await EquipmentMaintenanceForm.findOne({
      _id: req.params.id,
      confirmdByMechanic: false,
   })

   const EMFId = req.params.id
   if (!EMF) {
      return next(new AppError('No EMF found with that Id!', 404))
   }
   if (EMF.confirmdByEqAdmin == false) {
      return next(new AppError('EMF hasn`t been confirmed by equipment adminstrator!', 401))
   }

   let remark = req.body.remarkForEMF
   const updatedEMF = await EquipmentMaintenanceForm.findByIdAndUpdate(
      EMFId,
      {
         remark: remark,
      },
      {
         new: true,
         runValidators: true,
      },
   )

   if (!updatedEMF) {
      return next(new AppError('No EMF found with that Id', 404))
   }

   res.status(200).json({
      status: 'success',
      doc: updatedEMF,
   })
})

exports.confirmEMFByMechanic = catchAsync(async (req, res, next) => {
   const EMF = await EquipmentMaintenanceForm.findOne({
      _id: req.params.id,
   })

   const EMFId = req.params.id
   if (!EMF) {
      return next(new AppError('No EMF found with that Id!', 404))
   }
   if (EMF.confirmdByEqAdmin == false || EMF.approvedByInspector == false) {
      return next(new AppError('EMF hasn`t been confirmed by eqAdmin and inspector!', 401))
   }

   let changeStatus
   if (EMF.confirmdByMechanic == false) {
      changeStatus = true
   }

   const updatedEMF = await EquipmentMaintenanceForm.findByIdAndUpdate(
      EMFId,
      {
         confirmdByMechanic: changeStatus,
      },
      {
         new: true,
         runValidators: true,
      },
   )

   if (!updatedEMF) {
      return next(new AppError('No EMF found with that Id', 404))
   }

   res.status(200).json({
      status: 'success',
      doc: updatedEMF,
   })
})
