<script lang="ts">
    import SelectableItem from '$lib/components/SelectableItem.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { ShoppingBagIcon } from 'heroicons-svelte/24/solid';
    import { XCircleIcon } from 'heroicons-svelte/24/outline';
    import type { IceCream } from '$lib/service/iceCreamService';
    import type { Topping } from '$lib/service/toppingService';
    import type { PageData } from './$types';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import { goto } from '$app/navigation';

    let { data }: { data: PageData } = $props();

    let selectedItem = $state<IceCream | null>(null);
    let selectedOptions = $state<Topping[]>([]);
    let showModal = $state(false);
    let cart = $state<{ title: string; details: string, totalPrice: number, image?: string }[]>([]);
    let showCart = $state(false);
    let showConfirmationModal = $state(false);

    function handleSelect(iceCreamItem: IceCream) {
        selectedItem = iceCreamItem;
        showModal = true;
    }

    function handleAddToCart(event: CustomEvent<{ selectedOptions: Topping[] }>) {
        if (selectedItem) {
            const selectedToppings = data.toppingData.filter(topping =>
                event.detail.selectedOptions.some(selected => selected === topping)
            );

            const toppingPrices = selectedToppings.reduce((total, topping) => total + topping.extra_price, 0);

            const totalPrice = selectedItem.price + toppingPrices;

            cart = [
                ...cart,
                {
                    title: selectedItem.name,
                    details: selectedToppings.map(t => `${t.name} (₩${t.extra_price.toLocaleString()})`).join(", "),
                    totalPrice,
                    image: selectedItem.image,
                }
            ];

            showModal = false;
        }
    }

    function handleRemoveFromCart(index: number) {
        cart = cart.filter((_, i) => i !== index);
    }

    async function handleCheckout(): Promise<void> {
        showConfirmationModal = true; // 모달 표시
    }

    async function handleConfirmCheckout(): Promise<void> {
    try {
        cart = [];
        goto(`/checkout/3`);
    } catch (error) {
        console.error('결제 오류:', error);
        alert('결제 중 문제가 발생했습니다.');
    } finally {
        
    }
}

    function closeModal(): void {
        showModal = false;
    }

    function closeConfirmationModal(): void {
        showConfirmationModal = false;
    }

</script>

<div class="item-grid">
    {#each (data.iceCreamData as any) as item}
        <SelectableItem 
            item={{
                id: item.ice_cream_id,
                title: item.name,
                image: `data:image/png;base64,${item.image}`,
                price: item.price
            }} 
            on:select={() => handleSelect(item)} 
        />
    {/each}
</div>

<!-- 장바구니 탭 -->
<div class="cart-container" on:mouseenter={() => showCart = true} on:mouseleave={() => showCart = false}>
    <button class="cart-tab">
        <div class="icon-container">
            <ShoppingBagIcon class="cart-icon" />
            <div class="badge">{cart.length}</div>
        </div>
        <span class="cart-text">장바구니 보기</span>
    </button>

    {#if showCart}
    <div class="cart-content">
        {#each cart as item, index}
            <div class="cart-item">
                <img class="cart-ice-cream-image" src={`data:image/png;base64,${item?.image}`} alt={item.title} />
                <div class="cart-details">
                    <h3 class="cart-title">{item.title}</h3>
                    <div class="cart-toppings">
                        <p class="cart-topping-title">토핑:</p>
                        {#if item.details}
                            <ul>
                                {#each item.details.split(", ") as topping}
                                    <li>{topping}</li>
                                {/each}
                            </ul>
                        {:else}
                            <p>없음</p>
                        {/if}
                    </div>
                    <div class="cart-price">
                        <p>가격: ₩{item.totalPrice.toLocaleString()}</p>
                    </div>
                </div>
                <button class="remove-btn" on:click={() => handleRemoveFromCart(index)}>
                    <XCircleIcon class="remove-icon" />
                </button>
            </div>
        {/each}
        <button class="checkout-btn" on:click={handleCheckout}>결제하기</button>
    </div>
    {/if}
</div>

<!-- 팝업 -->
{#if showModal}
<Modal 
    title={selectedItem?.name || ''}
    image={`data:image/png;base64,${selectedItem?.image}`}
    description={selectedItem?.flavor || ''}
    price={selectedItem?.price || 0}
    toppings={data.toppingData} 
    selectedOptions={selectedOptions} 
    on:confirm={(e) => handleAddToCart(e)} 
    on:close={closeModal}
/>
{/if}

{#if showConfirmationModal}
    <ConfirmationModal 
        title="결제하시겠습니까?" 
        onConfirm={async () => {
            await handleConfirmCheckout();
        }} 
        onClose={closeConfirmationModal} 
    />
{/if}



<style>
    .item-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        max-width: 1000px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    .cart-container {
        position: fixed;
        bottom: 4rem;
        right: 16.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .cart-title {
        width: 90%;
    }
    .cart-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        background-color: #FFF5F2;
        border: 1px solid #FFF5F2;
        border-radius: 10px;
        cursor: pointer;
        z-index: 10;
    }
    .icon-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
    }
    .cart-text {
        margin-left: 0.5rem;
        font-size: 1.4rem;
        font-weight: bold;
        color: #662C2E;
        white-space: nowrap;
    }

    .badge {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        background-color: #e05742;
        color: white;
        font-size: 1.05rem;
        font-weight: bold;
        padding: 0.2rem 0.4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 1.5rem;
        height: 1.5rem;
        z-index: 20;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .cart-content {
        position: absolute;
        bottom: 61.5px;
        right: 0;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        background: #FFF5F2;
        transform-origin: bottom right;
        transition: all 0.3s ease;
        flex-wrap: wrap;
        width: 730px; 
    }

    .cart-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 0.75rem;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        min-height: 110px;
        height: 140px;
    }
    .cart-ice-cream-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
    }

    .cart-details {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-grow: 1;
        gap: 1rem;
    }
    .cart-price {
        font-size: 1rem;
        color: #777;
    }
    .cart-toppings {
        width: 100%;
        text-align: left; 
    }

    .cart-toppings li {
        list-style-type: disc;
    }
    
    .checkout-btn {
        width: 98%;
        margin: 0 auto;
        padding: 0.6rem;
        background-color: #E6A399;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
    }
    .remove-btn {
        position: absolute;
        width: 42px;
        right: 20px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
</style>
