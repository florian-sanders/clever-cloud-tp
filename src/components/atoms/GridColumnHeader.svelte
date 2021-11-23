<!-- 
	@component
	GridColumnHeader

	Header for grid columns. Mainly used to make sure they all have consistent height and styles.
 -->
<div class="grid-col-header">
	<slot />
</div>

<style>
	.grid-col-header {
		margin-top: calc(var(--gutter) * 2);
		min-height: 7rem;
	}

	:global(.grid-col-header h2) {
        margin: calc(var(--gutter) * 2);
		font-size: 1rem;
		text-align: center;
		font-weight: 500;
		font-family: 'Ubuntu', Arial, Helvetica, sans-serif;
		letter-spacing: 0.5px;
		font-style: italic;
	}
</style>
