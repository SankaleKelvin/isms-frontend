<template>
  <v-container class="about-us">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center text-h3 mt-10 teal--text text--darken-2">About Access Integrators</h1>
      </v-col>
    </v-row>

    <!-- Hero Section -->
    <v-row class="hero-section mb-12">
      <v-col cols="12" md="6" class="d-flex align-center">
        <div>
          <h2 class="text-h4 mb-4 font-weight-medium">Our Story</h2>
          <p class="text-body-1">
            Founded in 2015, Access Integrators is a trusted name in physical and digital access control systems across East Africa.
            We specialize in securing high-priority locations such as airports, government institutions, embassies, and judiciary offices.
          </p>
          <p class="text-body-1 mt-4">
            With a team of engineers, security experts, and support staff, we provide seamless integration of biometric, RFID, and
            surveillance systems — tailored to meet each client’s operational and compliance needs.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          src="/images/access-control-room.jpg"
          alt="Access Control Room"
          class="rounded-lg elevation-3"
          height="400"
          cover
        ></v-img>
      </v-col>
    </v-row>

    <!-- Our Values -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Core Values</h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="teal darken-2" class="mb-4">mdi-shield-lock-outline</v-icon>
          <h3 class="text-h5 mb-3">Security First</h3>
          <p>We prioritize secure environments for our clients through robust systems and continuous monitoring.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="teal darken-2" class="mb-4">mdi-autorenew</v-icon>
          <h3 class="text-h5 mb-3">Reliability</h3>
          <p>From installation to maintenance, our systems and support teams deliver with consistency and precision.</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%" class="px-4 py-6 text-center elevation-2">
          <v-icon size="x-large" color="teal darken-2" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h5 mb-3">Partnership</h3>
          <p>We work closely with clients to understand their needs and evolve with their growing security demands.</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Team Section -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Meet Our Leadership</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-for="(member, index) in team" :key="index">
        <v-card class="text-center elevation-2">
          <v-img :src="member.image" height="250" cover></v-img>
          <v-card-title class="justify-center">{{ member.name }}</v-card-title>
          <v-card-subtitle>{{ member.role }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Achievements -->
    <v-row class="my-10 achievements-section py-6">
      <v-col cols="12">
        <h2 class="text-h4 text-center mb-8 font-weight-medium">Our Impact</h2>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">100+</span>
        </div>
        <h3 class="mb-2">Facilities Secured</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">5</span>
        </div>
        <h3 class="mb-2">Countries Served</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">10K+</span>
        </div>
        <h3 class="mb-2">Users Managed</h3>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="text-center">
        <div class="stat-circle d-inline-flex align-center justify-center mb-4">
          <span class="text-h4 font-weight-bold">4.9</span>
        </div>
        <h3 class="mb-2">Client Satisfaction</h3>
      </v-col>
    </v-row>

    <!-- Contact CTA -->
    <v-row class="mt-12 mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4 mb-4">Let’s Secure Your Institution</h2>
        <p class="mb-6 text-body-1">Reach out to us to discuss your facility's access control and surveillance needs.</p>
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
const team = [
  {
    name: 'Grace Mwangi',
    role: 'Founder & CEO',
    image: 'https://picsum.photos/id/1005/300/300',
  },
  {
    name: 'Kelvin Otieno',
    role: 'Technical Director',
    image: 'https://picsum.photos/id/1012/300/300',
  },
  {
    name: 'Linet Wanjiru',
    role: 'Head of Security Ops',
    image: 'https://picsum.photos/id/1027/300/300',
  },
  {
    name: 'Peter Musyoka',
    role: 'Installations Lead',
    image: 'https://picsum.photos/id/1074/300/300',
  },
];
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
