angular.module("myapp", ['ui.bootstrap'])
    .controller("MyController", function($scope, $http, $uibModal) {
        $scope.myForm = {

        };
        $scope.myForm.name = "";
        $scope.myForm.address = "";
        $scope.myForm.phone = "";
        $scope.myForm.email = "";
        $scope.myForm.city = "";
        $scope.myForm.categories = ['Vegetables'];
        $scope.myForm.data = [];

        $scope.categories = [
            'Vegetables',
            'Fruits'
        ];

        $scope.addNewCrop = function() {
            console.log('working');
            var newItemNo = { 'id': $scope.myForm.data.length + 1, 'crop_name': '', 'price': '', 'crop_qty': '', 'unit': '' };
            $scope.myForm.data.push(newItemNo);
        };


        $scope.addNewCrop();
        $scope.submitTheForm = function(item, event) {
            console.log("--> Submitting form");
            //var captcha = document.getElementById("g-recaptcha-response").value

            var dataObject = {
                name: $scope.myForm.name,
                //captcha:captcha,
                address: $scope.myForm.address,
                phone: $scope.myForm.phone,
                email: $scope.myForm.email,
                city: $scope.myForm.city,
                categories: $scope.myForm.categories,
                data: $scope.myForm.data
            };
            //console.log(dataObject);
            //var responsePromise = $http.post("https://api.crofarm.com/farmers/v1/", dataObject, {});

            responsePromise.success(function(data, status, headers, config) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'sm',
                    resolve: {
                        data: function() {
                            return data;
                        }
                    }
                });
                modalInstance.result.then(function(result) {}, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                //var data2=data.replace(/{"d":null}/g,'');
                //var myjson=JSON.parse(data2);$scope.questions=JSON.parse(myjson);


                $scope.$evalAsync(function() {
                    for (var item in $scope.myForm) {
                        $scope.myForm[item] = "";
                    }
                });
                $scope.farmerForm.$setUntouched();
                $scope.farmerForm.$setPristine();

            });

            responsePromise.error(function(data, status, headers, config) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'sm',
                    resolve: {
                        data: function() {
                            return data;
                        }
                    }
                });
                modalInstance.result.then(function(result) {}, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            });

        }
    })
    /**************************************************** 
        directive to restrict input type text as number only 
        ****************************************************/
    .directive('onlyDigits', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == undefined) return '';
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput !== inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    })

.directive('awLimitLength', function() {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            attrs.$set("ngTrim", "false");
            var limitLength = parseInt(attrs.awLimitLength, 10); // console.log(attrs);
            scope.$watch(attrs.ngModel, function(newValue) {
                if (ngModel.$viewValue.length > limitLength) {
                    ngModel.$setViewValue(ngModel.$viewValue.substring(0, limitLength));
                    ngModel.$render();
                }
            });
        }
    };
})

.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, data) {
    $scope.data = data;
    console.log(data);
    $scope.ok = function() {
        $uibModalInstance.close();
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
})

.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) { // contains
    function contains(arr, item, comparator) {
        if (angular.isArray(arr)) {
            for (var i = arr.length; i--;) {
                if (comparator(arr[i], item)) {
                    return true;
                }
            }
        }
        return false;
    }
    // add
    function add(arr, item, comparator) {
        arr = angular.isArray(arr) ? arr : [];
        if (!contains(arr, item, comparator)) {
            arr.push(item);
        }
        return arr;
    }
    // remove
    function remove(arr, item, comparator) {
        if (angular.isArray(arr)) {
            for (var i = arr.length; i--;) {
                if (comparator(arr[i], item)) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return arr;
    }
    // http://stackoverflow.com/a/19228302/1458162
    function postLinkFn(scope, elem, attrs) {
        // exclude recursion, but still keep the model
        var checklistModel = attrs.checklistModel;
        attrs.$set("checklistModel", null);
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);
        attrs.$set("checklistModel", checklistModel);
        // getter / setter for original model
        var getter = $parse(checklistModel);
        var setter = getter.assign;
        var checklistChange = $parse(attrs.checklistChange);
        var checklistBeforeChange = $parse(attrs.checklistBeforeChange);
        // value added to list
        var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;
        var comparator = angular.equals;
        if (attrs.hasOwnProperty('checklistComparator')) {
            if (attrs.checklistComparator[0] == '.') {
                var comparatorExpression = attrs.checklistComparator.substring(1);
                comparator = function(a, b) {
                    return a[comparatorExpression] === b[comparatorExpression];
                };

            } else {
                comparator = $parse(attrs.checklistComparator)(scope.$parent);
            }
        }
        // watch UI checked change
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
                return;
            }
            setValueInChecklistModel(value, newValue);
            if (checklistChange) {
                checklistChange(scope);
            }
        });

        function setValueInChecklistModel(value, checked) {
            var current = getter(scope.$parent);
            if (angular.isFunction(setter)) {
                if (checked === true) {
                    setter(scope.$parent, add(current, value, comparator));
                } else {
                    setter(scope.$parent, remove(current, value, comparator));
                }
            }

        }
        // declare one function to be used for both $watch functions
        function setChecked(newArr, oldArr) {
            if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                setValueInChecklistModel(value, scope[attrs.ngModel]);
                return;
            }
            scope[attrs.ngModel] = contains(newArr, value, comparator);
        }
        // watch original model change
        // use the faster $watchCollection method if it's available
        if (angular.isFunction(scope.$parent.$watchCollection)) {
            scope.$parent.$watchCollection(checklistModel, setChecked);
        } else {
            scope.$parent.$watch(checklistModel, setChecked, true);
        }
    }
    return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function(tElement, tAttrs) {
            if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
                throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
            }
            if (!tAttrs.checklistValue && !tAttrs.value) {
                throw 'You should provide `value` or `checklist-value`.';
            }
            // by default ngModel is 'checked', so we set it if not specified
            if (!tAttrs.ngModel) {
                // local scope var storing individual checkbox model
                tAttrs.$set("ngModel", "checked");
            }
            return postLinkFn;
        }
    };
}]);