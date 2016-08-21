(function() {
  function SongPlayer() {

    /**
    * @desc factory SongPlayer
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc Song object that is currently being played
    * @type {Object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /**
    * @function playSong
    * @desc plays the buzz object audio file and sets the current song
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

    /**
    * @function play
    * @desc compares the song to the current song and manages pausing and playing new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (curentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
    * @function pause
    * @desc pauses the playing song and sets the playing boolean to false
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
