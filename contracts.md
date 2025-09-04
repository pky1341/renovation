# Backend Development Contracts - OfficeTransform Website

## Overview
This document outlines the API contracts, database models, and integration plan for converting the frontend-only OfficeTransform website into a full-stack application.

## Database Models Needed

### 1. Contact Submissions (Primary)
```javascript
ContactSubmission {
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String,
  company: String,
  serviceType: String (required), // 'office-buyback', 'furniture-removal', 'space-installation', 'office-redesign', 'complete'
  officeSize: String,
  urgency: String, // 'flexible', 'standard', 'urgent', 'emergency'
  budget: String, // 'under-10k', '10k-25k', '25k-50k', '50k-100k', 'over-100k'
  preferredContact: String, // 'email', 'phone', 'both'
  message: String,
  status: String, // 'new', 'contacted', 'quoted', 'in-progress', 'completed'
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Testimonials (Secondary - Admin managed)
```javascript
Testimonial {
  _id: ObjectId,
  name: String (required),
  position: String (required),
  company: String (required),
  testimonial: String (required),
  rating: Number (1-5),
  avatar: String (URL),
  project: String,
  service: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Gallery Projects (Secondary - Admin managed)
```javascript
GalleryProject {
  _id: ObjectId,
  title: String (required),
  description: String (required),
  beforeImage: String (URL),
  afterImage: String (URL),
  category: String, // 'complete-transformation', 'conference-room', 'executive-office', etc.
  client: String,
  duration: String,
  size: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints Required

### Contact Form Endpoints
```
POST /api/contact/submit
- Body: ContactSubmission data
- Response: { success: true, message: "Thank you! We'll contact you within 24 hours.", submissionId }
- Validation: name, email, serviceType required
- Email notification to admin

GET /api/contact/submissions (Admin only - future)
- Response: Array of contact submissions
- Query params: status, serviceType, pagination
```

### Content Management Endpoints (Future Enhancement)
```
GET /api/testimonials
- Response: Array of active testimonials
- Replace mock data in frontend

GET /api/gallery
- Response: Array of active gallery projects
- Replace mock data in frontend

GET /api/services
- Response: Array of services with details
- Replace mock data in frontend
```

## Current Mock Data to Replace

### From mock.js - Immediate Backend Integration:
1. **Contact Form Submission**: Currently shows success message locally
   - Replace with actual API call to `/api/contact/submit`
   - Remove mock form submission logic
   - Add proper error handling

### From mock.js - Future Backend Integration:
1. **testimonials**: 5 testimonials → Database-driven content
2. **galleryImages**: 6 gallery projects → Database-driven content  
3. **services**: 4 services → Database-driven content (with admin editing)
4. **statistics**: Company stats → Database-driven (updateable)
5. **companyInfo**: Company details → Database-driven (updateable)

## Frontend Integration Changes

### Immediate Changes (Contact Form):
1. **Contact.jsx**:
   - Replace mock form submission with actual API call
   - Add proper loading states
   - Add error handling for network issues
   - Keep existing form validation

### API Integration Setup:
1. Create `src/api/` directory with API client
2. Environment variable usage for API endpoints
3. Error handling utilities
4. Loading state management

## Backend Implementation Plan

### Phase 1: Contact Form (Priority 1)
1. Create ContactSubmission model
2. Implement POST /api/contact/submit endpoint
3. Add email notification service
4. Update frontend contact form integration
5. Test form submission flow

### Phase 2: Content Management (Priority 2)
1. Create Testimonial and GalleryProject models
2. Implement GET endpoints for testimonials and gallery
3. Update frontend to use API data instead of mock data
4. Add basic admin seeding scripts

### Phase 3: Admin Interface (Future)
1. Admin authentication
2. CRUD operations for all content
3. File upload for images
4. Dashboard for contact submissions

## Email Notification Requirements

### Contact Form Submission Email:
**To**: Admin email (info@officetransform.com)
**Subject**: "New Quote Request - [Service Type] - [Company Name]"
**Content**:
- Contact details
- Project information
- Service requested
- Timeline and budget
- Message content
- Submission timestamp

## Validation Rules

### Contact Form:
- **name**: Required, min 2 chars, max 100 chars
- **email**: Required, valid email format
- **phone**: Optional, valid phone format if provided
- **company**: Optional, max 100 chars
- **serviceType**: Required, must be valid service option
- **officeSize**: Optional, max 50 chars
- **urgency**: Required, must be valid option
- **budget**: Optional, must be valid range
- **message**: Optional, max 2000 chars

## Environment Variables Needed

### Backend:
```
MONGO_URL=existing
DB_NAME=existing
EMAIL_SERVICE_API_KEY=new (SendGrid/similar)
EMAIL_FROM=info@officetransform.com
EMAIL_TO=info@officetransform.com
```

### Frontend:
```
REACT_APP_BACKEND_URL=existing (already configured)
```

## Testing Strategy

### Backend Testing:
1. Contact form submission endpoint
2. Email notification sending
3. Database connection and data persistence
4. Input validation and error handling

### Frontend Integration Testing:
1. Contact form submission success flow
2. Contact form error handling
3. Loading states during submission
4. Form reset after successful submission

## Success Criteria

### Must Have (Phase 1):
- ✅ Contact form submits to backend successfully
- ✅ Contact submissions stored in MongoDB
- ✅ Email notifications sent to admin
- ✅ Proper error handling and user feedback
- ✅ Form validation working

### Nice to Have (Phase 2):
- ✅ Testimonials loaded from database
- ✅ Gallery projects loaded from database
- ✅ Services content loaded from database
- ✅ Admin seeding scripts for initial data

This contract ensures seamless integration between frontend and backend while maintaining the existing user experience and adding robust data persistence and notification capabilities.