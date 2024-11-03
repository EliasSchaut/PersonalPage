<template>
  <span id="typewriter">{{ init_string }}</span>
</template>

<script lang="ts">
import Typewriter from 'typewriter-effect/dist/core';

export default defineComponent({
  mounted() {
    setTimeout(() => {
      new Typewriter('#typewriter', {
        strings: this.strings,
        autoStart: this.autostart,
        loop: this.loop,
        stringSplitter: (string: string) => {
          return [...string];
        },
      });
    }, this.init_delay);
  },
  props: {
    strings: {
      type: Array<string>,
      required: true,
    },
    init_string: {
      type: String,
      default: '',
    },
    loop: {
      type: Boolean,
      default: false,
    },
    autostart: {
      type: Boolean,
      default: false,
    },
    init_delay: {
      type: Number,
      default: 0,
    },
  },
});
</script>
