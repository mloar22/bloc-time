(function () {
  
  const SESSIONTIME = 2
  const BREAKTIME = 1
  const LONGBREAKTIME = 5
  

  function HomeCtrl($interval) {
    $ctrl = this;
    $ctrl.currentTime = SESSIONTIME;
    var timer;
    $ctrl.status = "session"
  
    $ctrl.completedSessions = 3
    $ctrl.startBtn = "Start";

    $ctrl.startTimer = function () {
      
      if(timer){
        $interval.cancel(timer)
      }
      
      timer = $interval(function () {
        if($ctrl.currentTime-- == 0){
         
//          insert sessions counter here after break currentTime ends
//          $interval.numberOfSessions(function) {
//            for (var i = 0; i < numberOfSession; i++)
//          }
               
          
          $interval.cancel(timer)
            
          if($ctrl.status == "session"){
            $ctrl.completedSessions++;
            
            
            if($ctrl.completedSessions == 4 ){
              $ctrl.currentTime = LONGBREAKTIME;  
              $ctrl.status = "break"
            }else{
              $ctrl.currentTime = BREAKTIME;  
              $ctrl.status = "break"
            }
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


  angular
    .module('blocTime')
    .controller('HomeCtrl', ["$interval", HomeCtrl]);

})();