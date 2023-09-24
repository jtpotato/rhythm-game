<script lang="ts">
	import { goto } from "$app/navigation";

    let gameLength = 8
    let clicksRemaining = 8
	let clickTimes = [0];

	const handleClick = () => {
		clickTimes.push(window.performance.now());
        clicksRemaining--;
		console.log(clickTimes);
        checkIfGameIsOver();
	};

    const checkIfGameIsOver = () => {
        if (clicksRemaining === 0) {
            goto(`/stats?clickTimes=${clickTimes}&gameLength=${gameLength}`);
        }
    }
</script>

<button on:click={handleClick}>Tap me!</button>
<p>Tap {clicksRemaining} times</p>
