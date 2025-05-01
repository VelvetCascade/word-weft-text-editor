import {mergeAttributes, Node} from '@tiptap/core'
import {ReactNodeViewRenderer} from '@tiptap/react'
import Component from "@/components/minimal-tiptap/custom-extensions/spoiler/SpoilerComponent.tsx";
export interface SpoilerOptions {
    /**
     * Custom HTML attributes that should be added to the rendered HTML tag.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        spoiler: {
            setSpoiler: () => ReturnType,
            /**
             * Toggle a bold mark
             */
            toggleSpoiler: () => ReturnType,
            /**
             * Unset a bold mark
             */
            unsetSpoiler: () => ReturnType,
        }
    }
}

export const SpoilerCustomExtension = Node.create<SpoilerOptions>({
    name: 'spoiler',

    group: 'block',

    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'spoiler',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['spoiler']
    },

    addCommands() {
        return {
            setSpoiler:
                attributes => ({commands}) => {
                    return commands.setNode(this.name, attributes)
                },
            toggleSpoiler:
                attributes => ({commands}) => {
                    return commands.toggleNode(this.name, 'paragraph', attributes)
                },
            unsetSpoiler: (attributes) => ({ commands }) => {
                return commands.setNode('paragraph', attributes)
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component)
    },
})
