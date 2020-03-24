(function () {
    const site = {
        activeLinks() {
            const MENU = document.querySelector('#nav');
            const MOBILE_MENU = document.querySelector('#mobile-menu');
            const BURGER_BTN = document.querySelector('#burger-menu-btn');
            const LOGO = document.querySelector("#logo");
            MENU.addEventListener('click', (event) => {
                if (event.target.classList.contains('link')) {
                    MENU.querySelectorAll('#navItem').forEach((link) => {
                        link.classList.remove('active');
                    })
                    event.target.classList.add('active');
                    MOBILE_MENU.classList.remove('opened');
                    BURGER_BTN.classList.remove('rotate');
                    LOGO.classList.remove('lefter');
                    this.scrollToSection(event.target);
                }
            });
        },
        scrollToSection(target) {
            let anchor = target.dataset.anchor;
            document.querySelector(`#${anchor}`).scrollIntoView({ alignToTop: "start", behavior: "smooth" });
        },
        changeActiveLinkDuringScroll() {
            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll("#navItem");
            const sectionMargin = 89;
            let currentActive = 0;
            window.addEventListener('scroll', () => {
                const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;
                if (current !== currentActive) {
                    navLinks.forEach((link) => link.classList.remove('active'));
                    currentActive = current;
                    navLinks[current].classList.add("active");
                }
            });
        },
        mobileMenu() {
            const BURGER_BTN = document.querySelector('#burger-menu-btn');
            const MOBILE_MENU = document.querySelector('#mobile-menu');
            const LOGO = document.querySelector("#logo");
            BURGER_BTN.addEventListener('click', () => {
                if (BURGER_BTN.classList.contains('rotate')) {
                    BURGER_BTN.classList.remove('rotate');
                    LOGO.classList.remove('lefter');
                    MOBILE_MENU.classList.remove('opened');
                }
                else {
                    BURGER_BTN.classList.add('rotate');
                    LOGO.classList.add('lefter');
                    MOBILE_MENU.classList.add('opened');
                }
            });
        },
        phoneScreenOn() {
            let phones = document.querySelectorAll('.slide-phone');
            let screenOfLeftPhone = document.querySelector('#slide-phone-screen-1');
            let screenOfRightPhone = document.querySelector('#slide-phone-screen-2');
            phones.forEach((phone) => {
                phone.addEventListener('click', () => {
                    if (phone.classList.contains('slide-phone-1')) {
                        turnScreenOnOrOff(screenOfLeftPhone);
                    }
                    else if (phone.classList.contains('slide-phone-2')) {
                        turnScreenOnOrOff(screenOfRightPhone);
                    }
                })
            })
            function turnScreenOnOrOff(screen) {
                if (screen.classList.contains('screen-off')) {
                    screen.classList.remove('screen-off');
                }
                else {
                    screen.classList.add('screen-off');
                }
            }
        },
        slider() {
            let slides = document.querySelectorAll('#slide');
            let currentSlide = 0;
            let isEnabled = true;
            function changeCurrentSlide(n) {
                currentSlide = (n + slides.length) % slides.length;
            }
            function hideSlide(direction) {
                isEnabled = false;
                slides[currentSlide].classList.add(direction);
                slides[currentSlide].addEventListener('animationend', function () {
                    this.classList.remove('active', direction);
                });
            }
            function showSlide(direction) {
                slides[currentSlide].classList.add('next', direction);
                slides[currentSlide].addEventListener('animationend', function () {
                    this.classList.remove('next', direction);
                    this.classList.add('active');
                    isEnabled = true;
                });
            }
            function previousSlide(n) {
                hideSlide('to-right');
                changeCurrentSlide(n - 1);
                showSlide('from-left');
            }
            function nextSlide(n) {
                hideSlide('to-left');
                changeCurrentSlide(n + 1);
                showSlide('from-right');
            }
            document.querySelector('#arrow-left').addEventListener('click', () => {
                if (isEnabled) {
                    previousSlide(currentSlide);
                }
            });
            document.querySelector('#arrow-right').addEventListener('click', () => {
                if (isEnabled) {
                    nextSlide(currentSlide);
                }
            });
            let el = document.querySelector('#slider');
            function swipeDetect(el) {
                let surface = el;
                let startX = 0;
                let startY = 0;
                let distX = 0;
                let distY = 0;

                let startTime = 0;
                let elapsedTime = 0;

                let threshold = 150;
                let restraint = 100;
                let allowedTime = 300;

                // surface.addEventListener('mousedown', (e) => {
                //     startX = e.pageX;
                //     startY = e.pageY;
                //     startTime = new Date().getTime();
                //     e.preventDefault();
                // });
                // surface.addEventListener('mouseup', (e) => {
                //     distX = e.pageX - startX;
                //     distY = e.pageY - startY;
                //     elapsedTime = new Date().getTime() - startTime;
                //     if (elapsedTime <= allowedTime) {
                //         if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                //             if (distX > 0) {
                //                 if (isEnabled) {
                //                     previousSlide(currentSlide);
                //                 }
                //             }
                //             else {
                //                 if (isEnabled) {
                //                     nextSlide(currentSlide);
                //                 }
                //             }
                //         }
                //     }
                // });
                surface.addEventListener('touchstart', (e) => {
                    if (e.target.classList.contains('arrow')) {
                        if (e.target.classList.contains('arrow-prev')) {
                            if (isEnabled) {
                                previousSlide(currentSlide);
                            }
                        }
                        else {
                            if (isEnabled) {
                                nextSlide(currentSlide);
                            }
                        }
                    }
                    else if (e.target.classList.contains('slide-phone')) {
                        let screenOfLeftPhone = document.querySelector('#slide-phone-screen-1');
                        let screenOfRightPhone = document.querySelector('#slide-phone-screen-2');
                        if (e.target.classList.contains('slide-phone')) {
                            if (e.target.classList.contains('slide-phone-1')) {
                                turnScreenOnOrOff(screenOfLeftPhone);
                            }
                            else if (e.target.classList.contains('slide-phone-2')) {
                                turnScreenOnOrOff(screenOfRightPhone);
                            }
                        }
                        function turnScreenOnOrOff(screen) {
                            if (screen.classList.contains('screen-off')) {
                                screen.classList.remove('screen-off');
                            }
                            else {
                                screen.classList.add('screen-off');
                            }
                        }
                    }
                    let touchObj = e.changedTouches[0];
                    startX = touchObj.pageX;
                    startY = touchObj.pageY;
                    startTime = new Date().getTime();
                    e.preventDefault();
                });
                surface.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                });
                surface.addEventListener('touchend', (e) => {
                    let touchObj = e.changedTouches[0];
                    distX = touchObj.pageX - startX;
                    distY = touchObj.pageY - startY;
                    elapsedTime = new Date().getTime() - startTime;
                    if (elapsedTime <= allowedTime) {
                        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                            if (distX > 0) {
                                if (isEnabled) {
                                    previousSlide(currentSlide);
                                }
                            }
                            else {
                                if (isEnabled) {
                                    nextSlide(currentSlide);
                                }
                            }
                        }
                    }
                });
            }
            swipeDetect(el);
        },
        modalBlock() {
            const FORM = document.querySelector('#contact-form');
            const CLOSE_BTN = document.querySelector('#close-btn');
            const MODAL_BLOCK = document.querySelector('#form-message');
            FORM.addEventListener('submit', (event) => {
                event.preventDefault();
                let subject = document.querySelector('#contact-form').querySelector('#subject').value.toString();
                let comment = document.querySelector('#contact-form').querySelector('#comment').value.toString();
                if (subject && comment) {
                    document.querySelector('#topic').innerText = subject;
                    document.querySelector('#description').innerText = comment;
                }
                else if (subject) {
                    document.querySelector('#topic').innerText = subject;
                }
                else if (comment) {
                    document.querySelector('#description').innerText = comment;
                }
                MODAL_BLOCK.classList.remove('hidden');
            })
            CLOSE_BTN.addEventListener('click', () => {
                MODAL_BLOCK.classList.add('hidden');
                document.querySelector('#contact-form').reset();
                document.querySelector('#description').innerText = 'No description';
                document.querySelector('#topic').innerText = 'No subject';
            })
        },
        portfolioItemClickHandler() {
            const PORTFOLIO = document.querySelector('#portfolio');
            PORTFOLIO.addEventListener('click', (event) => {
                if (event.target.classList.contains('portfolio-image')) {
                    PORTFOLIO.querySelectorAll('#portfolio-work').forEach(function (work) {
                        work.classList.remove('active');
                    })
                    event.target.parentNode.classList.add('active');
                }
            });
        },
        filtersClickHandlers() {
            let filters = document.querySelector('#portfolio-filters');
            let portfolioWorks = [...document.querySelectorAll('#portfolio-work')];
            let portfolio = document.querySelector('#portfolio');
            filters.addEventListener('click', (event) => {
                if (event.target.classList.contains('filter-btn')) {
                    filters.querySelectorAll('#filter').forEach((filter) => {
                        filter.classList.remove('active');
                    });
                    event.target.classList.add('active');
                    let lastElem = portfolioWorks.pop();
                    portfolioWorks.unshift(lastElem);
                    portfolio.prepend(lastElem);
                }
            });
        },


        init() {
            this.activeLinks();
            this.mobileMenu();
            this.modalBlock();
            this.changeActiveLinkDuringScroll();
            this.slider();
            this.portfolioItemClickHandler();
            this.filtersClickHandlers();
            this.phoneScreenOn()
        },
    };
    window.addEventListener('DOMContentLoaded', () => {
        site.init();
    });

})();