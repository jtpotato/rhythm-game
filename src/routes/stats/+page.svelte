<!--Test with this URL: http://localhost:5173/stats?clickTimes=0,125480,126015,126620,127227,127848,128505,129164.99999999999,129771.00000000001&gameLength=8 -->

<script lang="ts">
	import { page } from '$app/stores';
	import * as Accordion from '$lib/components/ui/accordion';
	import Analysis from './analysis';
	import { LineChart } from '@carbon/charts-svelte';
	import { ChevronLeft } from 'lucide-svelte';

	const clickTimes = $page.url.searchParams.get('clickTimes');
	const gameLength = $page.url.searchParams.get('gameLength');

	const clickTimesArray = clickTimes
		? clickTimes.split(',').map((clickTime) => parseFloat(clickTime))
		: [0, 0];
	const analysis = new Analysis(parseInt(gameLength ? gameLength : '0'), clickTimesArray);
</script>

<div class="w-full">
	<a href="/" class="flex items-center w-fit">
		<ChevronLeft class="inline h-6 w-6" />
		<span>Back</span>
	</a>
	<h1 class="text-4xl font-bold text-center">Stats</h1>

	<div class="flex flex-col gap-16">
		<div>
			<LineChart data={analysis.getDeltas().data} options={analysis.getDeltas().options} />
		</div>

		<div class="flex justify-center text-center [&>*]:flex-grow">
			<div>
				<p class="text-xl font-bold">{Math.round(analysis.getAverageError() * 100) / 100}ms</p>
				<p>Average Error</p>
			</div>
			<div>
				<p class="text-xl font-bold">
					{100 - Math.round(analysis.getAverageErrorPercentage() * 10000) / 100}%
				</p>
				<p>Accuracy</p>
			</div>
			<div>
				<p class="text-xl font-bold">
					{Math.round(analysis.getBpm())}
				</p>
				<p>BPM</p>
			</div>
		</div>

		<Accordion.Root>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Debug</Accordion.Trigger>
				<Accordion.Content>
					<div class="font-mono bg-black/50 rounded-md p-4">
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
	</div>
</div>
