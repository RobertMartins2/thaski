import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough,
  List, 
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette
} from 'lucide-react'
import { Button } from './button'
import { Separator } from './separator'
import { Toggle } from './toggle'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState('')
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: placeholder || 'Digite sua descrição...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[120px] px-3 py-2',
        'data-placeholder': placeholder || 'Digite sua descrição...',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run()
  }

  return (
    <div className={`border border-input rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-border/30 flex-wrap">
        {/* Text Formatting */}
        <Toggle
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          size="sm"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive('underline')}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          size="sm"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists */}
        <Toggle
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          size="sm"
        >
          <List className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          size="sm"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
        <Toggle
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
          size="sm"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
          size="sm"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
          size="sm"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Link */}
        <Button
          variant="ghost"
          size="sm"
          onClick={addLink}
          className="h-8 px-2"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        {/* Text Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <div className="grid grid-cols-6 gap-2">
              {[
                '#000000', '#374151', '#6B7280', '#EF4444', '#F59E0B', 
                '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F97316'
              ].map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => setColor(color)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Editor Content */}
      <div className="min-h-[120px]">
        <EditorContent 
          editor={editor} 
          className="prose prose-sm max-w-none"
        />
      </div>
    </div>
  )
}