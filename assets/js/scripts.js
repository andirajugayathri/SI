// assets/js/main.js

// Modal Functions
function openModal() {
  const modal = document.getElementById('modalOverlay');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    const cards = document.querySelectorAll('.video-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, index * 150);
    });
  }, 200);
}

function closeModal() {
  const modal = document.getElementById('modalOverlay');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  const additionalVideos = document.getElementById('additionalVideos');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  
  additionalVideos.style.display = 'none';
  additionalVideos.classList.remove('show');
  
  viewMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> View More Videos';
  viewMoreBtn.classList.remove('youtube-link');
  viewMoreBtn.onclick = showMoreVideos;
  
  const cards = document.querySelectorAll('.video-card');
  cards.forEach(card => {
    card.classList.remove('animate');
  });
}

function closeModalOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function showMoreVideos() {
  const additionalVideos = document.getElementById('additionalVideos');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  
  additionalVideos.style.display = 'grid';
  setTimeout(() => {
    additionalVideos.classList.add('show');
  }, 50);
  
  const additionalCards = additionalVideos.querySelectorAll('.video-card');
  additionalCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 150);
  });
  
  setTimeout(() => {
    viewMoreBtn.innerHTML = '<i class="fab fa-youtube"></i> Visit YouTube Channel';
    viewMoreBtn.classList.add('youtube-link');
    viewMoreBtn.onclick = function() {
      window.open('https://www.youtube.com/@SpaceInteriorGuide/videos', '_blank');
    };
  }, 1000);
}

// Interior Popup Functions
function openInteriorPopup() {
  document.getElementById('interiorPopupOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInteriorPopup() {
  document.getElementById('interiorPopupOverlay').classList.remove('active');
  document.body.style.overflow = 'auto';
  
  setTimeout(() => {
    document.getElementById('interiorConsultationForm').reset();
    document.getElementById('interiorFormContainer').style.display = 'block';
    document.getElementById('interiorSuccessMessage').classList.remove('show');
  }, 300);
}

function closeInteriorPopupOnOverlay(event) {
  if (event.target === document.getElementById('interiorPopupOverlay')) {
    closeInteriorPopup();
  }
}

function submitInteriorForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  console.log('Interior popup form submitted with data:', data);
  
  document.getElementById('interiorFormContainer').style.display = 'none';
  document.getElementById('interiorSuccessMessage').classList.add('show');
}

// Modular Popup Functions
let modularPopupCurrentStep = 1;
let modularPopupSelectedDesignType = '';
let modularPopupSelectedPropertyType = '';
let modularPopupGeneratedPDF = null;

const modularPopupPricing = {
  semi: {
    '2bhk': { min: 4, max: 4.5 },
    '3bhk': { min: 4.5, max: 5 },
    '4bhk': { min: 5.5, max: 6.5 },
    'kitchen': { min: 1, max: 1.5 }
  },
  full: {
    '2bhk': { min: 6.5, max: 7 },
    '3bhk': { min: 7.5, max: 8 },
    '4bhk': { min: 9, max: 10 },
    'kitchen': { min: 1.5, max: 2 }
  }
};

