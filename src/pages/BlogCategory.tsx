import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Helmet } from 'react-helmet-async';
import { getPostsByCategory, BlogPost } from '@/lib/api';
import { Calendar, User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categorySlug) return;
      
      try {
        setLoading(true);
        const result = await getPostsByCategory(categorySlug, currentPage, postsPerPage);
        
        if (result.success && result.data) {
          setPosts(result.data.posts);
          if (result.data.category) {
            setCategoryName(result.data.category.name);
            setCategoryColor(result.data.category.color || '#3B82F6');
          }
          if (result.data.pagination) {
            setTotalPages(result.data.pagination.totalPages || 1);
          }
        } else {
          setError(result.error || 'Failed to load posts');
        }
      } catch (err) {
        setError('An error occurred while loading posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-luxury-cream pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-luxury-cream pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-playfair text-4xl font-bold text-luxury-dark mb-4">
              Category Not Found
            </h1>
            <p className="font-inter text-gray-600 mb-8">{error}</p>
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
        <title>{categoryName} | Blog | AirLux Manor</title>
        <meta name="description" content={`Browse all ${categoryName} posts from AirLux Manor blog`} />
      </Helmet>

      <Navigation />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative bg-luxury-dark pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark to-luxury-dark/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 font-inter text-luxury-gold hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            <div
              className="w-3 h-12 rounded-full"
              style={{ backgroundColor: categoryColor }}
            ></div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              {categoryName}
            </h1>
          </div>

          <p className="font-inter text-xl text-gray-300">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-luxury-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  >
                    {post.featuredImage ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {post.category && (
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-inter"
                            style={{ backgroundColor: post.category.color || categoryColor }}
                          >
                            {post.category.name}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-luxury-gold to-luxury-dark flex items-center justify-center">
                        <span className="text-white text-6xl font-playfair">
                          {post.title.charAt(0)}
                        </span>
                        {post.category && (
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-inter"
                            style={{ backgroundColor: post.category.color || categoryColor }}
                          >
                            {post.category.name}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="font-playfair text-2xl font-bold text-luxury-dark mb-3 hover:text-luxury-gold transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

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
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg font-inter text-luxury-dark hover:bg-luxury-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-10 h-10 rounded-lg font-inter transition-colors ${
                          currentPage === index + 1
                            ? 'bg-luxury-gold text-white'
                            : 'bg-white text-luxury-dark hover:bg-gray-100'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg font-inter text-luxury-dark hover:bg-luxury-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="font-inter text-xl text-gray-600">
                No posts found in this category yet.
              </p>
              <Link
                to="/blog"
                className="inline-block mt-6 px-6 py-3 bg-luxury-gold text-white font-inter rounded-lg hover:bg-luxury-dark transition-colors"
              >
                View All Posts
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogCategory;

