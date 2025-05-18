document.addEventListener('DOMContentLoaded', function() {
  
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-light', 'bg-light');
      navbar.classList.add('navbar-dark', 'bg-dark');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.remove('navbar-dark', 'bg-dark');
      navbar.classList.add('navbar-light', 'bg-light');
    }
  }
  
  handleNavbarScroll();
  
  window.addEventListener('scroll', handleNavbarScroll);
  
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
      interval: 6000,
      pause: 'hover'
    });
    
    heroCarousel.addEventListener('slide.bs.carousel', function(e) {
      const currentSlide = e.from;
      const currentCaption = document.querySelector(`.carousel-item:nth-child(${currentSlide + 1}) .carousel-caption`);
      const currentHeading = currentCaption.querySelector('h1');
      const currentText = currentCaption.querySelector('p');
      const currentButton = currentCaption.querySelector('a.btn');
      
      currentHeading.classList.remove('animate__fadeInDown');
      currentText.classList.remove('animate__fadeInUp');
      currentButton.classList.remove('animate__fadeInUp');
      
      setTimeout(() => {
        const nextSlide = e.to;
        const nextCaption = document.querySelector(`.carousel-item:nth-child(${nextSlide + 1}) .carousel-caption`);
        const nextHeading = nextCaption.querySelector('h1');
        const nextText = nextCaption.querySelector('p');
        const nextButton = nextCaption.querySelector('a.btn');
        
        nextHeading.classList.add('animate__fadeInDown');
        nextText.classList.add('animate__fadeInUp');
        nextButton.classList.add('animate__fadeInUp');
      }, 50);
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  const animatedElements = document.querySelectorAll('.service-card, .team-member');
  
  function checkIfInView() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  }
  
  checkIfInView();
  
  window.addEventListener('scroll', checkIfInView);
  
  const contactForm = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formFields = contactForm.querySelectorAll('input, textarea, select');
      
      formFields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
        
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            isValid = false;
            field.classList.add('is-invalid');
          }
        }
      });
      
      if (isValid) {
        contactForm.classList.add('d-none');
        
        if (thankYouMessage) {
          thankYouMessage.classList.remove('d-none');
        }
        
        setTimeout(() => {
          contactForm.reset();
          
          formFields.forEach(field => {
            field.classList.remove('is-invalid');
          });
        }, 100);
      }
    });
    
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        this.classList.remove('is-invalid');
      });
    });
  }
  
  const reservationBtn = document.getElementById('reservationBtn');
  if (reservationBtn) {
    const reservationModal = new bootstrap.Modal(document.getElementById('reservationModal'));
    
    reservationBtn.addEventListener('click', function() {
      reservationModal.show();
    });
  }
  
  const galleryImages = document.querySelectorAll('.gallery-image');
  
  if (galleryImages.length > 0) {
    galleryImages.forEach(image => {
      image.addEventListener('click', function() {
        const imgSrc = this.getAttribute('src');
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        
        document.body.appendChild(lightbox);
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        lightbox.appendChild(img);
        
        lightbox.addEventListener('click', function() {
          this.remove();
        });
      });
    });
  }
  
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
  
  if (document.querySelector('.service-card')) {
    console.log('Services page functionality initialized');
    
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccessMessage = document.querySelector('.booking-success-message');
    const roomTypeSelect = document.getElementById('roomType');
    
    if (bookNowBtns.length > 0) {
      bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const roomType = this.getAttribute('data-room-type');
          
          if (roomType === 'Deluxe Room') {
            roomTypeSelect.value = 'deluxe';
          } else if (roomType === 'Executive Suite') {
            roomTypeSelect.value = 'executive';
          } else if (roomType === 'Presidential Suite') {
            roomTypeSelect.value = 'presidential';
          }
        });
      });
    }
    
    if (confirmBookingBtn) {
      confirmBookingBtn.addEventListener('click', function() {
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value) {
            isValid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        
        if (isValid) {
          bookingForm.classList.add('d-none');
          bookingSuccessMessage.classList.remove('d-none');
          confirmBookingBtn.classList.add('d-none');
          
          setTimeout(() => {
            bookingForm.reset();
          }, 100);
        }
      });
    }
    
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
      bookingModal.addEventListener('hidden.bs.modal', function() {
        bookingForm.classList.remove('d-none');
        bookingSuccessMessage.classList.add('d-none');
        confirmBookingBtn.classList.remove('d-none');
        bookingForm.querySelectorAll('.is-invalid').forEach(field => {
          field.classList.remove('is-invalid');
        });
      });
    }
    
    const viewMenuBtns = document.querySelectorAll('.view-menu-btn');
    const restaurantMenus = document.querySelectorAll('.restaurant-menu');
    const menuModalTitle = document.getElementById('menuModalLabel');
    
    if (viewMenuBtns.length > 0) {
      viewMenuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const restaurant = this.getAttribute('data-restaurant');
          
          restaurantMenus.forEach(menu => {
            menu.classList.add('d-none');
          });
          
          if (restaurant === 'highlands') {
            document.getElementById('highlands-menu').classList.remove('d-none');
            menuModalTitle.textContent = 'The Highlands Restaurant Menu';
          } else if (restaurant === 'aether') {
            document.getElementById('aether-menu').classList.remove('d-none');
            menuModalTitle.textContent = 'Aether Lounge Menu';
          } else if (restaurant === 'poolside') {
            document.getElementById('poolside-menu').classList.remove('d-none');
            menuModalTitle.textContent = 'Poolside Grill Menu';
          }
        });
      });
    }
    
    const bookTableBtn = document.getElementById('bookTableBtn');
    if (bookTableBtn) {
      bookTableBtn.addEventListener('click', function() {
        alert('Thank you for your interest! Our staff will contact you shortly to confirm your table reservation.');
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      contactForm.style.display = 'none';
      
      thankYouMessage.classList.remove('d-none');
      
      if (!document.getElementById('backToFormBtn')) {
        const backButton = document.createElement('button');
        backButton.id = 'backToFormBtn';
        backButton.className = 'btn btn-outline-primary mt-3';
        backButton.textContent = 'Kembali ke Formulir';
        backButton.addEventListener('click', function() {
          contactForm.style.display = 'block';
          thankYouMessage.classList.add('d-none');
          contactForm.scrollIntoView({ behavior: 'smooth' });
        });
        thankYouMessage.appendChild(backButton);
      }
      
      thankYouMessage.scrollIntoView({ behavior: 'smooth' });
      
      contactForm.reset();
      
      setTimeout(function() {
        contactForm.style.display = 'block';
        thankYouMessage.classList.add('d-none');
      }, 5000);
    });
  }
});