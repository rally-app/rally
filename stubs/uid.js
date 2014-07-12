// stub for unique id generating algorithm
// always returns "mvp-plan" for testing, currently.

module.exports = function() {
  return "mvp-plan";
  // return Math.random().toString( 36 ).slice( 2 );
}