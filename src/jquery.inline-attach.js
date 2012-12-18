/**
 * jQuery plugin for inline attach
 *
 * @param {jQuery} $
 */
(function($) {

    /**
     * Show a thumbnail of the given image
     *
     * @param {File} file
     * @returns {void}
     */
    function show_thumbnail(file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var image = new Image();
            $('body').append($('<img/>', {
                src: event.target.result,
                width: 100
            }));
        };
        reader.readAsDataURL(file);
    }

    $.fn.inlineattach = function(options) {

        return this.each(function() {

            options.onRecievedFile = function(file) {
                last_upload = '![Uploadf file...]()';
                $this.val($this.val() + "\n\n" + last_upload);
                show_thumbnail(file);
            };

            options.onUploadedFile = function(data) {
                if (data.filename) {
                    var val = $this.val().replace(last_upload, "![file](" + data.filename + ")")
                    $this.val(val);
                }
            };
 
            var inlineattach    = new inlineAttach(options),
                $this           = $(this),
                last_upload;

            $this.bind({
                'paste': function(e) {
                    inlineattach.onPaste(e.originalEvent);
                },
                'drop': function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    inlineattach.onDrop(e.originalEvent);
                },
                'dragenter dragover': function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
        });
    };
})(jQuery);
