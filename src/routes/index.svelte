<script lang="ts">
	import { onMount } from 'svelte';

	import Variants from '$components/organisms/Variants.svelte';
	import Flavors from '$components/organisms/Flavors.svelte';
	import CartItem from '$components/molecules/CartItem.svelte';

	import { loading, variants, cartItems, total } from '$stores';
	import { getFormattedPrice, pluralize } from '$utilities';

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
		} finally {
			$loading = false;
		}
	});

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
		<div class="grid-column">
			<Variants />
		</div>
		<div class="grid-column">
			<Flavors />
		</div>
		<div class="grid-column">
			<h2>{cartItemsCount} {pluralize(cartItemsCount, 'product')}</h2>
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
		position: absolute;
		width: 100%;
		height: 3.5rem;
		padding: var(--gutter);
		box-shadow: var(--shadow-elevation-medium);
		color: var(--white-color);
		background: linear-gradient(140deg, var(--primary-color), var(--secondary-color));
	}

	main {
		padding-top: 4rem;
		height: 100%;
	}
	h1 {
		margin: 0;
		font-size: 1.4rem;
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
		position: relative;
		height: 100%;
		padding: 0.5rem 1rem;
		overflow-y: auto;
	}
</style>
