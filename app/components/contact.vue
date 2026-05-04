<script setup lang="ts"></script>
<template>
  <form action="/api/contact" method="POST" class="mx-auto">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label
          for="email"
          class="text-second-900 block text-sm/6 font-semibold dark:text-white"
          >Your Email</label
        >
        <div class="mt-2.5">
          <input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            class="text-second-900 outline-second-300 placeholder:text-second-400 focus:outline-prime-600 dark:placeholder:text-second-500 dark:focus:outline-prime-500 block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 dark:bg-white/5 dark:text-white dark:outline-white/10"
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="message"
          class="text-second-900 block text-sm/6 font-semibold dark:text-white"
          >Message</label
        >
        <div class="mt-2.5">
          <textarea
            name="message"
            id="message"
            rows="4"
            class="text-second-900 outline-second-300 placeholder:text-second-400 focus:outline-prime-600 dark:placeholder:text-second-500 dark:focus:outline-prime-500 block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 dark:bg-white/5 dark:text-white dark:outline-white/10"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <button
        type="submit"
        class="bg-prime-600 hover:bg-prime-500 focus-visible:outline-prime-600 dark:bg-prime-500 dark:hover:bg-prime-400 dark:focus-visible:outline-prime-500 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Let's talk
      </button>
      <label
        class="text-second-600 dark:text-second-400 text-sm/6"
        for="agree-to-policies"
      >
        By clicking, you agree to the
        {{ ' ' }}
        <a
          href="/privacy"
          class="text-prime-600 dark:text-prime-400 font-semibold whitespace-nowrap"
          >privacy policy</a
        >.
      </label>
    </div>
  </form>
</template>
