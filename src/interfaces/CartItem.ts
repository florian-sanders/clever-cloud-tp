import type { Flavor, SelectedVariant } from '$interfaces';

export interface CartItem  {
    variantInfo: SelectedVariant;
    flavor: Flavor;
}