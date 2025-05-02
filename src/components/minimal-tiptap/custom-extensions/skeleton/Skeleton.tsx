import {NodeViewContent, NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import {Skeleton} from "@/components/ui/skeleton.tsx";

const SkeletonNode: React.FC = (props) => {
    return (
        <NodeViewWrapper>
            <div className="flex items-center space-x-4 w-full mb-4 md:mb-6">
                {/* Avatar size responsive to viewport */}
                <Skeleton className="h-8 w-8 md:h-12 md:w-12 rounded-full shrink-0"/>
                <div className="space-y-1 md:space-y-2 w-full">
                    <Skeleton className="h-3 md:h-4 w-full"/>
                    <Skeleton className="h-3 md:h-4 w-3/4"/>
                </div>
            </div>

            {/* Main content section */}
            <div className="flex flex-col space-y-4 md:space-y-6 w-full">
                {/* Large banner/image placeholder with responsive height */}

                {/* Additional content blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
                    <div className="space-y-1 md:space-y-2">
                        {/* Card with responsive height */}
                        <Skeleton className="h-24 sm:h-28 md:h-32 w-full rounded-lg"/>
                        <Skeleton className="h-3 md:h-4 w-full"/>
                        <Skeleton className="h-3 md:h-4 w-3/4"/>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                        {/* Card with responsive height */}
                        <Skeleton className="h-24 sm:h-28 md:h-32 w-full rounded-lg"/>
                        <Skeleton className="h-3 md:h-4 w-full"/>
                        <Skeleton className="h-3 md:h-4 w-3/4"/>
                    </div>
                </div>

                {/* Text content with responsive heights */}
                <div className="space-y-2 md:space-y-3 w-full">
                    <Skeleton className="h-4 md:h-6 w-full"/>
                    <Skeleton className="h-3 md:h-4 w-full"/>
                    <Skeleton className="h-3 md:h-4 w-full"/>
                    <Skeleton className="h-3 md:h-4 w-4/5"/>
                </div>

                {/* Action items / Footer with responsive heights */}
                <div className="flex justify-between items-center w-full pt-3 md:pt-4">
                    <div className="flex space-x-2 md:space-x-3">
                        <Skeleton className="h-8 md:h-10 w-16 md:w-20 rounded-md"/>
                        <Skeleton className="h-8 md:h-10 w-16 md:w-20 rounded-md"/>
                    </div>
                    <Skeleton className="h-8 md:h-10 w-24 md:w-32 rounded-md"/>
                </div>
            </div>
        </NodeViewWrapper>
    )
}

export default SkeletonNode;