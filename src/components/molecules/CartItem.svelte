<script lang="ts">
	import type { CartItem } from '$interfaces';

	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import FlavorDataSheet from '$components/atoms/FlavorDataSheet.svelte';
	import FluidCard from '$components/atoms/FluidCard.svelte';
	import { getFormattedPrice } from '$utilities';
	import { cartItems } from '$stores';

	export let cartItem: CartItem;

	$: ({ variantInfo, flavor } = cartItem);

	let removeItemFromCart = () =>
		cartItems.update((previousCartItems) =>
			previousCartItems.filter((prevCartItem) => prevCartItem != cartItem)
		);
</script>

<FluidCard>
	<h3 slot="heading">
		<div class="variant-info">
			<img src={variantInfo.variantImgPath} alt="" width="40" />
			<span>{variantInfo.variantName}</span>
			{flavor.name}
		</div>
	</h3>
	<details>
		<summary>Specifications</summary>
		<FlavorDataSheet {flavor} />
	</details>

	<svelte:fragment slot="price">
		<p>€ {getFormattedPrice(flavor.price)}</p>
		<SimpleButton action={removeItemFromCart} text="Remove" skin="cautionary" />
	</svelte:fragment>
</FluidCard>

<style>
	h3 {
		font-size: 1rem;
		margin: 0;
	}

	.variant-info {
		display: grid;
		grid-template-columns: 40px repeat(auto-fit, minmax(80px, 1fr));
		align-items: center;
		justify-content: center;
		gap: var(--gutter);
		width: clamp(9rem, 10.1vw, 16rem);
	}

	.variant-info span {
		display: block;
		font-weight: normal;
		text-transform: none;
		letter-spacing: initial;
		text-align: left;
	}

	.variant-info img {
		border-radius: var(--border-radius);
	}

	details summary {
		cursor: pointer;
	}
</style>
