import { Badge, Edit, Eye, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AmazonProductListing } from "@/types";

interface ProductCardProps {
    key: string;
    product: AmazonProductListing;
    isFavourite: boolean;
    toggleFavorite: (id: string) => void;
}

export const ProductCard = ({
    key,
    product,
    isFavourite,
    toggleFavorite,
}: ProductCardProps) => (
    <Card key={key} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
        <CardHeader className="relative p-0">
            <div className="relative group">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="mx-1"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="mx-1"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Badge
                className={`absolute top-4 left-4 ${
                    product.stock < 10
                        ? 'bg-amber-600'
                        : 'bg-green-600'
                }`}
            >
                {product.stock >= 10 ? 'In Stock' : 'Low Stock'}
            </Badge>
        </CardHeader>
        <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
                <Badge
                    fontVariant="outline"
                    className="text-gray-400 border-gray-700"
                >
                    {product?.category}
                </Badge>
                <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-gray-300 text-sm">
                        {product.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                        ({product.reviews})
                    </span>
                </div>
            </div>
            <CardTitle className="text-gray-100 mb-2 line-clamp-2">
                {product.title}
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-300">
                {product.price}
            </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t border-gray-800">
            <div className="flex space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className={`border-gray-700 ${
                        isFavourite
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => toggleFavorite(product._id)}
                >
                    <Heart
                        className="h-4 w-4"
                        fill={isFavourite ? 'currentColor' : 'none'}
                    />
                </Button>
                {product.status === 'draft' && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-700 text-gray-400 hover:text-gray-300"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
            </Button>
        </CardFooter>
    </Card>
);
