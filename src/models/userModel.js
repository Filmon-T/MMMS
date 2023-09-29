const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         required: [true, 'Please enter user name!'],
      },

      email: {
         type: String,
         unique: true,
         required: [true, 'A user must have an email'],
         validate: [validator.isEmail, 'Please enter a valid email'],
      },

      role: {
         type: String,
         enum: ['EqAdmin', 'inspector', 'mechanic'],
         default: 'mechanic',
      },

      password: {
         type: String,
         required: [true, 'Please enter your password!'],
         minlength: 8,
         select: false,
      },

      passwordConfirm: {
         type: String,
         required: [true, 'Please confirm your password'],
         validate: {
            validator: function (el) {
               return el === this.password
            },
            message: 'Password are not the same!',
         },
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

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()

   this.password = await bcrypt.hash(this.password, 12)
   this.passwordConfirm = undefined
   next()
})

userSchema.pre('save', function (next) {
   if (!this.isModified('password') || this.isNew) return next()

   this.passwordChangedAt = Date.now() - 1000
   next()
})

userSchema.pre(/^find/, function (next) {
   this.find({ active: { $ne: false } })
   next()
})

userSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changePassword = function () {
   this.passsword = crypto.createHash('sha256').update(resetToken).digest('hex')
   this.passwordChangedAt = Date.now() - 1000

   return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
