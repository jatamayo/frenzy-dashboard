// login dashboard
//  Parse.initialize("tT9K6IFlXY8wknDJCfB7geBnsLBTRqUYJp4p6X4n", "s0EZosX3fJzAcp4LUN92HLI1RGetHRSPKq6n7Dkx");
// frenzy
//Parse.initialize("ykQ2udK5KrOjB7L7bphLAG4RjTlbDc48LyYpL9za", "V83UUWa3ZIyqxxau1X2lN5b45AKeDuVJZMqgv45W");
var frenzyWeb = angular.module("frenzyWeb", ['ui.router']);
frenzyWeb.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/signin.html',
            controller: 'LoginAndRegister'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'LoginAndRegister'
        })
        .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html'
        })
        .state('menu.profile', {
            url: '/profile',
            templateUrl: 'templates/menu/profile.html',
            controller: 'ProfileController'
        })
        .state('menu.dataEntry', {
            url: '/dataEntry',
            templateUrl: 'templates/menu/dataEntry.html',
            controller: 'dataEntryController'
        })
        .state('menu.analytics', {
            url: '/analytics',
            templateUrl: 'templates/menu/analytics.html',
            controller: 'analyticsController'
        })
        .state('menu.record', {
            url: '/record',
            templateUrl: 'templates/menu/record.html',
            controller: 'recordController'
        })
        .state('menu.finance', {
            url: '/finance',
            templateUrl: 'templates/menu/finance.html',
            controller: 'financeController'
        })
        .state('menu.technicalSupport', {
            url: '/technicalSupport',
            templateUrl: 'templates/menu/technicalSupport.html',
            controller: 'technicalSupportController'
        });
    $urlRouterProvider.otherwise('/signin');
});
/************************************************************************************************/
frenzyWeb.controller('ProfileController', function($scope) {
  $scope.image = "";
})

frenzyWeb.directive('myUpload', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var reader = new FileReader();
            reader.onload = function (e) {
                scope.image = e.target.result;
                scope.$apply();
            }

            elem.on('change', function() {
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    };
}]);
/************************************************************************************************/
/******  staff number chance color input  **************/
function staffNumber1() {
    document.getElementById("option1").style.borderColor = "#2A3E93";
    document.getElementById("option2").style.borderColor = "";
    document.getElementById("option3").style.borderColor = "";
}
function staffNumber2() {
    document.getElementById("option1").style.borderColor = "";
    document.getElementById("option2").style.borderColor = "#2A3E93";
    document.getElementById("option3").style.borderColor = "";
}
function staffNumber3() {
    document.getElementById("option1").style.borderColor = "";
    document.getElementById("option2").style.borderColor = "";
    document.getElementById("option3").style.borderColor = "#2A3E93";
}
/************************************************************************************************/
  frenzyWeb.run(['$rootScope', "$location", function($scope, $location) {


}]);
frenzyWeb.factory('ParseServiceLogin', [function() {


return {
   sayHello: function(text){
     var app_id = "tT9K6IFlXY8wknDJCfB7geBnsLBTRqUYJp4p6X4n";
     var js_key = "s0EZosX3fJzAcp4LUN92HLI1RGetHRSPKq6n7Dkx";

       Parse.initialize(app_id, js_key);
   },
   sayGoodbye: function(text){
       return "Factory says \"Goodbye " + text + "\"";
   }
}

}]);

frenzyWeb.factory('ParseServiceApp', [function() {
  return {
     sayHello: function(text){
       var app_id = "ykQ2udK5KrOjB7L7bphLAG4RjTlbDc48LyYpL9za";
       var js_key = "V83UUWa3ZIyqxxau1X2lN5b45AKeDuVJZMqgv45W";
       Parse.initialize(app_id, js_key);

     },
     sayGoodbye: function(text){
         return "Factory says \"Goodbye " + text + "\"";
     }
 }

}]);

frenzyWeb.controller("LoginAndRegister", function($scope, $http,$location,ParseServiceLogin, $state){
console.log(ParseServiceLogin.sayHello());
$scope.parse = ParseServiceLogin.sayHello()
  $scope.currentUser = Parse.User.current();

  $scope.signUp = function(form) {
    if($("#nombre").val().length < 1) {
      sweetAlert('Atención',"El Nombre es obligatorio",'warning');
      return false;
    }else if ($("#empresa").val().length < 1) {
      sweetAlert('Atención',"El nombre de la Empresa es obligatorio",'warning');
      return false;
    }else if ($("#email").val().length < 1) {
      sweetAlert('Atención',"El campo Email no puede estar vacio",'warning');
    }else if($("#email").val().indexOf('@', 0) == -1 || $("#email").val().indexOf('.', 0) == -1) {
      sweetAlert('Lo sentimos',"La dirección Email parece incorrecta",'error');
      return false;
    }else if ($("#password").val().length < 1) {
      sweetAlert('Atención',"Ingrese una contraseña",'warning');
    }else{
      var user = new Parse.User();
      user.set("email", form.email);
      user.set("name", form.username);
      user.set("username", form.email);
      user.set("password", form.password);
      user.set("nit", form.nit);
      user.set("NameCompany", form.empresa);
      user.set("UserType", "UserCompany");

      user.signUp(null, {
        success: function(user) {
          sweetAlert('Perfecto',"Se envió una confirmación a tu correo por favor revisa para poder activar tu cuenta",'success');
          $scope.currentUser = user;
          $scope.$apply();
        },
        error: function(user, error) {
          sweetAlert('Error',"Unable to log in: " + error.code + " " + error.message,'error');
        }
      });
    }

  };
  $scope.logIn = function(form, newPath) {
    console.log(form);
    if ($("#email").val().length < 1) {
      sweetAlert('Atención', 'el email no puede estar vacio', 'warning');
    }else if($("#email").val().indexOf('@', 0) == -1 || $("#email").val().indexOf('.', 0) == -1) {
        sweetAlert('Atención',"La dirección email parece incorrecta", 'warning');
        return false;
    } else if ($("#password").val().length < 1) {
        sweetAlert('Atención',"El campo Contraseña no puede estar vacio",'warning');
    }else{
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        if (user.attributes.emailVerified == false) {
          sweetAlert('Atención', 'Aún no se ha confirmado su correo', 'warning');
        }else {
          $location.path('/menu');
          $scope.currentUser = user;
          $location.path(newPath);
          $scope.$apply();
        }

      },
      error: function(user, error) {
        sweetAlert('Error',"Unable to log in: " + error.code + " " + error.message,'error');
      }
    });
  }
  };

  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };
});
//
// frenzyWeb.controller("Data", function($scope, $http,ParseServiceApp){
//   $.ajax({
//     url : 'https://api.parse.com/1/classes/Customer',
//     type : 'POST',
//     dataType: 'JSON',
//     contentType : 'application/json',
//     headers : {
//       'X-Parse-Application-Id' : 'ykQ2udK5KrOjB7L7bphLAG4RjTlbDc48LyYpL9za',
//       'X-Parse-REST-API-Key' : 'h36JtLiNJgN0Yvps0dyqy7Q67yRBWzttWg21FCbQ'
//     },
//     processData: false,
//     contentType: false,
//     data : JSON.stringify({
//       Name : 'Frenzy',
//       CategoryApp: 'Testing'
//     }),
//     error : function(data) {
//         console.log(data);
//     },
//     success : function(data) {
//
//         console.log('success', data);
//         return data;                      // do I need to return the data?
//     }
//   });
//
// });
