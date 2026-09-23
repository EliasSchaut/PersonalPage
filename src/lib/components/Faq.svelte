<script lang="ts">
  import PlusSmallIcon from '~icons/heroicons/plus-small';
  import MinusSmallIcon from '~icons/heroicons/minus-small';

  let { faqs }: { faqs: { question: string; answer: string }[] } = $props();
</script>

<dl class="divide-y divide-second-200 dark:divide-white/10">
  {#each faqs as faq (faq.question)}
    <details class="group py-4">
      <summary
        class="flex w-full cursor-pointer list-none items-start justify-between text-left text-second-900 dark:text-white [&::-webkit-details-marker]:hidden"
      >
        <span class="text-lg font-bold">{faq.question}</span>
        <span class="ml-6 flex h-7 items-center text-prime-500">
          <PlusSmallIcon class="h-6 w-6 group-open:hidden" aria-hidden="true" />
          <MinusSmallIcon class="hidden h-6 w-6 group-open:block" aria-hidden="true" />
        </span>
      </summary>
      <dd class="mt-2 pr-12">
        <p class="leading-7 text-second-700 dark:text-second-200">{faq.answer}</p>
      </dd>
    </details>
  {/each}
</dl>
