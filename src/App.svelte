<script lang="typescript">
  import { onMount } from 'svelte';
  import { timer } from './timer';
  import { R } from './utils';

  let a: number = 42;
  let current: number = 0;
  let sum: number = 0;

  //onMount(() => timer.subscribe(val => (current = val)));
  R(timer, val => (current = val));

  $: sum = a + current;
</script>

<main>
  <h2>Count is {$timer}</h2>
  <p>What's the meaning of life? {a}</p>
  <p>The sum is {sum}</p>
</main>

