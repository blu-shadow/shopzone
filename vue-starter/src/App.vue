<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <header class="max-w-6xl mx-auto mb-6">
      <h1 class="text-3xl font-bold text-gray-800">ShopZone — Vue Starter</h1>
    </header>

    <main class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      <section class="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <article v-for="p in products" :key="p.id" class="bg-white p-3 rounded shadow">
          <img :src="p.image" :alt="p.name" class="w-full h-40 object-cover rounded" />
          <h3 class="mt-2 font-semibold text-gray-800">{{ p.name }}</h3>
          <div class="flex items-center justify-between mt-2">
            <div class="text-[var(--brand)] font-bold">৳{{ format(p.price) }}</div>
            <button @click="addToCart(p.id)" class="bg-[var(--brand)] text-white px-3 py-1 rounded">Add</button>
          </div>
        </article>
      </section>

vue-starter/src/styles.css