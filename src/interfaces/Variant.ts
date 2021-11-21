import type { Flavor } from "./Flavor";

export interface Variant {
    id: string
	language: string
	imgPath: string
	name: string
	deployments: Array<string>
	flavors: Array<Flavor>
}