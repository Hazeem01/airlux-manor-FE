import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Helmet } from 'react-helmet-async';
import { getBlogPost, BlogPost as BlogPostType } from '@/lib/api';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DOMPurify from 'dompurify';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const result = await getBlogPost(slug);
        
        if (result.success && result.data) {
          setPost(result.data);
        } else {
          setError(result.error || 'Failed to load blog post');
        }
      } catch (err) {
        setError('An error occurred while loading the blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share or error occurred
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Blog post link has been copied to your clipboard.",
          duration: 3000,
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to copy link. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Sanitize HTML content with DOMPurify for secure rendering
  const createSafeMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-luxury-cream pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-luxury-cream pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-playfair text-4xl font-bold text-luxury-dark mb-4">
              Post Not Found
            </h1>
            <p className="font-inter text-gray-600 mb-8">
              {error || 'The blog post you are looking for does not exist.'}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 font-inter text-luxury-gold hover:text-luxury-dark transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{post.seoTitle || post.title} | AirLux Manor</title>
        <meta name="description" content={post.seoDescription || post.excerpt || ''} />
        <meta name="keywords" content={post.seoKeywords || ''} />
        <link rel="canonical" href={`https://airluxmanor.com/blog/${post.slug}`} />
        
        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:site_name" content="AirLux Manor" />
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta property="og:description" content={post.seoDescription || post.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://airluxmanor.com/blog/${post.slug}`} />
        {post.featuredImage && <meta property="og:image" content={post.featuredImage} />}
        {post.featuredImage && <meta property="og:image:width" content="1200" />}
        {post.featuredImage && <meta property="og:image:height" content="630" />}
        {post.featuredImage && <meta property="og:image:alt" content={post.title} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AirluxManor" />
        <meta name="twitter:title" content={post.seoTitle || post.title} />
        <meta name="twitter:description" content={post.seoDescription || post.excerpt || ''} />
        {post.featuredImage && <meta name="twitter:image" content={post.featuredImage} />}
        {post.featuredImage && <meta name="twitter:image:alt" content={post.title} />}
        
        {/* Article specific meta tags */}
        <meta property="article:published_time" content={post.publishedAt || ''} />
        <meta property="article:modified_time" content={post.updatedAt || ''} />
        <meta property="article:author" content={`${post.author.firstName} ${post.author.lastName}`} />
        <meta property="article:section" content={post.categories?.[0]?.name || 'Real Estate'} />
        {post.categories?.map((cat) => (
          <meta key={cat._id} property="article:tag" content={cat.name} />
        ))}
        {post.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Additional SEO */}
        <meta name="author" content={`${post.author.firstName} ${post.author.lastName}`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || '',
            "image": post.featuredImage || '',
            "datePublished": post.publishedAt || post.createdAt,
            "dateModified": post.updatedAt || post.createdAt,
            "author": {
              "@type": "Person",
              "name": `${post.author.firstName} ${post.author.lastName}`,
            },
            "publisher": {
              "@type": "Organization",
              "name": "AirLux Manor",
              "logo": {
                "@type": "ImageObject",
                "url": "https://airluxmanor.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://airluxmanor.com/blog/${post.slug}`
            },
            "articleSection": post.categories?.[0]?.name || 'Real Estate',
            "keywords": post.seoKeywords || post.tags?.join(', ') || '',
          })}
        </script>
      </Helmet>

      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark to-luxury-dark/90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 font-inter text-luxury-gold hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog/category/${category.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-inter"
                  style={{
                    backgroundColor: category.color || '#3B82F6',
                    color: '#FFFFFF'
                  }}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-inter text-xl text-gray-300 mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <User size={18} />
              <span className="font-inter">
                {post.author.firstName} {post.author.lastName}
              </span>
            </div>
            {post.publishedAt && (
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span className="font-inter">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center space-x-2">
                <span className="font-inter">{post.readTime} min read</span>
              </div>
            )}
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 hover:text-luxury-gold transition-colors"
            >
              <Share2 size={18} />
              <span className="font-inter">Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="bg-luxury-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-luxury-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="blog-content prose prose-lg prose-luxury max-w-none
              prose-headings:font-playfair prose-headings:text-luxury-dark
              prose-p:font-inter prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-luxury-gold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-luxury-dark prose-strong:font-semibold
              prose-ul:font-inter prose-ol:font-inter
              prose-blockquote:border-l-luxury-gold prose-blockquote:bg-gray-50 prose-blockquote:py-4
              prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={createSafeMarkup(post.content || '')}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={20} className="text-gray-500" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-inter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start space-x-4">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-luxury-gold flex items-center justify-center">
                  <span className="text-white font-playfair text-xl">
                    {post.author.firstName.charAt(0)}{post.author.lastName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-playfair text-xl font-semibold text-luxury-dark">
                  {post.author.firstName} {post.author.lastName}
                </h3>
                <p className="font-inter text-gray-600 mt-1">
                  Author at AirLux Manor
                </p>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-luxury-gold text-white font-inter rounded-lg hover:bg-luxury-dark transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to All Posts</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPost;

