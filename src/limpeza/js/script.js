document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Start slightly transparent
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to elements
    const fadeElements = document.querySelectorAll('.card-diferencial, .video-wrapper, .sobre-text, .sobre-image, .address-card');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    // Gallery Interactivity
    const mainImage = document.getElementById('main-gallery-image');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');

    if (mainImage && galleryThumbs.length > 0) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update main image source and alt
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
                
                // Update active state
                galleryThumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // Lead Form Submission
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = leadForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerText;
            
            // Loading state
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            data.source = 'Landing Page Limpeza';
            data.timestamp = new Date().toISOString();

            // REPLACE WITH YOUR MAKE WEBHOOK URL
            const WEBHOOK_URL = 'YOUR_MAKE_WEBHOOK_URL_HERE'; 

            try {
                if(WEBHOOK_URL === 'YOUR_MAKE_WEBHOOK_URL_HERE') {
                    console.warn('Webhook URL not configured. Simulating success.');
                    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
                } else {
                    const response = await fetch(WEBHOOK_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                }

                // Success
                alert('Obrigado! Recebemos seus dados e entraremos em contato em breve.');
                leadForm.reset();

            } catch (error) {
                console.error('Error:', error);
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou nos chame no WhatsApp.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
