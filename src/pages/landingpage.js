

import React, {useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import styles from './landingpage.module.css';
import dash from "../figures/dash.png";
import av1 from "../figures/av1.jpg";
import av2 from "../figures/av2.jpg";
import ibm from "../figures/ibmm.jpg";
import microsoft from "../figures/micro.png";
import sense from "../figures/sense.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setShowModal(true);
    // Don't reset form immediately to allow user to see what they submitted
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  // Features data for the landing page
  const features = [
    {
      icon: '📊',
      title: 'Real-time Monitoring',
      description: 'Track all your IoT devices in real-time with our intuitive dashboard.'
    },
    {
      icon: '🔔',
      title: 'Instant Alerts',
      description: 'Receive immediate notifications when your devices require attention.'
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Monitor your devices from anywhere with our mobile-friendly interface.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level encryption ensures your IoT data remains secure.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Jane Smith',
      company: 'TechGiant Corp',
      quote: 'Sensekip has revolutionized how we manage our IoT infrastructure. The real-time monitoring capabilities have saved us countless hours.',
      avatar: av1
    },
    {
      name: 'Michael Johnson',
      company: 'Industrial Solutions Inc.',
      quote: 'The alert system is phenomenal.',
      avatar: av2
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How quickly can we get set up with Sensekip?',
      answer: 'Most clients are fully operational within 48 hours of registration approval. Our onboarding team will guide you through the entire process.'
    },
    {
      question: 'Is Sensekip compatible with all IoT devices?',
      answer: 'Sensekip supports most major IoT protocols including MQTT, HTTP/REST, and CoAP. Custom integrations are available for enterprise clients.'
    },
    {
      question: 'How secure is the Sensekip platform?',
      answer: 'We employ end-to-end encryption, regular security audits, and comply with industry standards like ISO 27001 and GDPR.'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.backgroundGradient}></div>
      <div className={styles.glowEffect1}></div>
      <div className={styles.glowEffect2}></div>
      
      {/* Success Modal */}
      {showModal && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3>Registration Successful!</h3>
            <p>Thank you for your interest in Sensekip. Our team will contact you shortly.</p>
            <button className={styles.primaryButton} onClick={closeModal}>Close</button>
          </motion.div>
        </motion.div>
      )}
      
      {/* Header */}
      <header className={styles.header}>
        <motion.div 
          className={styles.logo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* <img src="/api/placeholder/40/40" alt="Sensekip Logo" className={styles.logoImage} /> */}
          Sensekip
        </motion.div>
        
        <nav className={styles.navigation}>
          <ul>
            <li>
              <a 
                href="#home" 
                className={activeSection === 'home' ? styles.active : ''}
                onClick={() => setActiveSection('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                className={activeSection === 'features' ? styles.active : ''}
                onClick={() => setActiveSection('features')}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#testimonials"
                className={activeSection === 'testimonials' ? styles.active : ''}
                onClick={() => setActiveSection('testimonials')}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a 
                href="#faq"
                className={activeSection === 'faq' ? styles.active : ''}
                onClick={() => setActiveSection('faq')}
              >
                FAQ
              </a>
            </li>
            <li>
              <a 
                href="#contact"
                className={activeSection === 'contact' ? styles.active : ''}
                onClick={() => setActiveSection('contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        <div className={styles.headerButtons}>
          <motion.button 
            className={styles.outlineButton}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
          
          <motion.button 
            className={styles.loginButton}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')} 
          >
            Login
            {/* <Link to="/login">
            Login
            </Link> */}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section id="home" className={styles.heroSection}>
          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Smart IoT Monitoring for the Modern Enterprise
            </motion.h1>
            <motion.p 
              className={styles.heroDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Sensekip provides a comprehensive solution for monitoring and managing your IoT infrastructure. Get real-time insights, instant alerts, and powerful analytics all in one platform.
            </motion.p>
            
            <motion.div
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                className={styles.primaryButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              
              <motion.button
                className={styles.secondaryButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
            
            <motion.div
              className={styles.statsBanner}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Enterprise Clients</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1M+</span>
                <span className={styles.statLabel}>Devices Monitored</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99.9%</span>
                <span className={styles.statLabel}>Uptime</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img src={dash} alt="IoT Dashboard" />
          </motion.div>
        </section>
        
        {/* Features Section */}
        <section id="features" className={styles.featuresSection}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Powerful Features</h2>
            <p>Everything you need to manage your IoT ecosystem effectively</p>
          </motion.div>
          
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className={styles.testimonialsSection}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>What Our Clients Say</h2>
            <p>Trusted by leading enterprises worldwide</p>
          </motion.div>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={styles.testimonialCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
                </div>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.avatar} alt={testimonial.name} className={styles.testimonialAvatar} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className={styles.faqSection}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about Sensekip</p>
          </motion.div>
          
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section before form */}
        <section className={styles.ctaSection}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Transform Your IoT Management?</h2>
            <p>Join hundreds of enterprises already using Sensekip to monitor their IoT infrastructure.</p>
            <button className={styles.primaryButton}>Schedule a Demo</button>
          </motion.div>
        </section>
        
        {/* Registration Form */}
        <motion.section 
          id="contact"
          className={styles.formSection}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className={styles.glassContainer}>
            <h2 className={styles.formTitle}>Corporate Admin Registration</h2>
            <p className={styles.formSubtitle}>
              To register as a corporate administrator, please fill out the form below. Our team will contact you shortly.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your corporate email"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your IoT monitoring needs"
                  rows="4"
                />
              </div>
              
              <div className={styles.formCheckbox}>
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              </div>
              
              <motion.button 
                type="submit" 
                className={styles.submitButton}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Request Access
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>
      
      {/* Partners Section */}
      <section className={styles.partnersSection}>
        <h3>Trusted by Industry Leaders</h3>
        <div className={styles.partnersLogos}>
          <img src={microsoft} alt="Partner 1" />
          <img src={microsoft} alt="Partner 2" />
          <img src={microsoft} alt="Partner 3" />
          
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <img src={sense} alt="Sensekip Logo" />
              {/* Sensekip */}
            </div>
            <p className={styles.footerDescription}>
              Leading the IoT monitoring revolution with cutting-edge technology for enterprise clients.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>📱</a>
              <a href="#" className={styles.socialIcon}>💼</a>
              <a href="#" className={styles.socialIcon}>🐦</a>
              <a href="#" className={styles.socialIcon}>📷</a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Solutions</h3>
            <ul>
              <li><a href="#">IoT Monitoring</a></li>
              <li><a href="#">Analytics Dashboard</a></li>
              <li><a href="#">Alert Management</a></li>
              <li><a href="#">Enterprise Integration</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Contact Us</h3>
            <ul>
              <li>
                <span className={styles.footerIcon}>✉️</span>
                <a href="mailto:info@sensekip.com">info@sensekip.com</a>
              </li>
              <li>
                <span className={styles.footerIcon}>📞</span>
                <span>+1 555-123-4567</span>
              </li>
              <li>
                <span className={styles.footerIcon}>📍</span>
                <address>
                  123 IoT Avenue, Tech City, State, 12345<br />
                  Brazil
                </address>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© 2025 Sensekip. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Site Map</a>
            <a href="#">Accessibility</a>
            <a href="#">FAQ</a>
          </div>
        </div>
        
        <div className={styles.scrollToTop} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          ↑
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;