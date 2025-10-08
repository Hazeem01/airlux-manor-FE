const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api`;

export interface NewsletterSubscription {
  email: string;
  source?: string;
  timestamp?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  timestamp?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

// Newsletter subscription API
export const subscribeToNewsletter = async (data: NewsletterSubscription): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Subscription failed');
    }

    return {
      success: true,
      data: result.data,
      message: result.message || 'Successfully subscribed to newsletter!',
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter',
    };
  }
};

// Contact form submission API
export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Form submission failed');
    }

    return {
      success: true,
      data: result.data,
      message: result.message || 'Thank you for your message! We\'ll get back to you soon.',
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit contact form',
    };
  }
};

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const nigerianPhoneRegex = /^(\+?234|0)?[789][01]\d{8}$/;
  return nigerianPhoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateForm = (data: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name.trim()) {
    errors.push('Name is required');
  }

  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Please enter a valid phone number (e.g., 09012345678 or +2349012345678)');
  }

  if (!data.subject.trim()) {
    errors.push('Subject is required');
  }

  if (!data.message.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateNewsletterEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!validateEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

// Authentication API functions
export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'editor' | 'member';
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'editor' | 'member';
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    refreshToken: string;
    user: User;
  };
  message?: string;
  error?: string;
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Login failed');
    }

    // Store tokens in localStorage
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
    }
    if (result.data?.refreshToken) {
      localStorage.setItem('refreshToken', result.data.refreshToken);
    }

    return {
      success: true,
      data: result.data,
      message: result.message || 'Login successful',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

// Register user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Registration failed');
    }

    // Store tokens in localStorage
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
    }
    if (result.data?.refreshToken) {
      localStorage.setItem('refreshToken', result.data.refreshToken);
    }

    return {
      success: true,
      data: result.data,
      message: result.message || 'Registration successful',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed',
    };
  }
};

// Get current user
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found',
      };
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      localStorage.removeItem('authToken');
      throw new Error(result.error || 'Authentication failed');
    }

    return {
      success: true,
      data: { user: result.data },
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get user info',
    };
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always remove tokens from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

// Get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Admin API functions
export interface DashboardStats {
  blog: {
    total: number;
    published: number;
    draft: number;
  };
  submissions: {
    total: number;
    new: number;
  };
  newsletter: {
    total: number;
    active: number;
  };
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  source?: string;
  isActive?: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Get dashboard statistics
export const getDashboardStats = async (): Promise<ApiResponse<DashboardStats>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch dashboard stats');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Dashboard stats fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dashboard stats',
    };
  }
};

// Get all contact submissions
export const getContactSubmissions = async (page = 1, limit = 10): Promise<ApiResponse<{ submissions: ContactSubmission[]; pagination: { currentPage: number; totalPages: number; totalSubmissions: number; hasNextPage: boolean; hasPrevPage: boolean; limit: number } }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URL}/admin/submissions?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch submissions');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Submissions fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch submissions',
    };
  }
};

// Get all newsletter subscribers
export const getNewsletterSubscribers = async (page = 1, limit = 10): Promise<ApiResponse<{ subscribers: NewsletterSubscriber[]; pagination: { currentPage: number; totalPages: number; totalSubscribers: number; hasNextPage: boolean; hasPrevPage: boolean; limit: number } }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URL}/admin/subscribers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch subscribers');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Subscribers fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch subscribers',
    };
  }
};

// Get all blog posts (Admin/Editor) - includes published and draft posts
export const getAdminBlogPosts = async (page = 1, limit = 10, search?: string): Promise<ApiResponse<{ posts: BlogPost[]; pagination: { currentPage: number; totalPages: number; totalPosts: number; hasNextPage: boolean; hasPrevPage: boolean; limit: number } }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${API_URL}/admin/blog/posts?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch blog posts');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Admin blog posts fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog posts',
    };
  }
};

// Create new blog post
export const createBlogPost = async (postData: {
  title: string;
  content: string;
  excerpt?: string;
  categories?: string[];
  status?: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}): Promise<ApiResponse<BlogPost>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/blog/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle validation errors with details
      const error: any = new Error(result.error || 'Failed to create blog post');
      error.details = result.details;
      error.error = result.error;
      throw error;
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error: any) {
    console.error('Blog post creation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create blog post',
      details: error.details,
    };
  }
};

// Create new blog category
export const createBlogCategory = async (categoryData: {
  name: string;
  description?: string;
  color?: string;
}): Promise<ApiResponse<BlogCategory>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/blog/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
        message: result.message,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error('Blog category creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create blog category',
    };
  }
};

// Update blog post
export const updateBlogPost = async (postId: string, postData: {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  categories?: string[];
  status?: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}): Promise<ApiResponse<BlogPost>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/blog/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle validation errors with details
      const error: any = new Error(result.error || 'Failed to update blog post');
      error.details = result.details;
      error.error = result.error;
      throw error;
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error: any) {
    console.error('Blog post update error:', error);
    return {
      success: false,
      error: error.message || 'Failed to update blog post',
      details: error.details,
    };
  }
};

// Delete blog post
export const deleteBlogPost = async (postId: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/blog/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete blog post');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Blog post deletion error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete blog post',
    };
  }
};

// Update blog category
export const updateBlogCategory = async (categoryId: string, categoryData: {
  name?: string;
  description?: string;
  color?: string;
}): Promise<ApiResponse<BlogCategory>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/blog/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
        message: result.message,
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error('Blog category update error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update blog category',
    };
  }
};

// Delete blog category
export const deleteBlogCategory = async (categoryId: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/blog/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete blog category');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Blog category deletion error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete blog category',
    };
  }
};

// Upload images
export const uploadImages = async (files: FileList): Promise<ApiResponse<{ files: Array<{ url: string; publicId: string; filename: string }> }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to upload images');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload images',
    };
  }
};

// Get uploaded files
export const getUploadedFiles = async (type = 'images', page = 1, limit = 20): Promise<ApiResponse<{ files: any[]; pagination: any }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const params = new URLSearchParams({
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URL}/upload/files?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch uploaded files');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Get uploaded files error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch uploaded files',
    };
  }
};

// Delete uploaded file
export const deleteUploadedFile = async (publicId: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/upload/${encodeURIComponent(publicId)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete file');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Delete file error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete file',
    };
  }
};

// Update blog post featured image
export const updatePostFeaturedImage = async (postId: string, imageUrl: string): Promise<ApiResponse<BlogPost>> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/upload/blog/${postId}/featured-image`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update featured image');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Update featured image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update featured image',
    };
  }
};

