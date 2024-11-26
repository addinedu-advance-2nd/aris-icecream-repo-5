<script>
    let name = "";
    let phone = "";

    $: isFormValid = name.trim() && phone.trim().length === 4;
</script>

<h1 class="h1-text">Welcome to ORiS!</h1> 
<h3>달콤함을 찾는 첫 걸음, ORiS에서 특별한 혜택을 만나보세요.</h3>
<br/>
<form on:submit|preventDefault={() => isFormValid && console.log("Form submitted!")}>
    <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" bind:value={name} placeholder="Enter your name" required />
    </div>

    <div class="form-group">
        <label for="phone">전화번호 뒤 4자리</label>
        <input type="text" id="phone" bind:value={phone} placeholder="Enter Last 4 digits of phone" maxlength="4" required />
    </div>

    <div class="button-group">
        <button type="submit" class="join-btn" disabled={!isFormValid}>Join Now</button>
        <button type="button" class="skip-btn" on:click={() => console.log("Skipped!")}>Skip</button>
    </div>
</form>

<style>
    h1 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #333;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        max-width: 600px; /* 폼의 최대 너비를 넓게 설정 */
        margin: 0 auto;
        padding: 3rem;
        background-color: #fff;
        border-radius: 8px;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .form-group {
        display: flex;
        align-items: center;
        width: 100%;
    }

    label {
        font-weight: bold;
        margin-right: 1rem;
        color: #333;
        width: 150px; /* 레이블을 더 넓게 설정 */
        text-align: right;
        font-size: 1.1rem;
    }

    input {
        flex: 1;
        padding: 0.75rem;
        font-size: 1.1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        outline: none;
        transition: border-color 0.3s ease;
    }

    input:focus {
        border-color: #E6A399;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 1.5rem;
    }

    .join-btn, .skip-btn {
        flex: 1;
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .join-btn {
        background-color: #E6A399;
    }

    .join-btn:hover {
        background-color: #d58a7d;
    }

    .skip-btn {
        background-color: #ccc;
    }

    .skip-btn:hover {
        background-color: #b3b3b3;
    }
</style>