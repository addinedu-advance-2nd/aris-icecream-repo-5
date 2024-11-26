<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let title: string = '';
    export let image: string = '';
    export let description: string = '';
    export let price: number = 0;
    export let toppings: { name: string; image?: string; extra_price: number }[] = [];
    export let selectedOptions: { name: string; extra_price: number }[] = [];

    const dispatch = createEventDispatcher();

    function toggleOption(option: { name: string; extra_price: number }) {
        const exists = selectedOptions.find(opt => opt.name === option.name);
        if (exists) {
            selectedOptions = selectedOptions.filter(opt => opt.name !== option.name);
        } else {
            selectedOptions = [...selectedOptions, option];
        }
    }

    function confirmSelection() {
        dispatch('confirm', { selectedOptions });
        closeModal();
    }

    function closeModal() {
        dispatch('close');
    }
</script>

<div class="modal-overlay">
    <div class="modal">
        <!-- 아이스크림 카드 -->
        <div class="ice-cream-card">
            <img class="ice-cream-image" src={image} alt={title} />
            <div class="ice-cream-details">
                <h2 class="ice-cream-title">{title}</h2>
                <p class="ice-cream-description">{description}</p>
                <p class="ice-cream-price">₩{price.toLocaleString()}</p>
            </div>
        </div>

        <!-- 토핑 카드 섹션 -->
        <div class="toppings-section">
            <h3>토핑을 선택하세요:</h3>
            <div class="topping-list">
                {#each toppings as topping}
                    <div 
                        class="topping-card {selectedOptions.includes(topping) ? 'selected' : ''}" 
                        on:click={() => toggleOption(topping)}
                    >
                        <img class="topping-image" src={`data:image/png;base64,${topping.image || ''}`} alt={topping.name} />
                        <div class="topping-details">
                            <p class="topping-name">{topping.name}</p>
                            <p class="topping-price">₩{topping.extra_price.toLocaleString()}</p>
                        </div>
                    </div>
                {/each}
            </div>            
        </div>

        <!-- 모달 액션 버튼 -->
        <div class="modal-actions">
            <button class="confirm-btn" on:click={confirmSelection}>장바구니 추가</button>
            <button class="close-btn" on:click={closeModal}>취소</button>
        </div>
    </div>
</div>


<style>
    .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: #E6A399;
    padding: 2rem;
    border-radius: 8px;
    width: 700px;
    height: 480px;
    overflow-y: auto;
}

.ice-cream-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 0.4rem;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ice-cream-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

.ice-cream-details {
    text-align: left;
    flex: 1;
}

.ice-cream-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.ice-cream-description {
    font-size: 1rem;
    color: #555;
    margin-bottom: 0.5rem;
}

.ice-cream-price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #E6A399;
}

.toppings-section {
    margin-bottom: 2rem;
}

.topping-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: stretch;
}

.topping-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
}

.topping-card:hover {
    transform: scale(1.05);
    background-color: #f2e2d5;
}

.topping-card.selected {
    background-color: #e8c9b9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.topping-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
}

.topping-details {
    flex: 1;
    text-align: left;
}

.topping-name {
    font-size: 1rem;
    font-weight: bold;
}

.topping-price {
    font-size: 0.9rem;
    color: #E6A399;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.5rem;
}

.confirm-btn, .close-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
}

.confirm-btn {
    background-color: #662C2E;
    color: white;
}

.close-btn {
    background-color: #f9f9f9;
    color: #662C2E;
}
</style>
