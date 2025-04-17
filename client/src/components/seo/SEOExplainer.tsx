import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle, Search, Share, LinkIcon, Code, Settings } from "lucide-react";

export default function SEOExplainer() {
  return (
    <Card className="p-5 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-200 shadow-sm mt-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-slate-800">SEO Concepts Explained</h3>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="technical-seo">
          <AccordionTrigger className="text-md hover:no-underline">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-slate-600" />
              <span>Technical SEO</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-slate-600">
            <p>Technical SEO ensures your website can be properly crawled and indexed by search engines. It includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Viewport meta tag - Makes your site mobile-friendly</li>
              <li>Charset - Defines character encoding</li>
              <li>Language - Specifies the language of your content</li>
              <li>Robots - Controls how search engines crawl and index your site</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500 italic">
              These elements help search engines understand your site's technical structure.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="content-tags">
          <AccordionTrigger className="text-md hover:no-underline">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-slate-600" />
              <span>Content Tags</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-slate-600">
            <p>Content tags provide information about your page content to search engines:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Title - The page title shown in search results (50-60 characters)</li>
              <li>Meta Description - The page description in search results (120-160 characters)</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500 italic">
              Well-crafted title and description tags can significantly improve click-through rates from search results.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="social-sharing">
          <AccordionTrigger className="text-md hover:no-underline">
            <div className="flex items-center gap-2">
              <Share className="h-4 w-4 text-slate-600" />
              <span>Social Sharing</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-slate-600">
            <p>Social sharing tags control how your content appears when shared on social platforms:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Open Graph - Controls appearance on Facebook, LinkedIn, etc.</li>
              <li>Twitter Card - Controls appearance on Twitter</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500 italic">
              These tags can include custom titles, descriptions, and images specifically optimized for social media sharing.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="structure">
          <AccordionTrigger className="text-md hover:no-underline">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-slate-600" />
              <span>Page Structure</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-slate-600">
            <p>Page structure elements help search engines understand your content:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Canonical URL - Prevents duplicate content issues by specifying the preferred URL</li>
              <li>Heading Structure - Properly organized headings (H1, H2, etc.)</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500 italic">
              A well-structured page helps search engines understand content hierarchy and prevents SEO issues.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="best-practices">
          <AccordionTrigger className="text-md hover:no-underline">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-slate-600" />
              <span>SEO Best Practices</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-slate-600">
            <p>Following SEO best practices helps improve search visibility:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Unique, descriptive titles and meta descriptions</li>
              <li>Mobile-friendly design (viewport tag)</li>
              <li>Proper character encoding</li>
              <li>Language specification</li>
              <li>Canonical URLs to prevent duplicate content</li>
              <li>Social sharing optimization</li>
            </ul>
            <p className="mt-2 text-sm text-slate-500 italic">
              Implementing these practices improves both user experience and search engine visibility.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}