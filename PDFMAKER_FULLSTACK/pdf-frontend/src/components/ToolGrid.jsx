import ToolCard from './ToolCard';
import {
  ImageIcon,
  FileText,
  Maximize2,
  Merge,
  Split
} from 'lucide-react';

const tools = [
  {
    icon: ImageIcon,
    title: 'Image to PDF',
    description: 'Convert your images (JPG, PNG, GIF) into high-quality PDF documents instantly.',
    href: '#image-to-pdf',
  },
  {
    icon: FileText,
    title: 'PDF to Word',
    description: 'Transform your PDFs into editable Word documents with perfect formatting.',
    href: '#tools',
  },
  {
    icon: FileText,
    title: 'Word to PDF',
    description: 'Convert Word documents to secure PDF format for sharing and archiving.',
    href: '#tools',
  },
  {
    icon: Maximize2,
    title: 'Compress PDF',
    description: 'Reduce file size without losing quality. Perfect for email and web sharing.',
    href: '#tools',
  },
  {
    icon: Merge,
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one organized document easily.',
    href: '#tools',
  },
  {
    icon: Split,
    title: 'Split PDF',
    description: 'Extract specific pages from PDFs or separate them into individual files.',
    href: '#tools',
  },
];

export default function ToolGrid() {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Powerful PDF Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to work with PDFs. From conversion to compression, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}