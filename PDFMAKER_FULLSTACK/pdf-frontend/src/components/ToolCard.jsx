export default function ToolCard({ icon: Icon, title, description, href }) {
  return (
    <a href={href} className="block group">
      <div className="tool-card">
        <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Learn more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}