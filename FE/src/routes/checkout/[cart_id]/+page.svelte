<script lang="ts">
    import { goto } from '$app/navigation';
	import { Loading } from '$lib/components';
	import { createOrder, type OrderRequest } from '$lib/service/orderService';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let paymentMethod: string = $state("");
    let showConfirmDialog = $state(false);
    let totalAmount: number = $state(0); 
    let isLoading = $state(false);

    let cartData = data.cartData; 
    let saleProducts = cartData.sale_products || []; 

    totalAmount = saleProducts.reduce((sum, product) => sum + product.product_price, 0);

    function selectPaymentMethod(method: string) {
        paymentMethod = method; 
    }


    async function confirmPayment() {
    isLoading = true; 
    let orderId: number | null = null;

    try {
        const orderReq: OrderRequest = {
            order_datetime: new Date().toISOString(),
            customer_id: cartData.customer_id,
            cart_id: cartData.cart_id,
            total_price: totalAmount,
            status: 'Preparing',
        };
        console.log("결제 요청:", orderReq);

        orderId = await createOrder(orderReq);
    } catch (error) {
        console.error('주문 생성 중 오류:', error);
        alert('주문 처리 중 오류가 발생했습니다.');
    } finally {
        isLoading = false;
        if (orderId) {
            goto(`/end-page?order_id=${orderId}`);
        } else {
            alert("주문 생성에 실패했습니다. 다시 시도해주세요.");
        }
    }
}


    function handlePayment() {
        if (paymentMethod) {
            showConfirmDialog = true; // 결제 확인 다이얼로그 띄우기
        } else {
            alert("결제 수단을 선택하세요.");
        }
    }

    function cancelPayment() {
        showConfirmDialog = false; // 다이얼로그 닫기
    }
</script>

<div class="checkout-container">
    {#if isLoading}
        <div class="loading-overlay">
            <Loading />
        </div>
    {/if}
    <div class="order-summary">
        <h2>주문내역</h2>
        <ul>
            <li class="cart-item">
                <span>아이스크림 - 토핑</span>
                <span>가격</span>
            </li>
        </ul>
        <ul>
            {#each saleProducts as product}
                <li class="cart-item">
                    <span class="item">
                        {product.ice_cream_name} 
                        {#if product.topping_data.length > 0}
                            - {product.topping_data.map(topping => topping.name).join(', ')}
                        {/if}
                    </span>
                    <span>{product.product_price} 원</span>
                </li>
            {/each}
        </ul>
        <div class="total-box">
            <p class="total"><strong>총 가격: {totalAmount} 원</strong></p>
        </div>
    </div>

    <div class="payment-options">
        <h2>결제 수단</h2>
        <div class="payment-methods">
            <div
                class="payment-card"
                on:click={() => selectPaymentMethod("Credit Card")}
                class:selected={paymentMethod === "Credit Card"}
            >
                <img src="/credit-card-icon.png" alt="Credit Card" />
                <p>신용카드</p>
            </div>
            <div
                class="payment-card"
                on:click={() => selectPaymentMethod("Payco")}
                class:selected={paymentMethod === "Payco"}
            >
                <img src="/payco-icon.png" alt="Payco" />
                <p>Payco</p>
            </div>
            <div
                class="payment-card"
                on:click={() => selectPaymentMethod("Kakao Pay")}
                class:selected={paymentMethod === "Kakao Pay"}
            >
                <img src="/kakao-pay-icon.png" alt="Kakao Pay" />
                <p>카카오페이</p>
            </div>
            <div
                class="payment-card"
                on:click={() => selectPaymentMethod("Naver Pay")}
                class:selected={paymentMethod === "Naver Pay"}
            >
                <img src="/naver-pay-icon.png" alt="Naver Pay" />
                <p>네이버페이</p>
            </div>
        </div>
        
        <button on:click={handlePayment}>결제</button>
    </div>

    {#if showConfirmDialog}
    <div class="overlay" on:click={cancelPayment}></div>
    <div class="dialog">
        <h3>결제 확인</h3>
        <p>선택한 결제 수단: {paymentMethod}</p>
        <p>총 금액: {totalAmount} 원</p>
        <button on:click={confirmPayment} disabled={isLoading}>결제하기</button>
        <button on:click={cancelPayment}>취소</button>
    </div>
    {/if}
</div>

<style>
    .checkout-container {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        width: 100%;
        margin: 0 auto;
        padding: 1rem;
        border-radius: 10px;
        background-color: #f8f8f8;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }
    .order-summary, .payment-options {
        padding: 1.5rem;
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
        width: 500px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    h2 {
        margin-bottom: 1rem;
        color: #333;
    }
    .total {
        margin-top: auto;
        font-size: 1.2rem;
        color: #333;
    }
    .total-box {
        position: relative;
        left: 350px;
        top: 180px;
    }
    .cart-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e0e0e0;
    }
    .payment-methods {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        width: 100%;
        justify-items: center;
        margin-top: auto;
    }
    .payment-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem; 
        width: 100%;
        max-width: 180px; 
        height: 150px; 
        border: 2px solid transparent;
        border-radius: 12px;
        cursor: pointer;
        transition: 0.3s;
    }

    .payment-card img {
        width: 50px;
        height: 50px;
        margin-bottom: 0.6rem;
    }

    .payment-card:hover {
        background-color: #e0f7e9; 
        border-color: #4CAF50; 
    }

    .payment-card.selected {
        border-color: #4CAF50;
        background-color: #e0f7e9;
    }

    .payment-card.selected:hover {
        background-color: #d2f2d5;
        border-color: #45a049;   
    }
    button {
        width: 100%;
        padding: 1rem;
        margin-top: 1.25rem;
        background-color: #E6A399;  
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    ul {
        font-weight: bold;
    }
    button:hover {
        background-color: #db7e70;
    }
    .item {
        color: rgb(179, 2, 90);
    }
    .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }
    .dialog button {
        margin: 0.5rem;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 900;
    }
</style>
