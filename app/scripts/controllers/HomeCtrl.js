(function () {
  
  
  const SESSIONTIME = 5
  const BREAKTIME = 3
  
  function HomeCtrl($interval) {
    $ctrl = this;
    $ctrl.currentTime = SESSIONTIME;
    var timer;
    $ctrl.status = "session"

//What is $timeout?? can it be used instead of $interval?
  
    $ctrl.startBtn = "Start";

    $ctrl.startTimer = function () {
      timer = $interval(function () {
        if($ctrl.currentTime-- == 0){
          
          $interval.cancel(timer)
          
          if($ctrl.status == "session"){
            $ctrl.currentTime = BREAKTIME;  
            $ctrl.status = "break"
          }else{
            $ctrl.currentTime = SESSIONTIME;  
            $ctrl.status = "session"          
          }
          
          
        }
      }, 1000)
    }

    $ctrl.stopBtn = "Stop";

    $ctrl.stopTimer = function () {
      $interval.cancel(timer)
    }
    
    $ctrl.resetBtn = "Reset";
    
    $ctrl.resetTimer = function () {
        console.log("reset!"); 
      $interval.cancel(timer)
      $ctrl.currentTime = SESSIONTIME
    }
    
    }



  // Number of completed sessions timer. 


  angular
    .module('blocTime')
    .controller('HomeCtrl', ["$interval", HomeCtrl]);

})();