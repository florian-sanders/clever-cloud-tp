<!-- 
	/**
	* @component CartItems
	* List of CartItem components. Contains a header with a heading guiding users.
	*/ 
-->
<script lang="ts">
	/* Component imports */
	import GridColumnHeader from '$components/atoms/GridColumnHeader.svelte';
	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import CartItem from '$components/molecules/CartItem.svelte';

	/* stores and helpers imports */
	import { cartItems } from '$stores';
	import { pluralize } from '$utilities';

	let itemCountElement: HTMLParagraphElement;

	let removeAllItems = () => {
		$cartItems = [];
		itemCountElement?.focus();
	};

	/* necesary because cartItems is watched but its properties are not */
	$: cartItemsCount = $cartItems.length;
</script>

<GridColumnHeader>
	<h2 tabindex="-1">View selected items</h2>
	<p class="status" bind:this={itemCountElement} tabindex="-1">
		<span aria-live="polite" aria-atomic="true"><strong>{cartItemsCount}</strong> {pluralize(cartItemsCount, 'product')}</span>
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
