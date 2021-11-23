<!-- 
	@component
	Flavor

	Flavor card

	@prop {Flavor} flavor (see interface below)
	interface Flavor {
		name: string;
		cpus: number;
		gpus: number;
		mem: number;
		price: number;
		price_id: string;
		microservice: boolean;
		machine_learning: boolean;
	}
 -->
<script lang="ts">
	/* Component imports */
	import FlavorDataSheet from '$components/atoms/FlavorDataSheet.svelte';
	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import FluidCard from '$components/molecules/FluidCard.svelte';

	/* TypeScript imports */
	import type { Flavor } from '$interfaces';

	/* stores and helper imports */
	import { selectedVariant, cartItems } from '$stores';
	import { getFormattedPrice } from '$utilities';

	export let flavor: Flavor;

	let addFlavorToCart = () =>
		($cartItems = [
			...$cartItems,
			{
				variantInfo: { ...$selectedVariant },
				flavor: { ...flavor }
			}
		]);
</script>

<FluidCard>
	<h3 slot="heading">{flavor.name}</h3>
	<FlavorDataSheet {flavor} />
	<svelte:fragment slot="price">
		<p class="price">€&nbsp;{getFormattedPrice(flavor.price)}</p>
		<SimpleButton action={addFlavorToCart} skin="secondary">Add to estimate</SimpleButton>
	</svelte:fragment>
</FluidCard>
