syncApp.directive('category', [

  function () {

    var controller;

    controller = [
      '$scope', 'Categories',
      function ($scope, Categories) {
        Categories.get()
          .then(function (response) {
            $scope.categories = response.categories;
          })

        $scope.saveCategory = function () {
          Categories.save({
            'name':$scope.name,
            'slug':$scope.slug
          }).then(function (response) {
            $scope.categories.unshift(response);
            $scope.name = '';
            $scope.slug = '';
          })
        }
      }
    ]
    return {
      restrict: 'A',
      controller: controller
    }
  }
])