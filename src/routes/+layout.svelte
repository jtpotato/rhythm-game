<script lang="ts">
	import '../app.postcss';
	import '@carbon/charts-svelte/styles.css';

	// export const ssr = false; sorry we dont need SEO
</script>

<div class="flex p-4 max-w-6xl mx-auto min-h-screen">
	<slot />
</div>

