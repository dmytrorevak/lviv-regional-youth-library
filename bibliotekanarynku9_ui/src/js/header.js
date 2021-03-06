var handleNavigationScroll = getNavigationScrollHandler();

// Add scroll event handler for window and make navigation fixed when user scroll window over the navigation block
$(window).on('scroll', function () {
    handleNavigationScroll();

    // Collapse menu when user fire scroll event
    $navItemsList.addClass('navigation__items-list_style_collapsed');
});

// Show or hide collapsed menu when user click the collapsed button
$collapsedButton.on('click', function () {
    $navItemsList.toggleClass('navigation__items-list_style_collapsed');
});

// Get method that has its own closure state and implements sticky navigation logic.
function getNavigationScrollHandler() {
    var isNavigationFixed = false;

    return function() {
        var headerItemsParameters = getHeaderItemsParameters(),
            navigationHeight = headerItemsParameters.navigationHeight,
            windowTopScroll = headerItemsParameters.windowTopScroll,
            headerHeight = headerItemsParameters.headerHeight;

        // When scroll position is over header height add fixed styles for navigation block
        if (windowTopScroll > headerHeight - navigationHeight && !isNavigationFixed) {
            $($navigation).addClass('header__navigation_fixed');
            $($header).css('padding-bottom', navigationHeight);
            isNavigationFixed = true;
        } else if (windowTopScroll < headerHeight - navigationHeight && isNavigationFixed) {
            $($navigation).removeClass('header__navigation_fixed');
            $($header).css('padding-bottom', 0);
            isNavigationFixed = false;
        }
    };
}

// Get header-block-element and navigation-block-element heights an save them. Also get current window scroll position.
function getHeaderItemsParameters() {
    var navigationHeight = parseInt($($navigation).outerHeight()),
        windowTopScroll = parseInt($(window).scrollTop()),
        headerHeight = parseInt($($header).outerHeight());

    return {
        navigationHeight: navigationHeight,
        windowTopScroll: windowTopScroll,
        headerHeight: headerHeight
    };
}
