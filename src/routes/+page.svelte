<script lang="ts">
	import { goto } from "$app/navigation";

    let gameLength = 8
    let clicksRemaining = 8
	let clickTimes = [0];

	const handleClick = () => {
		clickTimes.push(window.performance.now());
        clicksRemaining--;
        checkIfGameIsOver();
	};

    const checkIfGameIsOver = () => {
        if (clicksRemaining === 0) {
            goto(`/stats?clickTimes=${clickTimes}&gameLength=${gameLength}`);
        }
    }
</script>

<div class="flex flex-col items-center justify-center gap-16 m-auto">
    <p>Tap this button with a steady beat. Go as fast/slow as you like.</p>
    <button on:click={handleClick} style="touch-action: manipulation">
        <div class="bg-yellow-400 aspect-square rounded-full w-32"></div>
    </button>
    <p>Tap {clicksRemaining} times</p>
    <!--Then we hide this link from everyone!! but we still keep it!!-->
    <a href="/stats?clickTimes={clickTimes}&gameLength={gameLength}" data-sveltekit-preload-data class="hidden">hi! why are you here?</a>
    <div class="w-4 h-4" />
</div>

