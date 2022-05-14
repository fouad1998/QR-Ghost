var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "",
    pass: "",
  },
})

export function sendEmail(options) {
  var mailOptions = {
    from: "",
    ...options,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve(info.response)
      }
    })
  })
}
