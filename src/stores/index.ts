/* Svelte imports */
import { writable, derived } from 'svelte/store';

/* TypeScript imports */
import type { Variant, CartItem, SelectedVariant } from '$interfaces';

/* Stores */
export const loading = writable(true);

export const variants = writable<Array<Variant>>([]);

export const cartItems = writable<Array<CartItem>>([]);

export const selectedVariant = writable<SelectedVariant | undefined>();

/* Updates and exports a "total" store everytime cartItems store is modified */
export const total = derived(cartItems, ($cartItems) =>
	$cartItems.reduce((sum, cartItem) => sum + cartItem.flavor.price, 0)
);