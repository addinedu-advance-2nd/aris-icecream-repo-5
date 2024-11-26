<!-- layout.svelte -->
<script>
    import { page } from '$app/stores';
  
    $: isOrderNumberPage = $page.url.pathname === '/order_number';
  </script>
  
  <style>
    :global(body) {
        font-family: 'Rounded Mplus 1c', sans-serif;
        background-color: #E6A399;
        color: #662C2E;
        margin: 0;
        padding: 0;
        user-select: none;
        -webkit-user-drag: none;
    }

    header {
        display: flex;
        align-items: center;
        padding: 1rem;
    }
    .logo, .ice-cream {
        pointer-events: none; 
        user-select: none;
    }

    .logo {
        width: 200px; 
        height: auto;
        margin-left: 3rem;
    }

    footer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
    }

    .ice-cream {
        width: 200px; 
        height: auto;
        opacity: 0.8;
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .hidden {
        display: none; /* 숨기기 */
    }
    
</style>
  <div class="container">

    <header class="{isOrderNumberPage ? 'hidden' : ''}">
      <img src="/logo.png" alt="Logo" class="logo" />
    </header>
  
    <main>
      <slot/>
    </main>
  
      <footer class="{isOrderNumberPage ? 'hidden' : ''}">
        <img src="/ice-cream.png" alt="Ice Cream Logo" class="ice-cream" />
      </footer>
  </div>
  