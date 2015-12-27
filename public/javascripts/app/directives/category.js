syncApp.directive('category', [

  function () {

    var controller;

    controller = [
      '$scope', 'Categories',
      function ($scope, Categories) {
        Categories.get()
          .then(function (response) {
            console.log(response);
          })
      }
    ]
    return {
      restrict: 'A',
      controller: controller
    }
  }
])