function openModularPopup() {
  document.getElementById('modularPopupOverlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModularPopup() {
  document.getElementById('modularPopupOverlay').style.display = 'none';
  document.body.style.overflow = 'auto';
  resetModularPopupForm();
}

function resetModularPopupForm() {
  modularPopupCurrentStep = 1;
  modularPopupSelectedDesignType = '';
  modularPopupSelectedPropertyType = '';
  
  document.querySelectorAll('.modular-popup-step').forEach(step => {
    step.classList.remove('active', 'completed');
  });
  document.getElementById('modular-popup-step-1-indicator').classList.add('active');
  
  document.querySelectorAll('.modular-popup-step-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById('modular-popup-step-1').classList.add('active');
  
  document.getElementById('modularPopupEstimateForm').reset();
  
  document.getElementById('modular-popup-step2-next').disabled = true;
  document.getElementById('modular-popup-submit-btn').disabled = true;
  document.getElementById('modular-popup-price-display').style.display = 'none';
  document.getElementById('modular-popup-summary-card').style.display = 'none';
  document.getElementById('modular-popup-loading').style.display = 'none';
  document.getElementById('modular-popup-success').style.display = 'none';
  
  document.querySelectorAll('.modular-popup-option-card').forEach(card => {
    card.classList.remove('selected');
  });
}

function modularPopupNextStep(step) {
  if (step === 2) {
    if (!modularPopupValidateStep1()) return;
  }
  
  document.getElementById(`modular-popup-step-${modularPopupCurrentStep}`).classList.remove('active');
  document.getElementById(`modular-popup-step-${modularPopupCurrentStep}-indicator`).classList.remove('active');
  document.getElementById(`modular-popup-step-${modularPopupCurrentStep}-indicator`).classList.add('completed');
  
  modularPopupCurrentStep = step;
  document.getElementById(`modular-popup-step-${step}`).classList.add('active');
  document.getElementById(`modular-popup-step-${step}-indicator`).classList.add('active');
}

function modularPopupPrevStep(step) {
  document.getElementById(`modular-popup-step-${modularPopupCurrentStep}`).classList.remove('active');
  document.getElementById(`modular-popup-step-${modularPopupCurrentStep}-indicator`).classList.remove('active');
  
  modularPopupCurrentStep = step;
  document.getElementById(`modular-popup-step-${step}`).classList.add('active');
  document.getElementById(`modular-popup-step-${step}-indicator`).classList.add('active');
  document.getElementById(`modular-popup-step-${step}-indicator`).classList.remove('completed');
}

function modularPopupValidateStep1() {
  const name = document.getElementById('modular-popup-name').value.trim();
  const mobile = document.getElementById('modular-popup-mobile').value.trim();
  const location = document.getElementById('modular-popup-location').value.trim();
  
  if (!name || !mobile || !location) {
    alert('Please fill in all required fields.');
    return false;
  }
  
  if (mobile.length < 10) {
    alert('Please enter a valid mobile number.');
    return false;
  }
  
  return true;
}

function modularPopupSelectDesignType(type) {
  modularPopupSelectedDesignType = type;
  
  document.querySelectorAll('#modular-popup-step-2 .modular-popup-option-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  event.target.closest('.modular-popup-option-card').classList.add('selected');
  
  document.getElementById('modular-popup-step2-next').disabled = false;
  modularPopupPopulatePropertyOptions(type);
}

function modularPopupPopulatePropertyOptions(designType) {
  const container = document.getElementById('modular-popup-property-options');
  const options = [
    { id: '2bhk', label: '2 BHK', icon: 'fas fa-bed' },
    { id: '3bhk', label: '3 BHK', icon: 'fas fa-bed' },
    { id: '4bhk', label: '4 BHK', icon: 'fas fa-bed' },
    { id: 'kitchen', label: 'Only Modular Kitchen', icon: 'fas fa-utensils' }
  ];
  
  container.innerHTML = options.map(option => `
    <div class="col-md-6 mb-3">
      <div class="modular-popup-option-card" onclick="modularPopupSelectPropertyType('${option.id}')">
        <i class="${option.icon} fa-2x mb-3" style="color: #4CAF50;"></i>
        <h6>${option.label}</h6>
        <p class="text-muted">Select to get estimate</p>
      </div>
    </div>
  `).join('');
}

function modularPopupSelectPropertyType(type) {
  modularPopupSelectedPropertyType = type;
  
  document.querySelectorAll('#modular-popup-property-options .modular-popup-option-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  event.target.closest('.modular-popup-option-card').classList.add('selected');
  modularPopupShowPriceAndSummary();
  document.getElementById('modular-popup-submit-btn').disabled = false;
}

function modularPopupShowPriceAndSummary() {
  const name = document.getElementById('modular-popup-name').value;
  const mobile = document.getElementById('modular-popup-mobile').value;
  const location = document.getElementById('modular-popup-location').value;
  const designTypeLabel = modularPopupSelectedDesignType === 'semi' ? 'Semi Modular' : 'Full Modular';
  const propertyLabels = {
    '2bhk': '2 BHK',
    '3bhk': '3 BHK',
    '4bhk': '4 BHK',
    'kitchen': 'Only Modular Kitchen'
  };
  
  const price = modularPopupPricing[modularPopupSelectedDesignType][modularPopupSelectedPropertyType];
  document.getElementById('modular-popup-price-range').textContent = `₹ ${price.min} lakh - ₹ ${price.max} lakh`;
  document.getElementById('modular-popup-price-display').style.display = 'block';
  
  document.getElementById('modular-popup-summary-details').innerHTML = `
    <div class="row">
      <div class="col-6"><strong>Name:</strong></div>
      <div class="col-6">${name}</div>
      <div class="col-6"><strong>Mobile:</strong></div>
      <div class="col-6">${mobile}</div>
      <div class="col-6"><strong>Location:</strong></div>
      <div class="col-6">${location}</div>
      <div class="col-6"><strong>Design Type:</strong></div>
      <div class="col-6">${designTypeLabel}</div>
      <div class="col-6"><strong>Property:</strong></div>
      <div class="col-6">${propertyLabels[modularPopupSelectedPropertyType]}</div>
      <div class="col-6"><strong>Estimated Price:</strong></div>
      <div class="col-6">₹ ${price.min} lakh - ₹ ${price.max} lakh</div>
    </div>
  `;
  
  document.getElementById('modular-popup-summary-card').style.display = 'block';
}

function modularPopupGeneratePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const name = document.getElementById('modular-popup-name').value;
  const mobile = document.getElementById('modular-popup-mobile').value;
  const location = document.getElementById('modular-popup-location').value;
  const designTypeLabel = modularPopupSelectedDesignType === 'semi' ? 'Semi-Modular' : 'Full-Modular';
  const propertyLabels = {
    '2bhk': '2 BHK',
    '3bhk': '3 BHK',
    '4bhk': '4 BHK',
    'kitchen': 'Only Modular Kitchen'
  };
  const price = modularPopupPricing[modularPopupSelectedDesignType][modularPopupSelectedPropertyType];
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('To, ' + name, 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(201, 29, 37);
  doc.text('SPACE DESIGNS HOME INTERIORS', 105, 20, { align: 'right' });
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Modular Type and Chosen Option:', 20, 40);
  
  const modularTableData = [
    ['S.no', 'Modular Type', 'Choosen'],
    ['1', designTypeLabel, propertyLabels[modularPopupSelectedPropertyType]]
  ];
  
  doc.autoTable({
    startY: 50,
    head: [modularTableData[0]],
    body: modularTableData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [201, 29, 37],
      textColor: 255,
      fontSize: 12,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 11
    },
    tableWidth: 170,
    margin: { left: 20 }
  });
  
  const tableEndY = doc.lastAutoTable.finalY;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('As per the selected options the basic design with basic material & finishing cost starts from.', 20, tableEndY + 20);
  
  doc.setFontSize(20);
  doc.setTextColor(201, 29, 37);
  doc.setFont(undefined, 'bold');
  doc.text(`Rs.${price.min} lakh to ${price.max} lakhs`, 105, tableEndY + 35, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'normal');
  doc.text('General Points to Note:', 20, tableEndY + 55);
  
  const points = [
    "Here we're providing only the basic information",
    "for more details Book an Appointment - 8500844441",
    "For General Showroom Visit there is no need to book any kind of appointment.",
    "Here the above quotation is only for basic Ideology with basic material & finishing and the actual cost of your space will vary depending on your region, the material and finishing you choose, and other factors."
  ];
  
  let yPos = tableEndY + 70;
  points.forEach(point => {
    doc.setFontSize(10);
    doc.text('• ' + point, 20, yPos);
    yPos += 8;
  });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Our branches are only available at:', 20, yPos + 10);
  
  yPos += 25;
  doc.setFontSize(11);
  doc.setTextColor(201, 29, 37);
  doc.text('Vijayawada Address:', 20, yPos);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Near Novotel Hotel, Bharathi Nagar Main Road, Road No 11, Left side first Building, Vijayawada, Andhra Pradesh 520008.', 20, yPos + 8);
  
  yPos += 20;
  doc.setFontSize(11);
  doc.setTextColor(201, 29, 37);
  doc.text('Hyderabad Address:', 20, yPos);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('Janapriya Housing Arch Besides, Third floor front side SLM Arundhati Heights building, above KFC, Miyapur, Telangana 500049.', 20, yPos + 8);
  
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, pageHeight - 30);
  doc.text('SPACE DESIGNS HOME INTERIORS', 105, pageHeight - 30, { align: 'center' });
  
  doc.setFontSize(8);
  doc.text('Scan for more info', 105, pageHeight - 15, { align: 'center' });
  
  doc.rect(170, pageHeight - 45, 30, 30);
  doc.setFontSize(6);
  doc.text('QR CODE', 185, pageHeight - 35, { align: 'center' });
  
  return doc;
}

function modularPopupDownloadPDF() {
  if (modularPopupGeneratedPDF) {
    modularPopupGeneratedPDF.save(`SpaceDesigns_Estimate_${document.getElementById('modular-popup-name').value.replace(/\s+/g, '_')}.pdf`);
  }
}

// FAQ Functions
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const answer = faqItem.querySelector('.home-faq__answer');
  const toggleIcon = button.querySelector('.home-faq__toggle');

  if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    toggleIcon.textContent = '+';
  } else {
    document.querySelectorAll('.home-faq__answer').forEach(el => {
      el.style.maxHeight = null;
    });
    document.querySelectorAll('.home-faq__toggle').forEach(el => {
      el.textContent = '+';
    });

    answer.style.maxHeight = answer.scrollHeight + "px";
    toggleIcon.textContent = '−';
  }
}

