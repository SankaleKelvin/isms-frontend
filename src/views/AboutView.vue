<template>
  <v-container class="about-us">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center text-h3 my-6 teal--text text--darken-2">About Restaurant-Island</h1>
      </v-col>
    </v-row>

    <!-- Hero Section -->
    <v-row class="hero-section mb-12">
      <v-col cols="12" md="6" class="d-flex align-center">
        <div>
          <h2 class="text-h4 mb-4 font-weight-medium">Our Story</h2>
          <p class="text-body-1">
            Founded in 2015, Restaurant-Island began with a simple mission: to connect food lovers with the best local 
            restaurants. What started as a small platform with just a handful of restaurant partners has grown into 
            a comprehensive ecosystem serving thousands of customers daily across multiple cities.
          </p>
          <p class="text-body-1 mt-4">
            Our passion for great food and exceptional service drives everything we do, from our intuitive ordering system 
            to our reliable delivery network.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          src="https://picsum.photos/id/292/600/400"
          alt="Restaurant atmosphere"
          class="rounded-lg elevation-3"
          height="400"
          cover
        ></v-img>
      </v-col>
    </v-row>

    <!-- Our Values -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Values</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="teal darken-2" class="mb-4">mdi-food-fork-drink</v-icon>
          <h3 class="text-h5 mb-3">Quality First</h3>
          <p>We partner only with restaurants that meet our strict quality standards, ensuring every meal is a delightful experience.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="teal darken-2" class="mb-4">mdi-timer-outline</v-icon>
          <h3 class="text-h5 mb-3">Reliability</h3>
          <p>From accurate order processing to on-time delivery, we pride ourselves on being a platform you can count on every time.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="teal darken-2" class="mb-4">mdi-heart-outline</v-icon>
          <h3 class="text-h5 mb-3">Community Focus</h3>
          <p>We support local businesses and contribute to the communities we serve, believing that good food brings people together.</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Team Section -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Team</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://picsum.photos/id/1005/300/300" height="250" cover></v-img>
          <v-card-title class="justify-center">Sarah Johnson</v-card-title>
          <v-card-subtitle>Founder & CEO</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://picsum.photos/id/1012/300/300" height="250" cover></v-img>
          <v-card-title class="justify-center">Michael Chen</v-card-title>
          <v-card-subtitle>Head of Operations</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://picsum.photos/id/1027/300/300" height="250" cover></v-img>
          <v-card-title class="justify-center">Amara Wilson</v-card-title>
          <v-card-subtitle>Restaurant Relations</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="text-center elevation-2">
          <v-img src="https://picsum.photos/id/1074/300/300" height="250" cover></v-img>
          <v-card-title class="justify-center">David Rodriguez</v-card-title>
          <v-card-subtitle>Technology Director</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Achievements -->
    <v-row class="my-10 achievements-section py-6">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Achievements</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">500+</span>
        </div>
        <h3 class="mb-2">Restaurant Partners</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">20</span>
        </div>
        <h3 class="mb-2">Cities Served</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">2M+</span>
        </div>
        <h3 class="mb-2">Happy Customers</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">4.8</span>
        </div>
        <h3 class="mb-2">Average Rating</h3>
      </v-col>
    </v-row>

    <!-- Contact CTA -->
    <v-row class="mt-12 mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 mb-4">Want to Know More?</h2>
        <p class="mb-6 text-body-1">We'd love to hear from you or answer any questions you might have.</p>
        <v-btn 
          color="teal darken-1" 
          size="large" 
          class="white--text" 
          to="/contact-us"
        >
          Contact Us
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional setup logic needed
</script>

<style scoped>
.about-us {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.achievements-section {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stat-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 137, 123, 0.1);
  border: 2px solid #00897b;
  color: #00897b;
}

h1, h2, h3, h4 {
  font-family: 'Roboto', sans-serif;
}

.hero-section p {
  line-height: 1.8;
}
</style>