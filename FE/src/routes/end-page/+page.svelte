<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data: { orderId: string | null }; // 서버에서 로드된 데이터

  let buttonDiv: HTMLDivElement;

  // 10초 후 자동으로 '/' 경로로 이동
  onMount(() => {
    setTimeout(() => {
      goto('/', { replaceState: true, noScroll: true });
    }, 10000);
  });

  function handleClick() {
    goto('/', { replaceState: true, noScroll: true });
  }
</script>

<div
  bind:this={buttonDiv}
  role="button"
  tabindex="0"
  on:click={handleClick}
  style="width: 70vw; height: 55vh; display: flex; flex-direction: column; align-items: center; justify-content: center; outline: none; cursor: default;"
>
  <h1 class="h1-text">주문완료!</h1>
  {#if data.orderId}
    <h1 class="h1-text">주문번호는 {data.orderId}입니다</h1>
  {/if}
</div>

<style>
.h1-text {
  font-size: 5rem;
  color: #333;
  margin: 0; 
}

.h1-text + .h1-text {
  margin-top: 10px; 
}
</style>
