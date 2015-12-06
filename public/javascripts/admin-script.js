(function () {

  $(document).ready(function () {
    $(".slider-container-item img").lazyload({
      event: "sporty"
    });
    if ($('form').length) {
      $('form')[0].reset();
    }
    var deleteImages = new DeleteImages();
    $('.delete-images').on('click', function (e) {
      var sendObj = {
        images: deleteImages.getDeleteList()
      };
      $.ajax({
        url: '/admin/deleteImages',
        type: 'POST',
        data: JSON.stringify(sendObj),
        contentType: 'application/json',
        success: function () {
          location.reload();
        }
      });
    });

    $('.file-upload').on('click', function (e) {
      if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
      }

      input = document.getElementById('fileinput');
      if (!input) {
        alert("Um, couldn't find the fileinput element.");
      } else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
      } else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
      } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = function () {
          console.log('' + fr.result)
          $.ajax({
            url: '/admin/upload',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
              file: fr.result
            }),
            success: function (response) {
              console.log(response);
            }
          })
        };
        //fr.readAsText(file);
        fr.readAsDataURL(file);
      }
    })

    $('#addCategory').on('click', function (e) {
      console.log('dsgdsfgsd');
      var obj = {
        name: $('#category_name').val(),
        slug: $('#category_slug').val()
      }

      console.log(obj);

      if (!obj.name || !obj.slug) {
        return;
      }

      $.ajax({
        url: '/admin/addCategory',
        type: 'POST',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function () {
          location.reload();
        }
      });

    })
  });

  function DeleteImages() {
    this.deleteList = {};
    this.bindEvent();
  }

  DeleteImages.prototype.bindEvent = function () {
    var _me = this;

    $('.slider-container-item').on('click', function (e) {
      var $targetEle = $(e.target),
        path = $targetEle.attr('src');

      if ($targetEle.hasClass('selected-image')) {
        $targetEle.removeClass('selected-image');
        _me.removeFromList(path);
      } else {
        $targetEle.addClass('selected-image');
        _me.addToList(path);
      }
    });
  }

  DeleteImages.prototype.unbindEvent = function () {}

  DeleteImages.prototype.addToList = function (path) {
    this.deleteList[path] = path;
  }

  DeleteImages.prototype.removeFromList = function (path) {
    if (this.deleteList[path]) {
      delete this.deleteList[path]
    }
  }

  DeleteImages.prototype.getDeleteList = function () {
    return this.deleteList;
  }

})();