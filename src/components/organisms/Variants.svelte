<script lang="ts">
	/* Component imports */
	import Variant from '$components/molecules/Variant.svelte';
	import Loader from '$components/atoms/Loader.svelte';
	import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';

	/* Stores & helpers imports */
	import { variants, loading } from '$stores';
	import { pluralize } from '$utilities';

	/**
	 * Used to filter Variants based on user input
	 * Necessary to avoid too much scrolling because there are 25 variants
	 */
	let filterCriterion = '';
	let displayedVariants = $variants;

	$: {
		/* Displayed variants are filtered everytime filterCriterion is updated (when user types in) */
		if (filterCriterion.trim()) {
			displayedVariants = $variants.filter(
				(variant) =>
					variant.name.toLowerCase().includes(filterCriterion.toLowerCase()) ||
					variant.language.toLowerCase().includes(filterCriterion.toLowerCase())
			);
		} else {
			/* if there is no user input, display all variants */
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
		/* 3 columns when there is enough space. 1 full-width column otherwise */
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		grid-auto-rows: max-content;
		gap: calc(var(--gutter) * 2);
		height: 100%;
	}
</style>
