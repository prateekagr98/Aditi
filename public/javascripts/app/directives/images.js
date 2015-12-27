syncApp.directive('images', [

  function () {

    var controller;

    controller = [
      '$scope', 'Categories', 'Images',
      function ($scope, Categories, Images) {

        $scope.images = [];
        $scope.categoryMap = {};
        $scope.category_id = "-1";

        Categories.get()
          .then(function (response) {
            $scope.categories = response.categories;

            _.forEach($scope.categories, function (item) {
              $scope.categoryMap[item._id] = item.name;
            });
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

        $scope.deleteImage = function (id) {
          Images.remove(id)
          .then(function (response) {
            _.remove($scope.images, function (item) {
              return item._id == id;
            })
          });
        }
      }
    ]
    return {
      restrict: 'A',
      controller: controller
    }
  }
])