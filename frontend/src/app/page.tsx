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
import {
    Instagram,
    Twitter,
    Youtube,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExtractedPostView } from '@/components/Home/ExtractedPost/extractedPost.main';
import { ExtractedPost } from '@/types/index.js';

const samplePost: ExtractedPost = {
    id: '1',
    title: 'Sample Post 1',
    username: 'sample_user',
    content: 'This is a sample post content',
    url: 'https://www.instagram.com/p/111111111/',
    images: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
    ],
};

const HomePage = () => {
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [posts, setAllPosts] =
    //     useState<ExtractedPost[] | null>(null);
    const [posts, setAllPosts] =
        useState<ExtractedPost[] | null>([samplePost]);
    const [error, setError] = useState('');

    const fetchPost = async (url: string) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/url`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: 'include',
                    },
                    body: JSON.stringify({ url }),
                }
            );
            const data: ExtractedPost = await response.json();
            if (!data) throw new Error('Invalid link');
            // setAllPosts((prev) => (prev ? [...prev, data] : [data]));

            setAllPosts([data]);

        } catch (err) {
            console.error(err);
            setError('Failed to load content. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        console.log('Deleting Post:', id);
        setAllPosts((prev: ExtractedPost[] | null) => {
            if (!prev) return null;
            return prev.filter((post) => post.id !== id);
        });

        // api

        // setPosts(null);
    }

    const handlePaste = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLink(link.trim());
        if (link.trim().length > 0) {
            const response = await fetchPost(link);
        } else {
            setError('Please enter a valid link');
        }
    };

    useEffect(() => {
        if (link.trim().length > 0) {
            fetchPost(link);
        }
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

                {/* <ExtractedPostView posts={posts} setAllPosts={setAllPosts} /> */}
                <ExtractedPostView
                    post={posts?.[0] || null}
                    // setAllPosts={setAllPosts}
                    handleDelete={handleDelete}
                />

                {/* <GeneratedProduct /> */}
            </div>
        </div>
    );
};

export default HomePage;
