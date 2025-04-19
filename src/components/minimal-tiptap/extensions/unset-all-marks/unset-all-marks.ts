import { Extension } from '@tiptap/react'
import { FontFamily } from '@tiptap/extension-font-family'
import Details from "@tiptap-pro/extension-details";

export const UnsetAllMarks = Extension.create({
  addKeyboardShortcuts() {
    return {
      'Mod-\\': () => this.editor.commands.unsetAllMarks()
    }
  }
})

export const CustomFontFamily = FontFamily.extend({
  addKeyboardShortcuts() {
    return {
      // ↓ your new keyboard shortcut
      'Mod-shift-1': () => this.editor.chain().focus().setFontFamily("sans-serif").run(),
      'Mod-shift-2': () => this.editor.chain().focus().setFontFamily("serif").run(),
      'Mod-shift-3': () => this.editor.chain().focus().setFontFamily("monospace").run(),
      'Mod-shift-4': () => this.editor.chain().focus().setFontFamily("cursive").run(),
      'Mod-shift-5': () => this.editor.chain().focus().setFontFamily("fantasy").run()
    }
  },
})

export const CustomDetails = Details.extend({
  addKeyboardShortcuts() {
    return {
      // ↓ your new keyboard shortcut
      'Mod-alt-D': () => this.editor.chain().focus().setDetails().run()
    }
  },
})