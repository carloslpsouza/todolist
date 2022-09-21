app.controller("controllerTodo",
    function ($scope) {
        $scope.data
        $scope.status
        $scope.description
    }
);
app.controller("showInputNewList",
    function ($scope) {
        $scope.view = 'none';
        $scope.textBtn = 'Nova Lista';

        $scope.showNewList = function () {
            if ($scope.view == 'none') {
                return [$scope.view = 'block', $scope.textBtn = 'Cancelar']
            } else {
                return [$scope.view = 'none', $scope.textBtn = 'Nova Lista']
            }
        }
    }
);

app.controller("docGenerate",
    function ($scope) {
        $scope.name = 'none';
        $scope.ipt

        $scope.readFile = function () {
            let file = $scope.ipt.files[0];
            let fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function () {
                alert(fileReader.result);
            };
            fileReader.onerror = function () {
                alert(fileReader.error);
            };

        }
    }
);

app.controller('createDoc', ['$scope', '$rootScope', 'md5', function ($scope, $rootScope, md5) {
    $scope.$watch('description', function () {
        $scope.tempList = {'id': md5.createHash($scope.description || ''), 'description': $scope.description};
        console.log($scope.tempList)
        $rootScope.newList = $scope.tempList;             
    });
}]);

app.controller('persistDoc',['$scope', '$rootScope',
    function($scope, $rootScope){
        $scope.list = [];
        $scope.push = function(){
            console.log($rootScope.newList); 
            $scope.list.push($rootScope.newList.description);
            $rootScope.newList =''          
        }
    }])