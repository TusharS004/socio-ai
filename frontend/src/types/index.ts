export interface SocialMediaPost {
    _id: string;
    userId: string;
    content: string;
    createdAt: Date;
    username: string;
    platform: string;
    imageUrl?: string;
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
    category?: string;
    status?: 'draft' | 'listed';
}