import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const AmazonPage = () => {
    const products = [
        {
            id: 1,
            title: 'Wireless Earbuds',
            price: '$129.99',
            image: '/api/placeholder/400/400',
            status: 'listed',
        },
        {
            id: 2,
            title: 'Smart Watch',
            price: '$199.99',
            image: '/api/placeholder/400/400',
            status: 'draft',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">
                            All Products
                        </TabsTrigger>
                        <TabsTrigger value="listings">
                            Your Listings
                        </TabsTrigger>
                        <TabsTrigger value="watchlist">
                            Your Watchlist
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Card key={product.id}>
                                    <CardHeader>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle>
                                            {product.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {product.price}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                        >
                                            <Heart className="h-4 w-4" />
                                        </Button>
                                        <Button>
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="listings" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Similar layout for listings */}
                        </div>
                    </TabsContent>

                    <TabsContent value="watchlist" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Similar layout for watchlist */}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AmazonPage;
