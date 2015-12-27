syncApp.factory('Categories', [
  '$resource',
  function ($resource) {

    var resource = $resource('/portal/api');

    return {
      get: function () {
        return resource.get().$promise;
      }
    }
  }
])