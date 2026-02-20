export default function SEOSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-12">
          <div>
            <h2 className="section-title mb-6">Why Choose PDFAndMore?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              PDFAndMore is your all-in-one solution for PDF conversion and manipulation. With our fast, secure, and easy-to-use tools, you can convert images to PDF, transform PDFs to Word documents, compress files, merge documents, and split PDFs—all without any technical knowledge required.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>Lightning-fast conversion with no file size limitations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>Bank-level security with encrypted file transfers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>No registration required—start converting immediately</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>Works on all devices—desktop, tablet, and mobile</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="section-title mb-6">Convert Images to PDF</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Need to turn your photos and scans into PDF documents? Our image to PDF converter is the easiest solution. Simply upload your images in JPG, PNG, or other formats, and we'll create a professional PDF instantly. Perfect for digitizing documents, creating photo albums, or preparing images for printing.
            </p>
          </div>

          <div>
            <h2 className="section-title mb-6">Complete PDF Processing Suite</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Beyond simple conversions, PDFAndMore offers a complete suite of PDF tools. Compress your PDFs to reduce file size for easier sharing, merge multiple documents into one, split large PDFs into individual pages, or convert PDFs to editable Word documents. All tools are optimized for speed and quality.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/30 p-8">
            <h3 className="text-lg font-semibold mb-4">Related Searches</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
              <span>Image to PDF converter</span>
              <span>Free PDF conversion</span>
              <span>PDF to Word converter</span>
              <span>Compress PDF online</span>
              <span>Merge PDF files</span>
              <span>Split PDF pages</span>
              <span>JPG to PDF</span>
              <span>PNG to PDF</span>
              <span>Batch PDF converter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}