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
        $scope.newList = {"id": md5.createHash($scope.description || ''), "description": $scope.description};
    });
}]);

app.controller('persistDoc',
    function($scope){   
        $scope.item = 'b'
        $scope.list = [1];
        $scope.push = function(it){
            alert(it);
            $scope.list.push($scope.item);            
        }
    })