"use strict";

// stub method for validating a plan's schema. Currently, returns true if the object is not empty.
module.exports = function( plan ) {
  return Object.keys( plan ).length > 0
};