<script lang="ts">
  import { onMount } from 'svelte';

  let {
    strings,
    initString = '',
    initDelay = 0,
    loop = false,
    autostart = false,
    class: className = '',
  }: {
    strings: string[];
    initString?: string;
    initDelay?: number;
    loop?: boolean;
    autostart?: boolean;
    class?: string;
  } = $props();

  let el = $state<HTMLSpanElement>();

  onMount(() => {
    let writer: { start(): unknown; pause(): unknown; stop(): unknown } | undefined;
    let observer: IntersectionObserver | undefined;
    const timer = setTimeout(async () => {
      if (!el) return;
      const { default: Typewriter } = await import('typewriter-effect/dist/core');
      writer = new Typewriter(el, {
        strings,
        loop,
        autoStart: autostart,
        stringSplitter: (text: string) => [...text],
      });
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) writer?.start();
        else writer?.pause();
      });
      observer.observe(el);
    }, initDelay);
    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      writer?.stop();
    };
  });
</script>

<span bind:this={el} class={className}>{initString}</span>
