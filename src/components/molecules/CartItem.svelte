<!-- 
	@component
	CartItem

	CartItem card

	@prop {CartItem} cartItem (see interface below)
	CartItem  {
		variantInfo: {
			variantId: string,
			variantImgPath: string,
			variantName: string
		},
		flavor: Flavor {
			name: string;
			cpus: number;
			gpus: number;
			mem: number;
			price: number;
			price_id: string;
			microservice: boolean;
			machine_learning: boolean;
		}
	}
 -->
<script lang="ts">
	/* svelte imports */
	import { onMount } from 'svelte';

	/* Component imports */
	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import FlavorDataSheet from '$components/atoms/FlavorDataSheet.svelte';
	import FluidCard from '$components/molecules/FluidCard.svelte';

	/* TypeScript imports */
	import type { CartItem } from '$interfaces';

	/* stores and helper imports */
	import { cartItems } from '$stores';
	import { getFormattedPrice } from '$utilities';

	export let cartItem: CartItem;

	onMount(() => {
		cartItemHeadingElement.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest'
		});
	});

	let cartItemHeadingElement: HTMLHeadingElement;
	let elementToFocus: HTMLDivElement | HTMLHeadingElement;

	/* destructuring to avoid having to use flavor.prop.prop */
	$: ({ variantInfo, flavor } = cartItem);

	let removeItemFromCart = () => {
		$cartItems = $cartItems.filter((prevCartItem) => prevCartItem != cartItem);
		if ($cartItems.length > 0) {
			elementToFocus = cartItemHeadingElement.closest('h3');
		} else {
			elementToFocus = cartItemHeadingElement.closest('.grid-column');
		}
		elementToFocus.focus();
	};
</script>

<FluidCard>
	<h3 slot="heading" bind:this={cartItemHeadingElement} tabindex="-1">
		<span class="variant-info">
			<img src={variantInfo.variantImgPath} alt="" width="40" />
			<span class="variant-name">{variantInfo.variantName}</span>
			<span class="flavor-name">{flavor.name}</span>
		</span>
	</h3>
	<details>
		<summary>Specifications</summary>
		<FlavorDataSheet {flavor} />
	</details>

	<svelte:fragment slot="price">
		<p>€ {getFormattedPrice(flavor.price)}</p>
		<SimpleButton action={removeItemFromCart} skin="cautionary">Remove</SimpleButton>
	</svelte:fragment>
</FluidCard>

<style>
	h3 {
		font-size: 1rem;
		margin: 0;
	}

	.variant-info {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		gap: var(--gutter);
	}

	.variant-name {
		display: block;
		width: 4rem;
		font-weight: normal;
		text-transform: none;
		letter-spacing: initial;
		text-align: left;
	}

	.flavor-name {
		display: block;
		width: 4rem;
	}

	.variant-info img {
		border-radius: var(--border-radius);
	}

	details summary {
		cursor: pointer;
	}
</style>
