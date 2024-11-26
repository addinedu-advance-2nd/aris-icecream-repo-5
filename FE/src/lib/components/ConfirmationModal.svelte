<script lang="ts">
    export let title: string;
    export let onConfirm: () => void;
    export let onClose: () => void;
</script>

<div class="overlay" on:click={onClose}></div>
<div class="modal">
    <h1>{title}</h1>
    <div class="modal-actions">
        <button class="btn confirm" on:click={onConfirm}>결제하러가기</button>
        <button class="btn cancel" on:click={onClose}>상품 더 담기</button>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 900;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .modal-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2.5rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn.confirm {
        background-color: #E6A399;
        color: white;
        margin-right: 10px;
    }

    .btn.cancel {
        background-color: #ccc;
        color: rgb(0, 0, 0);
    }
</style>
