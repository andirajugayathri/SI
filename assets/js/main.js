function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const answer = faqItem.querySelector('.home-faq__answer');
            const toggle = element.querySelector('.home-faq__toggle');
            
            // Close all other FAQ items
            const allItems = document.querySelectorAll('.home-faq__item');
            allItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.home-faq__answer').classList.remove('active');
                    item.querySelector('.home-faq__toggle').textContent = '+';
                }
            });
            
            // Toggle current item
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.classList.remove('active');
                toggle.textContent = '+';
            } else {
                faqItem.classList.add('active');
                answer.classList.add('active');
                toggle.textContent = '+';
            }
        }

        // Add smooth scrolling and enhanced interactions
        document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.home-faq__item');
            
            // Add staggered animation on load
            faqItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });



        /*    */ 

document.getElementById('home-schedule-consultation-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Simple form validation
            const inputs = this.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.home-schedule-submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your interest! We will contact you soon.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Please fill in all required fields.');
            }
        });

        // Add focus/blur effects
        const inputs = document.querySelectorAll('.home-schedule-input, .home-schedule-select, .home-schedule-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#BB9A65';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.borderColor = '#e0e0e0';
                }
            });
        });


        /* */


        const homeLifestyleTabs = document.querySelectorAll('.home-lifestyle-tab');
        const homeLifestyleContents = document.querySelectorAll('.home-lifestyle-content');

        homeLifestyleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                homeLifestyleTabs.forEach(t => t.classList.remove('active'));
                homeLifestyleContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const category = tab.getAttribute('data-category');
                const targetContent = document.getElementById(`home-lifestyle-${category}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });


        class WorkingProcessSlider {
            constructor() {
                this.currentStep = 1;
                this.totalSteps = 6;
                this.autoSlideInterval = null;
                this.init();
            }

            init() {
                this.bindEvents();
                this.startAutoSlide();
            }

            bindEvents() {
                const steps = document.querySelectorAll('.process-step');
                steps.forEach(step => {
                    step.addEventListener('click', (e) => {
                        const stepNumber = parseInt(e.target.getAttribute('data-step'));
                        this.goToStep(stepNumber);
                        this.resetAutoSlide();
                    });
                });
            }

            goToStep(stepNumber) {
                // Hide current slide
                const currentSlide = document.querySelector(`.process-slide[data-slide="${this.currentStep}"]`);
                const currentStepBtn = document.querySelector(`.process-step[data-step="${this.currentStep}"]`);
                
                if (currentSlide) currentSlide.classList.remove('active');
                if (currentStepBtn) currentStepBtn.classList.remove('active');

                // Show new slide
                const newSlide = document.querySelector(`.process-slide[data-slide="${stepNumber}"]`);
                const newStepBtn = document.querySelector(`.process-step[data-step="${stepNumber}"]`);
                
                if (newSlide) newSlide.classList.add('active');
                if (newStepBtn) newStepBtn.classList.add('active');

                this.currentStep = stepNumber;
            }

            nextStep() {
                let nextStep = this.currentStep + 1;
                if (nextStep > this.totalSteps) {
                    nextStep = 1;
                }
                this.goToStep(nextStep);
            }

            startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    this.nextStep();
                }, 5000);
            }

            resetAutoSlide() {
                clearInterval(this.autoSlideInterval);
                this.startAutoSlide();
            }
        }

        // Initialize the slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            new WorkingProcessSlider();
        });


        /*  happy client */ 

        let happyClientCurrentIndex = 0;
        const happyClientCards = document.getElementById('happy-client-cards');
        const happyClientPrevBtn = document.getElementById('happy-client-prev');
        const happyClientNextBtn = document.getElementById('happy-client-next');
        const happyClientTotalCards = document.querySelectorAll('.happy-client-card').length;
        const happyClientCardsVisible = 1;

        function happyClientUpdateSlider() {
            const happyClientCardWidth = 320; // card width + margin
            const happyClientTranslateX = -happyClientCurrentIndex * happyClientCardWidth;
            happyClientCards.style.transform = `translateX(${happyClientTranslateX}px)`;
        }

        happyClientNextBtn.addEventListener('click', () => {
            happyClientCurrentIndex = (happyClientCurrentIndex + 1) % (happyClientTotalCards - happyClientCardsVisible + 1);
            if (happyClientCurrentIndex >= happyClientTotalCards - happyClientCardsVisible + 1) {
                happyClientCurrentIndex = 0;
            }
            happyClientUpdateSlider();
        });

        happyClientPrevBtn.addEventListener('click', () => {
            happyClientCurrentIndex = happyClientCurrentIndex <= 0 ? happyClientTotalCards - happyClientCardsVisible : happyClientCurrentIndex - 1;
            happyClientUpdateSlider();
        });

        // Auto-slide functionality
        setInterval(() => {
            happyClientCurrentIndex = (happyClientCurrentIndex + 1) % (happyClientTotalCards - happyClientCardsVisible + 1);
            if (happyClientCurrentIndex >= happyClientTotalCards - happyClientCardsVisible + 1) {
                happyClientCurrentIndex = 0;
            }
            happyClientUpdateSlider();
        }, 4000);

        // Initialize
        happyClientUpdateSlider();

        /* happy cliend end */


       /* menu active */

       function setActiveNavbarLink() {
            // Get current page filename (e.g., 'wardbose.html')
            const path = window.location.pathname;
            const page = path.substring(path.lastIndexOf('/') + 1);

            // Wait for navbar to be loaded
            const navbar = document.getElementById('navbar');
            if (!navbar) return;

            // Find all nav links and dropdown items
            const navLinks = navbar.querySelectorAll('.nav-link');
            const dropdownItems = navbar.querySelectorAll('.dropdown-item');

            let foundActive = false;

            // Check top-level nav links
            navLinks.forEach(link => {
                // Ignore dropdown toggles
                if (link.classList.contains('dropdown-toggle')) return;
                const href = link.getAttribute('href');
                if (href && href !== '#' && page === href) {
                    link.classList.add('active');
                    foundActive = true;
                } else {
                    link.classList.remove('active');
                }
            });

            // Check dropdown items
            dropdownItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href && href !== '#' && page === href) {
                    item.classList.add('active');
                    // Also highlight parent dropdown toggle
                    const parentDropdown = item.closest('.dropdown');
                    if (parentDropdown) {
                        const toggle = parentDropdown.querySelector('.nav-link.dropdown-toggle');
                        if (toggle) toggle.classList.add('active');
                    }
                    foundActive = true;
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // After navbar is loaded, set active link
        const navbarInterval = setInterval(() => {
            const navbar = document.getElementById('navbar');
            if (navbar && navbar.querySelector('.nav-link')) {
                setActiveNavbarLink();
                clearInterval(navbarInterval);
            }
        }, 50);

        /* text change */

       
