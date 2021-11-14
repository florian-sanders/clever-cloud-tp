<script lang="ts">
	import SimpleButton from '$components/atoms/SimpleButton.svelte';
	import { count } from '$stores';
</script>

<svelte:head>
	<title>Clever cloud - Cart</title>
</svelte:head>

<h1>Buttons</h1>

<SimpleButton
	action={() => { $count++}}
	skin="primary"
	text="Select {$count}"
/>

<SimpleButton
	action={() => {
		// placeholder
	}}
	skin="secondary"
	text="Add to cart"
/>

<SimpleButton
	action={() => {
		// placeholder
	}}
	skin="cautionary"
	text="Remove from cart"
/>
