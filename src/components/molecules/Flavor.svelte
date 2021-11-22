<!-- 
	@component
	Flavor

	Flavor card

	@prop {Flavor} flavor 
 -->
<script lang="ts">
	import type { Flavor, CartItem } from '$interfaces';
	import FlavorDataSheet from '$components/atoms/FlavorDataSheet.svelte';
	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import FluidCard from '$components/atoms/FluidCard.svelte';
	import { selectedVariant, cartItems } from '$stores';
	import { getFormattedPrice } from '$utilities';

	export let flavor: Flavor;

	let addFlavorToCart = () =>
		cartItems.update((previousCartItems) => [
			...previousCartItems,
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
		<SimpleButton action={addFlavorToCart} text="Add to estimate" skin="primary" />
	</svelte:fragment>
</FluidCard>