// Navbar Functions
function setActiveNavbarLink() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);

  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const navLinks = navbar.querySelectorAll('.nav-link');
  const dropdownItems = navbar.querySelectorAll('.dropdown-item');

  let foundActive = false;

  navLinks.forEach(link => {
    if (link.classList.contains('dropdown-toggle')) return;
    const href = link.getAttribute('href');
    if (href && href !== '#' && page === href) {
      link.classList.add('active');
      foundActive = true;
    } else {
      link.classList.remove('active');
    }
  });

  dropdownItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href !== '#' && page === href) {
      item.classList.add('active');
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

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init();
  
  // Portfolio Filter
  const buttons = document.querySelectorAll('.portfolio-filter-btn');
  const sections = document.querySelectorAll('.portfolio-filter');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      sections.forEach(section => section.classList.remove('active'));
      const targetSection = document.getElementById(filter);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Lifestyle Tabs
  const tabs = document.querySelectorAll(".home-lifestyle-tab");
  const contents = document.querySelectorAll(".home-lifestyle-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-category");
      contents.forEach(content => content.classList.remove("active"));
      const target = document.getElementById(category);
      if (target) {
        target.classList.add("active");
      }
    });
  });

  // Working Process
  const steps = document.querySelectorAll('.process-step');
  const slides = document.querySelectorAll('.process-slide');
  let currentStep = 0;
  let interval;

  function showStep(index) {
    steps.forEach(step => step.classList.remove('active'));
    steps[index].classList.add('active');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      showStep(currentStep);
    }, 5000);
  }

  steps.forEach((button, index) => {
    button.addEventListener('click', () => {
      clearInterval(interval);
      currentStep = index;
      showStep(index);
    });
  });

  startAutoSlide();

  // Happy Client Slider
  let happyClientCurrentIndex = 0;
  const happyClientCards = document.getElementById('happy-client-cards');
  const happyClientPrevBtn = document.getElementById('happy-client-prev');
  const happyClientNextBtn = document.getElementById('happy-client-next');
  const happyClientTotalCards = document.querySelectorAll('.happy-client-card').length;
  const happyClientCardsVisible = 1;

  function happyClientUpdateSlider() {
    const happyClientCardWidth = 320;
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

  setInterval(() => {
    happyClientCurrentIndex = (happyClientCurrentIndex + 1) % (happyClientTotalCards - happyClientCardsVisible + 1);
    if (happyClientCurrentIndex >= happyClientTotalCards - happyClientCardsVisible + 1) {
      happyClientCurrentIndex = 0;
    }
    happyClientUpdateSlider();
  }, 4000);

  // Changebox Animation
  const inner = document.querySelector(".changebox .inner");
  if (inner) {
    const items = document.querySelectorAll(".changebox .inner span");
    let index = 0;

    setInterval(() => {
      index = (index + 1) % items.length;
      inner.style.transform = `translateY(-${index * 1}em)`;
    }, 3000);
  }

  // Key Listeners
  document.addEventListener('keydown', function(event) {
    // Modal Escape key
    if (event.key === 'Escape') {
      if (document.getElementById('modalOverlay').classList.contains('active')) {
        closeModal();
      }
      if (document.getElementById('interiorPopupOverlay').classList.contains('active')) {
        closeInteriorPopup();
      }
      if (document.getElementById('modularPopupOverlay').style.display === 'flex') {
        closeModularPopup();
      }
    }
  });

  // Navbar
  fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
      setActiveNavbarLink();
    });

  fetch('footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);

  // Scroll prevention for modals
  document.getElementById('modalOverlay')?.addEventListener('wheel', e => e.stopPropagation());
  document.getElementById('interiorPopupOverlay')?.addEventListener('wheel', e => e.preventDefault(), { passive: false });
  
  // Modular form submission
  document.getElementById('modularPopupEstimateForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('modular-popup-step-3').style.display = 'none';
    document.getElementById('modular-popup-loading').style.display = 'block';
    
    setTimeout(() => {
      modularPopupGeneratedPDF = modularPopupGeneratePDF();
      document.getElementById('modular-popup-loading').style.display = 'none';
      document.getElementById('modular-popup-success').style.display = 'block';
    }, 2000);
  });

  // Expose global functions
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.closeModalOnOverlay = closeModalOnOverlay;
  window.showMoreVideos = showMoreVideos;
  window.openInteriorPopup = openInteriorPopup;
  window.closeInteriorPopup = closeInteriorPopup;
  window.closeInteriorPopupOnOverlay = closeInteriorPopupOnOverlay;
  window.submitInteriorForm = submitInteriorForm;
  window.openModularPopup = openModularPopup;
  window.closeModularPopup = closeModularPopup;
  window.modularPopupNextStep = modularPopupNextStep;
  window.modularPopupPrevStep = modularPopupPrevStep;
  window.modularPopupSelectDesignType = modularPopupSelectDesignType;
  window.modularPopupSelectPropertyType = modularPopupSelectPropertyType;
  window.modularPopupDownloadPDF = modularPopupDownloadPDF;
  window.toggleFAQ = toggleFAQ;
});