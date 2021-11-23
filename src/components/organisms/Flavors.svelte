<script lang="ts">
	import { selectedVariant, variants } from '$stores';
	import Flavor from '$components/molecules/Flavor.svelte';
	import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';

	$: displayedFlavors = $variants.find(
		(variant) => $selectedVariant?.variantId === variant.id
	)?.flavors;
</script>

<GridColumnHeader>
	<h2>Pick virtual machine sizes</h2>
</GridColumnHeader>

{#if $selectedVariant?.variantId}
	{#each displayedFlavors as flavor}
		<Flavor {flavor} />
	{/each}
{:else}
	<p class="placeholder">Select a runtime to display its options here</p>
{/if}

<style>
	.header {
		min-height: 8.5rem;
		display: flex;
		justify-content: center;
	}
</style>
