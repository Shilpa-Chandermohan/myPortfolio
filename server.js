var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
// parse application/json
app.use(bodyParser.json());                                  // parse application/json

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "moneyabcsorg@gmail.com",
      clientId: "360054163394-5h68g7au3m6brbnbivj8ku24mhb44gs6.apps.googleusercontent.com", //"367932091928-ul3am3l02ui4qgjm6qn85ivahm38qosn.apps.googleusercontent.com",
      clientSecret: "T5EXEJ2otKsSrP_zOYCP3HlD", //"8P5yAO6BzvjNSYQv_nHpdcKV",
      refreshToken: "1/qVA9ImbETMCB2x1TVKb0JVVW_lOqhy4YwKRdqfhR0to" //"1/-3GRc5EoeWWmd5w4FJmYjviZH9TmH0z8yrOEPUwYA71VUgYXBMzP8hrsXVOGMPuO"
    }
  }
});

app.post('/sendEmail',function(req,res){
	console.log(req.body);
	var mailOptions = {
		from: req.body.email, // sender address
		to: 'moneyabcsorg@gmail.com', // list of receivers
		subject: req.body.subject, // Subject line
		generateTextFromHTML: true,
		html: '<b>' + 'Message : '+ req.body.message + '</b><br>' + '<b>' + 'email : '+ req.body.email + '</b><br>' + '<b>' + 'subject : '+ req.body.subject + '</b><br>',
	};
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.log(error);
			res.json({success : "Oops! Please try again."});
		} else {
			console.log(response);
			res.json({success : "Email sent. Hurray!"});
		}
		smtpTransport.close();
	});
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3004;
app.listen(port,ip);
//require('node-monkey').start({host: ip, port:3003});
console.log("works !!!!!!!!!!!!!!!!!");