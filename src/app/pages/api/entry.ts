import { MovementResponse } from "./movement";

export interface Entry {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    data?: Date;
    category_id?: string;
}
export function mapMovementResponseToEntry(movement: MovementResponse): Entry {
    return {
        id: movement.id,
        name: movement.name,
        description: movement.description,
        price: parseFloat(movement.price), // Converte a string para número
        category: movement.category.name,
        data: new Date(movement.data),
    };
}
