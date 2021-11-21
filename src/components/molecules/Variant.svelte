<!-- 
	@component
	Variant

	Variant card

	@prop {number} id - The id of the variant (used to track the selected variant)
	@prop {string} imgPath - The path of variant img (no default path because the API always provides one)
	@prop {string} name - The variant name
 -->
<script lang="ts">
	import type { Variant } from '$interfaces';
	import { selectedVariant } from '$stores';
	import SimpleButton from '$components/atoms/SimpleButton.svelte';

	export let variant: Variant;

	enum deploymentImgs {
		'git' = '/img/git.svg',
		'ftp' = '/img/ftp.png'
	}

	$: isSelected = variant.id === $selectedVariant?.variantId;

	const selectVariant = () => {
		if (!isSelected) {
			$selectedVariant = {
				variantId: variant.id,
				variantImgPath: variant.imgPath,
				variantName: variant.name
			};
		}
	};
</script>

<div
	class="variant-card"
	class:selected={isSelected}
>
	<div class="variant-header">
		<img class="variant-logo" src={variant.imgPath} alt="" width="50" />
		<h3 id={`variant-${variant.id}`}>{variant.name}</h3>
	</div>
	<div class="deployment">
		<p>Deployment</p>
		<ul>
			{#each variant.deployments as deployment}
				<li><img src={deploymentImgs[deployment]} alt={deployment} height="30" /></li>
			{/each}
		</ul>
	</div>
	<div class="button">
		<SimpleButton
			action={selectVariant}
			text={isSelected ? 'Selected' : 'Select'}
			skin="primary"
			isDisabled={isSelected}
		/>
	</div>
</div>

<style>
	.variant-card {
		display: flex;
		flex-flow: column;
		/* width: clamp(230px, 40%, 230px); */
		padding-bottom: var(--gutter);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-elevation-low);
		background-color: var(--light-primary-color);
	}

	.variant-card.selected,
	.variant-card.selected:hover,
	.variant-card.selected:focus-within {
		box-shadow: var(--shadow-highlight-primary);
	}

	.variant-card:hover,
	.variant-card:focus-within {
		transition: box-shadow 0.3s ease-out;
		box-shadow: var(--shadow-elevation-medium);
	}

	.variant-header {
		position: relative;
	}

	.variant-card h3 {
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gutter) 0.5rem;
		margin: 0;
		height: 5rem;
		width: 100%;
		letter-spacing: 1.5px;
		text-align: center;
		font-size: 1.1rem;
		background: linear-gradient(180deg, rgb(255 255 255 / 82%) 16%, var(--light-primary-color) 80%);
	}

	.variant-logo {
		position: relative;
		width: 100%;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}

	.deployment {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: center;
		margin-bottom: var(--gutter);
		padding: 0.3rem;
		font-size: 0.8rem;
	}

	.deployment p {
		margin: 0;
	}

	.deployment ul {
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		margin-left: 0.7rem;
		list-style: none;
	}

	.deployment img {
		height: 1rem;
	}

	.button {
		max-width: fit-content;
		margin: auto;
	}
</style>
