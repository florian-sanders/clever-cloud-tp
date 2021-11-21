<script lang="ts">
    import CartItem from '$components/molecules/CartItem.svelte';

	import { cartItems } from '$stores';
    import { pluralize } from '$utilities';

	$: cartItemsCount = $cartItems.length;
</script>

<h2>{cartItemsCount} {pluralize(cartItemsCount, 'product')}</h2>
{#if $cartItems.length}
	{#each $cartItems as cartItem}
		<CartItem {cartItem} />
	{/each}
{:else}
	<p class="placeholder">Select runtime sizes to estimate the total cost</p>
{/if}
