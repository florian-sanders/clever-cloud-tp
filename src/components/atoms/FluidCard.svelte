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
		margin: calc(var(--gutter) * 2) 0;
		transition: box-shadow 0.3s ease-out;
	}

	.horizontal-card:hover,
	.horizontal-card:focus-within {
		transition: box-shadow 0.3s ease-out;
		box-shadow: var(--shadow-elevation-medium);
	}

	.card-heading {
		letter-spacing: 2px;
		min-width: 3rem;
		font-size: 0.9rem;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
	}

	.price-cta {
		display: flex;
		flex-flow: column wrap;
		justify-content: space-evenly;
		gap: 1rem;
		align-items: center;
		font-weight: bold;
		font-size: 1.3rem;
	}
</style>
