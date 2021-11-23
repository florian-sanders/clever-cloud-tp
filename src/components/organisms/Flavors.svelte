<script lang="ts">
	import type { Flavor as FlavorType} from '$interfaces';

	import { selectedVariant, variants } from '$stores';
	import Flavor from '$components/molecules/Flavor.svelte';
	import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';

	let columnHeading: HTMLHeadingElement;
	let displayedFlavors: Array<FlavorType>;

	let focusHeading = () => {
		columnHeading?.focus();
	};

	$: {
		displayedFlavors = $variants.find(
			(variant) => $selectedVariant?.variantId === variant.id
		)?.flavors;
		
		if (displayedFlavors) focusHeading();
	}
</script>

<GridColumnHeader>
	<h2 tabindex="-1" bind:this={columnHeading}>Pick virtual machine sizes</h2>
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
