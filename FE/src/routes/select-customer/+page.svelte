<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { goto } from '$app/navigation'

    let socket: WebSocket;
    let videoFeedUrl = "http://localhost:8080/customers/video_feed"

    onMount(() => {
        socket = new WebSocket("ws://localhost:8080/customers/capture")
        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                if (data.message.includes("Welcome back")) {
                    goto('/menu')
                } else if (data.message.includes("New user created")) {
                    goto('/join')
                } else {
                    alert(data.message)
                }
            }
        }
        socket.onclose = () => {
            console.log("WebSocket connection closed")
        }
    })

    onDestroy(() => {
        if (socket) {
            socket.close()
        }
    })

    function selectFace(event: MouseEvent) {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;

        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Send click coordinates to the WebSocket
        socket.send(JSON.stringify({ x, y }));
    }
</script>

<div style="text-align:center">
    <!-- Display the video feed from the server -->
    <img src={videoFeedUrl} alt="Video Feed" on:click={selectFace} width="640" height="480" style="border: 1px solid #ccc; cursor: pointer;" />
</div>



