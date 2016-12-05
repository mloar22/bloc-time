(function () {

  const SESSIONTIME = 1500
  const BREAKTIME = 300
  const LONGBREAKTIME = 1800

  function HomeCtrl($interval, $firebaseArray, $scope) {
    $ctrl = this;
    $ctrl.currentTime = SESSIONTIME;
    var timer;
    var dingDong = new buzz.sound("assets/sounds/ding.mp3", {
      preload: true
    });


    $ctrl.status = "session"

    $ctrl.completedSessions = 0
    $ctrl.startBtn = "Start";

    $ctrl.startTimer = function () {
      console.log('started')
      if (timer) {
        $interval.cancel(timer)
      }

      timer = $interval(function () {
        if ($ctrl.currentTime-- == 0) {

          dingDong.play();
          $interval.cancel(timer)

          if ($ctrl.status == "session") {
            $ctrl.completedSessions++;


            if ($ctrl.completedSessions == 4) {
              $ctrl.currentTime = LONGBREAKTIME;
              $ctrl.status = "break"
            } else {
              $ctrl.currentTime = BREAKTIME;
              $ctrl.status = "break"
            }
          } else {
            $ctrl.currentTime = SESSIONTIME;
            $ctrl.status = "session"

          }

        }
      }, 1000)
    }

    $ctrl.stopBtn = "Stop";

    $ctrl.stopTimer = function () {
      console.log('stopped')
      $interval.cancel(timer)
    }

    $ctrl.resetBtn = "Reset";

    $ctrl.resetTimer = function () {
      console.log("reset");
      $interval.cancel(timer)
      $ctrl.currentTime = SESSIONTIME
    }

    //    Test out sounds to make sure file is loaded correctly
    $ctrl.testBtn = "testingSound";

    $ctrl.testSound = function () {
      console.log('testing works!');
      dingDong.play();
    }


//    Play a ding - Using $Watch
    
//    $scope.$watch(function() {
//      return $ctrl.currentTime
//    }, function () {
//      console.log(1)
//      if ($ctrl.currentTime == 0) {
//        dingDong.play();
//      }
//    });


    //  <----- Begin Firebase Stuff ------>

    $ctrl.tasks = $firebaseArray(firebase.database().ref().child("/tasks"));
    $ctrl.newTask = {}

    $ctrl.addTask = () => {
      
      $ctrl.newTask.createdAt = Date.now()
      
      $ctrl.tasks.$add($ctrl.newTask);

      $ctrl.newTask = {};
    }
  }


  angular
    .module('blocTime')
    .controller('HomeCtrl', ["$interval", "$firebaseArray", "$scope", HomeCtrl]);

})();