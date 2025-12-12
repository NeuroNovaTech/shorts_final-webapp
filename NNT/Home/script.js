// Daily Motivational Quotes
const quotes = [
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay"
    },
    {
        text: "Technology is nothing. What's important is that you have faith in people.",
        author: "Steve Jobs"
    },
    {
        text: "It's not that we use technology, we live technology.",
        author: "Godfrey Reggio"
    }
];

// Development News
const devNews = [
    {
        title: "React 19 Beta Released",
        content: "New features include concurrent rendering and improved server components."
    },
    {
        title: "Flutter 3.16 Update",
        content: "Enhanced performance and new Material 3 components added."
    },
    {
        title: "WebAssembly 2.0",
        content: "Faster execution and better language support coming soon."
    },
    {
        title: "Next.js 14 Performance Boost",
        content: "40% faster builds and improved developer experience."
    },
    {
        title: "Vue 3.4 Released",
        content: "Better TypeScript integration and performance improvements."
    }
];

// AI News
const aiNews = [
    {
        title: "GPT-5 Announcement",
        content: "OpenAI teases next-generation model with multimodal capabilities."
    },
    {
        title: "AI in Healthcare",
        content: "New algorithms show 95% accuracy in early disease detection."
    },
    {
        title: "Quantum AI Breakthrough",
        content: "Researchers achieve quantum advantage in machine learning tasks."
    },
    {
        title: "Ethical AI Guidelines",
        content: "New framework released for responsible AI development."
    },
    {
        title: "AI Art Generation",
        content: "Latest models create photorealistic images from text prompts."
    }
];

// Set daily quote
function setDailyQuote() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const quoteIndex = dayOfYear % quotes.length;
    document.getElementById('dailyQuote').textContent = `"${quotes[quoteIndex].text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${quotes[quoteIndex].author}`;
}

// Set daily news
function setDailyNews() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Development News
    const devNewsContainer = document.getElementById('devNews');
    const devStartIndex = dayOfYear % (devNews.length - 2);
    devNewsContainer.innerHTML = '';
    
    for (let i = devStartIndex; i < devStartIndex + 3; i++) {
        const news = devNews[i % devNews.length];
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${news.title}</h4>
            <p>${news.content}</p>
        `;
        devNewsContainer.appendChild(newsItem);
    }
    
    // AI News
    const aiNewsContainer = document.getElementById('aiNews');
    const aiStartIndex = (dayOfYear + 2) % (aiNews.length - 2);
    aiNewsContainer.innerHTML = '';
    
    for (let i = aiStartIndex; i < aiStartIndex + 3; i++) {
        const news = aiNews[i % aiNews.length];
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${news.title}</h4>
            <p>${news.content}</p>
        `;
        aiNewsContainer.appendChild(newsItem);
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Hamburger menu functionality - COMPLETELY FIXED
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (!hamburger || !mobileMenu) {
        console.log('Hamburger elements not found');
        return;
    }
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Fade in animation on scroll
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.news-box, .quote-container, .welcome-message');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setDailyQuote();
    setDailyNews();
    setupHamburgerMenu();
    setupScrollAnimations();
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();
});

// Handle page resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger-menu');
    const body = document.body;
    
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    }
});