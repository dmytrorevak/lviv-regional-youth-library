// Save all new book pictures for sliding to one variable 
var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray(),
    // Save sliding pictures wrapper to variable 
    slidingPicturesWrapper = $('.new-books-slider__picteres-slide-section'),
    // Variable for checking the slider pause
    isPaused = false,
    // Save slider control buttons to one variable
    controlButtons = $('.new-books-slider__control-button');

// Start slide each of books picture
var sliderInterval = setInterval(function () {
    if (isPaused === false) {
        slidThePictures(slidingPictures, slidingPicturesWrapper, 1);
    }
}, 25);

// Set mousewheel event listener to body for control one scrolling
disableBodyScroling();

// Allow user's control for slider by mousewheel
mousePictureSliding(slidingPicturesWrapper);

// Stop the slider when user hovers it
$(slidingPicturesWrapper).hover(function () {
    isPaused = true;
}, function () {
    isPaused = false;
});

// TODO
controlButtons.on('click', function () {
    changePictureSlidingScrollPosition(this.dataset.scrollDirection);
});

// function descriptions ////////////////////////////////////////////////////////////////////////////

// Implement the slider. Change scroll position of picture wrapper and when the scroll position of sliding elements wrapper becomes equals the first element height change the DOM position of first slider picture
function slidThePictures(itemsForSliding, slidingElementsWrapper, scrollStap) {
    // Get firs slide picture element height and picture wrapper scroll position
    var firstSlidingElement = itemsForSliding[0],
        firstElementHeight = parseInt($(firstSlidingElement).css('height')),
        parentElementScroll = parseInt($(slidingElementsWrapper).scrollTop());


    // Set first element at the end of picture list when picture wrapper scroll position becomes equal first element height or scroll picture wrapper one more 
    if (parentElementScroll >= firstElementHeight) {
        var bodyScrollPosition = parseInt(document.body.scrollTop);
        $(slidingElementsWrapper).append(firstSlidingElement);

        // Subtract height of first element from slider wrapper scroll top (for firefox)
        parentElementScroll -= parseInt($(firstSlidingElement).outerHeight());
        document.body.scrollTop = bodyScrollPosition;
        itemsForSliding.shift();
        itemsForSliding.push(firstSlidingElement);

        // Set sliding elements wrapper scroll top like the nubmer which we got from subtracting height of first element from slider wrapper scroll top and add scrollStap for avionding the slider to stop
        $(slidingElementsWrapper).scrollTop(parentElementScroll + scrollStap);
    } else {
        // Change scroll top of sliding elements wrapper on certain scrollStap
        parentElementScroll = parentElementScroll + scrollStap;
        $(slidingElementsWrapper).scrollTop(parentElementScroll);
    }
}

// Stop the body scrolling when user hover on the slider and allow scrolling after that 
function disableBodyScroling() {
    $('body').on('mousewheel', function (e) {
        // Refuse or allow body scroll depending on slider paused
        if (isPaused === true) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            return true;
        }
    });
}

// When user rotate mouse cicle under the slide he can scroll it as one want
function mousePictureSliding() {

    // Add mousewheel event for slide wrpper
    $(slidingPicturesWrapper).on('mousewheel', function (e) {

        // Identify mousewheel direction
        var mousewheelDirection = parseInt(e.deltaY) === 1 ? 'up' : 'down';
        changePictureSlidingScrollPosition(mousewheelDirection);
    });
}

// Change slider wrapper scroll position depending on user's choosed direction
function changePictureSlidingScrollPosition(direction) {

    // Save previous wrapper scroll position
    var parentElementScroll = parseInt($(slidingPicturesWrapper).scrollTop());

    // Chage sliding elements wrapper scroll position
    if (direction === 'up') {
        parentElementScroll -= 50;
        $(slidingPicturesWrapper).scrollTop(parentElementScroll);
    } else {
        parentElementScroll += 50;
        $(slidingPicturesWrapper).scrollTop(parentElementScroll);
    }
}