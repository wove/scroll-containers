$(function() {
    var $containers = $('.scroll-container'),
        lastWinPos = 0,
        resizeTimer;

    $containers.each(function() {
        $(this).css({position: 'relative'});
        $(this).children('.scroll-element').css({position: 'absolute'});
    });

    function resize() {
        $containers.each(function() {
            $(this).children('.scroll-element').css({width: $(this).width()})
            $(this).data("elementHeight", $(this).children('.scroll-element').outerHeight());
            $(this).css('min-height', $(this).data("elementHeight") + 'px'); // ensures container height is never less than scroll-element height
            $(this).data("containerHeight", $(this).outerHeight()); 
            $(this).data("elementLeft", $(this).offset().left + parseFloat($(this).css('border-left-width')));
            $(this).data("element", $(this).children('.scroll-element').first());
            if ($(this).data("element").css('position') === 'fixed') {
                $(this).data("element").css('left', $(this).data("elementLeft"));
            }
        });

        winHeight = $(window).height();
    }

    function scroll() {
        var winPos = $(window).scrollTop();

        $containers.each(function() {
            $container = $(this);
            $element = $(this).data("element");
            containerHeight = $(this).data("containerHeight");
            elementHeight = $(this).data("elementHeight");
            elementLeft = $(this).data("elementLeft");

            if (winPos > lastWinPos) { // if scrolling down
                if (winPos < $container.offset().top) { // if the top of window is above scroll container
                    $element.css({position: 'absolute',
                                  top: '0',
                                  bottom: 'auto',
                                  left: '0'});
                } else if ((winPos + elementHeight > $container.offset().top + containerHeight &&
                            elementHeight < winHeight) ||
                           (winPos + winHeight > $container.offset().top + containerHeight &&
                            elementHeight > winHeight)) { // if the scroll-element has reached the bottom of the scroll container
                    $element.css({position: 'absolute',
                                  top: 'auto',
                                  bottom: '0',
                                  left: '0'});
                } else if (winPos > $container.offset().top &&
                           elementHeight < winHeight) { // if the top of window is below the top of the scroll container and the scroll element is shorter than the window
                    $element.css({position: 'fixed',
                                  top: '0',
                                  bottom: 'auto',
                                  left: elementLeft});
                } else if (winPos + winHeight > $element.offset().top + elementHeight &&
                           elementHeight > winHeight) { // if the bottom of the window has reached the bottom of the scoll-element and the element is taller than the window
                    $element.css({position: 'fixed',
                                  top: 'auto',
                                  bottom: '0',
                                  left: elementLeft});
                } else if (winPos + winHeight < $element.offset().top + elementHeight &&
                           elementHeight > winHeight) { // if the bottom of the window is above the bottom of the scroll element and the scroll-element is taller than the window
                    $element.css('position') === 'fixed' ? elementOffset = $element.offset().top - $container.offset().top : elementOffset = $element.position().top;
                    $element.css({position: 'absolute',
                                  top: elementOffset + 'px',
                                  bottom: 'auto',
                                  left: '0'});
                }
            } else if (winPos < lastWinPos) { // if scrolling up
                if (winPos < $container.offset().top) { // if the top of the window is above the scroll container
                    $element.css({position: 'absolute',
                                  top: '0',
                                  bottom: 'auto',
                                  left: '0'});
                } else if (winPos + winHeight > $container.offset().top + containerHeight &&
                           elementHeight > winHeight) { // if the bottom of the window is below the bottom of the scroll container and the scroll-element is taller than the window
                    $element.css({position: 'absolute', 
                                  top: 'auto',
                                  bottom: '0',
                                  left: '0'});
                } else if ((winPos > $container.offset().top &&
                            winPos < $container.offset().top + containerHeight - elementHeight &&
                            elementHeight < winHeight ) ||
                           (winPos < $element.offset().top &&
                            elementHeight > winHeight)) { // if the top of the window has reached the top of the scroll-element
                    $element.css({position: 'fixed',
                                  top: '0',
                                  bottom: 'auto',
                                  left: elementLeft});
                } else if (winPos > $element.offset().top &&
                           elementHeight > winHeight) { // if the top of the window is below the top of the scroll-element and the scroll-element is taller than the window
                    $element.css('position') === 'fixed' ? elementOffset = $element.offset().top - $container.offset().top : elementOffset = $element.position().top;
                    $element.css({position: 'absolute',
                                  top: elementOffset + 'px',
                                  bottom: 'auto',
                                  left: '0'});
                }
            }
        });

        lastWinPos = winPos;
    }

    function resizeAndScroll() {
        resize();
        scroll();
    }

    $(window)
        .on('scroll', scroll)
        .on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeAndScroll, 100);
        });

    resizeAndScroll();

});