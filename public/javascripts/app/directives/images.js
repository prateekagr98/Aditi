syncApp.directive('images', [

  function () {

    var controller;

    controller = [
      '$scope', 'Categories', 'Images',
      function ($scope, Categories, Images) {

        $scope.images = [];
        $scope.category_id = "-1";

        Categories.get()
          .then(function (response) {
            $scope.categories = response.categories;
          })

        Images.get()
        .then(function (response){
          $scope.images = response.images;
        });

        $scope.saveImage = function () {
          Images.save({
            'category_id': $scope.category_id,
            'url': $scope.url
          }).then(function (response){
            $scope.images.unshift(response);
            $scope.category_id = "-1";
            $scope.url = '';
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