var navBarActive = false;
var mobileNavActive = false;

var nav         = document.querySelector("nav");
var navList     = document.querySelector(".nav-list");
var header      = document.querySelector("header");
var sections    = document.querySelectorAll("section");
var footer      = document.querySelector("footer");
var links       = document.querySelectorAll(".nav-list li a")
var navBtn      = document.querySelector(".mobile-nav-bars");

var sectionArray = [];
var sectionObj   = {};

var controller = new ScrollMagic.Controller();

//Setup Event Listeners & Set up sections array

(function() {

    sectionArray.push(header);
    for (var i = 0; i < sections.length; i++) {
        sectionArray.push(sections[i]);
    }
    sectionArray.push(footer);

    Array.prototype.forEach.call(sectionArray, function(e) {
        sectionObj[e.id] = e.offsetTop;
    });
    delete sectionObj[""];

    navBtn.addEventListener("click", function() {
        if (!mobileNavActive) {
            navList.classList.add("nav-list-open");
            document.querySelector("#menu-open").classList.add("hidden");
            document.querySelector("#menu-close").classList.remove("hidden");
            document.querySelector("body").style.overflow = "hidden";
            mobileNavActive = true;

            if (!navBarActive) {
                window.scroll(0, sections[0].offsetTop);
            }
        } else {
            closeMobileNav();
        }
    });

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {
            if (mobileNavActive) {
                closeMobileNav();
            }
        })
    }
    

    document.addEventListener("scroll", function() {
        var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        if (nav.offsetTop > header.offsetHeight && !navBarActive) {
            navBarActive = true;
            nav.classList.add("nav-border-red");
        } else if (nav.offsetTop == header.offsetHeight && navBarActive)  {
            navBarActive = false;
            nav.classList.remove("nav-border-red");
        }

        for (i in sectionObj) {
            if (sectionObj[i] <= scrollPosition) {
                if (document.querySelector('.active')) {
                    document.querySelector('.active').classList.remove('active');
                }
                
                if (document.querySelector('a[href*=' + i + ']')) {
                    document.querySelector('a[href*=' + i + ']').classList.add("active");
                }
                
            }
        }
        
    });
    
})();

function closeMobileNav() {
    navList.classList.remove("nav-list-open");
    document.querySelector("#menu-open").classList.remove("hidden");
    document.querySelector("#menu-close").classList.add("hidden");
    document.querySelector("body").style.overflow = "visible";
    mobileNavActive = false;
}

//Top banner parallax
var bannerParallax = new ScrollMagic.Scene({
    triggerElement: 'header',
    triggerHook: 1,
    duration: '200%'
})
.setTween(TweenMax.from('.header-background', 1, {y: '-50%', ease: Power0.easeNone}))
.addTo(controller);

//Learn section parallax
var learnParallaxTl = new TimelineMax();
learnParallaxTl
    .from('.family-img', 1, {y: '30%', ease: Power0.easeNone}, 0)
    .from('#learn .baseline-background', 1, {'height': '27rem', ease: Power0.easeNone}, 0)

var learnParallax = new ScrollMagic.Scene({
    triggerElement: '.family-img',
    triggerHook: 1,
    duration: '70%'
})
.setTween(learnParallaxTl)
.addTo(controller);

//Teaching section parallax
var teachingParallax = new ScrollMagic.Scene({
    triggerElement: '.book-img',
    triggerHook: 1,
    duration: '70%'
})
.setTween(TweenMax.from('.book-img', 1, {y: '20%', ease: Power0.easeNone}, 0))
.addTo(controller)


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

