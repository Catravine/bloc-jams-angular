(function() {
  function SongPlayer(Fixtures) {

    /**
    * @desc factory SongPlayer
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc object representing the current album (from Fixtures)
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

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
        stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
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
    * @function stopSong
    * @desc stops playback and sets the currently playing song to 'null'.
    */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /**
    * @function getSongIndex
    * @desc returns a 'track number' index based on the currentAlbum.
    * @param {Object} song
    * @return int
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Song object that is currently being played
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc compares the song to the current song and manages pausing and playing new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    }

    /**
    * @function previous
    * @desc decrements the current song index (based on album) and plays previous track
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex --;
      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function next
    * @desc increments the current song index (based on album) and plays next track
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex ++;
      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
