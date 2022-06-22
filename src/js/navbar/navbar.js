// Navbar Collapse Button
const navCollapseContainer = document.querySelector('.nav__collapse')
const navCollapseBtn = document.querySelector('.nav__collapse-btn')
const navbar = document.querySelector('.navbar')

navCollapseContainer.addEventListener('click', () => {
    navCollapseBtn.classList.toggle('open')

    // Adding Delay When closing navbar menu
    if (navbar.classList.contains('navbar-open')) {
        navbar.classList.remove('navbar-open')
        navCollapseContainer.classList.remove('nav-btn-hide')
    }
    else {
        navbar.classList.add('navbar-open')
        navCollapseContainer.classList.add('nav-btn-hide')
    }


})