// Blog API functions
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  author: {
    _id?: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  category?: {
    _id?: string;
    name: string;
    slug: string;
    color?: string;
  };
  categories?: Array<{
    _id: string;
    name: string;
    slug: string;
    color: string;
  }>;
  status?: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  readTime?: number;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  createdAt: string;
}

// Get all published blog posts
export const getBlogPosts = async (page = 1, limit = 10, search?: string): Promise<ApiResponse<{ posts: BlogPost[]; pagination: { page: number; totalPages: number } }>> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    
    const response = await fetch(`${API_URL}/blog/posts?${params}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch blog posts');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog posts',
    };
  }
};

// Get single blog post by slug
export const getBlogPost = async (slug: string): Promise<ApiResponse<BlogPost>> => {
  try {
    const response = await fetch(`${API_URL}/blog/posts/${slug}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch blog post');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch blog post',
    };
  }
};

// Get all blog categories
export const getBlogCategories = async (): Promise<ApiResponse<BlogCategory[]>> => {
  try {
    const response = await fetch(`${API_URL}/blog/categories`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch categories');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Blog categories fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch categories',
    };
  }
};

// Get posts by category
export const getPostsByCategory = async (categorySlug: string, page = 1, limit = 10): Promise<ApiResponse<{ posts: BlogPost[]; pagination: { page: number; totalPages: number } }>> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await fetch(`${API_URL}/blog/posts/category/${categorySlug}?${params}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch posts by category');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Posts by category fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts by category',
    };
  }
};
