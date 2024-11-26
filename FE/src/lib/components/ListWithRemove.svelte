<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let items: { title: string; details: string }[] = [];

    const dispatch = createEventDispatcher();

    function removeItem(index: number) {
        dispatch('remove', { index });
    }

    function checkout() {
        dispatch('checkout');
    }
</script>

<div class="list">
    {#each items as item, index}
        <div class="list-item">
            <h3 class="item-title">{item.title}</h3>
            <p class="item-details">{item.details}</p>
            <button class="remove-btn" on:click={() => removeItem(index)}>Remove</button>
        </div>
    {/each}
    <button class="checkout-btn" on:click={checkout}>Checkout</button>
</div>

<style>
    .list {
        padding: 1rem;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .list-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        padding: 1rem;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .item-title {
        margin: 0;
        font-weight: bold;
        font-size: 1.1rem;
    }

    .item-details {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        color: #666;
    }

    .remove-btn {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .checkout-btn {
        width: 100%;
        padding: 0.6rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }
</style>
