(function () {
  function HomeCtrl($interval) {
    $ctrl = this;
    $ctrl.currentTime = 25;
    var timer;


    $ctrl.startBtn = "Start";

    $ctrl.startTimer = function () {
      console.log("Start")
      timer = $interval(function () {
        $ctrl.currentTime--
      }, 1000)
    }

    $ctrl.stopBtn = "Stop";

    $ctrl.stopTimer = function () {
      console.log("Stop")
      $interval.cancel(timer)
    }
    
    $ctrl.resetBtn = "Restart";
    
    $ctrl.resetTimer = function () {
      console.log("timer reset")
      $interval.currentTime()
    }


  }

  //  make it Stop at zero, reset it to 25. Number of completed sessions timer. 


  angular
    .module('blocTime')
    .controller('HomeCtrl', ["$interval", HomeCtrl]);

})();