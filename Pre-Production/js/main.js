$(function () {

    /////////////////////////////
    // MOVE CLASS ACTIVE ALL ITEMS NAVBAR
    const classActive = 'navbar__active',
        navbarNav = $('.navbar__nav'),
        navbarLink = $('.navbar__link');


    // CLICK ON ACTIVE 
    navbarLink.on('click', function () {

        $(this).addClass(classActive).parent().siblings().find('a').removeClass(classActive);

    });

    /////////////////////////////
    // SCROLL IN WINDOW 

    function micanisemSroll() {

        // CONSTANCE
        const windowScrollTop = $(window).scrollTop(),
            toBottom = $(window).scrollTop() + $(window).height();

        // SECTION ONE
        const sectionOne = $('.section__two');
        const imageSectionOne = '.section__two__image';
        const sectionOnetoTop = sectionOne.offset().top;
        const sectionOneCalulation = sectionOne.offset().top + sectionOne.outerHeight();

        // SECTION TWO
        const sectionTwo = $('.section__three');
        const imageSectionTwo = '.section__three__image';
        const sectionTwotoTop = sectionTwo.offset().top;
        const sectionTwoCalulation = sectionTwo.offset().top + sectionTwo.outerHeight();

        // SECTION THREE
        const sectionThree = $('.section__four');
        const imageSectionThree = '.section__four__image';
        const sectionThreetoTop = sectionThree.offset().top;
        const sectionThreeCalulation = sectionThree.offset().top + sectionThree.outerHeight();


        // ALL VARIABLES ACTIONS
        const classActive = 'active';
        const classStop = 'stop';

        if ($(window).width() > 900) {

            // SECTION ONE
            windowScrollTop >= sectionOnetoTop ?
                sectionOne.find(imageSectionOne).addClass(classActive) :
                sectionOne.find(imageSectionOne).removeClass(classActive);

            toBottom >= sectionOneCalulation ?
                sectionOne.find(imageSectionOne).addClass(classStop) :
                sectionOne.find(imageSectionOne).removeClass(classStop);

            // SECTION TWO
            windowScrollTop >= sectionTwotoTop ?
                sectionTwo.find(imageSectionTwo).addClass(classActive) :
                sectionTwo.find(imageSectionTwo).removeClass(classActive);

            toBottom >= sectionTwoCalulation ?
                sectionTwo.find(imageSectionTwo).addClass(classStop) :
                sectionTwo.find(imageSectionTwo).removeClass(classStop);

            // SECTION THREE
            windowScrollTop >= sectionThreetoTop ?
                sectionThree.find(imageSectionThree).addClass(classActive) :
                sectionThree.find(imageSectionThree).removeClass(classActive);

            toBottom >= sectionThreeCalulation ?
                sectionThree.find(imageSectionThree).addClass(classStop) :
                sectionThree.find(imageSectionThree).removeClass(classStop);

        }

    }

    // EVENT SCROLL IN DOCUMENT HTML
    $(document).on('scroll', function () {

        // RUNNING FUNCTION
        micanisemSroll();

    });

    // INTO DATE FULL YEAR IN FOOTER SITE
    const dateYear = $('#year');

    dateYear.text(new Date().getFullYear());



    // NAVBAR
    const links = $('.navbar__link');

    // EACH ALL LINKS AND SCROLL TOP SPECIFIC DATA ATTRIBUTES
    links.each(function () {

        $(this).on('click', function (e) {

            e.preventDefault();

            $("html, body").animate({

                scrollTop: $('#' + $(this).data('scroll')).offset().top

            }, 1000);


        });

    });

    // SYNC LINK WITH SCROLLING WINDOW
    $(window).on('scroll', function () {

        links.each(function () {

            if ($(window).scrollTop() >= $('#' + $(this).data('scroll')).offset().top-10) {
                $(this).addClass(classActive).parent().siblings().find(links).removeClass(classActive);
            }

        });

    });


    // RESIZE WINDOW
    $(window).on('resize', function () {

        // RUNNING FUNCTION
        micanisemSroll();
    });

    // NAV BTN TOGGLE
    const navToggle = $('#navToggle');
    const navIcon = $('.navbar__toggle__icon');
    const navbarItems = $('#navbarNav');
    const navbarItem = $('.navbar__item');

    navToggle.on('click', function() {
        navIcon.toggleClass('navbar__toggle__icon--active');
        navbarItems.toggleClass('navbar__nav--active');
    });

    navbarItem.on('click', function() {
        navToggle.trigger('click');
    });

});


