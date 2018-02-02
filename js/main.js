var navBarActive = false;

var nav         = document.querySelector("nav");
var header      = document.querySelector("header");
var sections    = document.querySelectorAll("section");
var footer      = document.querySelector("footer");
var links       = document.querySelectorAll(".nav-list li a")

var sectionArray = [];
var sectionObj   = {};

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

