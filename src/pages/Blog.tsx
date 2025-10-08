import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Lightbulb, Award, Calendar, User, ArrowRight } from "lucide-react";
import { seoData } from "@/lib/seoData";
import { getBlogPosts, getBlogCategories, BlogPost, BlogCategory } from "@/lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // Fetch blog posts and categories in parallel
        const [postsResult, categoriesResult] = await Promise.all([
          getBlogPosts(1, 6), // Get first 6 posts
          getBlogCategories()
        ]);

        if (postsResult.success && postsResult.data) {
          setBlogPosts(postsResult.data.posts);
        } else {
          console.log('No blog posts available yet');
        }

        if (categoriesResult.success && categoriesResult.data) {
          setCategories(categoriesResult.data);
        } else {
          console.log('No categories available yet');
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog content');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const blogCategories = [
    {
      icon: TrendingUp,
      title: "Market Trends",
      description: "Stay updated on the latest developments in Nigeria's luxury real estate market.",
    },
    {
      icon: Lightbulb,
      title: "Investment Tips",
      description: "Expert advice on maximizing returns from your property investments.",
    },
    {
      icon: BookOpen,
      title: "Buyer's Guides",
      description: "Comprehensive guides to help you navigate the property buying process.",
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Real stories from satisfied clients who found their dream properties.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={seoData.blog.title}
        description={seoData.blog.description}
        keywords={seoData.blog.keywords}
        structuredData={seoData.blog.structuredData}
      />
      <Helmet>
        {/* RSS Feed Auto-Discovery */}
        <link rel="alternate" type="application/rss+xml" title="Airlux Manor Blog RSS Feed" href="https://airlux-manor-be-production.up.railway.app/api/rss.xml" />
        
        {/* Additional Blog Listing Structured Data */}
        {blogPosts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": blogPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "BlogPosting",
                  "@id": `https://airluxmanor.com/blog/${post.slug}`,
                  "url": `https://airluxmanor.com/blog/${post.slug}`,
                  "headline": post.title,
                  "description": post.excerpt || '',
                  "image": post.featuredImage || '',
                  "datePublished": post.publishedAt || post.createdAt,
                  "author": {
                    "@type": "Person",
                    "name": `${post.author.firstName} ${post.author.lastName}`
                  }
                }
              }))
            })}
          </script>
        )}
      </Helmet>
      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Real Estate <span className="text-luxury-gold">Insights</span>
            </h1>
            <p className="font-inter text-xl text-gray-300 leading-relaxed">
              Expert knowledge and market intelligence for informed decisions
            </p>
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">
              What We Cover
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              In-depth articles and insights to help you make informed real estate decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {blogCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-6 group-hover:bg-luxury-gold/20 transition-colors">
                  <category.icon className="text-luxury-gold" size={28} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-3">
                  {category.title}
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-dark mb-4">
                Latest Articles
              </h2>
              <p className="font-inter text-xl text-gray-600">
                Insights and updates from the Nigerian luxury real estate market
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {blogPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                    >
                      {post.featuredImage ? (
                        <div className="relative h-48 overflow-hidden">
                          <Link to={`/blog/${post.slug}`}>
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </Link>
                          {post.category && (
                            <Link
                              to={`/blog/category/${post.category.slug}`}
                              className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-inter hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: post.category.color || '#3B82F6' }}
                            >
                              {post.category.name}
                            </Link>
                          )}
                        </div>
                      ) : (
                        <div className="relative h-48 bg-gradient-to-br from-luxury-gold to-luxury-dark flex items-center justify-center">
                          <Link to={`/blog/${post.slug}`}>
                            <span className="text-white text-6xl font-playfair">
                              {post.title.charAt(0)}
                            </span>
                          </Link>
                          {post.category && (
                            <Link
                              to={`/blog/category/${post.category.slug}`}
                              className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-inter hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: post.category.color || '#3B82F6' }}
                            >
                              {post.category.name}
                            </Link>
                          )}
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-3 hover:text-luxury-gold transition-colors">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        {post.excerpt && (
                          <p className="font-inter text-gray-600 mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User size={16} />
                              <span className="font-inter">
                                {post.author.firstName} {post.author.lastName}
                              </span>
                            </div>
                            {post.publishedAt && (
                              <div className="flex items-center space-x-1">
                                <Calendar size={16} />
                                <span className="font-inter">
                                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center space-x-2 text-luxury-gold hover:text-luxury-dark transition-colors font-inter font-semibold"
                        >
                          <span>Read More</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Categories Filter */}
                {categories.length > 0 && (
                  <div className="text-center mb-12">
                    <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-6">
                      Browse by Category
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {categories.map((category) => (
                        <Link
                          key={category._id}
                          to={`/blog/category/${category.slug}`}
                          className="px-6 py-3 rounded-full text-white font-inter hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: category.color || '#3B82F6' }}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-luxury-gold/10 rounded-full mb-8">
              <BookOpen className="text-luxury-gold" size={48} />
            </div>
                <h3 className="font-playfair text-3xl font-bold text-luxury-dark mb-4">
              Blog Coming Soon
                </h3>
                <p className="font-inter text-xl text-gray-600 mb-8">
                  We're preparing valuable content to help you navigate the Nigerian luxury real estate market.
                </p>
              </div>
            )}

            {/* Newsletter Subscription */}
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="font-playfair text-2xl font-bold text-luxury-dark mb-4 text-center">
                Subscribe to Our Newsletter
              </h3>
              <p className="font-inter text-gray-600 mb-6 text-center">
                Get exclusive real estate insights delivered to your inbox
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterSubscription source="blog" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-luxury-dark mb-12 text-center">
              Topics We'll Be Covering
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Understanding Property Values in Abuja",
                "Tax Benefits of Real Estate Investment",
                "How to Spot Prime Investment Locations",
                "Luxury Property Maintenance Tips",
                "Legal Considerations When Buying Property",
                "Financing Options for Premium Properties",
                "Market Outlook: Nigerian Real Estate 2025",
                "Building Your Property Portfolio",
              ].map((topic, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></span>
                  <p className="font-inter text-gray-700">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
