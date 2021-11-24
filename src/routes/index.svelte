<script lang="ts">
	/* Svelte imports */
	import { onMount } from 'svelte';

	/* Component imports */
	import Variants from '$components/organisms/Variants.svelte';
	import Flavors from '$components/organisms/Flavors.svelte';
	import CartItems from '$components/organisms/CartItems.svelte';

	/* Stores & helpters imports */
	import { loading, variants, total } from '$stores';
	import { getFormattedPrice } from '$utilities';

	/**
	 * When component is mounted: 
	 * fetch data, order it by Variant name (alphabetical)
	 * and save only relevant info in state (see Variants interface below)
	 * 
	 * interface Variant {
			id: string
			language: string
			imgPath: string
			name: string
			deployments: Array<string>
			flavors: Array<Flavor>
    	}
	*/
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
			/* App is in loading state by default so we set it to false at the end */
			$loading = false;
		}
	});

	/* refs used by switchColumn function */
	let variantsColumn: HTMLDivElement;
	let flavorsColumn: HTMLDivElement;
	let cartItemsColumn: HTMLDivElement;
	let gridColumns: Array<HTMLDivElement>;
	let currentColumnGrid: HTMLDivElement;
	let currentColumnIndex: number = 0;

	/**
	 * Function - Allow users to switch column using arrow keys when inside the grid
	 * @param e {DOM Event} the event triggered by keydown listener in the grid
	 */
	let switchColumn = (e) => {
		/* 
		* Since focus is moved upon selecting Variant, we have to find the closest column grid
		* Might be simplified with declarative pattern but no time to check
		*/
		currentColumnGrid = e.target.closest('.grid-column');
		currentColumnIndex = gridColumns.indexOf(currentColumnGrid);

		/* Modulo is used to cycle through the array of DOM elements to enable circular nav */
		switch (e.key) {
			case 'ArrowRight':
				currentColumnIndex = (currentColumnIndex + 1) % gridColumns.length;
				break;
			case 'ArrowLeft':
				currentColumnIndex = (currentColumnIndex + (gridColumns.length - 1)) % gridColumns.length; // previous element, instead of -1 we use +2
				break;
			default:
				return;
		}

		gridColumns[currentColumnIndex]?.focus();
	};

	// make sure to fill the array only after all refs have been initialized
	$: if (variantsColumn && flavorsColumn && cartItemsColumn) {
		gridColumns = [variantsColumn, flavorsColumn, cartItemsColumn];
	}
	$: formattedTotal = getFormattedPrice($total);
</script>

<svelte:head>
	<title>Clever Price viewer</title>
</svelte:head>

<header role="banner">
	<p class="site-name">Clever Price Viewer</p>
	<h1 class="total" aria-live="polite" aria-atomic="true">Total: <strong>€ {formattedTotal}</strong></h1>
</header>
<main>
	<div class="grid" on:keydown={switchColumn}>
		<div class="grid-column" tabindex="-1" bind:this={variantsColumn}>
			<Variants />
		</div>
		<div class="grid-column" tabindex="-1" bind:this={flavorsColumn}>
			<Flavors />
		</div>
		<div class="grid-column" tabindex="-1" bind:this={cartItemsColumn}>
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
