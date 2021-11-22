<script lang="ts">
    import { selectedVariant, variants } from '$stores';
    import Flavor from '$components/molecules/Flavor.svelte';

    $: displayedFlavors = $variants.find(
		(variant) => $selectedVariant?.variantId === variant.id
	)?.flavors;
</script>

<h2>Pick runtime instance sizes</h2>
{#if $selectedVariant?.variantId}
	{#each displayedFlavors as flavor}
		<Flavor {flavor} />
	{/each}
{:else}
	<p class="placeholder">Select a runtime to display its options here</p>
{/if}

<style>
	h2 {
		min-height: 4.5rem;
	}
</style>