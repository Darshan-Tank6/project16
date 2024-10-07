var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sstc.somaiya@gmail.com',
    pass: 'Darsh_69_an$'
  }
});

// fetch('/auth/user-details')
//         .then(response => response.json())
//         .then(data => {
//             const emailid = ${data.name};
//             const password1 = ${data.password}
//         })

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'Registered email : \n Password : '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});