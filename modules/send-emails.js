// required node_modules
var nodemailer = require( 'nodemailer' );

// required app modules
var emailTemplates = require( './email-templates' );

// module constants
var EMAIL_ADDRESS = "time.to.rally.up@gmail.com";
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || require( '../secrets' ).EMAIL_PASSWORD;

// module variables
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    password: EMAIL_PASSWORD
  }
});


var generateEmail = function( plan, round ) {

}

var sendEmail = function( toAddress ) {

}