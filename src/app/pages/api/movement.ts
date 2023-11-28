export interface MovementResponse {
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
  }

  export interface MovementRequest {
    id?: string;
    name: string;
    description: string;
    data: Date; // Pode ser melhor representada como um tipo de data, por exemplo, Date
    category_id: number;
    price: number;
    type_id: number;
    user_id: string;
  }
