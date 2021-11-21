<script lang="ts">
	import Variant from '$components/molecules/Variant.svelte';
	import Loader from '$components/atoms/Loader.svelte';
	import { variants, loading } from '$stores';

	import { pluralize } from '$utilities';

	let filterCriterion = '';
	let displayedVariants = $variants;

	$: {
		if (filterCriterion.trim()) {
			displayedVariants = $variants.filter(
				(variant) =>
					variant.name.toLowerCase().includes(filterCriterion.toLowerCase()) ||
					variant.language.toLowerCase().includes(filterCriterion.toLowerCase())
			);
		} else {
			displayedVariants = $variants;
		}
	}
</script>

<h2>Select a runtime</h2>
<details>
	<summary>Filter</summary>
	<div class="filter">
		<label for="variant-filter">Enter characters to filter the results below</label>
		<input id="variant-filter" type="text" bind:value={filterCriterion} />
	</div>
</details>

<p class="announcer" role="status">
	{#if $loading}
		<strong>Chargement en cours</strong>
	{:else}
		<strong>{displayedVariants.length} {pluralize(displayedVariants.length, 'result')}</strong> available
		below
	{/if}
</p>
<div class="fluid-grid">
	{#if $loading}
		<Loader />
	{:else}
		{#each displayedVariants as variant}
			<Variant {variant} />
		{/each}
	{/if}
</div>

<style>
	summary {
		margin-bottom: var(--gutter);
	}

	input {
		display: block;
		width: 100%;
		padding: calc(var(--gutter) / 2);
		margin-top: calc(var(--gutter) / 2);
	}

	.announcer {
		margin: var(--gutter) 0;
	}

	.fluid-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		grid-auto-rows: max-content;
		gap: calc(var(--gutter) * 2);
		height: 100%;
	}
</style>
