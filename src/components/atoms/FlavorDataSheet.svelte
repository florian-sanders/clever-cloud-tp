<script lang="ts">
	import type { Flavor } from '$interfaces';

	import { getFormattedRam } from '$utilities';

	export let flavor: Flavor;
</script>

<div class="data-sheet">
	<dl>
		<dt>CPUs:</dt>
		<dd>{flavor.cpus}</dd>
		<dt>GPUs:</dt>
		<dd>{flavor.gpus}</dd>
		<dt>RAM:</dt>
		<dd>{getFormattedRam(flavor.mem)}</dd>
	</dl>
	<dl>
		<dt>Microservice:</dt>
		<dd>
			{#if flavor.microservice}
				<img src="/img/check-circle.svg" alt="yes" width="16" />
			{:else}
				<img src="/img/cross-circle.svg" alt="no" width="16" />
			{/if}
		</dd>
		<dt>Machine learning:</dt>
		<dd>
			{#if flavor.machine_learning}
				<img src="/img/check-circle.svg" alt="yes" width="16" />
			{:else}
				<img src="/img/cross-circle.svg" alt="no" width="16" />
			{/if}
		</dd>
	</dl>
</div>

<style>
    .data-sheet {
        display: flex;
        flex-flow: row wrap;
		align-items: center;
        gap: 1.5rem;
    }
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		row-gap: calc(var(--gutter) / 1.5);
		align-items: center;
		width: max-content;
        height: max-content;
		font-size: 0.9rem;
	}

	dd {
		margin: 0;
	}

	dd img {
		display: block;
		margin: 0;
		width: 1rem;
		height: 1rem;
	}

	dt {
		margin-right: calc(var(--gutter) / 2);
		color: var(--primary-color);
		text-transform: capitalize;
	}
</style>
