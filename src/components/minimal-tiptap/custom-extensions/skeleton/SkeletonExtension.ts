import {mergeAttributes, Node} from '@tiptap/core'
import {ReactNodeViewRenderer} from '@tiptap/react'
import SkeletonNode from "@/components/minimal-tiptap/custom-extensions/skeleton/Skeleton.tsx";
export interface SkeletonOptions {
    /**
     * Custom HTML attributes that should be added to the rendered HTML tag.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        skeleton: {
            setSkeleton: () => ReturnType,
            /**
             * Toggle a bold mark
             */
            toggleSkeleton: () => ReturnType,
            /**
             * Unset a bold mark
             */
            unsetSkeleton: () => ReturnType,
        }
    }
}

export const SkeletonCustomExtension = Node.create<SkeletonOptions>({
    name: 'skeleton',

    group: 'block',

    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'skeleton',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['skeleton', mergeAttributes(HTMLAttributes)]
    },

    addCommands() {
        return {
            setSkeleton:
                attributes => ({commands}) => {
                    return commands.setNode(this.name, attributes)
                },
            toggleSkeleton:
                attributes => ({commands}) => {
                    return commands.toggleNode(this.name, 'paragraph', attributes)
                },
            unsetSkeleton: (attributes) => ({ commands }) => {
                return commands.setNode('paragraph', attributes)
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(SkeletonNode)
    },
})
