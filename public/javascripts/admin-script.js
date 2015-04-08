(function () {
    $(document).ready(function () {
        var deleteImages = new DeleteImages();
        $('.delete-images').on('click', function (e) {
            var sendObj = {
                images: deleteImages.getDeleteList(),
                page: $(e.target).attr('page')
            };
            $.ajax({
                url: '/admin/deleteImages',
                type: 'POST',
                data: sendObj,
                success: function () {
                    location.reload();
                }
            });
        });
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

    DeleteImages.prototype.unbindEvent = function () {

    }

    DeleteImages.prototype.addToList = function (path) {
        this.deleteList[path] = true;
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