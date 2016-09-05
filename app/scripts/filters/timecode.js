(function() {
  function timecode() {
    return function(seconds) {
      var seconds = Number.parseFloat(seconds);

      if (Number.isNaN(seconds)) {
        return '-:--';
      }

      var wholeSeconds = Math.floor(seconds);
      return buzz.toTimer(wholeSeconds);
    };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
