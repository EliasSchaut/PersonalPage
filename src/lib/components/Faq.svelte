<script lang="ts">
  import PlusSmallIcon from '~icons/heroicons/plus-small';
  import MinusSmallIcon from '~icons/heroicons/minus-small';

  let { faqs }: { faqs: { question: string; answer: string }[] } = $props();
</script>

<div class="bg-white dark:bg-second-900">
  <div class="mx-auto px-6 pb-6">
    <dl class="space-y-6 divide-y divide-second-900/10 dark:divide-white/10">
      {#each faqs as faq (faq.question)}
        <details class="group pt-6">
          <summary
            class="flex w-full cursor-pointer list-none items-start justify-between text-left text-second-900 dark:text-white [&::-webkit-details-marker]:hidden"
          >
            <span class="text-base leading-7 font-semibold">{faq.question}</span>
            <span class="ml-6 flex h-7 items-center">
              <PlusSmallIcon class="h-6 w-6 group-open:hidden" aria-hidden="true" />
              <MinusSmallIcon class="hidden h-6 w-6 group-open:block" aria-hidden="true" />
            </span>
          </summary>
          <dd class="mt-2 pr-12">
            <p class="text-base leading-7 text-second-600 dark:text-second-300">{faq.answer}</p>
          </dd>
        </details>
      {/each}
    </dl>
  </div>
</div>
