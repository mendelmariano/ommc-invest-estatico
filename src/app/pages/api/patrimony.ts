export interface Patrimony {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    data?: Date;
}
export function mapPatrimonyResponseToPatrimony(patrimony: PatrimonyResponse): Patrimony {
    return {
        id: patrimony.id,
        name: patrimony.name,
        description: patrimony.description,
        price: parseFloat(patrimony.price), // Converte a string para número
        category: patrimony.category.name,
        data: new Date(patrimony.data),
    };
}

export interface PatrimonyResponse {
    id: string;
    name: string;
    description: string;
    data: string; // Pode ser melhor representada como um tipo de data, por exemplo, Date
    category_id: number;
    price: string; // Pode ser melhor representada como um tipo numérico, por exemplo, number
    createdAt: string; // Pode ser melhor representada como um tipo de data, por exemplo, Date
    updatedAt: string; // Pode ser melhor representada como um tipo de data, por exemplo, Date
    UserId: string;
    CategoryId: number;
    TypeId: number;
    type_id: number;
    user_id: string;
    category: {
      id: number;
      name: string;
    };
    type: {
      id: number;
      name: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
    };
    status: number;
  }

  export interface PatrimonyRequest {
    id?: string;
    name: string;
    description: string;
    data: Date; // Pode ser melhor representada como um tipo de data, por exemplo, Date
    category_id: number;
    price: number;
    type_id: number;
    user_id: string;
    status?: number;
  }

  export interface PeriodSearch {
    startDate: Date;
    endDate: Date;
};
