'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExtractedPostView } from '@/components/Home/ExtractedPost/extractedPost';
import {
    AmazonProductListing,
    ExtractedPost,
} from '@/types/index.js';
import { useAuth } from '@/components/global/AuthProvider';
import { redirect } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/Home/GenerateProduct/ProductCard';

const samplePost: ExtractedPost = {
    _id: '1',
    content: 'Sample Post 1',
    owner: 'sample_user',
    url: 'https://www.instagram.com/p/111111111/',
    images: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
    ],
};

const HomePage = () => {
    const [link, setLink] = useState('');
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('post');
    const [isGeneratingProduct, setIsGeneratingProduct] =
        useState(false);
    const [posts, setAllPosts] = useState<ExtractedPost[] | null>([
        samplePost,
    ]);
    const [product, setProduct] =
        useState<AmazonProductListing | null>(null);
    const [error, setError] = useState('');

    const addPost = async (url: string) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/posts/url`,
                { url },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setAllPosts([response.data]);

            // Automatically call addProduct in the background
            if (response.data.url) {
                addProduct(response.data.url);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load content. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const addProduct = async (url: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/products/analyze?url=${url}`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response?.data) {
                setProduct(
                    response.data as unknown as AmazonProductListing
                );
            } else if (response.status === 401) {
                redirect('/auth');
            } else if (response.status === 403) {
                redirect('/auth');
            } else {
                console.error(response);
            }
        } catch (err: AxiosError | any) {
            console.error(err);
            setError('Failed to load product. Please try again.');
        }
    };

    const handleGenerateProduct = async () => {
        if (!posts?.[0]?.url) {
            setError('Please add a post first');
            return;
        }
        setIsGeneratingProduct(true);
        setError('');
        try {
            await addProduct(posts[0].url);
            setActiveTab('listing');
        } catch (err) {
            console.error(err);
            setError('Failed to generate product listing');
        } finally {
            setIsGeneratingProduct(false);
        }
    };

    const handleDelete = (id: string) => {
        console.log('Deleting Post:', id);
        setAllPosts((prev: ExtractedPost[] | null) => {
            if (!prev) return null;
            return prev.filter((post) => post._id !== id);
        });
        // API call can be added here if needed
    };

    const handlePaste = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLink(link.trim());
        await addPost(link);
    };

    const handleTokens = async () => {
        try {
            if (!user) {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/verify`,
                    { withCredentials: true }
                );

                if (res.status === 200 && res.data) {
                    setUser(res.data);
                } else {
                    redirect('/auth');
                }
            }
        } catch (error: AxiosError | any) {
            if (
                error?.response &&
                [401, 403].includes(error?.response?.status)
            ) {
                redirect('/auth');
            }
            console.error('Token verification failed:', error);
        }
    };

    useEffect(() => {
        handleTokens();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="mb-8 bg-gray-900 border-gray-800 py-6">
                    <CardHeader>
                        <CardTitle className="text-center text-5xl text-gray-100">
                            Import Social Media Content
                        </CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            <div className="flex justify-center space-x-4 my-2 mt-6">
                                <Instagram className="h-8 w-8 text-pink-500" />
                                <Twitter className="h-8 w-8 text-blue-400" />
                                <Youtube className="h-8 w-8 text-red-500" />
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PlaceholdersAndVanishInput
                            placeholders={[
                                'Paste Instagram link...',
                                'Paste Twitter link...',
                                'Paste YouTube link...',
                            ]}
                            onChange={(e) => setLink(e.target.value)}
                            onSubmit={handlePaste}
                        />
                    </CardContent>
                </Card>

                {error && (
                    <Alert
                        variant="destructive"
                        className="mb-6 bg-red-900 border-red-800"
                    >
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-4 border-b-2 border-white"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post">Post</TabsTrigger>
                        <TabsTrigger value="listing">
                            Listing
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="post" className="space-y-4">
                        <ExtractedPostView
                            post={posts?.[0] || null}
                            handleDelete={handleDelete}
                        />
                        {posts?.[0] && (
                            <Button
                                onClick={handleGenerateProduct}
                                disabled={isGeneratingProduct}
                                className="w-full mt-4"
                            >
                                {isGeneratingProduct
                                    ? 'Generating...'
                                    : 'Generate Product Listing'}
                            </Button>
                        )}
                    </TabsContent>

                    {product && <TabsContent value="listing">
                        <ProductCard product={product} />
                    </TabsContent>}
                </Tabs>
            </div>
        </div>
    );
};

export default HomePage;
