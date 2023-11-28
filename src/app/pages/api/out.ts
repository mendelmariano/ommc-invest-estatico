import { MovementResponse } from "./movement";

export interface Out {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    data?: Date;
}
export function mapMovementResponseToOut(movement: MovementResponse): Out {
    return {
        id: movement.id,
        name: movement.name,
        description: movement.description,
        price: parseFloat(movement.price), // Converte a string para número
        category: movement.category.name,
        data: new Date(movement.data),
    };
}
