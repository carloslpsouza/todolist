app.controller("showInputNewList",
    function ($scope) {
        $scope.viewInputList = 'none';
        $scope.textBtn = 'Nova Lista';

        $scope.showNewList = function () {
            if ($scope.viewInputList == 'none') {
                return [$scope.viewInputList = 'block', $scope.textBtn = 'Cancelar']
            } else {
                return [$scope.viewInputList = 'none', $scope.textBtn = 'Nova Lista']
            }
        }
    }
);
app.controller("showInputNewTask", ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.viewInputTask = 'none';
        $scope.textBtn = 'Nova Lista';

        $rootScope.showNewTask = function () {
            if ($scope.viewInputTask == 'none') {
                return [$scope.viewInputTask = 'block', $scope.textBtn = 'Cancelar']
            } else {
                return [$scope.viewInputTask = 'none', $scope.textBtn = 'Nova Lista']
            }
        }
    }
]);

app.controller('showTaskDetails',['$scope', '$rootScope',
    function($scope, $rootScope){        
        $scope.showDetails = function(){
            $scope.title = $rootScope.newList.descriptionList;
            $scope.inpt = '';
            $rootScope.showNewTask();
        }
    }
]);

//Para o futuro
/* app.controller("docGenerate",
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
); */

app.controller('createDocList', ['$scope', '$rootScope', 'md5', function ($scope, $rootScope, md5) {
    $scope.$watch('descriptionList', function () {
        $scope.tempList = {'id': md5.createHash($scope.descriptionList || ''), 'description': $scope.descriptionList};
        console.log($scope.tempList)
        $rootScope.newList = $scope.tempList;             
    });
}]);

app.controller('createDocTask', ['$scope', '$rootScope', 'md5',function ($scope, $rootScope, md5) {
    $scope.$watch('descriptionTask', function () {
        let d = new Date();
        $scope.tempTask = {'id': md5.createHash(d.getMilliseconds().toString()), 'description': $scope.descriptionTask, 'status': 'open'};
        console.log($scope.tempTask)
        $rootScope.newTask = $scope.tempTask;             
    });
}]);

app.controller('createList',['$scope', '$rootScope',
    function($scope, $rootScope){
        $scope.list = [];
        $scope.push = function(){
            console.log($rootScope.newList); 
            $scope.list.push($rootScope.newList.description);          
        }
    }
])

app.controller('createTask',['$scope', '$rootScope',
    function($scope, $rootScope){
        $scope.taskOpen = [];
        $scope.taskClose = [];
        $scope.push = function(){
            console.log($rootScope.newTask);
            let id = $rootScope.newTask.id;
            let description = $rootScope.newTask.description;
            let status = $rootScope.newTask.status;
            let idList = $rootScope.newList.id;
            if($rootScope.newTask.status === 'open'){
                $scope.taskOpen.push({'id': id, 'description': description, 'status': status, 'idList': idList});   
            }else{
                $scope.taskClose.push({'id': id, 'description': description, 'status': status});   
            }                               
        }
        $scope.closeTask = function(key){
            console.log(key);
            console.log($scope.taskOpen);
            //let idx = $scope.taskOpen.indexOf(key);
            let idx = $scope.taskOpen.findIndex( (itm)=> itm.id === key );
            console.log(idx);
            $scope.taskOpen[idx].status = 'close';
            $scope.taskClose.push($scope.taskOpen[idx]); 
            $scope.taskOpen.splice(idx, 1);            
            
            console.log($scope.taskClose);
        }
    }
])
