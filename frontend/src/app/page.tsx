'use client';
import React, { useState, useEffect } from 'react';
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
import {
    Upload,
    Search,
    Save,
    ShoppingCart,
    Link as LinkIcon,
    Loader2,
    Instagram,
    Twitter,
    Youtube,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SocialMediaPost } from '@/types';

const HomePage = () => {
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadedPost, setLoadedPost] = useState<SocialMediaPost | null>(null);
    const [error, setError] = useState('');

    const handlePaste = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const pastedLink: string = form.link.value;
        setLink(pastedLink);
    };

    useEffect(() => {
        async function fetchData() {
            console.log(link);
            if (
                link.includes('instagram.com') ||
                link.includes('x.com')
            ) {
                setIsLoading(true);
                setError('');

                try {
                    const response = await fetch(
                        `http://localhost:5000/api/${ link.includes('instagram.com') ? 'instagram' : 'tweet' }`
                    );
                    console.log(response);

                    const data = await response.json();
                    setLoadedPost(data || null);
                } catch (err) {
                    setError(
                        'Failed to load content. Please try again.'
                    );
                } finally {
                    setIsLoading(false);
                }
            } else {
                setError('Invalid link. Please try again.');
            }
        }
        fetchData();
    }, [link]);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="mb-8 bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-center text-5xl text-gray-100">
                            Import Social Media Content
                        </CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            <div className="flex justify-center space-x-4 mt-2">
                                <Instagram className="h-8 w-8 text-pink-500" />
                                <Twitter className="h-8 w-8 text-blue-400" />
                                <Youtube className="h-8 w-8 text-red-500" />
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="flex space-x-2"
                            onSubmit={handlePaste}
                        >
                            <div className="relative flex-1">
                                <Input
                                    name='link'
                                    placeholder="Paste social media link here..."
                                    defaultValue={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                                />
                                <LinkIcon className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                            </div>
                            <Button
                                type="submit"
                                disabled={!link || isLoading}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <span>Import</span>
                                )}
                            </Button>
                        </form>
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

                {loadedPost && (
                    <Card className="w-full bg-gray-900 border-gray-800">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full ring-2 ring-blue-500" />
                                    <div>
                                        <CardTitle className="text-gray-100">
                                            {loadedPost.username}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {loadedPost.platform}
                                        </CardDescription>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-gray-300">
                                {loadedPost.content}
                            </p>
                            {loadedPost?.imageUrl && (
                                <div className="relative rounded-lg overflow-hidden">
                                    <img
                                        src={loadedPost?.imageUrl}
                                        alt="Content"
                                        className="w-full h-72 object-cover"
                                    />
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-800 pt-4">
                            <div className="flex space-x-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Re-upload
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    <Search className="h-4 w-4 mr-2" />
                                    Analyze
                                </Button>
                            </div>
                            <div className="flex space-x-2 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="flex-1 sm:flex-none border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Draft
                                </Button>
                                <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">
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
