syncApp.factory('Categories', [
  '$resource',
  function ($resource) {

    var resource = $resource('/portal/api/categories');

    return {
      get: function () {
        return resource.get().$promise;
      },
      save: function (data) {
      	return resource.save({}, data).$promise;
      }
    }
  }
])

syncApp.factory('Images', [
  '$resource',
  function ($resource) {

    var resource = $resource('/portal/api/images');

    return {
      get: function () {
        return resource.get().$promise;
      },
      save: function (data) {
        return resource.save({}, data).$promise;
      }
    }
  }
])