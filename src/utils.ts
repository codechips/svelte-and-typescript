import { onMount } from 'svelte';
import { Readable } from 'svelte/store';

const R = <T>(store: Readable<T>, callback: (value: T) => void) => {
  onMount(() => {
     return store.subscribe(callback);
  });
};

export { R };
