<!-- 
	@component
	SimpleButton

	Basic button with 3 different styles

	@prop {function} action - Callback to be triggered on click
	@prop {string} text - Text displayed inside the button
	@prop {'primary' | 'secondary' | 'cautionary'} skin - Visual appearance of the button
		@default 'primary'
 -->

<script lang="ts">
	export let action: () => void;
	export let text: string;
	export let skin: 'primary' | 'secondary' | 'cautionary' = 'primary';
</script>

<button class={skin} on:click={action} type="button">{text}</button>

<style>
	/* basic styles */
	button {
		border: solid 2px transparent;
		padding: 0.5rem 1rem;
		border-radius: 0.3rem;
		color: var(--white-color);
		box-shadow: var(--shadow-closer);
		transition: background-color 0.4s ease-out;
	}

	button.primary {
		background: var(--primary-color);
	}

	button.secondary {
		background: var(--secondary-color);
	}

	button.cautionary {
		background: var(--cautionary-color);
	}

	/* hover + focus styles */
	button:hover,
	button:focus-visible {
		background-color: transparent;
		border: solid 2px var(--primary-color);
		color: var(--black-color);
		transition: background-color 0.4s ease-out, color 0.4s ease-out, border 1s ease-out;
	}

	button:focus-visible {
		outline: dashed 2px var(--primary-color);
		outline-offset: 5px;
	}

	button.primary:hover,
	button.primary:focus-visible {
		background: transparent;
		border: solid 2px var(--primary-color);
	}

	button.secondary:hover,
	button.secondary:focus-visible {
		background: transparent;
		border: solid 2px var(--secondary-color);
	}

	button.cautionary:hover,
	button.cautionary:focus-visible {
		background: transparent;
		border: solid 2px var(--cautionary-color);
	}
</style>
