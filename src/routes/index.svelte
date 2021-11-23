<script lang="ts">
	/* Svelte imports */
	import { onMount } from 'svelte';

	/* Component imports */
	import Variants from '$components/organisms/Variants.svelte';
	import Flavors from '$components/organisms/Flavors.svelte';
	import CartItems from '$components/organisms/CartItems.svelte';

	/* Stores & helpters imports */
	import { loading, variants, total, selectedVariant } from '$stores';
	import { getFormattedPrice } from '$utilities';

	onMount(async () => {
		try {
			const response = await fetch('https://api.clever-cloud.com/v2/products/instances');

			const data = await response.json();

			$variants = data
				.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
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
</script>

<svelte:head>
	<title>Clever Price viewer</title>
</svelte:head>

<header role="banner">
	<p class="site-name">Clever Price Viewer</p>
	<h1 class="total">Total: <strong>€ {formattedTotal}</strong></h1>
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
			<CartItems />
		</div>
	</div>
</main>

<style>
	header {
		position: absolute;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 3.5rem;
		padding: var(--gutter);
		box-shadow: var(--shadow-elevation-medium);
		color: var(--white-color);
		background: linear-gradient(140deg, var(--primary-color), var(--secondary-color));
		font-family: 'Montserrat', Arial, Helvetica, sans-serif;
	}

	h1 {
		margin: 0;
		font-size: 1.2rem;
		font-weight: normal;
	}

	.site-name {
		font-size: 1.2rem;
		font-weight: bold;
	}
	.total {
		font-size: 1.2rem;
	}

	.total strong {
		font-size: 1.3rem;
		letter-spacing: 1px;
		margin-left: calc(var(--gutter) / 2);
	}

	main {
		padding-top: 4rem;
		height: 100%;
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
		scroll-behavior: smooth;
	}
</style>
