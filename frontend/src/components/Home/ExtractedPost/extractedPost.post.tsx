'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { ExtractedPost } from '@/types/index.js';
// import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const PostCard = ({
    post,
    // setSelectedPost,
    handlePostDelete,
}: {
    post: ExtractedPost;
    key: string;
    // setSelectedPost: (post: ExtractedPost) => void;
    handlePostDelete: (id: string) => void;
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if(post.images?.length == 0 && post.videos?.length == 0) {
            setIsFlipped(true);
        }
    }, [post]);

    return (
        <Card
            className="max-w-[250px] max-h-full relative mb-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setIsFlipped(!isFlipped)}
            title={((post.images?.length ?? 0) <= 0 && (post.videos?.length ?? 0) <= 0) ? 'No Media To Show' : post.title.slice(0, 20) + '...'}
        >
            <button
                onClick={(e) => {
                    handlePostDelete(post.id);
                }}
                className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                aria-label="Delete post"
            >
                <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" />
            </button>

            <CardContent className="p-4">
                {post.videos ? (
                    <div className="aspect-video mb-4">
                        <video
                            src={post.videos[0]}
                            className="object-cover w-full h-full"
                            controls
                        />
                    </div>
                ) : (
                    post.images && (
                        <div className="aspect-video mb-4">
                            <img
                                src={post.images[0]}
                                alt={post.title}
                                className="object-cover max-w-[200px] max-h-[200px]"
                            />
                        </div>
                    )
                )}

                <h3 className="text-xl font-semibold mb-2">
                    {post.title.slice(0, 20) + '...'}
                </h3>
                <p className="text-gray-600">{post.content}</p>
                <Button variant={'link'}>
                    <a href={post.url} target='_blank'>
                        View original post
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
};

export default PostCard;
