'use strict';

// required node_modules
var nodemailer = require( 'nodemailer' );
var Bluebird = require( 'bluebird' );

// required app modules
var emailTemplates = require( './email-templates' );

// module constants
var EMAIL_ADDRESS = 'time.to.rally.up@gmail.com';
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
var BASE_URL = 'http://rally.azurewebsites.net/';

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
});

var send = function( msg ) {
  return new Bluebird( function( resolve, reject ) {
    transporter.sendMail( msg, function( err, info ) {
      if ( err ) {
        reject( err );
        return;
      }
      resolve( info );
    });
  });
};

// adapted from Crockford's supplant. Probably should use real template engine eventually.
var interpolate = function( str, obj ) {
  return str.replace( /{([^{}]*)}/g, function ( a, b ) {
      var r = obj[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

var generateEmails = function( plan, round ) {
  var template = ( round === plan.rounds.length ? 'final' : 'round' );
  var recipients = ( round === 0 ? plan.hostWho.slice( 0, -1 ) : plan.hostWho );
  var commonURL = BASE_URL + '#/' + plan.id;
  var info = {
    link: ( function() {
      if ( template === 'round' ) {
        return commonURL + ( round === 0 ? '' : '/round/' + ( round + 1 ) );
      } else if ( template === 'final' ) {
        return commonURL + '/result';
      }
    })()
  };
  return recipients.map( function( recipient ) {
    return {
      to: recipient,
      from: EMAIL_ADDRESS,
      subject: 'Rally with ' + plan.hostName,
      html: interpolate( emailTemplates[ template ], info ),
    };
  });
};

module.exports = function( plan, round ) {
  return Bluebird.all( generateEmails( plan, round ).map( send ) );
};