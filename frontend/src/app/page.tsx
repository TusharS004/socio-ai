'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Upload,
    Search,
    Save,
    ShoppingCart,
    Link as LinkIcon,
    Loader2,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const HomePage = () => {
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadedPost, setLoadedPost] = useState(null);
    const [error, setError] = useState('');

    const handlePaste = async (e) => {
        const pastedLink = e.target.value;
        setLink(pastedLink);

        if (
            pastedLink.includes('instagram.com') ||
            pastedLink.includes('facebook.com') ||
            pastedLink.includes('twitter.com') ||
            pastedLink.includes('youtube.com')
        ) {
            setIsLoading(true);
            setError('');

            // Simulate API call to fetch post data
            try {
                await new Promise((resolve) =>
                    setTimeout(resolve, 1500)
                ); // Simulate loading
                // Mock data - in real app, this would come from your API
                setLoadedPost({
                    id: 1,
                    username: '@user',
                    text: 'Content from: ' + pastedLink,
                    imageUrl: '/api/placeholder/600/400',
                    type: pastedLink.includes('youtube.com')
                        ? 'video'
                        : 'image',
                    platform: pastedLink.includes('instagram.com')
                        ? 'instagram'
                        : pastedLink.includes('facebook.com')
                        ? 'facebook'
                        : pastedLink.includes('twitter.com')
                        ? 'twitter'
                        : 'youtube',
                });
            } catch (err) {
                setError('Failed to load content. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Social Media Manager
                        </h1>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Youtube className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Link Input Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-center">
                            Paste your social media link
                        </CardTitle>
                        <CardDescription className="text-center">
                            Support for Instagram, Facebook, Twitter,
                            and YouTube posts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <div className="relative flex-1">
                                <Input
                                    placeholder="https://www.instagram.com/p/..."
                                    value={link}
                                    onChange={handlePaste}
                                    className="pl-10"
                                />
                                <LinkIcon className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                            </div>
                            <Button disabled={!link || isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <span>Load Content</span>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Error Message */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Loaded Content */}
                {loadedPost && (
                    <Card className="w-full">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                    <div>
                                        <CardTitle className="text-sm">
                                            {loadedPost.username}
                                        </CardTitle>
                                        <CardDescription>
                                            {loadedPost.platform}
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="secondary">
                                    {loadedPost.type}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{loadedPost.text}</p>
                            {loadedPost.type === 'image' ? (
                                <img
                                    src={loadedPost.imageUrl}
                                    alt="Content"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Youtube className="h-12 w-12 text-gray-400" />
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex space-x-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Re-upload
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none"
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    Analyze
                                </Button>
                            </div>
                            <div className="flex space-x-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Draft
                                </Button>
                                <Button className="flex-1 sm:flex-none">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Post to Amazon
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default HomePage;
