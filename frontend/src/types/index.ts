export interface ExtractedPost {
    id: string;
    username: string;
    title: string;
    content: string;
    url: string;
    images?: string[];
    videos?: string[];
}

export interface AmazonProductListing {
    _id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    stock: number;
    category?: string[];
    status?: 'draft' | 'listed';
}

export interface ExtractedMedia {
    id: string;
    url: string;
    type: 'image' | 'video';
    thumbnail?: string;
}
