<script lang="ts">
	import { onMount } from 'svelte';

	import Variant from '$components/molecules/Variant.svelte';
	import Flavor from '$components/molecules/Flavor.svelte';
	import CartItem from '$components/molecules/CartItem.svelte';

	import { variants, selectedVariant, cartItems, total } from '$stores';
	import { getFormattedPrice } from '$utilities';

	onMount(async () => {
		try {
			const response = await fetch('https://api.clever-cloud.com/v2/products/instances');

			const data = await response.json();

			$variants = data
				.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}

					return 0;
				})
				.map((variant) => ({
					id: variant.variant.id,
					language: variant.type,
					imgPath: variant.variant.logo,
					name: variant.name,
					deployments: variant.deployments,
					flavors: variant.flavors
				}));
		} catch (error) {
			console.log(error);
		}
	});

	$: displayedVariants = $variants;
	$: displayedFlavors = $variants.find(
		(variant) => $selectedVariant?.variantId === variant.id
	)?.flavors;
	$: formattedTotal = getFormattedPrice($total);
	$: cartItemsCount = $cartItems.length;
</script>

<svelte:head>
	<title>Clever cloud - Cart</title>
</svelte:head>

<header role="banner">
	<h1 role="status">Total: € {formattedTotal}</h1>
</header>
<main>
	<div class="grid">
		<div class="grid-column flex-columns">
			<h2>Select a runtime</h2>
			<div class="fluid-grid">
				{#each displayedVariants as variant}
					<Variant {variant} />
				{/each}
			</div>
		</div>
		<div class="grid-column">
			<h2>Choose sizes</h2>
			{#if $selectedVariant?.variantId}
				{#each displayedFlavors as flavor}
					<Flavor {flavor} />
				{/each}
			{:else}
				<p class="placeholder">Select a runtime to display its options here</p>
			{/if}
		</div>
		<div class="grid-column">
			<h2>{cartItemsCount} {cartItemsCount > 1 ? 'products' : 'product'}</h2>
			{#if $cartItems.length}
				{#each $cartItems as cartItem}
					<CartItem {cartItem} />
				{/each}
			{:else}
				<p class="placeholder">Select runtime sizes to estimate the total cost</p>
			{/if}
		</div>
	</div>
</main>

<style>
	header {
		padding: var(--gutter);
		box-shadow: var(--shadow-elevation-medium);
		color: var(--white-color);
		background: linear-gradient(140deg, var(--primary-color), var(--secondary-color));
	}

	main {
		height: 80%;
	}
	h1 {
		margin: 0;
		text-align: center;
	}

	h2 {
		width: 100%;
		margin: 0;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		height: 100%;
	}

	.grid-column {
		height: 100%;
		padding: 0.5rem 1rem;
		overflow-y: auto;
	}

	.fluid-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: calc(var(--gutter) * 2);
	}

	.placeholder {
		display: block;
		margin-top: 50%;
		color: var(--soft-black-color);
		text-align: center;
		font-size: 1.4rem;
		font-weight: bold;
	}
</style>
