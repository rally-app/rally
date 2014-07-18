'use strict';

// Stub method for validating a time model. Currently returns true if object contains two keys (intended to be id and round)
module.exports = function ( deadline ) {
  return Object.keys( deadline ).length === 2;
};