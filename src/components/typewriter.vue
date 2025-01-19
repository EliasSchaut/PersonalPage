<template>
  <span id="typewriter" ref="typewriter">{{ init_string }}</span>
</template>

<script lang="ts">
import Typewriter from 'typewriter-effect/dist/core';
import { useElementVisibility } from '@vueuse/core';

export default defineComponent({
  setup() {
    return { typewriter: ref<Typewriter | null>(null) };
  },
  mounted() {
    setTimeout(() => {
      this.typewriter = new Typewriter('#typewriter', {
        strings: this.strings,
        loop: this.loop,
        autoStart: this.autostart,
        stringSplitter: (string: string) => {
          return [...string];
        },
      });
      const target_is_visible = useElementVisibility(
        this.$refs.typewriter as HTMLElement,
      ) as Ref<boolean>;
      watch(target_is_visible, this.on_element_visibility);
    }, this.init_delay);
  },
  methods: {
    on_element_visibility(is_visible: boolean) {
      if (is_visible) {
        this.play();
      } else {
        this.pause();
      }
    },
    pause() {
      this.typewriter.pause();
    },
    play() {
      this.typewriter.start();
    },
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
