import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle  } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  getCurrentUser, 
  logoutUser, 
  isAuthenticated, 
  User,
  getDashboardStats,
  getContactSubmissions,
  getNewsletterSubscribers,
  getAdminBlogPosts,
  createBlogPost,
  createBlogCategory,
  getBlogCategories,
  updateBlogPost,
  deleteBlogPost,
  updateBlogCategory,
  deleteBlogCategory,
  uploadImages,
  DashboardStats,
  ContactSubmission,
  NewsletterSubscriber,
  BlogPost,
  BlogCategory
} from '@/lib/api';
import { 
  LogOut, 
  User as UserIcon, 
  Mail, 
  FileText, 
  Users, 
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  MailOpen,
  FileCheck,
  Tag,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<string>('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [newPostData, setNewPostData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categories: [] as string[],
    status: 'draft' as 'draft' | 'published',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  const [editPostData, setEditPostData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categories: [] as string[],
    status: 'draft' as 'draft' | 'published',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [editCategoryData, setEditCategoryData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [creationProgress, setCreationProgress] = useState<{
    step: number;
    message: string;
    total: number;
  } | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [deletePostDialog, setDeletePostDialog] = useState<{ open: boolean; post: BlogPost | null }>({ open: false, post: null });
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState<{ open: boolean; category: BlogCategory | null }>({ open: false, category: null });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        navigate('/admin/login');
        return;
      }

      try {
        const result = await getCurrentUser();
        if (result.success && result.data?.user) {
          setUser(result.data.user);
        } else {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Load data when tab changes
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      setDataLoading(true);
      try {
        switch (activeTab) {
          case 'dashboard':
            const statsResult = await getDashboardStats();
            if (statsResult.success && statsResult.data) {
              setStats(statsResult.data);
            }
            break;
          case 'submissions':
            const submissionsResult = await getContactSubmissions();
            if (submissionsResult.success && submissionsResult.data) {
              setSubmissions(submissionsResult.data.submissions);
            }
            break;
          case 'subscribers':
            const subscribersResult = await getNewsletterSubscribers();
            if (subscribersResult.success && subscribersResult.data) {
              setSubscribers(subscribersResult.data.subscribers);
            }
            break;
          case 'blog':
            const blogPostsResult = await getAdminBlogPosts();
            if (blogPostsResult.success && blogPostsResult.data) {
              setBlogPosts(blogPostsResult.data.posts);
            }
            const categoriesResult = await getBlogCategories();
            if (categoriesResult.success && categoriesResult.data) {
              setBlogCategories(categoriesResult.data);
            }
            break;
          case 'categories':
            const categoriesResult2 = await getBlogCategories();
            if (categoriesResult2.success && categoriesResult2.data) {
              setBlogCategories(categoriesResult2.data);
            }
            break;
        }
      } catch (error) {
        console.error('Data loading error:', error);
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, [activeTab, user, toast]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        duration: 3000,
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      navigate('/admin/login');
    }
  };

  const handleViewSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsViewModalOpen(true);
  };

  const handleEditSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setEditingStatus(submission.status);
    setIsEditModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedSubmission) return;

    try {
      // TODO: Implement API call to update submission status
      // For now, we'll just update the local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub._id === selectedSubmission._id 
            ? { ...sub, status: editingStatus as any }
            : sub
        )
      );

      toast({
        title: "Status updated",
        description: `Submission status updated to ${editingStatus}.`,
      });

      setIsEditModalOpen(false);
      setSelectedSubmission(null);
      setEditingStatus('');
    } catch (error) {
      console.error('Status update error:', error);
      toast({
        title: "Error",
        description: "Failed to update submission status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewPost = () => {
    setIsNewPostModalOpen(true);
  };

  const handlePostDataChange = (field: string, value: string | string[]) => {
    setNewPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreatePost = async () => {
    try {
      const hasImage = selectedImageFile !== null;
      const totalSteps = hasImage ? 3 : 1;

      // Step 1: Create blog post
      setCreationProgress({ step: 1, message: 'Creating blog post...', total: totalSteps });
      
      const postDataWithoutImage = {
        title: newPostData.title,
        excerpt: newPostData.excerpt,
        content: newPostData.content,
        categories: newPostData.categories,
        status: newPostData.status,
        seoTitle: newPostData.seoTitle,
        seoDescription: newPostData.seoDescription,
        seoKeywords: newPostData.seoKeywords,
      };

      const result = await createBlogPost(postDataWithoutImage);
      
      if (!result.success || !result.data) {
        const error: any = new Error(result.error || 'Failed to create blog post');
        error.details = result.details;
        error.error = result.error;
        throw error;
      }

      const createdPost = result.data;

      // Step 2: Upload featured image if provided
      if (hasImage && selectedImageFile) {
        setCreationProgress({ 
          step: 2, 
          message: 'Uploading featured image...', 
          total: totalSteps 
        });
        
        const fileList = new DataTransfer();
        fileList.items.add(selectedImageFile);
        
        const uploadResult = await uploadImages(fileList.files);
        
        if (uploadResult.success && uploadResult.data && uploadResult.data.files.length > 0) {
          const featuredImageUrl = uploadResult.data.files[0].url;

          // Step 3: Update post with featured image
          setCreationProgress({ 
            step: 3, 
            message: 'Updating post with featured image...', 
            total: totalSteps 
          });
          
          await updateBlogPost(createdPost._id, {
            featuredImage: featuredImageUrl
          });
        }
      }

      // Success!
      setCreationProgress(null);
      toast({
        title: "Blog post created successfully!",
        description: `"${newPostData.title}" has been created${hasImage ? ' with featured image' : ''}.`,
        duration: 5000,
      });

      // Reset form
      setNewPostData({
        title: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        categories: [],
        status: 'draft',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
      });
      setSelectedImageFile(null);

      setIsNewPostModalOpen(false);

      // Refresh blog posts list
      if (activeTab === 'blog') {
        const blogPostsResult = await getAdminBlogPosts();
        if (blogPostsResult.success && blogPostsResult.data) {
          setBlogPosts(blogPostsResult.data.posts);
        }
      }
    } catch (error: any) {
      setCreationProgress(null);
      console.error('Blog post creation error:', error);
      
      // Check if error has validation details
      let errorMessage = "Failed to create blog post. Please try again.";
      
      if (error.details && Array.isArray(error.details)) {
        // Format validation errors
        errorMessage = error.details
          .map((detail: any) => `${detail.field}: ${detail.message}`)
          .join('\n');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: error.error || "Validation Error",
        description: errorMessage,
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  const handleViewBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsViewPostModalOpen(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setEditPostData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      featuredImage: post.featuredImage || '',
      categories: post.categories?.map(cat => cat._id) || [],
      status: post.status || 'draft',
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      seoKeywords: post.seoKeywords || ''
    });
    setIsEditPostModalOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!selectedBlogPost) return;

    try {
      const result = await updateBlogPost(selectedBlogPost._id, editPostData);
      
      if (!result.success) {
        const error: any = new Error(result.error || 'Failed to update blog post');
        error.details = result.details;
        error.error = result.error;
        throw error;
      }
      
      if (result.success) {
        toast({
          title: "Blog post updated",
          description: `"${editPostData.title}" has been updated successfully.`,
        });

        setIsEditPostModalOpen(false);
        setSelectedBlogPost(null);

        // Refresh blog posts list
        if (activeTab === 'blog') {
          const blogPostsResult = await getAdminBlogPosts();
          if (blogPostsResult.success && blogPostsResult.data) {
            setBlogPosts(blogPostsResult.data.posts);
          }
        }
      } else {
        throw new Error(result.error || 'Failed to update blog post');
      }
    } catch (error: any) {
      console.error('Blog post update error:', error);
      
      // Check if error has validation details
      let errorMessage = "Failed to update blog post. Please try again.";
      
      if (error.details && Array.isArray(error.details)) {
        errorMessage = error.details
          .map((detail: any) => `${detail.field}: ${detail.message}`)
          .join('\n');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: error.error || "Validation Error",
        description: errorMessage,
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  const handleDeleteBlogPost = (post: BlogPost) => {
    setDeletePostDialog({ open: true, post });
  };

  const confirmDeleteBlogPost = async () => {
    if (!deletePostDialog.post) return;

    try {
      const result = await deleteBlogPost(deletePostDialog.post._id);
      
      if (result.success) {
        toast({
          title: "Blog post deleted",
          description: `"${deletePostDialog.post.title}" has been deleted successfully.`,
        });

        // Close dialog
        setDeletePostDialog({ open: false, post: null });

        // Refresh blog posts list
        if (activeTab === 'blog') {
          const blogPostsResult = await getAdminBlogPosts();
          if (blogPostsResult.success && blogPostsResult.data) {
            setBlogPosts(blogPostsResult.data.posts);
          }
        }
      } else {
        throw new Error(result.error || 'Failed to delete blog post');
      }
    } catch (error) {
      console.error('Blog post deletion error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
      setDeletePostDialog({ open: false, post: null });
    }
  };

  const handleNewCategory = () => {
    setIsNewCategoryModalOpen(true);
  };

  const handleEditCategory = (category: BlogCategory) => {
    setSelectedCategory(category);
    setEditCategoryData({
      name: category.name,
      description: category.description || '',
      color: category.color || '#3B82F6'
    });
    setIsEditCategoryModalOpen(true);
  };

  const handleCreateCategory = async () => {
    try {
      const result = await createBlogCategory(newCategoryData);
      
      if (result.success) {
        toast({
          title: "Category created",
          description: `"${newCategoryData.name}" has been created successfully.`,
        });

        // Reset form
        setNewCategoryData({
          name: '',
          description: '',
          color: '#3B82F6'
        });

        setIsNewCategoryModalOpen(false);

        // Refresh categories list
        if (activeTab === 'categories') {
          const categoriesResult = await getBlogCategories();
          if (categoriesResult.success && categoriesResult.data) {
            setBlogCategories(categoriesResult.data);
          }
        }
      } else {
        throw new Error(result.message || result.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Category creation error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create category. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;

    try {
      const result = await updateBlogCategory(selectedCategory._id, editCategoryData);
      
      if (result.success) {
        toast({
          title: "Category updated",
          description: `"${editCategoryData.name}" has been updated successfully.`,
        });

        setIsEditCategoryModalOpen(false);
        setSelectedCategory(null);

        // Refresh categories list
        if (activeTab === 'categories') {
          const categoriesResult = await getBlogCategories();
          if (categoriesResult.success && categoriesResult.data) {
            setBlogCategories(categoriesResult.data);
          }
        }
      } else {
        throw new Error(result.message || result.error || 'Failed to update category');
      }
    } catch (error) {
      console.error('Category update error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update category. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleDeleteCategory = (category: BlogCategory) => {
    setDeleteCategoryDialog({ open: true, category });
  };

  const confirmDeleteCategory = async () => {
    if (!deleteCategoryDialog.category) return;

    try {
      const result = await deleteBlogCategory(deleteCategoryDialog.category._id);
      
      if (result.success) {
        toast({
          title: "Category deleted",
          description: `"${deleteCategoryDialog.category.name}" has been deleted successfully.`,
        });

        // Close dialog
        setDeleteCategoryDialog({ open: false, category: null });

        // Refresh categories list
        if (activeTab === 'categories') {
          const categoriesResult = await getBlogCategories();
          if (categoriesResult.success && categoriesResult.data) {
            setBlogCategories(categoriesResult.data);
          }
        }
      } else {
        throw new Error(result.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Category deletion error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete category. Please try again.",
        variant: "destructive",
      });
      setDeleteCategoryDialog({ open: false, category: null });
    }
  };

  const handleImageFileSelect = (event: React.ChangeEvent<HTMLInputElement>, target: 'new' | 'edit') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take first image
    
    if (target === 'new') {
      // For new posts, store file for later upload
      setSelectedImageFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setNewPostData(prev => ({ ...prev, featuredImage: previewUrl }));
    } else {
      // For edit, upload immediately
      handleImageUploadForEdit(files);
    }
  };

  const handleImageUploadForEdit = async (files: FileList) => {
    try {
      setUploading(true);
      const result = await uploadImages(files);
      
      if (result.success && result.data && result.data.files.length > 0) {
        const imageUrl = result.data.files[0].url;
        setUploadedImageUrl(imageUrl);

        setEditPostData(prev => ({ ...prev, featuredImage: imageUrl }));

        toast({
          title: "Image uploaded",
          description: "Featured image has been uploaded successfully.",
        });
      } else {
        throw new Error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
          <p className="font-inter text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const statsData = [
    { label: 'Total Subscribers', value: stats?.newsletter?.total?.toString() || '0', icon: Users, color: 'text-blue-600' },
    { label: 'Active Subscribers', value: stats?.newsletter?.active?.toString() || '0', icon: UserCheck, color: 'text-green-600' },
    { label: 'Contact Submissions', value: stats?.submissions?.total?.toString() || '0', icon: Mail, color: 'text-orange-600' },
    { label: 'New Submissions', value: stats?.submissions?.new?.toString() || '0', icon: MailOpen, color: 'text-red-600' },
    { label: 'Total Blog Posts', value: stats?.blog?.total?.toString() || '0', icon: FileText, color: 'text-purple-600' },
    { label: 'Published Posts', value: stats?.blog?.published?.toString() || '0', icon: FileCheck, color: 'text-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-dark rounded-xl shadow-lg">
                <span className="text-white font-playfair text-xl font-bold">A</span>
              </div>
              <div>
                <h1 className="font-playfair text-2xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent">
                  Airlux Manor
                </h1>
                <p className="font-inter text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-dark rounded-full">
                  <span className="text-white font-inter text-sm font-semibold">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-inter text-sm font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 bg-luxury-gold/10 text-luxury-gold text-xs font-medium rounded-full">
                    {user.role}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-gray-300 hover:border-luxury-gold hover:text-luxury-gold transition-all"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
            <nav className="flex flex-wrap gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'blog', label: 'Blog Posts', icon: FileText },
                { id: 'categories', label: 'Categories', icon: Tag },
                { id: 'subscribers', label: 'Subscribers', icon: Users },
                { id: 'submissions', label: 'Submissions', icon: Mail },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-inter font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-luxury-gold to-luxury-dark text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-luxury-dark'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent mb-2">
                Welcome back, {user.firstName}!
              </h2>
              <p className="font-inter text-lg text-gray-600">
                Here's what's happening with your luxury real estate business.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {statsData.map((stat, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-luxury-gold/5 to-transparent rounded-bl-full"></div>
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${
                      stat.color === 'text-blue-600' ? 'from-blue-50 to-blue-100' :
                      stat.color === 'text-green-600' ? 'from-green-50 to-green-100' :
                      stat.color === 'text-orange-600' ? 'from-orange-50 to-orange-100' :
                      stat.color === 'text-red-600' ? 'from-red-50 to-red-100' :
                      stat.color === 'text-purple-600' ? 'from-purple-50 to-purple-100' :
                      'from-indigo-50 to-indigo-100'
                    } mb-3`}>
                      <stat.icon className={stat.color} size={24} />
                    </div>
                    <p className="font-inter text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      {stat.label}
                    </p>
                    <p className="font-playfair text-3xl font-bold text-luxury-dark group-hover:text-luxury-gold transition-colors">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-dark rounded-xl">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-luxury-dark">
                  Quick Actions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('blog')}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-luxury-gold hover:to-luxury-dark rounded-xl shadow-sm hover:shadow-lg border border-gray-200 p-6 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-luxury-gold/5 rounded-bl-full group-hover:bg-white/10"></div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-luxury-gold/10 to-luxury-dark/10 group-hover:from-white/20 group-hover:to-white/20 rounded-xl mb-3 transition-all">
                      <Plus size={24} className="text-luxury-gold group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-inter font-semibold text-luxury-dark group-hover:text-white transition-colors">
                      New Blog Post
                    </span>
                    <span className="font-inter text-xs text-gray-500 group-hover:text-white/80 mt-1">
                      Create new content
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 p-6 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full group-hover:bg-white/10"></div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-50 to-red-50 group-hover:from-white/20 group-hover:to-white/20 rounded-xl mb-3 transition-all">
                      <Mail size={24} className="text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-inter font-semibold text-luxury-dark group-hover:text-white transition-colors">
                      View Submissions
                    </span>
                    <span className="font-inter text-xs text-gray-500 group-hover:text-white/80 mt-1">
                      {stats?.submissions?.new || 0} new messages
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('subscribers')}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 p-6 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full group-hover:bg-white/10"></div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-white/20 group-hover:to-white/20 rounded-xl mb-3 transition-all">
                      <Users size={24} className="text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-inter font-semibold text-luxury-dark group-hover:text-white transition-colors">
                      Manage Subscribers
                    </span>
                    <span className="font-inter text-xs text-gray-500 group-hover:text-white/80 mt-1">
                      {stats?.newsletter?.total || 0} subscribers
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent">
                  Blog Posts
                </h2>
                <p className="font-inter text-gray-600 mt-1">
                  Manage your luxury real estate blog content
                </p>
              </div>
              <Button 
                variant="luxury" 
                className="flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                onClick={handleNewPost}
              >
                <Plus size={20} />
                <span>New Post</span>
              </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {dataLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold mx-auto mb-4"></div>
                  <p className="font-inter text-gray-600">Loading blog posts...</p>
                </div>
              ) : blogPosts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Published</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {blogPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500">{post.slug}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {post.categories?.[0]?.name || 'Uncategorized'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {post.author.firstName} {post.author.lastName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              post.status === 'published' ? 'bg-green-100 text-green-800' :
                              post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {post.status || 'draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleViewBlogPost(post)}
                                className="p-2 text-luxury-gold hover:bg-luxury-gold/10 rounded-lg transition-all"
                                title="View post details"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => handleEditBlogPost(post)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit post"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteBlogPost(post)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete post"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-inter">No blog posts yet. Create your first post to get started!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent">
                  Blog Categories
                </h2>
                <p className="font-inter text-gray-600 mt-1">
                  Organize your blog content with categories
                </p>
              </div>
              <Button 
                variant="luxury" 
                className="flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                onClick={handleNewCategory}
              >
                <Plus size={20} />
                <span>New Category</span>
              </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {dataLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold mx-auto mb-4"></div>
                  <p className="font-inter text-gray-600">Loading categories...</p>
                </div>
              ) : blogCategories.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Color</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {blogCategories.map((category) => (
                        <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{category.slug}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate" title={category.description}>
                              {category.description || 'No description'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: category.color || '#3B82F6' }}
                              ></div>
                              <span className="text-sm text-gray-500">{category.color || '#3B82F6'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit category"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteCategory(category)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete category"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Tag size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-inter">No categories yet. Create your first category to get started!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent">
                  Newsletter Subscribers
                </h2>
                <p className="font-inter text-gray-600 mt-1">
                  Manage your newsletter subscriber list
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {dataLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold mx-auto mb-4"></div>
                  <p className="font-inter text-gray-600">Loading subscribers...</p>
                </div>
              ) : subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subscribed</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 capitalize">{subscriber.source || 'Unknown'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subscriber.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {subscriber.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {subscriber.subscribedAt ? new Date(subscriber.subscribedAt).toLocaleDateString() : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              className="text-red-400 hover:text-red-600"
                              title="Unsubscribe"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-inter">No subscribers yet. They'll appear here once people subscribe to your newsletter!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent">
                  Contact Form Submissions
                </h2>
                <p className="font-inter text-gray-600 mt-1">
                  Review and manage customer inquiries
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {dataLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold mx-auto mb-4"></div>
                  <p className="font-inter text-gray-600">Loading submissions...</p>
                </div>
              ) : submissions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact Info</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email & Source</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject & Message</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {submissions.map((submission) => (
                        <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                            {submission.phone && (
                              <div className="text-sm text-gray-500">{submission.phone}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{submission.email}</div>
                            <div className="text-sm text-gray-500">{submission.source || 'Unknown'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 capitalize">{submission.subject}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate" title={submission.message}>
                              {submission.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              submission.status === 'new' ? 'bg-red-100 text-red-800' :
                              submission.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                              submission.status === 'replied' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {submission.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(submission.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleViewSubmission(submission)}
                                className="p-2 text-luxury-gold hover:bg-luxury-gold/10 rounded-lg transition-all"
                                title="View full message"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => handleEditSubmission(submission)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit status"
                              >
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-inter">No submissions yet. Contact form submissions will appear here!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <div className="mb-6">
              <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-luxury-dark to-luxury-gold bg-clip-text text-transparent">
                Settings
              </h2>
              <p className="font-inter text-gray-600 mt-1">
                Manage your account and preferences
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-luxury-dark mb-4">
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={user.firstName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-inter"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={user.lastName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-inter"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-inter"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={user.role}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-inter"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Submission Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Contact Submission Details
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="font-inter text-gray-900">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="font-inter text-gray-900">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <p className="font-inter text-gray-900">{selectedSubmission.phone}</p>
                  </div>
                )}
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <p className="font-inter text-gray-900 capitalize">{selectedSubmission.source || 'Unknown'}</p>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedSubmission.status === 'new' ? 'bg-red-100 text-red-800' :
                    selectedSubmission.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                    selectedSubmission.status === 'replied' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedSubmission.status}
                  </span>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Submitted
                  </label>
                  <p className="font-inter text-gray-900">
                    {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <p className="font-inter text-gray-900 capitalize">{selectedSubmission.subject}</p>
              </div>
              <div>
                <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-inter text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Status Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Update Submission Status
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                  Submission from {selectedSubmission.name}
                </label>
                <p className="font-inter text-sm text-gray-600 mb-4">
                  Subject: {selectedSubmission.subject}
                </p>
              </div>
              <div>
                <label className="block font-inter text-sm font-medium text-gray-700 mb-2">
                  Current Status
                </label>
                <Select value={editingStatus} onValueChange={setEditingStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedSubmission(null);
                    setEditingStatus('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="luxury"
                  onClick={handleStatusUpdate}
                  disabled={editingStatus === selectedSubmission.status}
                >
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Blog Post Modal */}
      <Dialog open={isNewPostModalOpen} onOpenChange={setIsNewPostModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Create New Blog Post
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-inter text-sm font-medium text-gray-700">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={newPostData.title}
                  onChange={(e) => handlePostDataChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                  className="font-inter"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="font-inter text-sm font-medium text-gray-700">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                value={newPostData.excerpt}
                onChange={(e) => handlePostDataChange('excerpt', e.target.value)}
                placeholder="Brief description of the blog post"
                rows={3}
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="font-inter text-sm font-medium text-gray-700">
                Content *
              </Label>
              <Textarea
                id="content"
                value={newPostData.content}
                onChange={(e) => handlePostDataChange('content', e.target.value)}
                placeholder="Write your blog post content here..."
                rows={8}
                className="font-inter"
              />
            </div>

            {/* Featured Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="featured-image" className="font-inter text-sm font-medium text-gray-700">
                Featured Image (Optional)
              </Label>
              <div className="space-y-3">
                {newPostData.featuredImage && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={newPostData.featuredImage}
                      alt="Featured preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setNewPostData(prev => ({ ...prev, featuredImage: '' }));
                        setSelectedImageFile(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                      title="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                <label
                  htmlFor="new-image-upload"
                  className="flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-luxury-gold transition-colors"
                >
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="font-inter text-gray-600 font-semibold mb-1">
                    Click to select featured image
                  </span>
                  <span className="font-inter text-xs text-gray-500">
                    Will be uploaded automatically after post creation
                  </span>
                </label>
                <input
                  id="new-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileSelect(e, 'new')}
                  className="hidden"
                />
              </div>
            </div>

            {/* Categories and Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categories" className="font-inter text-sm font-medium text-gray-700">
                  Categories
                </Label>
                <Select 
                  value={newPostData.categories[0] || ''} 
                  onValueChange={(value) => handlePostDataChange('categories', [value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="font-inter text-sm font-medium text-gray-700">
                  Status
                </Label>
                <Select value={newPostData.status} onValueChange={(value) => handlePostDataChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="border-t pt-6">
              <h3 className="font-playfair text-lg font-semibold text-luxury-dark mb-4">
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle" className="font-inter text-sm font-medium text-gray-700">
                    SEO Title
                  </Label>
                  <Input
                    id="seoTitle"
                    value={newPostData.seoTitle}
                    onChange={(e) => handlePostDataChange('seoTitle', e.target.value)}
                    placeholder="SEO optimized title (optional)"
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoDescription" className="font-inter text-sm font-medium text-gray-700">
                    SEO Description
                  </Label>
                  <Textarea
                    id="seoDescription"
                    value={newPostData.seoDescription}
                    onChange={(e) => handlePostDataChange('seoDescription', e.target.value)}
                    placeholder="SEO meta description (optional)"
                    rows={2}
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoKeywords" className="font-inter text-sm font-medium text-gray-700">
                    SEO Keywords
                  </Label>
                  <Input
                    id="seoKeywords"
                    value={newPostData.seoKeywords}
                    onChange={(e) => handlePostDataChange('seoKeywords', e.target.value)}
                    placeholder="luxury real estate, villa, property (comma-separated)"
                    className="font-inter"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsNewPostModalOpen(false);
                  setNewPostData({
                    title: '',
                    excerpt: '',
                    content: '',
                    featuredImage: '',
                    categories: [],
                    status: 'draft',
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: ''
                  });
                  setSelectedImageFile(null);
                  setCreationProgress(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="luxury"
                onClick={handleCreatePost}
                disabled={!newPostData.title || !newPostData.content || creationProgress !== null}
              >
                {creationProgress ? 'Processing...' : 'Create Post'}
              </Button>
            </div>

            {/* Progress Indicator */}
            {creationProgress && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-inter text-sm font-semibold text-blue-900">
                    Step {creationProgress.step} of {creationProgress.total}
                  </span>
                  <span className="font-inter text-sm text-blue-700">
                    {Math.round((creationProgress.step / creationProgress.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(creationProgress.step / creationProgress.total) * 100}%` }}
                  ></div>
                </div>
                <p className="font-inter text-sm text-blue-700">
                  {creationProgress.message}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* View Blog Post Modal */}
      <Dialog open={isViewPostModalOpen} onOpenChange={setIsViewPostModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Blog Post Details
            </DialogTitle>
          </DialogHeader>
          {selectedBlogPost && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <p className="font-inter text-gray-900">{selectedBlogPost.title}</p>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <p className="font-inter text-gray-900">{selectedBlogPost.slug}</p>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <p className="font-inter text-gray-900">
                    {selectedBlogPost.author.firstName} {selectedBlogPost.author.lastName}
                  </p>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedBlogPost.status === 'published' ? 'bg-green-100 text-green-800' :
                    selectedBlogPost.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedBlogPost.status || 'draft'}
                  </span>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <p className="font-inter text-gray-900">
                    {selectedBlogPost.category?.name || selectedBlogPost.categories?.map(cat => cat.name).join(', ') || 'Uncategorized'}
                  </p>
                </div>
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Published Date
                  </label>
                  <p className="font-inter text-gray-900">
                    {selectedBlogPost.publishedAt ? new Date(selectedBlogPost.publishedAt).toLocaleString() : 'Not published'}
                  </p>
                </div>
              </div>
              
              {selectedBlogPost.excerpt && (
                <div>
                  <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <p className="font-inter text-gray-900">{selectedBlogPost.excerpt}</p>
                </div>
              )}

              <div>
                <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div 
                    className="font-inter text-gray-900 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedBlogPost.content || '' }}
                  />
                </div>
              </div>

              {(selectedBlogPost.seoTitle || selectedBlogPost.seoDescription || selectedBlogPost.seoKeywords) && (
                <div className="border-t pt-6">
                  <h3 className="font-playfair text-lg font-semibold text-luxury-dark mb-4">
                    SEO Settings
                  </h3>
                  <div className="space-y-4">
                    {selectedBlogPost.seoTitle && (
                      <div>
                        <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                          SEO Title
                        </label>
                        <p className="font-inter text-gray-900">{selectedBlogPost.seoTitle}</p>
                      </div>
                    )}
                    {selectedBlogPost.seoDescription && (
                      <div>
                        <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                          SEO Description
                        </label>
                        <p className="font-inter text-gray-900">{selectedBlogPost.seoDescription}</p>
                      </div>
                    )}
                    {selectedBlogPost.seoKeywords && (
                      <div>
                        <label className="block font-inter text-sm font-medium text-gray-700 mb-1">
                          SEO Keywords
                        </label>
                        <p className="font-inter text-gray-900">{selectedBlogPost.seoKeywords}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Blog Post Modal */}
      <Dialog open={isEditPostModalOpen} onOpenChange={setIsEditPostModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Edit Blog Post
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title" className="font-inter text-sm font-medium text-gray-700">
                  Title *
                </Label>
                <Input
                  id="edit-title"
                  value={editPostData.title}
                  onChange={(e) => setEditPostData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog post title"
                  className="font-inter"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-excerpt" className="font-inter text-sm font-medium text-gray-700">
                Excerpt
              </Label>
              <Textarea
                id="edit-excerpt"
                value={editPostData.excerpt}
                onChange={(e) => setEditPostData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the blog post"
                rows={3}
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content" className="font-inter text-sm font-medium text-gray-700">
                Content *
              </Label>
              <Textarea
                id="edit-content"
                value={editPostData.content}
                onChange={(e) => setEditPostData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog post content here..."
                rows={8}
                className="font-inter"
              />
            </div>

            {/* Featured Image Upload */}
            <div className="border-t pt-6">
              <h3 className="font-playfair text-lg font-semibold text-luxury-dark mb-4">
                Featured Image & Media
              </h3>
              <div className="space-y-4">
                {editPostData.featuredImage && (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <img
                      src={editPostData.featuredImage}
                      alt="Featured preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setEditPostData(prev => ({ ...prev, featuredImage: '' }))}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                      title="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Label className="font-inter text-sm font-medium text-gray-700">
                    Upload Featured Image
                  </Label>
                  <label
                    htmlFor="edit-image-upload"
                    className={`flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-luxury-gold transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <span className="font-inter text-gray-600 font-semibold mb-1">
                      {uploading ? 'Uploading...' : 'Click to upload image'}
                    </span>
                    <span className="font-inter text-xs text-gray-500">
                      PNG, JPG, WebP up to 10MB (max 5 images)
                    </span>
                  </label>
                  <input
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileSelect(e, 'edit')}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500 font-inter">OR</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium text-gray-700">
                    Enter Image URL
                  </Label>
                  <Input
                    value={editPostData.featuredImage}
                    onChange={(e) => setEditPostData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://res.cloudinary.com/your-image.jpg"
                    className="font-inter"
                  />
                  <p className="font-inter text-xs text-gray-500">
                    Paste the Cloudinary URL from uploaded images
                  </p>
                </div>
              </div>
            </div>

            {/* Categories and Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-categories" className="font-inter text-sm font-medium text-gray-700">
                  Categories
                </Label>
                <Select 
                  value={editPostData.categories[0] || ''} 
                  onValueChange={(value) => setEditPostData(prev => ({ ...prev, categories: [value] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status" className="font-inter text-sm font-medium text-gray-700">
                  Status
                </Label>
                <Select value={editPostData.status} onValueChange={(value) => setEditPostData(prev => ({ ...prev, status: value as 'draft' | 'published' }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="border-t pt-6">
              <h3 className="font-playfair text-lg font-semibold text-luxury-dark mb-4">
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-seoTitle" className="font-inter text-sm font-medium text-gray-700">
                    SEO Title
                  </Label>
                  <Input
                    id="edit-seoTitle"
                    value={editPostData.seoTitle}
                    onChange={(e) => setEditPostData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title (optional)"
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-seoDescription" className="font-inter text-sm font-medium text-gray-700">
                    SEO Description
                  </Label>
                  <Textarea
                    id="edit-seoDescription"
                    value={editPostData.seoDescription}
                    onChange={(e) => setEditPostData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="SEO meta description (optional)"
                    rows={2}
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-seoKeywords" className="font-inter text-sm font-medium text-gray-700">
                    SEO Keywords
                  </Label>
                  <Input
                    id="edit-seoKeywords"
                    value={editPostData.seoKeywords}
                    onChange={(e) => setEditPostData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder="luxury real estate, villa, property (comma-separated)"
                    className="font-inter"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditPostModalOpen(false);
                  setSelectedBlogPost(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="luxury"
                onClick={handleUpdatePost}
                disabled={!editPostData.title || !editPostData.content}
              >
                Update Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Category Modal */}
      <Dialog open={isNewCategoryModalOpen} onOpenChange={setIsNewCategoryModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Create New Category
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name" className="font-inter text-sm font-medium text-gray-700">
                Name *
              </Label>
              <Input
                id="category-name"
                value={newCategoryData.name}
                onChange={(e) => setNewCategoryData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
                className="font-inter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description" className="font-inter text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="category-description"
                value={newCategoryData.description}
                onChange={(e) => setNewCategoryData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
                className="font-inter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-color" className="font-inter text-sm font-medium text-gray-700">
                Color
              </Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={newCategoryData.color}
                  onChange={(e) => setNewCategoryData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  value={newCategoryData.color}
                  onChange={(e) => setNewCategoryData(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#3B82F6"
                  className="font-inter"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsNewCategoryModalOpen(false);
                  setNewCategoryData({
                    name: '',
                    description: '',
                    color: '#3B82F6'
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="luxury"
                onClick={handleCreateCategory}
                disabled={!newCategoryData.name}
              >
                Create Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditCategoryModalOpen} onOpenChange={setIsEditCategoryModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-luxury-dark">
              Edit Category
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name" className="font-inter text-sm font-medium text-gray-700">
                Name *
              </Label>
              <Input
                id="edit-category-name"
                value={editCategoryData.name}
                onChange={(e) => setEditCategoryData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
                className="font-inter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category-description" className="font-inter text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="edit-category-description"
                value={editCategoryData.description}
                onChange={(e) => setEditCategoryData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
                className="font-inter"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category-color" className="font-inter text-sm font-medium text-gray-700">
                Color
              </Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={editCategoryData.color}
                  onChange={(e) => setEditCategoryData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  value={editCategoryData.color}
                  onChange={(e) => setEditCategoryData(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#3B82F6"
                  className="font-inter"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditCategoryModalOpen(false);
                  setSelectedCategory(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="luxury"
                onClick={handleUpdateCategory}
                disabled={!editCategoryData.name}
              >
                Update Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Blog Post Confirmation Dialog */}
      <AlertDialog open={deletePostDialog.open} onOpenChange={(open) => !open && setDeletePostDialog({ open: false, post: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-playfair text-2xl text-luxury-dark">
              Delete Blog Post
            </AlertDialogTitle>
            <AlertDialogDescription className="font-inter text-gray-600">
              Are you sure you want to delete <span className="font-semibold text-luxury-dark">"{deletePostDialog.post?.title}"</span>?
              <br /><br />
              This action cannot be undone. The blog post and its featured image will be permanently deleted from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-inter">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteBlogPost}
              className="bg-red-600 hover:bg-red-700 font-inter"
            >
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Category Confirmation Dialog */}
      <AlertDialog open={deleteCategoryDialog.open} onOpenChange={(open) => !open && setDeleteCategoryDialog({ open: false, category: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-playfair text-2xl text-luxury-dark">
              Delete Category
            </AlertDialogTitle>
            <AlertDialogDescription className="font-inter text-gray-600">
              Are you sure you want to delete the category <span className="font-semibold text-luxury-dark">"{deleteCategoryDialog.category?.name}"</span>?
              <br /><br />
              This action cannot be undone. Make sure no blog posts are using this category before deleting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-inter">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCategory}
              className="bg-red-600 hover:bg-red-700 font-inter"
            >
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
