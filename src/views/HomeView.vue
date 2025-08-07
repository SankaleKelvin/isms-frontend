<template>
  <div class="restaurant-homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Secure Access for Critical Institutions</h1>
        <p>
          Trusted by government bodies, airports, embassies, and the judiciary for integrated access
          control solutions.
        </p>
        <button class="cta-button">Request a Demo</button>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">Our Solutions</h2>
        <div class="featured-items">
          <div class="featured-item">
            <div class="featured-image">
              <img src="../assets/images/biometric.jpg" alt="Biometric Access Control" />
            </div>
            <h3>Biometric Access Control</h3>
            <p>Fingerprint and facial authentication for secure entry.</p>
          </div>
          <div class="featured-item">
            <div class="featured-image">
              <img src="../assets/images/rfid.jpg" alt="RFID Integration" />
            </div>
            <h3>RFID Gate Integration</h3>
            <p>Smart card and mobile tag access for staff and visitors.</p>
          </div>
          <div class="featured-item">
            <div class="featured-image">
              <img src="../assets/images/cctv.jpg" alt="Surveillance" />
            </div>
            <h3>Surveillance Integration</h3>
            <p>Real-time camera feeds linked to access logs for enhanced security.</p>
          </div>
        </div>
      </div>
    </section>

    
    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Client Feedback</h2>
        <div class="testimonials">
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"The installation at our embassy was seamless. Real professionals."</p>
            <p class="author">- Security Officer, Embassy of X</p>
          </div>
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"We’ve had zero unauthorized access incidents since deployment."</p>
            <p class="author">- IT Director, JKIA</p>
          </div>
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">
              "They handled our Judiciary building integration with great care and speed."
            </p>
            <p class="author">- Facilities Manager, Judiciary of Kenya</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="info-container">
          <div class="info-card">
            <h3>Head Office</h3>
            <p>Westlands, Nairobi, Kenya</p>
            <p>P.O. Box 12345-00100</p>
          </div>
          <div class="info-card">
            <h3>Contact</h3>
            <p>Phone: +254 700 123456</p>
            <p>Email: info@accessintegrators.co.ke</p>
          </div>
          <div class="info-card">
            <h3>Working Hours</h3>
            <p>Mon – Fri: 8:00am – 5:00pm</p>
            <p>Saturday: 9:00am – 1:00pm</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Stay Informed</h2>
          <p>Get updates on our latest installations, technologies, and solutions.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
/* Base Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

/* Hero Section */
.hero {
  height: 90vh;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-top: 50px;
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #c0392b;
}

/* Featured Section */
.featured-section {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.featured-items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.featured-item {
  flex: 1;
  min-width: 300px;
  text-align: center;
}

.featured-image {
  height: 250px;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.featured-image img:hover {
  transform: scale(1.05);
}

.featured-item h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.featured-item p {
  color: #666;
}

/* About Section */
.about-section {
  padding: 5rem 0;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
}

.about-text,
.about-image {
  flex: 1;
  min-width: 300px;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #555;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.secondary-button {
  background-color: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  padding: 10px 25px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.secondary-button:hover {
  background-color: #e74c3c;
  color: white;
}

/* Testimonials Section */
.testimonials-section {
  padding: 5rem 0;
  background-color: #f5f5f5;
}

.testimonials {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.testimonial {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
  max-width: 400px;
}

.stars {
  color: #f1c40f;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.quote {
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.author {
  font-weight: bold;
  text-align: right;
}

/* Info Section */
.info-section {
  padding: 5rem 0;
}

.info-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.info-card {
  flex: 1;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  min-width: 250px;
  text-align: center;
}

.info-card h3 {
  margin-bottom: 1rem;
  color: #333;
}

.info-card p {
  color: #666;
  margin-bottom: 0.5rem;
}

/* Newsletter Section */
.newsletter-section {
  padding: 5rem 0;
  background-color: #333;
  color: white;
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  margin-bottom: 1rem;
}

.newsletter-content p {
  margin-bottom: 2rem;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 4px 0 0 4px;
}

.newsletter-form button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-form button:hover {
  background-color: #c0392b;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .about-content {
    flex-direction: column-reverse;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form input {
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .newsletter-form button {
    border-radius: 4px;
  }
}
</style>
