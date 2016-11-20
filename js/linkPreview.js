(function ($) {
    $.fn.linkPreview = function (options) {

        var defaults = {
            placeholder: "What's in your mind",
            imageQuantity: -1 // illimited
        };

        var opts = jQuery.extend(defaults, options);

        function trim(str) {
            return str.replace(/^\s+|\s+$/g, "");
        }

        var selector = $(this).selector;
        selector = selector.substr(1);

        $(this).append('<div id="previewLoading_' + selector + '" class="previewLoading"></div> <div style="float: left;"> <textarea type="text" id="text_' + selector + '" style="text-align: left" placeholder="' + opts.placeholder + '" class="text" style="text-align: left"/></textarea> <div style="clear: both"></div> </div> <div id="preview_' + selector + '" class="preview"> <div id="previewImages_' + selector + '" class="previewImages"> <div id="previewImage_' + selector + '" class="previewImage"><img src="img/loader.gif" style="margin-left: 43%; margin-top: 39%;"/> </div> <input type="hidden" id="photoNumber_' + selector + '" class="photoNumber" value="0" /> </div> <div id="previewContent_' + selector + '" class="previewContent"> <div id="closePreview_' + selector + '" title="Remove" class="closePreview" ></div> <div id="previewTitle_' + selector + '" class="previewTitle"></div> <div id="previewUrl_' + selector + '" class="previewUrl"></div> <div id="previewDescription_' + selector + '" class="previewDescription"></div> <div id="hiddenDescription_' + selector + '" class="hiddenDescription"></div> </div>  <div style="clear: both"></div> </div> <div style="clear: both"></div> <div id="postPreview_' + selector + '" class="postPreview"> <div style="clear: both"></div> </div> <div class="previewPostedList" id="previewPostedList_' + selector + '"></div>');

        var text;
        var urlRegex = /(https?\:\/\/|\s)[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})(\/+[a-z0-9_.\:\;-]*)*(\?[\&\%\|\+a-z0-9_=,\.\:\;-]*)?([\&\%\|\+&a-z0-9_=,\:\;\.-]*)([\!\#\/\&\%\|\+a-z0-9_=,\:\;\.-]*)}*/i;
        var block = false;
        var blockTitle = false;
        var blockDescription = false;
        var contentWidth = 355;
        var content = "";
        var image = "";
        var images = "";
        var title = "";
        var url = "";
        var video = "no";
        var videoPlay = "";
        var description = "";
        var hrefUrl = "";
        var videoIframe = "";
        var leftSideContent = "";
        var photoNumber = 0;
        var firstPosted = false;
        var firstPosting = false;
        var nT = false;
        var imageId = "";
        var imageIdArray = "";
        var pTP = "";
        var pDP = "";
        var fancyUrl = '';
        var allowPosting = false;
        var isCrawling = false;
        var defaultTitle = "Enter a title";
        var defaultDescription = "Enter a description";

        var textText = "";
        $('#text_' + selector).focus(function () {
            if (trim($('#text_' + selector).val()) === textText) {
                $(this).val('');
                $(this).css({
                    'color': 'black'
                });
            }
        }).blur(function () {
            if (trim($('#text_' + selector).val()) === "") {
                $(this).val(textText);
                $(this).css({
                    'color': 'grey'
                });
            }
        });

        function resetPreview() {
            contentWidth = 355;
            $('#previewContent_' + selector).css({
                'width': '355px'
            });
            images = "";
        }


        function iframenize(obj) {

            var oldId = obj.prop("id");
            var currentId = oldId.substring(3);
            pTP = "pTP" + currentId;
            pDP = "pDP" + currentId;
            oldId = "#" + oldId;
            currentId = "#" + currentId;
            $(oldId).css({
                'display': 'none'
            });
            $(currentId).css({
                'display': 'block'
            });
            $('#' + pTP).css({
                'width': '495px'
            });
            $('#' + pDP).css({
                'width': '495px'
            });

        }


        var crawlText = function () {

            allowPosting = true;
            block = false;
            hrefUrl = '';
            fancyUrl = '';
            images = '';
            video = '';

            text = " " + $('#text_' + selector).val();
            if (trim(text) !== "") {
                video = "no";
                videoPlay = "";
                if (block === false && urlRegex.test(text)) {
                    block = true;
                    $('#preview_' + selector).hide();
                    $('#previewButtons_' + selector).hide();
                    $('#previewLoading_' + selector).html("<img src='img/loader.gif' />");
                    $('#photoNumber_' + selector).val(0);

                    allowPosting = false;
                    isCrawling = true;

                    $.post('php/textCrawler.php', {
                        text: text,
                        imagequantity: opts.imageQuantity
                    }, function (answer) {

                        if (answer.url === null)
                            answer.url = "";
                        if (answer.pageUrl === null)
                            answer.pageUrl = "";
                        if (answer.title === null || answer.title === "")
                            answer.title = defaultTitle;
                        if (answer.description === null || answer.description === "")
                            answer.description = defaultDescription;
                        if (answer.canonicalUrl === null)
                            answer.canonicalUrl = "";
                        if (answer.images === null)
                            answer.images = "";
                        if (answer.video === null)
                            answer.video = "";
                        if (answer.videoIframe === null)
                            answer.videoIframe = "";
                        resetPreview();
                        $('#previewLoading_' + selector).html("");
                        $('#preview_' + selector).show();
                        $('#previewTitle_' + selector).html("<span id='previewSpanTitle_" + selector + "' class='previewSpanTitle' >" + answer.title + "</span><input type='text' value='" + answer.title + "' id='previewInputTitle_" + selector + "' class='previewInputTitle inputPreview' style='display: none;'/>");
                        $('#text_' + selector).css({
                            "border": "1px solid #b3b3b3",
                            "border-bottom": "1px dashed #b3b3b3"
                        });

                        $('#previewUrl_' + selector).html(answer.url);
                        $('#previewDescription_' + selector).html("<span id='previewSpanDescription_" + selector + "' class='previewSpanDescription' >" + answer.description + "</span><textarea id='previewInputDescription_" + selector + "' class='previewInputDescription' style='display: none;' class='inputPreview' >" + answer.description + "</textarea>");
                        title = "<a href='" + answer.pageUrl + "' target='_blank'>" + $('#previewTitle_' + selector).html() + "</a>";
                        url = "<a href='http://" + answer.canonicalUrl + "' target='_blank'>" + answer.canonicalUrl + "</a>";
                        fancyUrl = answer.canonicalUrl;
                        hrefUrl = answer.url;
                        description = $('#previewDescription_' + selector).html();
                        video = answer.video;
                        videoIframe = answer.videoIframe;
                        try {
                            images = (answer.images).split("|");
                            $('#previewImages_' + selector).show();
                            $('#previewButtons_' + selector).show();
                        } catch (err) {
                            $('#previewImages_' + selector).hide();
                            $('#previewButtons_' + selector).hide();
                        }
                        images.length = parseInt(images.length);
                       var appendImage = "";
                        for (i = 0; i < images.length; i++) {
                            if (images[i].length>0)
                            {
                                    appendImage += "<img id='imagePreview_" + selector + "_" + i + "' src='" + images[i] + "' style='width: 130px; height: auto' ></img>";
                                    break;
                            }
                        }
                        $('#previewImage_' + selector).html("<a href='" + answer.pageUrl + "' target='_blank'>" + appendImage + "</a><div id='whiteImage' style='width: 130px; color: transparent; display:none;'>...</div>");
                        

if (images.length === 0) {
                            $('#closePreview_' + selector).css({
                                "margin-right": "-206px"
                            });
                            $('#previewTitle_' + selector).css({
                                "width": "495px"
                            });
                            $('#previewDescription_' + selector).css({
                                "width": "495px"
                            });
                            $('#previewInputDescription_' + selector).css({
                                "width": "495px"
                            });
                            contentWidth = 495;
                            $('#previewButtons_' + selector).hide();
                            $('#noThumb_' + selector).hide();
                            $('#nT_' + selector).hide();
                        }
                        $('#previewSpanTitle_' + selector).unbind('click').click(function (e) {
                            e.stopPropagation();
                            if (blockTitle === false) {
                                blockTitle = true;
                                $('#previewSpanTitle_' + selector).hide();
                                $('#previewInputTitle_' + selector).show();
                                $('#previewInputTitle_' + selector).val($('#previewInputTitle_' + selector).val());
                                $('#previewInputTitle_' + selector).focus().select();
                            }
                        });
                        $('#previewInputTitle_' + selector).blur(function () {
                            blockTitle = false;
                            $('#previewSpanTitle_' + selector).html($('#previewInputTitle_' + selector).val());
                            $('#previewSpanTitle_' + selector).show();
                            $('#previewInputTitle_' + selector).hide();
                        });
                        $('#previewInputTitle_' + selector).keypress(function (e) {
                            if (e.which === 13) {
                                blockTitle = false;
                                $('#previewSpanTitle_' + selector).html($('#previewInputTitle_' + selector).val());
                                $('#previewSpanTitle_' + selector).show();
                                $('#previewInputTitle_' + selector).hide();
                            }
                        });
                        $('#previewSpanDescription_' + selector).unbind('click').click(function (e) {
                            e.stopPropagation();
                            if (blockDescription === false) {
                                blockDescription = true;
                                $('#previewSpanDescription_' + selector).hide();
                                $('#previewInputDescription_' + selector).show();
                                $('#previewInputDescription_' + selector).val($('#previewInputDescription_' + selector).val());
                                $('#previewInputDescription_' + selector).focus().select();
                            }
                        });
                        $('#previewInputDescription_' + selector).blur(function () {
                            blockDescription = false;
                            $('#previewSpanDescription_' + selector).html($('#previewInputDescription_' + selector).val());
                            $('#previewSpanDescription_' + selector).show();
                            $('#previewInputDescription_' + selector).hide();
                        });
                        $('#previewInputDescription_' + selector).keypress(function (e) {
                            if (e.which === 13) {
                                blockDescription = false;
                                $('#previewSpanDescription_' + selector).html($('#previewInputDescription_' + selector).val());
                                $('#previewSpanDescription_' + selector).show();
                                $('#previewInputDescription_' + selector).hide();
                            }
                        });
                        $('#previewSpanTitle_' + selector).mouseover(function () {
                            $('#previewSpanTitle_' + selector).css({
                                "background-color": "#ff9"
                            });
                        });
                        $('#previewSpanTitle_' + selector).mouseout(function () {
                            $('#previewSpanTitle_' + selector).css({
                                "background-color": "transparent"
                            });
                        });
                        $('#previewSpanDescription_' + selector).mouseover(function () {
                            $('#previewSpanDescription_' + selector).css({
                                "background-color": "#ff9"
                            });
                        });
                        $('#previewSpanDescription_' + selector).mouseout(function () {
                            $('#previewSpanDescription_' + selector).css({
                                "background-color": "transparent"
                            });
                        });
                        $('#closePreview_' + selector).unbind('click').click(function (e) {
                            e.stopPropagation();
                            block = false;
                            hrefUrl = '';
                            fancyUrl = '';
                            images = '';
                            video = '';
                            $('#preview_' + selector).fadeOut("fast", function () {
                                $('#text_' + selector).css({
                                    "border": "1px solid #b3b3b3",
                                    "border-bottom": "1px solid #e6e6e6"
                                });
                                $('#previewImage_' + selector).html("");
                                $('#previewTitle_' + selector).html("");
                                $('#previewUrl_' + selector).html("");
                                $('#previewDescription_' + selector).html("");
                            });

                        });
                        if (firstPosting === false) {
                            firstPosting = true;
                        }
                        allowPosting = true;
                        isCrawling = false;
                    }, "json");
                }
            }else{
                    block = false;
                    hrefUrl = '';
                    fancyUrl = '';
                    images = '';
                    video = '';
                    $('#preview_' + selector).fadeOut("fast", function () {
                        $('#text_' + selector).css({
                            "border": "1px solid #b3b3b3",
                            "border-bottom": "1px solid #e6e6e6"
                        });
                        $('#previewImage_' + selector).html("");
                        $('#previewTitle_' + selector).html("");
                        $('#previewUrl_' + selector).html("");
                        $('#previewDescription_' + selector).html("");
                    });

            }
        };

        $('#text_' + selector).bind({
            paste: function () {
                setTimeout(function () {
                    crawlText();
                }, 100);
            },
            keyup: function (e) {
                    crawlText();
            }
        });


        function replaceAll(find, replace, str) {
            return str.replace(new RegExp(find, 'g'), replace);
        }

    };

})(jQuery);
