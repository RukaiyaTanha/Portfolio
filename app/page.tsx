'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

const skillsByDomain = {
  Frontend: {
    Frameworks: [{ name: "React", logo: "/react-removebg-preview.png" }, { name: "Tailwind", logo: "/Tailwind_CSS_Logo.png" }],
    Languages: [{ name: "JavaScript", logo: "/JavaScript-logo.png" }],
    Styling: [{ name: "HTML", logo: "/html.png" }, { name: "CSS", logo: "/css.jpg" }],
  },
  Backend: {
    Languages: [{ name: "Java", logo: "/java-removebg-preview.png" }, { name: "Python", logo: "/python-removebg-preview.png" }, { name: "C#", logo: "/c_-removebg-preview.png" }, { name: "PHP", logo: "/php.png" }],
    Frameworks: [{ name: "Django", logo: "/dj-removebg-preview.png" }, { name: "ASP.NET", logo: "/net-removebg-preview.png" }, { name: "Laravel", logo: "/laravel.png" }],
    Databases: [{ name: "PostgreSQL", logo: "/PostgreSQL-Logo.png" }, { name: "MySQL", logo: "/MySQL-Logo.png" }],
  },
  DevOps: {
    Programming: [{ name: "Python", logo: "/python-removebg-preview.png" }],
    "Operating System": [{ name: "Linux (Ubuntu)", logo: "/ubuntu-logo-removebg-preview.png" }],
    "Version Control": [{ name: "Git", logo: "/git-removebg-preview.png" }],
    "Version Control Hosting": [{ name: "GitHub", logo: "/github-logo.png" }],
    Container: [{ name: "Docker", logo: "/docker-removebg-preview.png" }],
    "CI/CD": [{ name: "GitHub Actions", logo: "/github-actions-logo-removebg-preview.png" }],
    Cloud: [{ name: "AWS", logo: "/aws.png" }],
  },
  "AI/ML": {
    Frameworks: [{ name: "TensorFlow", logo: "/Tensorflow_logo.svg.png" }],
    Tools: [{ name: "Scikit-learn", logo: "" }, { name: "Pandas", logo: "" }],
  },
};

const projects = [
  {
    title: "Learnex",
    description: "An AI-based smart classroom system that allows students to take assessments, track topic-level performance and improvement trends, and receive personalized feedback through an interactive web interface built with Django and the Gemini API.",
    tech: [
      { name: "Django" },
      { name: "Python" },
      { name: "MySQL" },
    ],
    status: "Public",
    demo: "https://example.com",
    repo: "https://github.com/RukaiyaTanha/Learnex",
    image: "/learnex.png",
  },
  {
    title: "PetHub",
    description: "PetHub is a web‑based pet care management platform that enables pet owners, veterinarians, and caregivers to manage pet profiles, health records, vaccinations, appointments, and care schedules through dedicated role‑based dashboards.",
    tech: [
      { name: "ASP.NET" },
      { name: "C#" },
      { name: "MySQL" },
    ],
    status: "Public",
    demo: "https://example.com",
    repo: "https://github.com/RukaiyaTanha/Pet-Care-Management-System",
    image: "/pethub.png",
  },
  {
    title: "DineX",
    description: "Dinx is a C# Windows Forms application with MySQL backend that streamlines restaurant operations, enabling managers and staff to handle orders, menus, tables, inventory, and staff management efficiently through an intuitive desktop interface.",
    tech: [
      { name: "C#" },
      { name: "MySQL" },
      { name: "UI/UX (Windows Form)" },
    ],
    status: "Public",
    demo: "https://example.com",
    repo: "https://github.com/RukaiyaTanha/Restaurant-Management",
    image: "/dinex.png",
  },
  {
    title: "ChessArena",
    description: "A real-time multiplayer chess platform where players compete online, track match history and performance, and experience interactive gameplay through a modern, responsive user interface built with React and Firebase.",
    tech: [
      { name: "React.js" },
      { name: "JavaScript" },
      { name: "Tailwind" },
      { name: "Firebase" },
    ],
    status: "Public",
    demo: "https://example.com",
    repo: "https://github.com/RukaiyaTanha/ChessArena",
    image: "/chessarena.png",
  }
];

