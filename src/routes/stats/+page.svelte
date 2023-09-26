<!--Test with this URL: http://localhost:5173/stats?clickTimes=0,125480,126015,126620,127227,127848,128505,129164.99999999999,129771.00000000001&gameLength=8 -->

<script lang="ts">
    import { page } from "$app/stores";
	import * as Accordion from "$lib/components/ui/accordion";
    import Analysis from "./analysis";
    import { LineChart } from "@carbon/charts-svelte";
    

    const clickTimes = $page.url.searchParams.get("clickTimes")
    const gameLength = $page.url.searchParams.get("gameLength")

    const clickTimesArray = clickTimes ? clickTimes.split(",").map((clickTime) => parseFloat(clickTime)) : [0, 0]
    const analysis = new Analysis(parseInt(gameLength ? gameLength : "0"), clickTimesArray)
</script>

<LineChart data={analysis.getDeltas().data} options={analysis.getDeltas().options} />

<p>Average Error: {Math.round(analysis.getAverageError() * 100) / 100}ms</p>
<p>Average Error Percentage: {Math.round(analysis.getAverageErrorPercentage() * 10000) / 100}%</p>

<Accordion.Root>
    <Accordion.Item value="item-1">
        <Accordion.Trigger>Debug</Accordion.Trigger>
        <Accordion.Content>
            <div class="font-mono">
                <p>Game length: {gameLength}</p>
                <p>Click times: {clickTimes}</p>
                <p>Total game time: {analysis.getTotalGameTime()}ms</p>
                <p>Deltas: {analysis.getDeltas().deltas}</p>
                <p>BPM: {analysis.getBpm()}</p>
                <p>Mean Delta/Proper Delta: {analysis.getProperDelta()}</p>
            </div>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
