import { writable, derived } from 'svelte/store';
import type { CartVariant, Variant, CartItem, SelectedVariant } from '$interfaces';

export const variants = writable<Array<Variant>>([]);

export const cartVariants = writable<Array<CartVariant>>([]);

export const cartItems = writable<Array<CartItem>>([]);

export const currentVariantId = writable('');

export const selectedVariant = writable<SelectedVariant | undefined>();

export const total = derived(cartItems, ($cartItems) =>
	$cartItems.reduce((sum, cartItem) => sum + cartItem.flavor.price, 0)
);