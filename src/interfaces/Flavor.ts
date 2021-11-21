export interface Flavor {
    name: string;
    cpus: number;
    gpus: number;
    mem: number;
    price: number;
    price_id: string;
    microservice: boolean;
    machine_learning: boolean;
}