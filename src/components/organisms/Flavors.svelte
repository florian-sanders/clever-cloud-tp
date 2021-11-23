<!-- 
	/**
	* @component Flavors
	* List of Flavor components. Contains a header with a heading guiding user.
	*/ 
-->
<script lang="ts">
	/* Component imports */
	import Flavor from '$components/molecules/Flavor.svelte';
	import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';

	/* Typescript imports */
	import type { Flavor as FlavorType} from '$interfaces';

	/* Stores and helper imports */
	import { selectedVariant, variants } from '$stores';

	let columnHeading: HTMLHeadingElement;
	let displayedFlavors: Array<FlavorType>;

	/**
	 * Function
	 * called everytime displayedFlavors changes value
	 * focus column heading
	 * This should be tested with blind users to be sure it is needed and it is not confusing.
	 * Might be better not to do anything since they can use heading navigation to reach columns easily.
	 */
	let focusHeading = () => {
		columnHeading?.focus();
	};

	$: {
		displayedFlavors = $variants.find(
			(variant) => $selectedVariant?.variantId === variant.id
		)?.flavors;

		/* only focus heading if flavors are displayed. This prevents focusing heading on component mounting */
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
