<!-- 
	@component
	SimpleButton

	Basic button with 3 different styles

	@prop {function} action - Callback to be triggered on click
	@prop {'primary' | 'secondary' | 'cautionary'} skin - Visual appearance of the button (default='primary') 		
	@prop {isPushButton} boolean - If true, button is a toggle button alternating between states (default=false)
	@prop {isPressed} boolean - State of the toggle button (pressed or not pressed) (default=false)
 -->
<script lang="ts">
	export let action: () => void;
	export let skin: 'primary' | 'secondary' | 'cautionary' = 'primary';
	export let isDisabled: boolean = false;
</script>

<button
	class={skin}
	on:click|stopPropagation={action}
	type="button"
	disabled={isDisabled}
	style={`--component-color: var(--${skin}-color)`}
>
	<slot />
</button>

<style>
	/* basic styles */
	button {
		height: fit-content;
		padding: 0.5rem 0.8rem;
		border-radius: 0.3rem;
		border: solid 1px transparent;
		box-shadow: var(--shadow-elevation-high);
		color: var(--white-color);
		font-family: 'Ubuntu', Arial;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.4s ease-out;
	}

	button.primary,
	button.secondary,
	button.cautionary {
		background: var(--component-color);
	}

	/* hover + focus styles */
	button:hover,
	button:focus-visible {
		border: solid 1px var(--component-color);
		background-color: var(--white-color);
		color: var(--black-color);
		transition: background-color 0.4s ease-out, color 0.4s ease-out, border 1s ease-out;
	}

	button:focus-visible {
		outline: dashed 2px var(--component-color);
		outline-offset: 5px;
	}

	button[disabled] {
		box-shadow: none;
		background-color: var(--soft-black-color);
		color: var(--white-color);
		cursor: auto;
	}
</style>
