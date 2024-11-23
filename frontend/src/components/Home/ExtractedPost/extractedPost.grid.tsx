'use client';
import { useState } from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';

interface MediaGridProps {
    media: string[];
    type: 'image' | 'video';
}

export const MediaGrid = ({ media, type }: MediaGridProps) => {
    const [selectedMedia, setSelectedMedia] =
        useState<string | null>(null);
    const [selectedMediaType, setSelectedMediaType] = useState<string | null>(
        null
    );

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {media.map((item, index) => (
                    <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                            setSelectedMedia(item);
                            setSelectedMediaType(type);
                        }}
                    >
                        {type === 'video' ? (
                            <video
                                src={item}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={item}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>

            {selectedMedia && <Dialog
                open={!!selectedMedia}
                onOpenChange={() => setSelectedMedia(null)}
            >
                <DialogContent className="max-w-4xl">
                    <div className="aspect-video w-full">
                        {selectedMediaType === 'video' ? (
                            <video
                                src={selectedMedia}
                                controls
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={selectedMedia}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>}
        </>
    );
};
