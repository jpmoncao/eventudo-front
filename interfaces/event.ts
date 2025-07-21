export interface IEvent {
    id: string;
    name: string;
    description: string;
    short_description: string
    date: Date
    location: string;
    address: string;
    price: number;
    id_category: number;
    createdAt: Date;
    updatedAt: Date;
    images?: IImage[];
    category?: ICategory;
    promotion: IPromotion | null;
};

export interface IImage {
    url: string;
    id_event: string;
}

export interface ICategory {
    id: number;
    name: string;
    description: string;
};

export interface IPromotion {
    id: number;
    price: number;
    isActive: boolean;
    id_event: string;
}