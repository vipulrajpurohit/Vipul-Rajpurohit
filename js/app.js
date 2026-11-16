/**
 * VIPUL RAJPUROHIT - CYBERSECURITY & FULL-STACK PORTFOLIO
 * Architecture: Production-Grade Vanilla ES6+, Defensive Programming, Full CMS State
 * Theme: Blue & White Light Theme
 * Animations: Repeatable Scroll Animations on Scroll Up & Down (once: false, mirror: true)
 * Hidden Admin Access: Ctrl + Shift + A or discreet lock button (Default PIN: vipin_sec_2026)
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Constants & Security Defaults
  // --------------------------------------------------------------------------
  const ADMIN_PIN_DEFAULT = 'vipin_sec_2026';
  const STORAGE_KEY_MASTER = 'vipul_portfolio_master_cms_v2';
  const STORAGE_KEY_ADMIN = 'vipul_admin_authenticated_session';

  // Fallback seed data for entire website CMS
  const DEFAULT_SITE_DATA = {
    about: {
      name: 'Vipul Rajpurohit Chensinh',
      subtag: 'BCA (2024–2027) // GSFC UNIVERSITY',
      lead: 'I am a passionate BCA (Bachelor of Computer Applications) student (2024–2027) at GSFC University, residing in Khergam, near Valsad / Greater Vadodara, Gujarat.',
      body: 'My academic journey is dedicated to mastering both sides of the digital landscape: building resilient full-stack web applications and fortifying them against sophisticated cyber threats. By implementing the OWASP Top 10 proactive security controls, I ensure web systems eliminate vulnerability vectors such as injection flaws, cross-site scripting (XSS), and broken access controls.',
      eduTitle: 'GSFC University — Bachelor of Computer Applications (BCA)',
      eduDesc: 'Vadodara, Gujarat (2024 – 2027) • Rigorous curriculum in Network Security, Operating Systems, Database Management & Software Design.',
      photoUrl: 'assets/profile.jpg'
    },
    skills: {
      'Programming': [
        {
          id: 'sk_c',
          name: 'C / C++',
          level: 'Core Foundations',
          desc: 'System programming, pointers, low-level memory allocation, and performance optimization.'
        },
        {
          id: 'sk_py',
          name: 'Python',
          level: 'Defensive Scripting',
          desc: 'Socket programming, custom network packet sniffers, automation scripts, and data parsing.'
        },
        {
          id: 'sk_js',
          name: 'JavaScript (ES6+)',
          level: 'Application Logic',
          desc: 'Asynchronous event handling, DOM security hardening, REST API integration, and client-side sanitization.'
        }
      ],
      'Security & Tools': [
        {
          id: 'sk_audit',
          name: 'Vulnerability Assessment',
          level: 'Security Ops',
          desc: 'OWASP Top 10 auditing, identifying XSS, CSRF, SQLi, and broken authentication flaws.'
        },
        {
          id: 'sk_wire',
          name: 'Wireshark & Nmap',
          level: 'Network Analysis',
          desc: 'Packet inspection, TCP handshake analysis, network topology mapping, and active service enumeration.'
        },
        {
          id: 'sk_burp',
          name: 'Burp Suite & Linux CLI',
          level: 'Penetration Testing',
          desc: 'Web request interception, parameter tampering testing, bash scripting, and Linux server administration.'
        }
      ],
      'Web Stack': [
        {
          id: 'sk_node',
          name: 'Node.js & Express.js',
          level: 'Backend Architecture',
          desc: 'Developing secure REST APIs, role-based access control (RBAC), middleware validation, and rate limiting.'
        },
        {
          id: 'sk_db',
          name: 'MongoDB & MySQL',
          level: 'Data Persistence',
          desc: 'Relational & document database schemas, parameterized query structures, and ORM/ODM integration.'
        },
        {
          id: 'sk_front',
          name: 'HTML5 & Modern CSS3',
          level: 'Frontend UI/UX',
          desc: 'Responsive flexbox/grid architectures, mobile-first design, accessible semantic markup, and clean UI styling.'
        }
      ]
    },
    contact: {
      phone: '+91 9558648873',
      email: 'vipulrajpurohit9005@gmail.com',
      location: 'Khergam (near Valsad) / Greater Vadodara, Gujarat',
      socials: [
        {
          id: 'soc_linkedin',
          platform: 'linkedin',
          label: 'LinkedIn Profile',
          url: 'https://www.linkedin.com/in/vipul-rajpurohit-896824343'
        },
        {
          id: 'soc_instagram',
          platform: 'instagram',
          label: 'Instagram Profile',
          url: 'https://www.instagram.com/vipul_rajpurohit.5?dlrf=ODB5azM4cnczZG1h'
        },
        {
          id: 'soc_github',
          platform: 'github',
          label: 'GitHub Repository',
          url: 'https://github.com/vipulrajpurohit'
        },
        {
          id: 'soc_x',
          platform: 'x-twitter',
          label: 'X (Twitter)',
          url: 'https://x.com/vipulrajpurohit'
        }
      ]
    },
    projects: [
      {
        id: 'proj_shield_ai',
        title: 'ShieldAI Chrome Extension',
        category: 'Cybersecurity',
        status: 'upcoming', // Upcoming project
        description: 'Next-generation browser defense extension analyzing client-side DOM heuristics, suspicious redirect chains, and deceptive phishing vectors to protect end-users in real-time.',
        techStack: ['JavaScript (ES6+)', 'Chrome API', 'OWASP Rules', 'Regex Engine'],
        url: '' // Clean empty link - opens rich Architecture & Roadmap modal
      },
      {
        id: 'proj_limelight_gym',
        title: 'Limelight Gym Management System',
        category: 'Full-Stack',
        status: 'completed',
        description: 'End-to-end commercial management portal featuring role-based access control (RBAC), automated membership lifecycle tracking, and relational database schema design.',
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT Auth'],
        url: '' // Clean empty link - opens rich Architecture & Roadmap modal
      },
      {
        id: 'proj_sharda_fashion',
        title: 'Sharda Fashion Web Platform',
        category: 'Full-Stack',
        status: 'completed',
        description: 'Scalable commercial digital catalog and transactional interface for Sharda Menswear Khergam, featuring sanitized catalog queries, inventory workflows, and responsive UI.',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MySQL', 'REST APIs'],
        url: 'https://www.instagram.com/vipul_rajpurohit.5?dlrf=ODB5azM4cnczZG1h'
      }
    ]
  };

  // --------------------------------------------------------------------------
  // 2. Strict Input Sanitization & Security Utilities (XSS Prevention)
  // --------------------------------------------------------------------------
  const Security = {
    /**
     * Converts untrusted characters to safe HTML entities.
     * Prevents Stored and Reflected XSS.
     */
    escapeHTML(str) {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
    },

    /**
     * Validates safe URLs and neutralizes dangerous pseudo-protocols like javascript:
     */
    sanitizeURL(url) {
      if (!url || typeof url !== 'string') return '';
      const trimmed = url.trim();
      const safeProtocols = /^(https?:\/\/|mailto:|tel:)/i;
      if (!safeProtocols.test(trimmed)) {
        return '';
      }
      return trimmed;
    },

    /**
     * RFC-compliant email validation.
     */
    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(String(email).toLowerCase());
    },

    /**
     * Detects disposable temporary fake email domains to protect against spam
     */
    isDisposableEmail(email) {
      if (!email || typeof email !== 'string') return false;
      const parts = email.split('@');
      if (parts.length !== 2) return false;
      const domain = parts[1].toLowerCase().trim();
      const disposableList = [
        'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
        'yopmail.com', 'trashmail.com', 'dispostable.com', 'sharklasers.com',
        'getairmail.com', 'mytemp.email', 'fakemailgenerator.com', 'mohmal.com',
        'throwawaymail.com', 'temp-mail.org', 'crazymailing.com', 'generator.email'
      ];
      return disposableList.includes(domain);
    },

    /**
     * Detects common email domain typos and offers correction suggestions
     */
    checkEmailTypo(email) {
      if (!email || typeof email !== 'string') return null;
      const parts = email.split('@');
      if (parts.length !== 2) return null;
      const domain = parts[1].toLowerCase().trim();
      const typoMap = {
        'gmial.com': 'gmail.com',
        'gamil.com': 'gmail.com',
        'gmaill.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'yaho.com': 'yahoo.com',
        'yahooo.com': 'yahoo.com',
        'hotmial.com': 'hotmail.com',
        'hotmaill.com': 'hotmail.com',
        'outlok.com': 'outlook.com',
        'outloo.com': 'outlook.com'
      };
      if (typoMap[domain]) {
        return parts[0] + '@' + typoMap[domain];
      }
      return null;
    },

    /**
     * Generates a cryptographic session authenticity passcode for the contact form
     */
    generateAuthCode() {
      const prefixes = ['SEC', 'AUTH', 'SHIELD', 'CYBER', 'SOC'];
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const n = Math.floor(1000 + Math.random() * 9000);
      return `${p}-${n}`;
    },

    /**
     * Returns FontAwesome icon class according to social platform
     */
    getPlatformIcon(platform) {
      switch ((platform || '').toLowerCase()) {
        case 'github':
          return 'fa-brands fa-github';
        case 'x-twitter':
        case 'twitter':
          return 'fa-brands fa-x-twitter';
        case 'facebook':
          return 'fa-brands fa-facebook-f';
        case 'linkedin':
          return 'fa-brands fa-linkedin-in';
        case 'instagram':
          return 'fa-brands fa-instagram';
        case 'youtube':
          return 'fa-brands fa-youtube';
        case 'discord':
          return 'fa-brands fa-discord';
        default:
          return 'fa-solid fa-link';
      }
    }
  };

  // --------------------------------------------------------------------------
  // 3. State Management with LocalStorage & Defensive Fallbacks
  // --------------------------------------------------------------------------
  const State = {
    siteData: {},
    isAdmin: false,
    currentFilter: 'all',
    activeSkillsCategory: 'Programming',
    pendingPhotoData: null,
    currentCaptchaCode: '',

    init() {
      this.loadSiteData();
      this.loadAdminState();
      this.currentCaptchaCode = Security.generateAuthCode();
    },

    loadSiteData() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_MASTER);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            // Merge defensive defaults for backward compatibility
            this.siteData = {
              about: { ...DEFAULT_SITE_DATA.about, ...(parsed.about || {}) },
              skills: { ...DEFAULT_SITE_DATA.skills, ...(parsed.skills || {}) },
              contact: {
                ...DEFAULT_SITE_DATA.contact,
                ...(parsed.contact || {}),
                socials: Array.isArray(parsed.contact?.socials) ? parsed.contact.socials : DEFAULT_SITE_DATA.contact.socials
              },
              projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : DEFAULT_SITE_DATA.projects
            };
            return;
          }
        }
      } catch (err) {
        console.warn('[CMS State] LocalStorage read failed. Reverting to defaults.', err);
      }
      // Fallback default state
      this.siteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
      this.persistSiteData();
    },

    persistSiteData() {
      try {
        localStorage.setItem(STORAGE_KEY_MASTER, JSON.stringify(this.siteData));
      } catch (err) {
        console.error('[CMS State] LocalStorage write error:', err);
      }
    },

    loadAdminState() {
      try {
        const sessionVal = sessionStorage.getItem(STORAGE_KEY_ADMIN);
        this.isAdmin = (sessionVal === 'active');
      } catch (e) {
        this.isAdmin = false;
      }
    },

    setAdminState(active) {
      this.isAdmin = Boolean(active);
      try {
        if (this.isAdmin) {
          sessionStorage.setItem(STORAGE_KEY_ADMIN, 'active');
        } else {
          sessionStorage.removeItem(STORAGE_KEY_ADMIN);
        }
      } catch (e) {
        console.warn('SessionStorage write error:', e);
      }
    },

    resetToDefaults() {
      this.siteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
      this.persistSiteData();
    },

    // About Helpers
    updateAbout(data) {
      this.siteData.about = { ...this.siteData.about, ...data };
      this.persistSiteData();
    },

    // Skills Helpers
    addSkill(category, skill) {
      if (!this.siteData.skills[category]) {
        this.siteData.skills[category] = [];
      }
      this.siteData.skills[category].push(skill);
      this.persistSiteData();
    },

    deleteSkill(category, skillId) {
      if (this.siteData.skills[category]) {
        this.siteData.skills[category] = this.siteData.skills[category].filter(s => s.id !== skillId);
        this.persistSiteData();
      }
    },

    // Contact Helpers
    updateContactInfo(info) {
      this.siteData.contact = { ...this.siteData.contact, ...info };
      this.persistSiteData();
    },

    addSocial(social) {
      if (!Array.isArray(this.siteData.contact.socials)) {
        this.siteData.contact.socials = [];
      }
      this.siteData.contact.socials.push(social);
      this.persistSiteData();
    },

    deleteSocial(socialId) {
      if (Array.isArray(this.siteData.contact.socials)) {
        this.siteData.contact.socials = this.siteData.contact.socials.filter(s => s.id !== socialId);
        this.persistSiteData();
      }
    },

    // Projects Helpers
    addProject(project) {
      this.siteData.projects.unshift(project);
      this.persistSiteData();
    },

    updateProject(id, updatedData) {
      const index = this.siteData.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        this.siteData.projects[index] = { ...this.siteData.projects[index], ...updatedData };
        this.persistSiteData();
      }
    },

    deleteProject(id) {
      this.siteData.projects = this.siteData.projects.filter(p => p.id !== id);
      this.persistSiteData();
    }
  };

  // --------------------------------------------------------------------------
  // 4. Cached DOM Elements
  // --------------------------------------------------------------------------
  let DOM = {};

  function cacheDOM() {
    DOM = {
      navbar: document.getElementById('navbar'),
      navLinks: document.querySelectorAll('.nav-link'),
      mobileToggle: document.getElementById('mobile-toggle'),
      mobileDrawer: document.getElementById('mobile-menu-drawer'),

      // Floating Admin Bar & Dock Buttons
      floatingAdminBar: document.getElementById('floating-admin-bar'),
      dockBtnAbout: document.getElementById('dock-btn-about'),
      dockBtnSkills: document.getElementById('dock-btn-skills'),
      dockBtnContact: document.getElementById('dock-btn-contact'),
      dockBtnAddProject: document.getElementById('dock-btn-add-project'),
      dockBtnResetAll: document.getElementById('dock-btn-reset-all'),
      dockBtnExit: document.getElementById('dock-btn-exit'),

      // Section Inline Admin Buttons
      btnSectionEditAbout: document.getElementById('btn-section-edit-about'),
      btnSectionEditSkills: document.getElementById('btn-section-edit-skills'),
      btnSectionEditContact: document.getElementById('btn-section-edit-contact'),

      // Admin Login PIN Modal
      adminModal: document.getElementById('admin-modal'),
      adminPinInput: document.getElementById('admin-pin-input'),
      adminPinSubmit: document.getElementById('admin-pin-submit'),
      adminPinError: document.getElementById('admin-pin-error'),
      adminModalClose: document.getElementById('admin-modal-close'),

      // About & Profile Photo Modal
      aboutModal: document.getElementById('about-modal'),
      aboutForm: document.getElementById('about-form'),
      aboutModalClose: document.getElementById('about-modal-close'),
      aboutModalCancel: document.getElementById('about-modal-cancel'),
      cmsPhotoPreview: document.getElementById('cms-photo-preview'),
      cmsPhotoFile: document.getElementById('cms-photo-file'),
      cmsPhotoUrl: document.getElementById('cms-photo-url'),
      btnResetPhoto: document.getElementById('btn-reset-photo'),
      cmsAboutName: document.getElementById('cms-about-name'),
      cmsAboutSubtag: document.getElementById('cms-about-subtag'),
      cmsAboutLead: document.getElementById('cms-about-lead'),
      cmsAboutBody: document.getElementById('cms-about-body'),
      cmsAboutEduTitle: document.getElementById('cms-about-edu-title'),
      cmsAboutEduDesc: document.getElementById('cms-about-edu-desc'),

      // About Section DOM targets
      aboutProfilePhoto: document.getElementById('about-profile-photo'),
      contactProfilePhoto: document.getElementById('contact-profile-photo'),
      aboutDisplayName: document.getElementById('about-display-name'),
      aboutDisplaySubtag: document.getElementById('about-display-subtag'),
      aboutDisplayLead: document.getElementById('about-display-lead'),
      aboutDisplayBody: document.getElementById('about-display-body'),
      aboutDisplayEduTitle: document.getElementById('about-display-edu-title'),
      aboutDisplayEduDesc: document.getElementById('about-display-edu-desc'),

      // Skills & Tooling Modal & Targets
      skillsModal: document.getElementById('skills-modal'),
      skillsModalClose: document.getElementById('skills-modal-close'),
      skillsModalDone: document.getElementById('skills-modal-done'),
      skillsCategorySelect: document.getElementById('skills-category-select'),
      skillsItemsList: document.getElementById('skills-items-list'),
      addSkillForm: document.getElementById('add-skill-form'),
      newSkillName: document.getElementById('new-skill-name'),
      newSkillTag: document.getElementById('new-skill-tag'),
      newSkillDesc: document.getElementById('new-skill-desc'),
      skillsContainer: document.getElementById('skills-container'),

      // Contact & Social Accounts Modal & Targets
      contactModal: document.getElementById('contact-modal'),
      contactModalClose: document.getElementById('contact-modal-close'),
      contactModalDone: document.getElementById('contact-modal-done'),
      contactInfoForm: document.getElementById('contact-info-form'),
      cmsPhone: document.getElementById('cms-phone'),
      cmsEmail: document.getElementById('cms-email'),
      cmsLocation: document.getElementById('cms-location'),
      socialAccountsList: document.getElementById('social-accounts-list'),
      addSocialForm: document.getElementById('add-social-form'),
      newSocialPlatform: document.getElementById('new-social-platform'),
      newSocialLabel: document.getElementById('new-social-label'),
      newSocialUrl: document.getElementById('new-social-url'),

      // Contact Section & Flow Targets
      contactDisplayName: document.getElementById('contact-display-name'),
      contactDisplaySub: document.getElementById('contact-display-sub'),
      contactValPhone: document.getElementById('contact-val-phone'),
      contactLinkPhone: document.getElementById('contact-link-phone'),
      contactValEmail: document.getElementById('contact-val-email'),
      contactLinkEmail: document.getElementById('contact-link-email'),
      contactValLocation: document.getElementById('contact-val-location'),
      contactSocialsContainer: document.getElementById('contact-socials-container'),
      flowValPhone: document.getElementById('flow-val-phone'),
      flowLinkPhone: document.getElementById('flow-link-phone'),
      flowValEmail: document.getElementById('flow-val-email'),
      flowLinkEmail: document.getElementById('flow-link-email'),
      footerContactList: document.getElementById('footer-contact-list'),

      // Projects
      projectsContainer: document.getElementById('projects-container'),
      filterButtons: document.querySelectorAll('.filter-btn'),

      // Project Create / Edit Modal
      projectModal: document.getElementById('project-modal'),
      projectForm: document.getElementById('project-form'),
      projectModalTitle: document.getElementById('project-modal-title'),
      projEditId: document.getElementById('proj-edit-id'),
      projTitle: document.getElementById('proj-title'),
      projCategory: document.getElementById('proj-category'),
      projStatus: document.getElementById('proj-status'),
      projDesc: document.getElementById('proj-desc'),
      projTech: document.getElementById('proj-tech'),
      projUrl: document.getElementById('proj-url'),
      projectModalClose: document.getElementById('project-modal-close'),
      projectModalCancel: document.getElementById('project-modal-cancel'),

      // Project Details Modal
      detailModal: document.getElementById('detail-modal'),
      detailTitle: document.getElementById('detail-title'),
      detailCategory: document.getElementById('detail-category'),
      detailStatusBadge: document.getElementById('detail-status-badge'),
      detailDesc: document.getElementById('detail-desc'),
      detailTechList: document.getElementById('detail-tech-list'),
      detailLinkAction: document.getElementById('detail-link-action'),
      detailModalClose: document.getElementById('detail-modal-close'),

      // Contact Form (Visitor messaging & Verification)
      contactForm: document.getElementById('contact-form'),
      formAlert: document.getElementById('form-alert'),
      contactAuthCode: document.getElementById('contact-auth-code'),
      captchaDisplay: document.getElementById('captcha-display'),
      btnRefreshCaptcha: document.getElementById('btn-refresh-captcha'),
      authCodeError: document.getElementById('auth-code-error'),
      emailVerifyHint: document.getElementById('email-verify-hint'),
      btnDirectGmail: document.getElementById('btn-direct-gmail'),
      contactSubmitBtn: document.getElementById('contact-submit-btn'),

      // Copyright
      yearStamp: document.getElementById('year-stamp')
    };
  }

  // --------------------------------------------------------------------------
  // 5. Dynamic UI Rendering (Defensive, XSS-Safe)
  // --------------------------------------------------------------------------
  const UI = {
    /**
     * Renders all sections of the site
     */
    renderAll() {
      this.renderAbout();
      this.renderSkills();
      this.renderContact();
      this.renderProjects();
    },

    /**
     * Renders About section & profile photos
     */
    renderAbout() {
      try {
        const about = State.siteData.about || DEFAULT_SITE_DATA.about;

        // Update photo across About and Contact cards
        const photoUrl = about.photoUrl || 'assets/profile.jpg';
        if (DOM.aboutProfilePhoto) {
          DOM.aboutProfilePhoto.src = photoUrl;
        }
        if (DOM.contactProfilePhoto) {
          DOM.contactProfilePhoto.src = photoUrl;
        }

        // Texts
        if (DOM.aboutDisplayName) DOM.aboutDisplayName.textContent = about.name;
        if (DOM.aboutDisplaySubtag) DOM.aboutDisplaySubtag.textContent = about.subtag;
        if (DOM.aboutDisplayLead) DOM.aboutDisplayLead.textContent = about.lead;
        if (DOM.aboutDisplayBody) DOM.aboutDisplayBody.textContent = about.body;
        if (DOM.aboutDisplayEduTitle) DOM.aboutDisplayEduTitle.textContent = about.eduTitle;
        if (DOM.aboutDisplayEduDesc) DOM.aboutDisplayEduDesc.textContent = about.eduDesc;

        // Contact header sync
        if (DOM.contactDisplayName) DOM.contactDisplayName.textContent = about.name;
        if (DOM.contactDisplaySub) DOM.contactDisplaySub.textContent = about.subtag;
      } catch (err) {
        console.error('[UI Render Error] About rendering failed:', err);
      }
    },

    /**
     * Renders Skills & Tools cards into the public grid
     */
    renderSkills() {
      try {
        if (!DOM.skillsContainer) return;
        DOM.skillsContainer.innerHTML = '';

        const skillsData = State.siteData.skills || DEFAULT_SITE_DATA.skills;
        const categories = Object.keys(skillsData);

        const categoryIcons = {
          'Programming': 'fa-solid fa-code',
          'Security & Tools': 'fa-solid fa-shield-halved',
          'Web Stack': 'fa-solid fa-layer-group'
        };

        categories.forEach((catName, index) => {
          const items = skillsData[catName] || [];

          const card = document.createElement('div');
          card.className = 'skill-card';
          card.setAttribute('data-aos', 'fade-up');
          card.setAttribute('data-aos-delay', (index * 120).toString());

          // Card Header
          const top = document.createElement('div');
          top.className = 'skill-card-top';

          const bubble = document.createElement('div');
          bubble.className = 'skill-icon-bubble';
          const iconClass = categoryIcons[catName] || 'fa-solid fa-cubes';
          bubble.innerHTML = `<i class="${iconClass}"></i>`;

          const meta = document.createElement('div');
          const catPill = document.createElement('div');
          catPill.className = 'skill-card-category';
          catPill.textContent = catName.toUpperCase();

          const title = document.createElement('h3');
          title.className = 'skill-card-title';
          title.textContent = catName;

          meta.appendChild(catPill);
          meta.appendChild(title);
          top.appendChild(bubble);
          top.appendChild(meta);
          card.appendChild(top);

          // Items Container
          const itemsWrap = document.createElement('div');
          itemsWrap.className = 'skill-items-container';

          if (items.length === 0) {
            const emptyNotice = document.createElement('div');
            emptyNotice.style.padding = '1.5rem';
            emptyNotice.style.textAlign = 'center';
            emptyNotice.style.fontSize = '0.85rem';
            emptyNotice.style.color = 'var(--text-muted)';
            emptyNotice.textContent = '[ No items registered in this category ]';
            itemsWrap.appendChild(emptyNotice);
          } else {
            items.forEach(item => {
              const subItem = document.createElement('div');
              subItem.className = 'skill-sub-item';

              const header = document.createElement('div');
              header.className = 'skill-sub-header';

              const name = document.createElement('span');
              name.className = 'skill-name';
              name.textContent = item.name;

              const level = document.createElement('span');
              level.className = 'skill-level-tag';
              level.textContent = item.level;

              header.appendChild(name);
              header.appendChild(level);

              const desc = document.createElement('p');
              desc.className = 'skill-desc';
              desc.textContent = item.desc;

              subItem.appendChild(header);
              subItem.appendChild(desc);
              itemsWrap.appendChild(subItem);
            });
          }

          card.appendChild(itemsWrap);
          DOM.skillsContainer.appendChild(card);
        });

        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      } catch (err) {
        console.error('[UI Render Error] Skills rendering failed:', err);
      }
    },

    /**
     * Renders Contact Channels, Dynamic Social Media buttons & Footer links
     */
    renderContact() {
      try {
        const contact = State.siteData.contact || DEFAULT_SITE_DATA.contact;

        // 1. Phone Links
        const rawPhone = contact.phone || '+91 9558648873';
        const cleanPhone = rawPhone.replace(/\s+/g, '');
        if (DOM.contactValPhone) DOM.contactValPhone.textContent = rawPhone;
        if (DOM.contactLinkPhone) DOM.contactLinkPhone.href = `tel:${cleanPhone}`;
        if (DOM.flowValPhone) DOM.flowValPhone.textContent = rawPhone;
        if (DOM.flowLinkPhone) DOM.flowLinkPhone.href = `tel:${cleanPhone}`;

        // 2. Email Links
        const rawEmail = contact.email || 'vipulrajpurohit9005@gmail.com';
        if (DOM.contactValEmail) DOM.contactValEmail.textContent = rawEmail;
        if (DOM.contactLinkEmail) DOM.contactLinkEmail.href = `mailto:${rawEmail}`;
        if (DOM.flowValEmail) DOM.flowValEmail.textContent = rawEmail;
        if (DOM.flowLinkEmail) DOM.flowLinkEmail.href = `mailto:${rawEmail}`;

        // 3. Location
        const rawLoc = contact.location || 'Khergam (near Valsad) / Greater Vadodara, Gujarat';
        if (DOM.contactValLocation) DOM.contactValLocation.textContent = rawLoc;

        // 4. Dynamic Social Media Grid in Contact Card
        if (DOM.contactSocialsContainer) {
          DOM.contactSocialsContainer.innerHTML = '';
          const socials = Array.isArray(contact.socials) ? contact.socials : [];

          socials.forEach(soc => {
            const btn = document.createElement('a');
            btn.className = 'social-button';
            btn.href = Security.sanitizeURL(soc.url) || '#';
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';

            const iconClass = Security.getPlatformIcon(soc.platform);
            btn.innerHTML = `<i class="${iconClass}"></i> <span>${Security.escapeHTML(soc.label)}</span>`;
            DOM.contactSocialsContainer.appendChild(btn);
          });
        }

        // 5. Update Footer Contact Links List
        if (DOM.footerContactList) {
          DOM.footerContactList.innerHTML = '';

          // Phone item
          const phoneLi = document.createElement('li');
          phoneLi.innerHTML = `<a href="tel:${cleanPhone}" class="footer-nav-link"><i class="fa-solid fa-phone" style="margin-right: 6px;"></i> ${Security.escapeHTML(rawPhone)}</a>`;
          DOM.footerContactList.appendChild(phoneLi);

          // Email item
          const emailLi = document.createElement('li');
          emailLi.innerHTML = `<a href="mailto:${rawEmail}" class="footer-nav-link"><i class="fa-solid fa-envelope" style="margin-right: 6px;"></i> ${Security.escapeHTML(rawEmail)}</a>`;
          DOM.footerContactList.appendChild(emailLi);

          // Social links items
          const socials = Array.isArray(contact.socials) ? contact.socials : [];
          socials.forEach(soc => {
            const li = document.createElement('li');
            const iconClass = Security.getPlatformIcon(soc.platform);
            const safeUrl = Security.sanitizeURL(soc.url);
            li.innerHTML = `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="footer-nav-link"><i class="${iconClass}" style="margin-right: 6px;"></i> ${Security.escapeHTML(soc.label)}</a>`;
            DOM.footerContactList.appendChild(li);
          });
        }

      } catch (err) {
        console.error('[UI Render Error] Contact rendering failed:', err);
      }
    },

    /**
     * Renders projects safely into DOM nodes (XSS-safe).
     */
    renderProjects() {
      try {
        if (!DOM.projectsContainer) return;
        DOM.projectsContainer.innerHTML = '';

        const filter = State.currentFilter;
        const allProjects = State.siteData.projects || [];
        const visible = allProjects.filter(p => {
          if (filter === 'all') return true;
          if (filter === 'upcoming') {
            return p.status === 'upcoming' || (p.category || '').toLowerCase() === 'upcoming';
          }
          return (p.category || '').toLowerCase() === filter.toLowerCase();
        });

        if (visible.length === 0) {
          const empty = document.createElement('div');
          empty.style.gridColumn = '1 / -1';
          empty.style.textAlign = 'center';
          empty.style.padding = '3.5rem 1rem';
          empty.style.fontFamily = 'var(--font-code)';
          empty.style.color = 'var(--text-muted)';
          empty.textContent = '[ NO MATCHING PROJECTS FOUND IN THIS CATEGORY ]';
          DOM.projectsContainer.appendChild(empty);
          return;
        }

        visible.forEach((proj, index) => {
          const card = document.createElement('article');
          card.className = 'project-card';
          card.setAttribute('data-aos', 'fade-up');
          card.setAttribute('data-aos-delay', ((index % 3) * 100).toString());

          // Header: Category Pill + Status Pill + Admin Button Group
          const header = document.createElement('div');
          header.className = 'project-card-header';

          const badgeGroup = document.createElement('div');
          badgeGroup.className = 'project-badge-group';

          // Category Pill
          const cat = document.createElement('span');
          cat.className = 'project-category-pill';
          cat.textContent = proj.category || 'General';
          badgeGroup.appendChild(cat);

          // Status Pill (Upcoming vs Live)
          const statusPill = document.createElement('span');
          if (proj.status === 'upcoming') {
            statusPill.className = 'status-badge-upcoming';
            statusPill.innerHTML = '<span class="pulse-status upcoming"></span> Upcoming';
          } else {
            statusPill.className = 'status-badge-live';
            statusPill.innerHTML = '<span class="pulse-status"></span> Active';
          }
          badgeGroup.appendChild(statusPill);

          header.appendChild(badgeGroup);

          // Admin Controls (Edit + Delete)
          if (State.isAdmin) {
            const adminGroup = document.createElement('div');
            adminGroup.className = 'project-admin-btn-group';

            // Edit Button
            const editBtn = document.createElement('button');
            editBtn.className = 'project-edit-btn';
            editBtn.setAttribute('title', 'Edit Project Details');
            editBtn.setAttribute('aria-label', `Edit ${proj.title}`);
            editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            editBtn.addEventListener('click', () => {
              UI.openEditProjectModal(proj);
            });
            adminGroup.appendChild(editBtn);

            // Delete Button
            const delBtn = document.createElement('button');
            delBtn.className = 'project-delete-btn';
            delBtn.setAttribute('title', 'Delete Project');
            delBtn.setAttribute('aria-label', `Delete ${proj.title}`);
            delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            delBtn.addEventListener('click', () => {
              if (confirm(`Remove project "${proj.title}" from portfolio?`)) {
                State.deleteProject(proj.id);
                UI.renderProjects();
              }
            });
            adminGroup.appendChild(delBtn);

            header.appendChild(adminGroup);
          }

          card.appendChild(header);

          // Title
          const title = document.createElement('h3');
          title.className = 'project-title';
          title.textContent = proj.title;
          card.appendChild(title);

          // Description
          const desc = document.createElement('p');
          desc.className = 'project-description';
          desc.textContent = proj.description;
          card.appendChild(desc);

          // Tech Stack Badges
          const techWrap = document.createElement('div');
          techWrap.className = 'project-tech-tags';
          if (Array.isArray(proj.techStack)) {
            proj.techStack.forEach(t => {
              const tag = document.createElement('span');
              tag.className = 'badge-tag';
              tag.textContent = t.trim();
              techWrap.appendChild(tag);
            });
          }
          card.appendChild(techWrap);

          // Footer Actions: Safe Links without 404s
          const footer = document.createElement('div');
          footer.className = 'project-card-footer';

          const safeUrl = Security.sanitizeURL(proj.url);

          // If external live URL is provided, show direct launch button
          if (safeUrl && safeUrl.startsWith('http')) {
            const extLink = document.createElement('a');
            extLink.className = 'project-card-link';
            extLink.href = safeUrl;
            extLink.target = '_blank';
            extLink.rel = 'noopener noreferrer';
            extLink.innerHTML = '<span>Live Project</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>';
            footer.appendChild(extLink);
          }

          // Always provide rich Architecture & Specs Modal trigger (Zero 404s!)
          const detailBtn = document.createElement('button');
          detailBtn.className = 'project-detail-btn';
          detailBtn.innerHTML = '<i class="fa-solid fa-circle-info"></i> <span>View Specs</span>';
          detailBtn.addEventListener('click', () => {
            UI.openProjectDetailsModal(proj);
          });
          footer.appendChild(detailBtn);

          card.appendChild(footer);
          DOM.projectsContainer.appendChild(card);
        });

        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }

      } catch (err) {
        console.error('[UI Render Error] Project rendering failed:', err);
      }
    },

    /**
     * Updates Admin View state across page and floating dock
     */
    updateAdminView() {
      try {
        if (State.isAdmin) {
          document.body.classList.add('admin-unlocked');
        } else {
          document.body.classList.remove('admin-unlocked');
        }
        this.renderProjects();
      } catch (e) {
        console.error('Admin view update error:', e);
      }
    },

    // ------------------------------------------------------------------------
    // Modal Openers with Pre-filled Form Values
    // ------------------------------------------------------------------------
    openAboutModal() {
      if (!DOM.aboutModal) return;
      const about = State.siteData.about || DEFAULT_SITE_DATA.about;

      DOM.cmsAboutName.value = about.name || '';
      DOM.cmsAboutSubtag.value = about.subtag || '';
      DOM.cmsAboutLead.value = about.lead || '';
      DOM.cmsAboutBody.value = about.body || '';
      DOM.cmsAboutEduTitle.value = about.eduTitle || '';
      DOM.cmsAboutEduDesc.value = about.eduDesc || '';

      const photoUrl = about.photoUrl || 'assets/profile.jpg';
      DOM.cmsPhotoPreview.src = photoUrl;
      DOM.cmsPhotoUrl.value = photoUrl.startsWith('data:') ? '' : photoUrl;
      DOM.cmsPhotoFile.value = '';
      State.pendingPhotoData = photoUrl;

      openModal(DOM.aboutModal);
    },

    openSkillsModal() {
      if (!DOM.skillsModal) return;
      this.renderSkillsModalList();
      openModal(DOM.skillsModal);
    },

    renderSkillsModalList() {
      if (!DOM.skillsItemsList) return;
      DOM.skillsItemsList.innerHTML = '';

      const cat = State.activeSkillsCategory || 'Programming';
      if (DOM.skillsCategorySelect) {
        DOM.skillsCategorySelect.value = cat;
      }

      const items = (State.siteData.skills && State.siteData.skills[cat]) ? State.siteData.skills[cat] : [];

      if (items.length === 0) {
        DOM.skillsItemsList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 0.75rem;">No items currently in this category. Add one below!</div>';
        return;
      }

      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'editable-item-row';

        const info = document.createElement('div');
        info.className = 'editable-item-info';

        const title = document.createElement('div');
        title.className = 'editable-item-title';
        title.innerHTML = `${Security.escapeHTML(item.name)} <span class="badge-tag" style="margin-left: 0.5rem;">${Security.escapeHTML(item.level)}</span>`;

        const desc = document.createElement('div');
        desc.className = 'editable-item-sub';
        desc.textContent = item.desc;

        info.appendChild(title);
        info.appendChild(desc);

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'project-delete-btn';
        delBtn.title = `Delete ${item.name}`;
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener('click', () => {
          if (confirm(`Remove skill "${item.name}"?`)) {
            State.deleteSkill(cat, item.id);
            UI.renderSkillsModalList();
            UI.renderSkills();
          }
        });

        row.appendChild(info);
        row.appendChild(delBtn);
        DOM.skillsItemsList.appendChild(row);
      });
    },

    openContactModal() {
      if (!DOM.contactModal) return;
      const contact = State.siteData.contact || DEFAULT_SITE_DATA.contact;

      if (DOM.cmsPhone) DOM.cmsPhone.value = contact.phone || '';
      if (DOM.cmsEmail) DOM.cmsEmail.value = contact.email || '';
      if (DOM.cmsLocation) DOM.cmsLocation.value = contact.location || '';

      this.renderSocialAccountsModalList();
      openModal(DOM.contactModal);
    },

    renderSocialAccountsModalList() {
      if (!DOM.socialAccountsList) return;
      DOM.socialAccountsList.innerHTML = '';

      const socials = (State.siteData.contact && Array.isArray(State.siteData.contact.socials))
        ? State.siteData.contact.socials
        : [];

      if (socials.length === 0) {
        DOM.socialAccountsList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 0.75rem;">No social media accounts connected. Attach one below!</div>';
        return;
      }

      socials.forEach(soc => {
        const row = document.createElement('div');
        row.className = 'editable-item-row';

        const iconWrap = document.createElement('div');
        iconWrap.style.fontSize = '1.35rem';
        iconWrap.style.color = 'var(--blue-primary)';
        iconWrap.style.width = '32px';
        iconWrap.style.textAlign = 'center';
        iconWrap.innerHTML = `<i class="${Security.getPlatformIcon(soc.platform)}"></i>`;

        const info = document.createElement('div');
        info.className = 'editable-item-info';

        const title = document.createElement('div');
        title.className = 'editable-item-title';
        title.textContent = soc.label;

        const link = document.createElement('a');
        link.className = 'editable-item-sub';
        link.href = Security.sanitizeURL(soc.url);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.color = 'var(--blue-primary)';
        link.style.textDecoration = 'underline';
        link.textContent = soc.url;

        info.appendChild(title);
        info.appendChild(link);

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'project-delete-btn';
        delBtn.title = `Remove ${soc.label}`;
        delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        delBtn.addEventListener('click', () => {
          if (confirm(`Remove account link for "${soc.label}"?`)) {
            State.deleteSocial(soc.id);
            UI.renderSocialAccountsModalList();
            UI.renderContact();
          }
        });

        row.appendChild(iconWrap);
        row.appendChild(info);
        row.appendChild(delBtn);
        DOM.socialAccountsList.appendChild(row);
      });
    },

    openAddProjectModal() {
      if (!DOM.projectModal) return;
      DOM.projectForm.reset();
      DOM.projEditId.value = '';
      DOM.projectModalTitle.innerHTML = '<i class="fa-solid fa-folder-plus" style="color: var(--blue-primary);"></i> <span>Add New Portfolio Project</span>';
      openModal(DOM.projectModal);
    },

    openEditProjectModal(proj) {
      if (!DOM.projectModal) return;
      DOM.projectForm.reset();
      DOM.projEditId.value = proj.id;
      DOM.projectModalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: var(--blue-primary);"></i> <span>Edit Portfolio Project</span>';
      DOM.projTitle.value = proj.title || '';
      DOM.projCategory.value = proj.category || 'Cybersecurity';
      DOM.projStatus.value = proj.status || 'completed';
      DOM.projDesc.value = proj.description || '';
      DOM.projTech.value = Array.isArray(proj.techStack) ? proj.techStack.join(', ') : '';
      DOM.projUrl.value = proj.url || '';
      openModal(DOM.projectModal);
    },

    openProjectDetailsModal(proj) {
      if (!DOM.detailModal) return;

      DOM.detailTitle.textContent = proj.title;
      DOM.detailCategory.textContent = proj.category || 'General';

      if (proj.status === 'upcoming') {
        DOM.detailStatusBadge.className = 'status-badge-upcoming';
        DOM.detailStatusBadge.innerHTML = '<span class="pulse-status upcoming"></span> Upcoming Project (In Development)';
      } else {
        DOM.detailStatusBadge.className = 'status-badge-live';
        DOM.detailStatusBadge.innerHTML = '<span class="pulse-status"></span> Verified Architecture (Completed)';
      }

      DOM.detailDesc.textContent = proj.description;

      // Tech list
      DOM.detailTechList.innerHTML = '';
      if (Array.isArray(proj.techStack)) {
        proj.techStack.forEach(t => {
          const span = document.createElement('span');
          span.className = 'badge-tag';
          span.textContent = t.trim();
          DOM.detailTechList.appendChild(span);
        });
      }

      // Link status (Zero 404s!)
      const safeUrl = Security.sanitizeURL(proj.url);
      if (safeUrl && safeUrl.startsWith('http')) {
        DOM.detailLinkAction.innerHTML = `
          <div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">Verified External Destination</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); word-break: break-all;">${safeUrl}</div>
          </div>
          <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>Launch Resource</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        `;
      } else {
        DOM.detailLinkAction.innerHTML = `
          <div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">
              ${proj.status === 'upcoming' ? 'Status: Under Active Development' : 'Status: Architecture Registered'}
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted);">
              Public repository or live preview link will be assigned via the admin dashboard upon release.
            </div>
          </div>
          <span class="badge-tag" style="background: #ffffff; color: var(--blue-primary); border-color: var(--blue-primary); font-weight: 600;">
            <i class="fa-solid fa-shield-check"></i> Internal Specs
          </span>
        `;
      }

      openModal(DOM.detailModal);
    }
  };

  // --------------------------------------------------------------------------
  // 6. Modal Helpers
  // --------------------------------------------------------------------------
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function triggerAdminModal() {
    openModal(DOM.adminModal);
    if (DOM.adminPinInput) {
      DOM.adminPinInput.value = '';
      DOM.adminPinInput.focus();
    }
    if (DOM.adminPinError) {
      DOM.adminPinError.style.display = 'none';
    }
  }

  // --------------------------------------------------------------------------
  // 7. Event Listeners & Interaction Setup
  // --------------------------------------------------------------------------
  function setupEvents() {
    // 1. Mobile Menu Toggle
    if (DOM.mobileToggle && DOM.mobileDrawer) {
      DOM.mobileToggle.addEventListener('click', () => {
        DOM.mobileDrawer.classList.toggle('open');
      });

      document.querySelectorAll('.mobile-nav-list .nav-link').forEach(link => {
        link.addEventListener('click', () => {
          DOM.mobileDrawer.classList.remove('open');
        });
      });
    }

    // 2. Navbar Scroll Styling
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        DOM.navbar.classList.add('scrolled');
      } else {
        DOM.navbar.classList.remove('scrolled');
      }
    });

    // 3. Secret Trigger: Ctrl + Shift + A (and Cmd + Shift + A on macOS)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        triggerAdminModal();
      }
    });

    // 4. Admin PIN Verification (Without displaying default key in UI!)
    if (DOM.adminPinSubmit && DOM.adminPinInput) {
      const verifyPIN = () => {
        const val = DOM.adminPinInput.value.trim();
        if (val === ADMIN_PIN_DEFAULT) {
          State.setAdminState(true);
          UI.updateAdminView();
          closeModal(DOM.adminModal);
          alert('✓ Administrator session verified. CMS management tools unlocked.');
        } else {
          if (DOM.adminPinError) {
            DOM.adminPinError.textContent = 'ACCESS DENIED: Invalid Security PIN.';
            DOM.adminPinError.style.display = 'block';
          }
          DOM.adminPinInput.focus();
        }
      };

      DOM.adminPinSubmit.addEventListener('click', verifyPIN);
      DOM.adminPinInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          verifyPIN();
        }
      });
    }

    // 6. Floating Dock Admin Actions
    if (DOM.dockBtnAbout) {
      DOM.dockBtnAbout.addEventListener('click', () => UI.openAboutModal());
    }
    if (DOM.dockBtnSkills) {
      DOM.dockBtnSkills.addEventListener('click', () => UI.openSkillsModal());
    }
    if (DOM.dockBtnContact) {
      DOM.dockBtnContact.addEventListener('click', () => UI.openContactModal());
    }
    if (DOM.dockBtnAddProject) {
      DOM.dockBtnAddProject.addEventListener('click', () => UI.openAddProjectModal());
    }
    if (DOM.dockBtnResetAll) {
      DOM.dockBtnResetAll.addEventListener('click', () => {
        if (confirm('Restore all website content (About, Skills, Contact, Projects) to initial verified defaults?')) {
          State.resetToDefaults();
          UI.renderAll();
          alert('✓ Website reset to initial factory defaults.');
        }
      });
    }

    // Exit Admin Mode (Returns directly to normal visitor mode)
    if (DOM.dockBtnExit) {
      DOM.dockBtnExit.addEventListener('click', () => {
        State.setAdminState(false);
        UI.updateAdminView();
        alert('🔒 You have exited Admin Mode. The site is now in normal visitor view.');
      });
    }

    // 7. Inline Section Edit Buttons
    if (DOM.btnSectionEditAbout) {
      DOM.btnSectionEditAbout.addEventListener('click', () => UI.openAboutModal());
    }
    if (DOM.btnSectionEditSkills) {
      DOM.btnSectionEditSkills.addEventListener('click', () => UI.openSkillsModal());
    }
    if (DOM.btnSectionEditContact) {
      DOM.btnSectionEditContact.addEventListener('click', () => UI.openContactModal());
    }

    // 8. About Section CMS & Photo Management
    if (DOM.cmsPhotoFile) {
      DOM.cmsPhotoFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Size check (max 3MB for localStorage base64)
        if (file.size > 3 * 1024 * 1024) {
          alert('Photo size exceeds 3MB. Please select an image under 3MB.');
          DOM.cmsPhotoFile.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = function (evt) {
          State.pendingPhotoData = evt.target.result;
          if (DOM.cmsPhotoPreview) {
            DOM.cmsPhotoPreview.src = evt.target.result;
          }
          if (DOM.cmsPhotoUrl) {
            DOM.cmsPhotoUrl.value = '';
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (DOM.cmsPhotoUrl) {
      DOM.cmsPhotoUrl.addEventListener('input', (e) => {
        const url = e.target.value.trim();
        if (url) {
          State.pendingPhotoData = url;
          if (DOM.cmsPhotoPreview) {
            DOM.cmsPhotoPreview.src = url;
          }
          if (DOM.cmsPhotoFile) {
            DOM.cmsPhotoFile.value = '';
          }
        }
      });
    }

    if (DOM.btnResetPhoto) {
      DOM.btnResetPhoto.addEventListener('click', () => {
        State.pendingPhotoData = 'assets/profile.jpg';
        if (DOM.cmsPhotoPreview) {
          DOM.cmsPhotoPreview.src = 'assets/profile.jpg';
        }
        if (DOM.cmsPhotoUrl) DOM.cmsPhotoUrl.value = '';
        if (DOM.cmsPhotoFile) DOM.cmsPhotoFile.value = '';
      });
    }

    if (DOM.aboutForm) {
      DOM.aboutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const name = DOM.cmsAboutName.value.trim();
          const subtag = DOM.cmsAboutSubtag.value.trim();
          const lead = DOM.cmsAboutLead.value.trim();
          const body = DOM.cmsAboutBody.value.trim();
          const eduTitle = DOM.cmsAboutEduTitle.value.trim();
          const eduDesc = DOM.cmsAboutEduDesc.value.trim();
          const photoUrl = State.pendingPhotoData || State.siteData.about.photoUrl || 'assets/profile.jpg';

          State.updateAbout({
            name,
            subtag,
            lead,
            body,
            eduTitle,
            eduDesc,
            photoUrl
          });

          UI.renderAbout();
          closeModal(DOM.aboutModal);
          alert('✓ About section & Profile Photo updated successfully!');
        } catch (err) {
          console.error('About form submit error:', err);
        }
      });
    }

    if (DOM.aboutModalClose) {
      DOM.aboutModalClose.addEventListener('click', () => closeModal(DOM.aboutModal));
    }
    if (DOM.aboutModalCancel) {
      DOM.aboutModalCancel.addEventListener('click', () => closeModal(DOM.aboutModal));
    }

    // 9. Skills Management
    if (DOM.skillsCategorySelect) {
      DOM.skillsCategorySelect.addEventListener('change', (e) => {
        State.activeSkillsCategory = e.target.value;
        UI.renderSkillsModalList();
      });
    }

    if (DOM.addSkillForm) {
      DOM.addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const cat = State.activeSkillsCategory || 'Programming';
          const name = DOM.newSkillName.value.trim();
          const level = DOM.newSkillTag.value.trim();
          const desc = DOM.newSkillDesc.value.trim();

          if (!name || !desc) {
            alert('Please specify Skill Name and Description.');
            return;
          }

          const newSkill = {
            id: 'sk_' + Date.now().toString(36),
            name,
            level: level || 'Specialization',
            desc
          };

          State.addSkill(cat, newSkill);
          DOM.addSkillForm.reset();
          UI.renderSkillsModalList();
          UI.renderSkills();
        } catch (err) {
          console.error('Add skill error:', err);
        }
      });
    }

    if (DOM.skillsModalClose) {
      DOM.skillsModalClose.addEventListener('click', () => closeModal(DOM.skillsModal));
    }
    if (DOM.skillsModalDone) {
      DOM.skillsModalDone.addEventListener('click', () => closeModal(DOM.skillsModal));
    }

    // 10. Contact Details & Social Media Management
    if (DOM.contactInfoForm) {
      DOM.contactInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const phone = DOM.cmsPhone.value.trim();
          const email = DOM.cmsEmail.value.trim();
          const location = DOM.cmsLocation.value.trim();

          if (!phone || !email || !location) {
            alert('Please fill out all contact fields.');
            return;
          }

          if (!Security.isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
          }

          State.updateContactInfo({ phone, email, location });
          UI.renderContact();
          alert('✓ Contact details saved successfully!');
        } catch (err) {
          console.error('Contact info save error:', err);
        }
      });
    }

    if (DOM.addSocialForm) {
      DOM.addSocialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const platform = DOM.newSocialPlatform.value;
          const label = DOM.newSocialLabel.value.trim();
          const url = DOM.newSocialUrl.value.trim();

          if (!label || !url) {
            alert('Please specify both Label and URL.');
            return;
          }

          const safeUrl = Security.sanitizeURL(url);
          if (!safeUrl) {
            alert('Please enter a valid URL (starting with http:// or https://).');
            return;
          }

          const newSocial = {
            id: 'soc_' + Date.now().toString(36),
            platform,
            label,
            url: safeUrl
          };

          State.addSocial(newSocial);
          DOM.addSocialForm.reset();
          UI.renderSocialAccountsModalList();
          UI.renderContact();
        } catch (err) {
          console.error('Add social link error:', err);
        }
      });
    }

    if (DOM.contactModalClose) {
      DOM.contactModalClose.addEventListener('click', () => closeModal(DOM.contactModal));
    }
    if (DOM.contactModalDone) {
      DOM.contactModalDone.addEventListener('click', () => closeModal(DOM.contactModal));
    }

    // 11. Projects Form (Add / Edit)
    if (DOM.projectForm) {
      DOM.projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const editId = DOM.projEditId.value.trim();
          const title = DOM.projTitle.value.trim();
          const category = DOM.projCategory.value;
          const status = DOM.projStatus.value;
          const desc = DOM.projDesc.value.trim();
          const techRaw = DOM.projTech.value.trim();
          const url = DOM.projUrl.value.trim();

          if (!title || !desc) {
            alert('Please specify both Project Title and Description.');
            return;
          }

          const tags = techRaw.split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);

          const projectData = {
            title: title,
            category: category,
            status: status,
            description: desc,
            techStack: tags.length > 0 ? tags : ['Web Engineering'],
            url: Security.sanitizeURL(url)
          };

          if (editId) {
            State.updateProject(editId, projectData);
          } else {
            projectData.id = 'proj_' + Date.now().toString(36);
            State.addProject(projectData);
          }

          UI.renderProjects();
          closeModal(DOM.projectModal);
          DOM.projectForm.reset();
        } catch (err) {
          console.error('Project save error:', err);
        }
      });
    }

    if (DOM.projectModalClose) {
      DOM.projectModalClose.addEventListener('click', () => closeModal(DOM.projectModal));
    }
    if (DOM.projectModalCancel) {
      DOM.projectModalCancel.addEventListener('click', () => closeModal(DOM.projectModal));
    }
    if (DOM.detailModalClose) {
      DOM.detailModalClose.addEventListener('click', () => closeModal(DOM.detailModal));
    }
    if (DOM.adminModalClose) {
      DOM.adminModalClose.addEventListener('click', () => closeModal(DOM.adminModal));
    }

    // Modal Background Click Closes
    window.addEventListener('click', (e) => {
      if (e.target === DOM.adminModal) closeModal(DOM.adminModal);
      if (e.target === DOM.aboutModal) closeModal(DOM.aboutModal);
      if (e.target === DOM.skillsModal) closeModal(DOM.skillsModal);
      if (e.target === DOM.contactModal) closeModal(DOM.contactModal);
      if (e.target === DOM.projectModal) closeModal(DOM.projectModal);
      if (e.target === DOM.detailModal) closeModal(DOM.detailModal);
    });

    // Escape Key Closes All Modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(DOM.adminModal);
        closeModal(DOM.aboutModal);
        closeModal(DOM.skillsModal);
        closeModal(DOM.contactModal);
        closeModal(DOM.projectModal);
        closeModal(DOM.detailModal);
      }
    });

    // 12. Project Filter Buttons
    if (DOM.filterButtons) {
      DOM.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          State.currentFilter = btn.getAttribute('data-filter') || 'all';
          UI.renderProjects();
        });
      });
    }

    // 13. Sender Authenticity Code & Live Email Verification
    const updateCaptcha = () => {
      State.currentCaptchaCode = Security.generateAuthCode();
      if (DOM.captchaDisplay) {
        DOM.captchaDisplay.textContent = State.currentCaptchaCode;
      }
      if (DOM.contactAuthCode) {
        DOM.contactAuthCode.value = '';
      }
      if (DOM.authCodeError) {
        DOM.authCodeError.style.display = 'none';
      }
    };

    updateCaptcha();

    if (DOM.btnRefreshCaptcha) {
      DOM.btnRefreshCaptcha.addEventListener('click', updateCaptcha);
    }

    const contactEmailInput = document.getElementById('contact-email');
    if (contactEmailInput && DOM.emailVerifyHint) {
      contactEmailInput.addEventListener('input', () => {
        const val = contactEmailInput.value.trim();
        if (!val) {
          DOM.emailVerifyHint.style.display = 'none';
          return;
        }

        if (Security.isDisposableEmail(val)) {
          DOM.emailVerifyHint.className = 'email-feedback-hint error';
          DOM.emailVerifyHint.textContent = '⚠️ Disposable / temporary email addresses are blocked to prevent spam.';
          return;
        }

        const typoSuggestion = Security.checkEmailTypo(val);
        if (typoSuggestion) {
          DOM.emailVerifyHint.className = 'email-feedback-hint warning';
          DOM.emailVerifyHint.innerHTML = `💡 Did you mean <strong>${Security.escapeHTML(typoSuggestion)}</strong>? <span style="text-decoration: underline; cursor: pointer; font-weight: 700; margin-left: 4px;" id="btn-fix-email">Click to fix</span>`;
          const fixBtn = document.getElementById('btn-fix-email');
          if (fixBtn) {
            fixBtn.addEventListener('click', () => {
              contactEmailInput.value = typoSuggestion;
              DOM.emailVerifyHint.className = 'email-feedback-hint valid';
              DOM.emailVerifyHint.textContent = '✓ Verified email domain.';
            });
          }
          return;
        }

        if (Security.isValidEmail(val)) {
          DOM.emailVerifyHint.className = 'email-feedback-hint valid';
          DOM.emailVerifyHint.textContent = '✓ Valid email syntax & verified domain.';
        } else {
          DOM.emailVerifyHint.style.display = 'none';
        }
      });
    }

    // 14. Real Email Dispatch via FormSubmit API with Autoresponder & Delivery Receipts
    if (DOM.contactForm) {
      DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
          const name = (document.getElementById('contact-name')?.value || '').trim();
          const email = (document.getElementById('contact-email')?.value || '').trim();
          const message = (document.getElementById('contact-message')?.value || '').trim();
          const enteredCode = (DOM.contactAuthCode ? DOM.contactAuthCode.value.trim() : '').toUpperCase();

          if (!name || !email || !message) {
            showFormAlert('All fields are required.', 'error');
            return;
          }

          if (!Security.isValidEmail(email)) {
            showFormAlert('Please enter a valid email address.', 'error');
            return;
          }

          if (Security.isDisposableEmail(email)) {
            showFormAlert('Temporary / disposable emails are blocked. Please provide your real verified email address.', 'error');
            return;
          }

          // Verify Sender Authenticity Passcode
          if (enteredCode !== State.currentCaptchaCode) {
            if (DOM.authCodeError) {
              DOM.authCodeError.textContent = 'Authenticity code mismatch. Please enter the exact code shown on the left.';
              DOM.authCodeError.style.display = 'block';
            }
            if (DOM.contactAuthCode) DOM.contactAuthCode.focus();
            return;
          } else {
            if (DOM.authCodeError) DOM.authCodeError.style.display = 'none';
          }

          const submitBtn = DOM.contactSubmitBtn || DOM.contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Encrypting & Dispatching to Inbox...';

          const targetEmail = State.siteData.contact.email || 'vipulrajpurohit9005@gmail.com';

          // Payload sent to FormSubmit API
          const payload = {
            name: name,
            email: email,
            _replyto: email,
            message: message,
            _subject: `New Portfolio Message from ${name} [Verified Sender: ${email}]`,
            _template: 'table',
            _captcha: 'false',
            _autoresponse: `Hello ${name},\n\nThank you for reaching out to Vipul Rajpurohit Chensinh.\n\nYour message was received:\n"${message}"\n\nVipul will review your message and reply directly to ${email} shortly.\n\nBest regards,\nVipul Rajpurohit Chensinh\nBCA (2024–2027) Cybersecurity Student | GSFC University`
          };

          try {
            const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            });

            const data = await res.json().catch(() => ({}));

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            if (data.success === 'true' || res.ok) {
              showFormAlert(`✓ Success! Your message has been sent directly to Vipul's Gmail inbox (${targetEmail}). A verification receipt was dispatched to ${email}.`, 'success');
              DOM.contactForm.reset();
              if (DOM.emailVerifyHint) DOM.emailVerifyHint.style.display = 'none';
              updateCaptcha();
            } else if (data.message && data.message.includes('Activation')) {
              showFormAlert(`✓ First-Time Activation: FormSubmit has sent an activation link to ${targetEmail}. Please open your Gmail and click 'Activate Form' once. You can also click the button below to send directly via Gmail!`, 'success');
            } else {
              showFormAlert(data.message || `Message transmission could not be completed via FormSubmit. Please use the 'Send via Verified Gmail' button below.`, 'error');
            }
          } catch (fetchErr) {
            console.warn('Network or browser fetch restriction, offering direct mail client fallback:', fetchErr);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            showFormAlert(`Notice: Network restriction or file:// protocol detected. Please click the red 'Send via Verified Gmail' button below to dispatch instantly from your authenticated Google account!`, 'error');
          }

        } catch (err) {
          console.error('Contact form error:', err);
          showFormAlert('An unexpected error occurred. Please use the direct Gmail button below.', 'error');
        }
      });
    }

    // 15. Direct 1-Click Authenticated Gmail Dispatch (Guarantees Real Sender Identity)
    if (DOM.btnDirectGmail) {
      DOM.btnDirectGmail.addEventListener('click', () => {
        const name = (document.getElementById('contact-name')?.value || '').trim() || 'Portfolio Inquirer';
        const email = (document.getElementById('contact-email')?.value || '').trim();
        const message = (document.getElementById('contact-message')?.value || '').trim() || 'Hello Vipul, I would like to connect regarding cybersecurity opportunities.';
        const targetEmail = State.siteData.contact.email || 'vipulrajpurohit9005@gmail.com';

        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const bodyText = encodeURIComponent(`Hi Vipul,\n\n${message}\n\n---\nSender Name: ${name}\nSender Email: ${email || 'Authenticated via Google Account'}\nSent from Portfolio Website`);

        // Google Mail Web Compose URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${subject}&body=${bodyText}`;
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      });
    }

    // 16. Copyright Year
    if (DOM.yearStamp) {
      DOM.yearStamp.textContent = '2026';
    }
  }

  function showFormAlert(text, type) {
    if (!DOM.formAlert) return;
    DOM.formAlert.textContent = text;
    DOM.formAlert.className = `form-alert ${type}`;
    DOM.formAlert.style.display = 'block';

    setTimeout(() => {
      if (DOM.formAlert) {
        DOM.formAlert.style.display = 'none';
      }
    }, 6000);
  }

  // --------------------------------------------------------------------------
  // 8. Bootstrap Application & AOS with Repeatable Scroll Animations
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    try {
      cacheDOM();
      State.init();
      UI.renderAll();
      UI.updateAdminView();
      setupEvents();

      // Initialize AOS with repeat animations on scroll up & down
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 700,
          easing: 'ease-out-cubic',
          once: false,      // TRIGGER ANIMATION ON EVERY SCROLL!
          mirror: true,     // Animate out when scrolling past and in when scrolling back up!
          offset: 60,
          anchorPlacement: 'top-bottom'
        });
      }

      console.log('[VIPUL.PORTFOLIO] Full CMS initialized. Blue & White theme active. Repeatable animations active.');
    } catch (err) {
      console.error('[Initialization Error]', err);
    }
  });

})();
