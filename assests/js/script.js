document.addEventListener('DOMContentLoaded', () => {
    // 1. Icons are handled via Font Awesome (CSS classes)

    // 2. Preloader Removal
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
            }
        }, 1000); // Small delay for effect
    });

    // 3. Translations
    const translations = {
        en: {
            loader_text: "Initializing Workspace...",
            nav_home: "Home",
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_achievements: "Achievements",
            nav_contact: "Contact",
            nav_contact_btn: "Get in Touch",
            hero_title: "Hi, I am <br><span class='gradient-text gradient-animated'>Ahmet.</span>",
            hero_desc: "Hi, I am <strong>Ahmet</strong>. I develop autonomous systems, AI-powered UAV technologies, and modern web applications. I'm passionate about exploring the intersection of <strong>Digital Humanities</strong> and cutting-edge software solutions.",
            hero_projects: "My Projects",
            hero_cv: "Download CV",
            scroll_down: "Scroll Down",
            about_title: "About Me",
            about_profile_title: "Profile Summary",
            about_profile_desc: "I am a senior high school student specializing in software development, autonomous systems, and AI-based UAV technologies. By transforming theoretical knowledge into practical applications in prestigious competitions like TEKNOFEST, I create innovative technological solutions for real-world problems. My interest in <strong>Digital Humanities</strong> drives me to bridge the gap between cultural heritage and modern computational methods.",
            about_edu_title: "Education",
            about_edu_year1: "2022 - Present",
            about_edu_school1: "Sivas IT Vocational High School",
            about_edu_program1: "Anatolian Technical Program (ATP) - Software Development",
            about_edu_gpa1: "GPA: 92.00",
            about_edu_year2: "2018 - 2022",
            about_edu_school2: "Doga College",
            about_edu_program2: "Secondary Education",
            about_edu_gpa2: "GPA: 95.99",
            live_projects_title: "Live Projects",
            live_projects_subtitle: "Ready-to-use professional applications and web platforms.",
            project_medrese_desc: "A digital mapping and AR virtual tour project for Sivas Gök Medrese Foundation Museum.",
            project_atlas_title: "Digital Dynasty Atlas",
            project_atlas_desc: "An interactive visual database exploring historical dynasties and their territorial evolutions through time.",
            skills_title: "Tech Stack",
            skills_subtitle: "My expertise and tools I use daily.",
            skills_cat_languages: "Languages",
            skills_cat_frameworks: "Frameworks & Libraries",
            skills_cat_dh: "Digital Humanities",
            skills_cat_tools: "Tools",
            projects_title: "Open Source Projects",
            projects_subtitle: "Latest repositories fetched automatically from GitHub.",
            filter_all: "All",
            filter_web: "Web",
            view_github: "Visit My GitHub Profile",
            github_loading: "Fetching latest projects from GitHub...",
            github_error: "Failed to load projects.",
            achievements_title: "Competitions & Achievements",
            event_tekno_iha: "TEKNOFEST UAV Competition",
            role_free: "Free Mission",
            desc_tekno_iha: "Developed innovative software architecture solutions for autonomous flight algorithms and mission planning.",
            event_tekno_iha_24: "TEKNOFEST UAV Competition (2024)",
            badge_hs_cat: "High School Category",
            desc_tekno_iha_24: "Autonomous flight dynamics and telemetry data analysis software development.",
            event_tekno_rocket: "TEKNOFEST Rocket Competition",
            badge_avionics: "Avionics & Communication",
            desc_tekno_rocket: "High-altitude payload sensor data collection and RF transmission systems.",
            event_ai_air: "AI in Aviation",
            desc_ai_air: "Integration of aerial image processing, object detection, and deep learning for UAVs.",
            event_sar: "Autonomous Search & Rescue UAV",
            role_idea: "Idea Competition",
            desc_sar: "Sustainable autonomous system design for detecting and tracking people in disaster areas.",
            event_meb: "MEB Robot Competition",
            role_autocar: "Autonomous Vehicle",
            desc_meb: "Developed lane tracking and sign recognition systems for autonomous land vehicles.",
            cert_title: "Education & Certificates",
            cert_type_training: "Training Program",
            cert_type_certificate: "Achievement Certificate",
            footer_cta: "Let's Build Something <br><span class='gradient-text'>Exceptional</span>",
            footer_desc: "I'm always open to discussing autonomous systems, artificial intelligence, or innovative software ideas.",
            footer_copy_email: "Copy Email",
            footer_call: "Call Me",
            footer_quick_links: "Quick Links",
            footer_expertise: "Core Expertise",
            footer_contact_title: "Contact",
            footer_brand_desc: "Architecting the future through autonomous intelligence and digital craftsmanship.",
            footer_rights: "Crafted with Digital Precision.",
            toast_copy: "Copied to clipboard!",
            typing_strings: ["Software Developer", "Autonomous Systems Engineer", "AI Researcher", "Digital Humanities Enthusiast"],
            cert1: "Defense Industry Training Program",
            cert2: "Cyber Security",
            cert3: "Project Management Fundamentals",
            cert4: "Effective Communication Strategies",
            cert5: "Digital Content Creation",
            cert6: "Operating Systems",
            cert7: "UAV Pilot Certificate",
            cert8: "Python & TensorFlow"
        },
        tr: {
            loader_text: "Çalışma Alanı Hazırlanıyor...",
            nav_home: "Ana Sayfa",
            nav_about: "Hakkımda",
            nav_skills: "Yetenekler",
            nav_projects: "Projeler",
            nav_achievements: "Başarılar",
            nav_contact: "İletişim",
            nav_contact_btn: "İletişime Geç",
            hero_title: "Merhaba, ben <br><span class='gradient-text gradient-animated'>Ahmet.</span>",
            hero_desc: "Merhaba, ben <strong>Ahmet</strong>. Otonom sistemler, yapay zeka destekli İHA teknolojileri ve modern web uygulamaları geliştiriyorum. <strong>Dijital Beşeri Bilimler</strong> ile yazılım çözümlerinin kesişim noktasını keşfetmeyi tutkuyla yapıyorum.",
            hero_projects: "Projelerim",
            hero_cv: "CV İndir",
            scroll_down: "Aşağı Kaydır",
            about_title: "Hakkımda",
            about_profile_title: "Profil Özeti",
            about_profile_desc: "Yazılım geliştirme, otonom sistemler ve yapay zeka tabanlı İHA teknolojileri üzerine uzmanlaşmış bir lise son sınıf öğrencisiyim. TEKNOFEST gibi yarışmalarda kazandığım tecrübeleri gerçek dünya sorunlarına dönüştürüyorum. <strong>Dijital Beşeri Bilimler</strong> ilgi alanım ile kültürel miras ve modern hesaplamalı yöntemler arasında köprü kurmayı hedefliyorum.",
            about_edu_title: "Eğitim Hayatım",
            about_edu_year1: "2022 - Günümüz",
            about_edu_school1: "Sivas Bilişim Teknolojileri MTAL",
            about_edu_program1: "Anadolu Teknik Programı (ATP) - Yazılım Geliştirme",
            about_edu_gpa1: "Ortalama: 92.00",
            about_edu_year2: "2018 - 2022",
            about_edu_school2: "Doğa Koleji",
            about_edu_program2: "Ortaokul Eğitimi",
            about_edu_gpa2: "Ortalama: 95.99",
            live_projects_title: "Canlı Projeler",
            live_projects_subtitle: "Kullanıma hazır profesyonel uygulamalar ve web platformları.",
            project_medrese_desc: "Sivas Gök Medrese Vakıf Müzesi için dijital haritalama ve AR sanal tur projesi.",
            project_atlas_title: "Dijital Hanedan Atlası",
            project_atlas_desc: "Tarihsel hanedanları ve onların zamana göre toprak değişimlerini inceleyen etkileşimli görsel veritabanı.",
            skills_title: "Teknoloji Yığını",
            skills_subtitle: "Uzmanlık alanlarım ve kullandığım araçlar.",
            skills_cat_languages: "Diller",
            skills_cat_frameworks: "Framework & Kütüphaneler",
            skills_cat_dh: "Dijital Beşeri Bilimler",
            skills_cat_tools: "Araçlar",
            projects_title: "Açık Kaynak Projeler",
            projects_subtitle: "GitHub üzerinden otomatik olarak çekilen güncel çalışmalarım.",
            filter_all: "Tümü",
            filter_web: "Web",
            view_github: "GitHub Profilimi Ziyaret Et",
            github_loading: "GitHub'dan projeler yükleniyor...",
            github_error: "Projeler yüklenemedi.",
            achievements_title: "Yarışmalar & Başarılar",
            event_tekno_iha: "TEKNOFEST İHA Yarışması",
            role_free: "Serbest Görev",
            desc_tekno_iha: "Otonom uçuş algoritmaları ve görev planlama üzerine yenilikçi yazılım mimarisi çözümleri.",
            event_tekno_iha_24: "TEKNOFEST İHA Yarışması (2024)",
            badge_hs_cat: "Lise Kategorisi",
            desc_tekno_iha_24: "Otonom uçuş dinamikleri ve telemetri veri analiz yazılımı geliştirme.",
            event_tekno_rocket: "TEKNOFEST Roket Yarışması",
            badge_avionics: "Avyonik & Haberleşme",
            desc_tekno_rocket: "Yüksek irtifa görev yükü sensör verileri toplama ve RF veri aktarım sistemleri.",
            event_ai_air: "Havacılıkta Yapay Zeka",
            desc_ai_air: "İHA'lar için havadan görüntü işleme ve derin öğrenme entegrasyonu.",
            event_sar: "Otonom Arama Kurtarma İHA",
            role_idea: "Fikir Yarışması",
            desc_sar: "Afet bölgelerinde insan tespiti yapabilen ve takip eden otonom sistem tasarımı.",
            event_meb: "MEB Robot Yarışması",
            role_autocar: "Otonom Araç",
            desc_meb: "Otonom kara araçları için şerit takip ve işaret tanıma sistemleri.",
            cert_title: "Eğitim & Sertifikalar",
            cert_type_training: "Eğitim Programı",
            cert_type_certificate: "Başarı Sertifikası",
            footer_cta: "Birlikte Harika Bir Proje <br><span class='gradient-text'>Geliştirelim</span>",
            footer_desc: "Otonom sistemler, yapay zeka veya inovatif yazılım fikirleriniz için her zaman iletişime açığım.",
            footer_copy_email: "E-postayı Kopyala",
            footer_call: "Beni Arayın",
            footer_quick_links: "Hızlı Bağlantılar",
            footer_expertise: "Uzmanlık Alanları",
            footer_contact_title: "İletişim",
            footer_brand_desc: "Otonom zeka ve dijital zanaatkarlıkla geleceği inşa ediyorum.",
            footer_rights: "Dijital Hassasiyetle Geliştirildi.",
            toast_copy: "Panoya kopyalandı!",
            typing_strings: ["Yazılım Geliştirici", "Otonom Sistemler Mühendisi", "AI Araştırmacısı", "Dijital Beşeri Bilimler Tutkunu"],
            cert1: "Savunma Sanayii Eğitim Programı",
            cert2: "Siber Güvenlik",
            cert3: "Proje Yönetimi Temelleri",
            cert4: "Etkili İletişim Stratejileri",
            cert5: "Dijital İçerik Üretimi",
            cert6: "İşletim Sistemleri",
            cert7: "İHA Pilot Sertifikası (İHA-1)",
            cert8: "Python & TensorFlow"
        }
    };

    let currentLang = 'en';

    function changeLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Update Typing Array
        textArray = translations[lang].typing_strings;
        
        // Update Lang Toggle Text
        const langCode = document.querySelector('.lang-code');
        if (langCode) langCode.textContent = lang.toUpperCase();

        // Icons update automatically with Font Awesome classes
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const nextLang = currentLang === 'en' ? 'tr' : 'en';
            changeLanguage(nextLang);
        });
    }

    // 4. Set Current Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 5. Custom Cursor Glow
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            if (cursorDot) {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            }
            if (cursorGlow) {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            }
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .live-project-card, .contact-link-card, .social-icon');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorDot) {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorDot.style.backgroundColor = 'transparent';
                    cursorDot.style.border = '2px solid var(--primary)';
                }
            });
            el.addEventListener('mouseleave', () => {
                if (cursorDot) {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorDot.style.backgroundColor = 'var(--primary)';
                    cursorDot.style.border = 'none';
                }
            });
        });
    }

    // 6. Navbar & Progress & 3D Scroll Effect
    const nav = document.querySelector('.glass-nav');
    const progressBar = document.getElementById('scroll-progress');
    const parallaxContainers = document.querySelectorAll('[data-scroll-parallax]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (progressBar) {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (totalScroll / windowHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }

        updateActiveLink();
    });

    // 7. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (mobileBtn && closeBtn && overlay) {
        const toggleMenu = () => overlay.classList.toggle('open');
        mobileBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // 8. Intersection Observer
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-init').forEach(el => observer.observe(el));

    // 9. Active Nav Link Updates
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // 10. GitHub Projects
    const projectsContainer = document.getElementById('github-projects');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const GITHUB_USERNAME = 'AhmetBeratKocyigit';
    let allRepos = [];

    async function fetchGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
            if (!response.ok) throw new Error(translations[currentLang].github_error);
            allRepos = await response.json();
            const validRepos = allRepos.filter(repo => repo.name !== GITHUB_USERNAME && !repo.fork);
            renderProjects(validRepos.slice(0, 8), 'all');
            setupFilters(validRepos);
        } catch (error) {
            console.error(translations[currentLang].github_error, error);
        }
    }

    function renderProjects(repos, filter) {
        if (!projectsContainer) return;
        let filteredRepos = repos;
        if (filter !== 'all') {
            filteredRepos = allRepos.filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME && repo.language === filter);
        }
        projectsContainer.innerHTML = '';
        filteredRepos.slice(0, 9).forEach(repo => {
            const languageMap = repo.language || 'Code';
            let desc = repo.description || 'No description available.';
            if (desc.length > 100) desc = desc.substring(0, 100) + '...';

            const card = document.createElement('div');
            card.className = 'project-card glass-card reveal-init reveal cursor-pointer';
            card.innerHTML = `
                <div class="project-top">
                    <i class="fas fa-folder-open folder-icon"></i>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
                <p class="project-desc">${desc}</p>
                <div class="project-bottom">
                    <div class="project-lang"><span class="lang-dot"></span>${languageMap}</div>
                </div>
            `;
            
            // Make entire card clickable
            card.addEventListener('click', () => {
                window.open(repo.html_url, '_blank');
            });

            projectsContainer.appendChild(card);
        });
    }

    function setupFilters(validRepos) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderProjects(validRepos, e.target.getAttribute('data-filter'));
            });
        });
    }

    if (projectsContainer) fetchGitHubProjects();

    // 11. Typing Effect
    const typedTextSpan = document.getElementById("typed-text");
    const cursorSpan = document.querySelector(".typing-cursor");

    let textArray = translations[currentLang].typing_strings;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, 500);
        }
    }

    if(typedTextSpan) setTimeout(type, 2000);

    // 13. Copy Email
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    const toast = document.getElementById('toast');

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            });
        });
    }

    // Handle static live project cards click
    document.querySelectorAll('.live-project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent if clicked on a button or link inside
            if (e.target.closest('a, button')) return;
            const link = card.querySelector('.btn-primary');
            if (link) window.open(link.href, '_blank');
        });
    });
});
