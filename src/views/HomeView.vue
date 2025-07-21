<template>
  <div class="restaurant-homepage">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Restaurant Island</h1>
        <p>Experience culinary excellence in every bite</p>
        <button class="cta-button">Book a Table</button>
      </div>
    </section>

    <!-- Featured Section -->
    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">Our Specialties</h2>
        <div class="featured-items">
          <div class="featured-item">
            <div class="featured-image">
              <img src="../assets/images/love-icon.jpg" alt="Signature Dish">
            </div>
            <h3>Signature Risotto</h3>
            <p>Wild mushroom risotto with truffle oil and parmesan</p>
          </div>
          <div class="featured-item">
            <div class="featured-image">
              <img src="../assets/images/fish.jpg" alt="Chef's Special">
            </div>
            <h3>Chef's Special</h3>
            <p>Pan-seared salmon with lemon butter sauce</p>
          </div>
          <div class="featured-item">
            <div class="featured-image">
              <img src="../assets/images/love-icon.jpg" alt="Seasonal Offering">
            </div>
            <h3>Seasonal Offering</h3>
            <p>Autumn vegetable tart with goat cheese</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">Our Story</h2>
            <p>Founded in 2010, Savoria brings together the finest ingredients and culinary expertise to create an unforgettable dining experience. Our chef, with over 20 years of experience, crafts each dish with passion and precision.</p>
            <p>We believe in sustainable sourcing and supporting local farmers, ensuring that every ingredient that enters our kitchen meets our high standards of quality and freshness.</p>
            <button class="secondary-button">Learn More</button>
          </div>
          <div class="about-image">
            <img src="../assets/images/restaurant.jpg" alt="Restaurant Interior">
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">What Our Guests Say</h2>
        <div class="testimonials">
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"The best dining experience I've had in years. The food was exquisite and the service impeccable."</p>
            <p class="author">- Maria S.</p>
          </div>
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"A hidden gem with atmosphere that matches the incredible flavors. Will definitely be returning!"</p>
            <p class="author">- James T.</p>
          </div>
          <div class="testimonial">
            <div class="stars">★★★★★</div>
            <p class="quote">"From appetizers to dessert, every dish was prepared with attention to detail. Truly memorable."</p>
            <p class="author">- Ana L.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="info-container">
          <div class="info-card">
            <h3>Hours</h3>
            <p>Monday - Thursday: 11am - 10pm</p>
            <p>Friday - Saturday: 11am - 11pm</p>
            <p>Sunday: 11am - 9pm</p>
          </div>
          <div class="info-card">
            <h3>Location</h3>
            <p>123 Culinary Avenue</p>
            <p>Foodie District</p>
            <p>Gastro City, GC 12345</p>
          </div>
          <div class="info-card">
            <h3>Contact</h3>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@savoria.com</p>
            <p>Reservations recommended</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for special offers and events</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
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

.about-text, .about-image {
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