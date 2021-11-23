<script lang="ts">
	import Variant from '$components/molecules/Variant.svelte';
	import Loader from '$components/atoms/Loader.svelte';
	import { variants, loading } from '$stores';

	import { pluralize } from '$utilities';
import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';

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

<GridColumnHeader>
	<h2>Select runtime</h2>
	<details>
		<summary>Filter</summary>
		<div class="filter">
			<label for="variant-filter">Runtime name or stack</label>
			<input id="variant-filter" type="text" bind:value={filterCriterion} />
		</div>
	</details>

	<p class="announcer" role="status">
		{#if $loading}
			<strong>Chargement en cours</strong>
		{:else}
			<strong>{displayedVariants.length} {pluralize(displayedVariants.length, 'result')}</strong> available
		{/if}
	</p>
</GridColumnHeader>

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
		padding: calc(var(--gutter) / 1.5);
		margin-top: calc(var(--gutter) / 2);
		border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
		box-shadow: var(--shadow-elevation-low);
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
