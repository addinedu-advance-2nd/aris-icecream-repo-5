<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let item: { id: number; title: string; image: string; price: number; };
    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('select', { item });
    }

    function formatPrice(price: number): string {
        return new Intl.NumberFormat('ko-KR').format(price); 
    }
</script>

<div class="card" on:click={handleClick}>
    <div class="card-image-container">
        <img src={item.image} alt={item.title} class="card-image" />
    </div>
    <div class="card-content">
        <h2 class="card-title">{item.title}</h2>
        <p class="card-price">₩{formatPrice(item.price)}</p>
    </div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 230px;
        background-color: #f0f0f0;
        border-radius: 6px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
        cursor: pointer;
        padding: 0.45rem;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .card-image-container {
        width: 100%;
        height: 150px;
        overflow: hidden;
    }

    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
        transition: opacity 0.2s ease;
    }

    .card:hover .card-image {
        opacity: 1;
    }

    .card-content {
        padding: 1rem;
        text-align: center;
    }

    .card-title {
        margin: 0;
        font-size: 1.25rem;
        color: #290000;
    }

    .card-price {
        margin: 0.5rem 0 0;
        font-size: 1.1rem;
        color: #777;
    }
</style>