const achievements = [
  {
    id: 1,
    title: "Dean's List",
    icon: "🏆",
    shortDesc: "Recognized for academic excellence at AIUB",
    fullDesc: "Achieved Dean's List recognition three times for maintaining exceptional GPA and demonstrating outstanding academic performance across multiple semesters.",
    details: [
      "Consistent GPA above 3.85",
      "Excellence in Computer Science courses",
      "Active participation in academic committees"
    ],
    image: "/deanhonor.jpeg"
  },
];

const HERO_TEXT = "Hi, I'm Rokiya. I build clean, modern web experiences.";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education');
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Typewriter effect state
  const [typedText, setTypedText] = useState('');
  
  // Interactive bubbles state
  const bubblesRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Update bubble positions (smooth following)
      if (bubblesRef.current) {
        const bubbles = bubblesRef.current.querySelectorAll('.interactive-bubble');
        bubbles.forEach((bubble: Element, index: number) => {
          const htmlBubble = bubble as HTMLElement;
          const rect = htmlBubble.getBoundingClientRect();
          const bubbleX = rect.left + rect.width / 2;
          const bubbleY = rect.top + rect.height / 2;
          
          // Calculate distance from mouse
          const dx = e.clientX - bubbleX;
          const dy = e.clientY - bubbleY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Different behavior for each bubble
          const strength = 0.03 + (index * 0.01); // Varying follow strength
          
          // For bubbles close to mouse, add repel effect
          if (distance < 200) {
            const repelStrength = (200 - distance) / 200;
            const angle = Math.atan2(dy, dx);
            const offsetX = Math.cos(angle) * repelStrength * -30;
            const offsetY = Math.sin(angle) * repelStrength * -30;
            htmlBubble.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + repelStrength * 0.2})`;
          } else {
            // Follow mouse gently
            const moveX = dx * strength;
            const moveY = dy * strength;
            htmlBubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
          }
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= HERO_TEXT.length) {
        setTypedText(HERO_TEXT.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <div className="page">
      {/* Interactive Mouse-Following Bubbles */}
      <div ref={bubblesRef} className="interactive-bubbles-container">
        <div className="interactive-bubble bubble-1"></div>
        <div className="interactive-bubble bubble-2"></div>
        <div className="interactive-bubble bubble-3"></div>
        <div className="interactive-bubble bubble-4"></div>
        <div className="interactive-bubble bubble-5"></div>
      </div>
      
      <header className="navbar">
        <div className="nav-inner">
          <a className="logo" href="#home">
            <div className="logo-pic">
              <Image
                src="/profile.jpeg"
                alt="Rokiya"
                width={40}
                height={40}
                className="logo-image"
              />
            </div>
            <span className="logo-text">Rokiya Ibne Tanha</span>
          </a>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#achievements">Achievements</a>
            <a href="#projects">Projects</a>
            <a href="#publications">Publications</a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
        <div
          id="mobile-nav"
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        >
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
          <a href="#achievements" onClick={() => setIsMobileMenuOpen(false)}>Achievements</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          <a href="#publications" onClick={() => setIsMobileMenuOpen(false)}>Publications</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      </header>

      <main>
        <section id="home" className="section hero">
          <div className="hero-content">
            <p className="eyebrow animate-fade-in-up">Full Stack Developer</p>
            <h1 className="typewriter-text">
              {(() => {
                const rokiyaIndex = typedText.indexOf('Rokiya');
                if (rokiyaIndex === -1) {
                  return typedText;
                }
                return (
                  <>
                    {typedText.substring(0, rokiyaIndex)}
                    <span className="highlight-name">Rokiya</span>
                    {typedText.substring(rokiyaIndex + 6)}
                  </>
                );
              })()}
              <span className="cursor">|</span>
            </h1>
            <p className="subtitle animate-fade-in-up-delay">
              Full Stack Software Engineering Student with practical experience 
              across frontend interfaces and backend systems, focused on developing 
              reliable and well-structured web applications
            </p>
            <div className="button-row animate-fade-in-up-delay-2">
              <a className="btn primary" href="/cv.pdf" download>
                Download CV
              </a>
              <a className="btn ghost" href="#contact">
                Contact Me
              </a>
            </div>
            <div className="hero-stats animate-slide-up">
              <div>
                <h3>5+</h3>
                <p>Completed Projects</p>
              </div>
              <div>
                <h3>1.5</h3>
                <p>Years of learning</p>
              </div>
              <div>
                <h3>100%</h3>
                <p>Curiosity</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="profile-card">
              <div className="profile-glow" />
              <div className="profile-photo">
                <Image
                  src="/profile.jpeg"
                  alt="Rokiya Ibne Tanha"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="profile-info">
                <p className="tag">Open to opportunities</p>
                <p className="location">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="about" className="section about">
          <div className="section-title">
            <h2>About Me</h2>
            <p>
              I&apos;m a <span className="highlight">software engineering student</span> at <span className="highlight">AIUB</span> with practical experience in full-stack web development across <span className="highlight">React</span>, <span className="highlight">Tailwind</span>, <span className="highlight">Django</span>, <span className="highlight">Laravel</span>, and <span className="highlight">ASP.NET</span> through academic and personal projects.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              I&apos;ve worked with PostgreSQL and MySQL, and I&apos;m familiar with <span className="highlight">Git, Docker, and CI/CD</span> pipelines. I have hands-on experience with <span className="highlight">cloud deployment</span> on Vercel and AWS, plus academic exposure to TensorFlow and PyTorch.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              Outside of development, I enjoy <span className="highlight">watching movies</span> and exploring new technologies. I&apos;m passionate about solving real-world problems through elegant code.
            </p>
          </div>

          <div className="credentials-section">
            <div className="tab-nav">
              <button
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'education' && (
                <div className="credentials-list">
                  <div className="credential-item">
                    <div className="credential-date">2022 – Present</div>
                    <div className="credential-main">
                      <h3>Bachelor of Science (B.Sc.) in Computer Science and Engineering</h3>
                      <p className="credential-org">American International University – Bangladesh (AIUB)</p>
                    </div>
                  </div>
                  <div className="credential-item">
                    <div className="credential-date">2019 – 2021</div>
                    <div className="credential-main">
                      <h3>Higher Secondary School Certificate (HSC)</h3>
                      <p className="credential-org">Uttara High School and College</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'experience' && (
                <div className="credentials-list">
                  <div className="credential-item">
                    <div className="credential-date">February 2026 – Present</div>
                    <div className="credential-main">
                      <h3>Software Development Intern</h3>
                      <p className="credential-org"><span className="highlight">PrimeX Tech</span> · Uttara, Dhaka, Bangladesh</p>
                      <p className="company-desc">
                        PrimeX Technologies is a software development company where innovation meets expertise to create cutting-edge digital solutions. They specialize in powerful business applications, streamlining operations, and turning ideas into reality through technology.
                      </p>
                      <p className="company-desc">
                        Contributing to software development using <span className="highlight">Laravel</span> while gaining practical experience with full-stack workflows and modern development practices.
                      </p>
                      <div className="responsibilities">
                        <h4>Key Responsibilities</h4>
                        <ul>
                          <li>Building backend functionality and APIs for web applications</li>
                          <li>Participating in code reviews and implementing features under guidance</li>
                          <li>Working with relational databases: <span className="highlight">PostgreSQL</span> and <span className="highlight">MySQL</span></li>
                          <li>Mastering Git workflows for version control and team collaboration</li>
                          <li>Learning DevOps basics including <span className="highlight">Docker</span> and <span className="highlight">CI/CD</span> pipelines</li>
                        </ul>
                      </div>
                      <div className="experience-tech">
                        <span className="tech-tag">Laravel</span>
                        <span className="tech-tag">PostgreSQL</span>
                        <span className="tech-tag">MySQL</span>
                        <span className="tech-tag">Git</span>
                        <span className="tech-tag">Docker</span>
                        <span className="tech-tag">CI/CD</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="skills" className="section skills">
          <div className="section-title">
            <h2>Tech Stack</h2>
            <p>Key tools and technologies I use to build modern, scalable web applications and user interfaces.</p>
          </div>
          <div className="skills-by-domain">
            {Object.entries(skillsByDomain).map(([domain, content]) => (
              <div key={domain} className="skill-domain">
                <div className="domain-header">
                  <span className="domain-dot" />
                  <h3>{domain}</h3>
                </div>
                {typeof content === 'object' && !Array.isArray(content) ? (
                  <div className="domain-categories">
                    {Object.entries(content).map(([category, items]) => (
                      <div key={category} className="skill-category">
                        <p className="category-label">{category}</p>
                        <div className="category-items">
                          {items.map((skill) => (
                            <div key={skill.name} className="skill-badge-wrapper">
                              {skill.logo && (
                                <Image
                                  src={skill.logo}
                                  alt={skill.name}
                                  width={20}
                                  height={20}
                                  className="skill-logo"
                                />
                              )}
                              <span>{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}  
                  </div>
                ) : (
                  <div className="category-items">
                    {content.map((skill) => (
                      <div key={skill.name} className="skill-badge-wrapper">
                        {skill.logo && (
                          <Image
                            src={skill.logo}
                            alt={skill.name}
                            width={20}
                            height={20}
                            className="skill-logo"
                          />
                        )}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="achievements" className="section achievements">
          <div className="section-title">
            <h2>Achievements</h2>
            <p>Recognition and milestones in my learning journey.</p>
          </div>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${selectedAchievement === achievement.id ? 'active' : ''}`}
                onClick={() => setSelectedAchievement(selectedAchievement === achievement.id ? null : achievement.id)} 
                style={{ cursor: 'pointer' }}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-text">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.shortDesc}</p>
                  <span className="tap-me-badge">Click to view details ↓</span>
                </div>
              </div>
            ))}
          </div>

          {selectedAchievement && (
            <div className="achievement-details">
              {achievements.find(a => a.id === selectedAchievement) && (
                <div className="details-inner">
                  <button className="details-close" onClick={() => setSelectedAchievement(null)}>×</button>
                  <div className="details-image">
                    {achievements.find(a => a.id === selectedAchievement)?.image ? (
                      <Image
                        src={achievements.find(a => a.id === selectedAchievement)!.image}
                        alt={achievements.find(a => a.id === selectedAchievement)!.title}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <span>Achievement Preview</span>
                    )}
                  </div>
                  <div className="details-content">
                    <div className="details-header">
                      <div className="details-icon">{achievements.find(a => a.id === selectedAchievement)?.icon}</div>
                      <div className="details-text-content">
                        <h3>{achievements.find(a => a.id === selectedAchievement)?.title}</h3>
                        <p className="details-desc">{achievements.find(a => a.id === selectedAchievement)?.fullDesc}</p>
                      </div>
                    </div>
                    <div className="details-highlights">
                      <h4>Highlights</h4>
                      <ul>
                        {achievements.find(a => a.id === selectedAchievement)?.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <div className="section-divider"></div>

        <section id="projects" className="section projects">
          <div className="section-title">
            <h2>Projects</h2>
            <p>Showcasing projects that reflect my focus on thoughtful, user-centered design.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-header">
                  <h3>
                    {project.title === 'Learnex' && (
                      <>Learn<span className="highlight">ex</span></>
                    )}
                    {project.title === 'PetHub' && (
                      <>Pet<span className="highlight">Hub</span></>
                    )}
                    {project.title === 'DineX' && (
                      <>Dine<span className="highlight">X</span></>
                    )}
                    {project.title === 'ChessArena' && (
                      <>Chess<span className="highlight">Arena</span></>
                    )}
                    {!['Learnex', 'PetHub', 'DineX', 'ChessArena'].includes(project.title) && project.title}
                  </h3>
                  <span className="project-status public">{project.status}</span>
                </div>
                <div className="project-image">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span>Project Preview</span>
                  )}
                </div>
                <div className="project-body">
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((item) => (
                      <span key={item.name} className="tech-badge">
                        {item.name}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a className="btn small" href={project.demo}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                      </svg>
                      Live Demo
                    </a>
                    <a className="btn small ghost" href={project.repo}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="publications" className="section publications">
          <div className="section-title">
            <h2>Publications</h2>
            <p>Highlighting research papers, conference articles.</p>
          </div>
          <div className="publications-grid">
            <article className="publication-card">
              <div className="publication-header">
                <div className="publication-meta">
                  <span className="publication-date">2026</span>
                  <span className="publication-type">Journal (Work in Progress)</span>
                </div>
                <span className="publication-status private">🔒</span>
              </div>
              <h3>An AI-Based Smart Class Performance Tracker with Pattern Detection</h3>
              <p>Developed an AI-driven system to monitor student performance, detect weak areas, and provide automated feedback to support personalized learning and data-informed academic decisions.</p>
              <div className="publication-tags">
                <span>• AI</span>
                <span>• Django</span>
                <span>• EducationTech</span>
                <span>• GeminiAPI</span>
              </div>
              <a href="#" className="publication-link">Read More →</a>
            </article>
            <article className="publication-card">
              <div className="publication-header">
                <div className="publication-meta">
                  <span className="publication-date">2026</span>
                  <span className="publication-type">Research Paper</span>
                </div>
                <span className="publication-status private">🔒</span>
              </div>
              <h3>Enhanced YOLOv11 Architecture with CBAM and SE Attention for Multi-Class Alzheimer’s Disease Detection</h3>
              <p>Improved YOLOv11 with attention mechanisms (CBAM + SE Block) for early-stage Alzheimer’s detection from MRI scans, achieving 97.2% precision, 94.3% recall, and 99.4% mAP@50. Enhanced feature focus and localization enabled real-time, accurate multi-class AD classification.</p>
              <div className="publication-tags">
                <span>• DeepLearning</span>
                <span>• ComputerVision</span>
                <span>• AlzheimersDetection</span>
              </div>
              <a href="#" className="publication-link">Read More →</a>
            </article>
            <article className="publication-card">
              <div className="publication-header">
                <div className="publication-meta">
                  <span className="publication-date">2025</span>
                  <span className="publication-type">Conference</span>
                </div>
                <span className="publication-status private">🔒</span>
              </div>
              <h3>A Comparative Study of Machine Learning and Deep Learning for Brain Tumor Detection</h3>
              <p>Compared classical ML models (SVM, Random Forest, Logistic Regression) with CNN and MobileNetV2 for brain tumor detection from MRI scans, achieving 96% accuracy with deep learning and highlighting improvements in robustness, generalization, and model interpretability.</p>
              <div className="publication-tags">
                <span>• MachineLearning</span>
                <span>• DeepLearning</span>
                <span>• BrainTumorDetection</span>
              </div>
              <a href="#" className="publication-link">Read More →</a>
            </article>
          </div>
        </section>

        <div className="section-divider"></div>

        <section id="contact" className="section contact">
          <div className="section-title contact-title">
            <h2>Get In Touch</h2>
            <p>
              Ready to bring your ideas to life? Let&apos;s discuss how we can work
              together to create something extraordinary.
            </p>
          </div>

          <div className="contact-info-row">
            <div className="contact-info-item contact-location-link">
              <div className="contact-icon location-icon">📍</div>
              <div>
                <p className="contact-label">Location</p>
                <p className="contact-value">Dhaka, Bangladesh</p>
              </div>
            </div>
            <a href="mailto:tanharukiya@gmail.com" className="contact-info-item contact-email-link">
              <div className="contact-icon email-icon">✉️</div>
              <div>
                <p className="contact-label">Email</p>
                <p className="contact-value">tanharukiya@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="socials-section">
            <p className="socials-label">Follow My Work</p>
            <div className="socials-grid">
              <a href="https://github.com/RukaiyaTanha" className="social-icon github" title="GitHub" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/rukaiya-tanha-694b1720a/" className="social-icon linkedin" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <a href="#home" className="scroll-to-top">
        ↑
      </a>

      <footer className="footer">
        <p>Rokiya Ibne Tanha</p>
        <p>© 2025 All rights reserved</p>
      </footer>
    </div>
  );
}
