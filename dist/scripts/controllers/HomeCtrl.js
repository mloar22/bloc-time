(function () {
  
  const SESSIONTIME = 1500
  const BREAKTIME = 300
  const LONGBREAKTIME = 1800
  

  function HomeCtrl($interval, $firebaseArray) {
    $ctrl = this;
    $ctrl.currentTime = SESSIONTIME;
    var timer;
    $ctrl.status = "session"
  
    $ctrl.completedSessions = 0
    $ctrl.startBtn = "Start";

    $ctrl.startTimer = function () {
      
      if(timer){
        $interval.cancel(timer)
      }
      
      timer = $interval(function () {
        if($ctrl.currentTime-- == 0){
               
          
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
    //Begin Firebase Stuff
    
    $ctrl.tasks = $firebaseArray(firebase.database().ref().child("/tasks"));
    $ctrl.newTask = {}
    
    $ctrl.addTask = () => {
      $ctrl.tasks.$add($ctrl.newTask);
      
      $ctrl.newTask = {};
    }
  }


  angular
    .module('blocTime')
    .controller('HomeCtrl', ["$interval", "$firebaseArray", HomeCtrl]);

})();