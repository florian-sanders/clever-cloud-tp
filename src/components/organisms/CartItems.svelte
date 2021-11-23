<script lang="ts">
	import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';
	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import CartItem from '$components/molecules/CartItem.svelte';

	import { cartItems } from '$stores';
	import { pluralize } from '$utilities';

	let removeAllItems = () => cartItems.update(() => []);

	$: cartItemsCount = $cartItems.length;
</script>

<GridColumnHeader>
	<h2>View selected items in estimate</h2>
	<p class="status">
		<span><strong>{cartItemsCount}</strong> {pluralize(cartItemsCount, 'product')}</span>
		{#if cartItemsCount}
			<SimpleButton skin="cautionary" action={removeAllItems}>Remove All</SimpleButton>
		{/if}
	</p>
</GridColumnHeader>
{#if $cartItems.length}
	{#each $cartItems as cartItem}
		<CartItem {cartItem} />
	{/each}
{:else}
	<p class="placeholder">Select virtual machine sizes to estimate the total cost</p>
{/if}

<style>
	.status {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--gutter);
	}
</style>
