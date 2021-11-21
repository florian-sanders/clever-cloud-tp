export const getFormattedRam = (mem: number): string =>
	mem < 1000 ? `${mem} MiB` : `${Math.floor(mem / 1000).toFixed(0)} GiB`;

export const getFormattedPrice = (price: number): string => (price * 41.904).toFixed(2);

export const pluralize = (dependency: number, singularWord: string): string => dependency > 1 ? `${singularWord}s` : singularWord; 