// API client for OfficeTransform backend

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// API client with error handling
class ApiClient {
  constructor() {
    this.baseURL = API_BASE;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new ApiError(response.status, errorData.detail || errorData.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(0, 'Network error. Please check your connection and try again.');
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Custom error class for API errors
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Create API client instance
const apiClient = new ApiClient();

// ===== CONTACT API =====

export const contactAPI = {
  // Submit contact form
  async submitContactForm(formData) {
    try {
      const response = await apiClient.post('/contact/submit', formData);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  },

  // Get contact submissions (admin use)
  async getContactSubmissions(filters = {}) {
    try {
      const response = await apiClient.get('/contact/submissions', filters);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  },
};

// ===== CONTENT API (Future Enhancement) =====

export const contentAPI = {
  // Get testimonials
  async getTestimonials() {
    try {
      const response = await apiClient.get('/testimonials');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  },

  // Get gallery projects
  async getGalleryProjects() {
    try {
      const response = await apiClient.get('/gallery');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching gallery projects:', error);
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  },
};

// ===== LEGACY API (Compatibility) =====

export const legacyAPI = {
  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/');
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Health check error:', error);
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }
  },
};

// Export API client and error class
export { apiClient, ApiError };

// Default export for convenience
export default {
  contact: contactAPI,
  content: contentAPI,
  legacy: legacyAPI,
  client: apiClient,
};