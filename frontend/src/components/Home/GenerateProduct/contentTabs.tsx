import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ExtractedPostView } from '@/components/Home/ExtractedPost/extractedPost';
import ProductCard from '@/components/Home/GenerateProduct/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AmazonProductListing,
    ExtractedPost,
} from '@/types/index.js';

export const ContentTabs = ({
    activeTab,
    setActiveTab,
    posts,
    product,
    handleDelete,
    handleGenerateProduct,
    isGeneratingProduct,
    showTabHint,
}: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    posts: ExtractedPost[] | null;
    product: AmazonProductListing | null;
    handleDelete: (id: string) => void;
    handleGenerateProduct: () => void;
    isGeneratingProduct: boolean;
    showTabHint: boolean;
}) => {
    return (
        <div className="relative">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <div className="relative">
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-800 rounded-lg">
                        <TabsTrigger
                            value="post"
                            className="data-[state=active]:bg-gray-600 transition-all duration-200"
                        >
                            Post
                        </TabsTrigger>
                        <TabsTrigger
                            value="listing"
                            className="relative data-[state=active]:bg-gray-600 transition-all duration-200"
                        >
                            Listing
                            {product?._id && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-xs rounded-full">
                                    1
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {showTabHint && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
                            >
                                Click tabs to switch between views
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-blue-500" />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

                <TabsContent value="post" className="space-y-4">
                    <ExtractedPostView
                        post={posts?.[0] || null}
                        handleDelete={handleDelete}
                    />
                    {posts?.[0] && (
                        <Button
                            onClick={handleGenerateProduct}
                            disabled={isGeneratingProduct}
                            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                        >
                            {isGeneratingProduct ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    <span>Generating...</span>
                                </div>
                            ) : (
                                'Generate Product Listing'
                            )}
                        </Button>
                    )}
                </TabsContent>

                <TabsContent value="listing">
                    {product ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            No product listing generated yet. Generate
                            one from the Post tab.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
