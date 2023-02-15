// Set current year
const yearElement = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// Make mobile navigation work
const btnNavElement = document.querySelector('.btn-mobile-nav');
const headerElement = document.querySelector('.header');

btnNavElement.addEventListener('click', function () {
  headerElement.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href == '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Scroll to other links
    } else if (href.startsWith('#')) {
      const sectionElement = document.querySelector(href);
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (link.classList.contains('main-nav-link')) {
      headerElement.classList.toggle('nav-open');
    }
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroElement = document.querySelector('.section-hero');
const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (entry.isIntersecting) {
      document.body.classList.remove('sticky');
    } else {
      document.body.classList.add('sticky');
    }
  },
  {
    // In the view port, null means viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
observer.observe(sectionHeroElement);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
