export interface ExtractedPost {
    _id: string;
    owner: string;
    content: string;
    url?: string;
    images?: string[];
    videos?: string[];
}

export interface AmazonProductListing {
    _id: string;
    brand?: string;
    url?: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    stock: number;
    category?: string[];
    status?: 'draft' | 'listed';
    images?: string[];
    videos: string[];
}

export interface ExtractedMedia {
    url: string;
    type: 'image' | 'video';
}