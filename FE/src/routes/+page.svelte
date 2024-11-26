<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  
    let buttonDiv: HTMLDivElement;
  
    onMount(() => {
      buttonDiv.focus(); // 컴포넌트가 로드될 때 div에 포커스 설정
    });
  
    function handleClick() {
      goto('/select-customer', { replaceState: true, noScroll: true });
    }
  
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        handleClick();
        event.preventDefault();
      }
    }
  </script>
  
  <div
    bind:this={buttonDiv}
    role="button"
    tabindex="0"
    on:click={handleClick}
    on:keydown={handleKeydown}
    style="width: 70vw; height: 55vh; display: flex; align-items: center; justify-content: center; outline: none; cursor: default;"
  >
    <h1 class="h1-text">Welcome to ORiS!</h1>
  </div>
  
  <style>
    .h1-text {
      font-size: 5rem;
      color: #333;
    }
  </style>
  