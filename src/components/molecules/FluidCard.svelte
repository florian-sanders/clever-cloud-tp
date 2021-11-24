<!-- 
	@component
	FluidCard

	card component, horizontal when there is enough space
	elements flow vertically when not enough space
	Mainly a CSS component

	@slot default - card body. Its content.
	@slot heading - this should be simplified, it is not necessary and does no bring much.
	@slot price - optional to display price and button on top of each other, at the end of the card
 -->
<script>
	import { fade } from 'svelte/transition';
</script>

<div class="horizontal-card" in:fade>
	<div class="card-heading">
		<slot name="heading" />
	</div>

	<slot />

	{#if $$slots.price}
		<div class="price-cta">
			<slot name="price" />
		</div>
	{/if}
</div>

<style>
	.horizontal-card {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-evenly;
		gap: calc(var(--gutter) * 2);
		padding: 1.5rem;
		width: 100%;
		background-color: var(--light-primary-color);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-elevation-low);
		margin-bottom: calc(var(--gutter) * 2);
		transition: box-shadow 0.3s ease-out;
	}

	.horizontal-card:hover,
	.horizontal-card:focus-within {
		transition: box-shadow 0.3s ease-out;
		box-shadow: var(--shadow-elevation-medium);
	}

	/* could move this to global utilitary class and avoid managing heading style in this component */
	.card-heading {
		letter-spacing: 2px;
		min-width: 3rem;
		font-size: 0.9rem;
		font-weight: 600;
		text-align: center;
		text-transform: uppercase;
	}

	.price-cta {
		display: flex;
		flex-flow: column wrap;
		justify-content: space-evenly;
		gap: 1rem;
		align-items: center;
		font-family: 'Ubuntu', Arial, Helvetica, sans-serif;
		font-weight: bold;
		font-size: 1.3rem;
	}
</style>
