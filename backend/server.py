from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="OfficeTransform API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ===== MODELS =====

# Contact Submission Models
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name")
    email: EmailStr = Field(..., description="Email address")
    phone: Optional[str] = Field(None, max_length=20, description="Phone number")
    company: Optional[str] = Field(None, max_length=100, description="Company name")
    serviceType: str = Field(..., description="Service type requested")
    officeSize: Optional[str] = Field(None, max_length=50, description="Office size")
    urgency: str = Field(default="standard", description="Project timeline")
    budget: Optional[str] = Field(None, description="Budget range")
    preferredContact: str = Field(default="email", description="Preferred contact method")
    message: Optional[str] = Field(None, max_length=2000, description="Additional message")
    
    @validator('serviceType')
    def validate_service_type(cls, v):
        valid_services = ['office-buyback', 'furniture-removal', 'space-installation', 'office-redesign', 'complete', 'consultation']
        if v not in valid_services:
            raise ValueError(f'Service type must be one of: {", ".join(valid_services)}')
        return v
    
    @validator('urgency')
    def validate_urgency(cls, v):
        valid_urgency = ['flexible', 'standard', 'urgent', 'emergency']
        if v not in valid_urgency:
            raise ValueError(f'Urgency must be one of: {", ".join(valid_urgency)}')
        return v
    
    @validator('preferredContact')
    def validate_preferred_contact(cls, v):
        valid_contacts = ['email', 'phone', 'both']
        if v not in valid_contacts:
            raise ValueError(f'Preferred contact must be one of: {", ".join(valid_contacts)}')
        return v
    
    @validator('phone')
    def validate_phone(cls, v):
        if v and not re.match(r'^[\+]?[1-9][\d]{0,15}$', v.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')):
            raise ValueError('Invalid phone number format')
        return v

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    serviceType: str
    officeSize: Optional[str]
    urgency: str
    budget: Optional[str]
    preferredContact: str
    message: Optional[str]
    status: str = Field(default="new")
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    company: str
    testimonial: str
    rating: int = Field(ge=1, le=5)
    avatar: str
    project: str
    service: str
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Gallery Project Models  
class GalleryProject(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    beforeImage: str
    afterImage: str
    category: str
    client: str
    duration: str
    size: str
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Legacy Status Check Models (keeping for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


# ===== UTILITY FUNCTIONS =====

async def send_notification_email(submission: ContactSubmission):
    """Send email notification for new contact form submission"""
    try:
        # Email configuration (using environment variables for production)
        SMTP_SERVER = "smtp.gmail.com"  # This would be configurable in production
        SMTP_PORT = 587
        # Note: In production, use proper email service like SendGrid
        
        # Create email content
        subject = f"New Quote Request - {submission.serviceType} - {submission.company or 'Individual'}"
        
        html_content = f"""
        <html>
        <body>
            <h2>New Quote Request Received</h2>
            
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Phone:</strong> {submission.phone or 'Not provided'}</p>
            <p><strong>Company:</strong> {submission.company or 'Not provided'}</p>
            
            <h3>Project Details:</h3>
            <p><strong>Service Requested:</strong> {submission.serviceType}</p>
            <p><strong>Office Size:</strong> {submission.officeSize or 'Not specified'}</p>
            <p><strong>Timeline:</strong> {submission.urgency}</p>
            <p><strong>Budget Range:</strong> {submission.budget or 'Not specified'}</p>
            <p><strong>Preferred Contact:</strong> {submission.preferredContact}</p>
            
            <h3>Message:</h3>
            <p>{submission.message or 'No additional message'}</p>
            
            <hr>
            <p><strong>Submitted:</strong> {submission.createdAt.strftime('%B %d, %Y at %I:%M %p')}</p>
            <p><strong>Submission ID:</strong> {submission.id}</p>
        </body>
        </html>
        """
        
        # Log the email content for development (in production, actually send email)
        logger.info(f"Email notification would be sent for submission {submission.id}")
        logger.info(f"Subject: {subject}")
        logger.info("Email content prepared successfully")
        
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False

def get_service_display_name(service_type: str) -> str:
    """Convert service type to display name"""
    service_names = {
        'office-buyback': 'Office Buyback',
        'furniture-removal': 'Furniture Removal', 
        'space-installation': 'Space Installation',
        'office-redesign': 'Office Redesign',
        'complete': 'Complete Transformation',
        'consultation': 'Consultation Only'
    }
    return service_names.get(service_type, service_type.title())


# ===== API ROUTES =====

# Contact Form Routes
@api_router.post("/contact/submit")
async def submit_contact_form(submission_data: ContactSubmissionCreate):
    """Submit a new contact form request"""
    try:
        # Create submission object
        submission = ContactSubmission(**submission_data.dict())
        
        # Save to database
        result = await db.contact_submissions.insert_one(submission.dict())
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save submission")
        
        # Send notification email
        email_sent = await send_notification_email(submission)
        
        # Return success response
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Thank you! We've received your request and will contact you within 24 hours.",
                "submissionId": submission.id,
                "emailSent": email_sent
            }
        )
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/submissions")
async def get_contact_submissions(status: Optional[str] = None, limit: int = 50):
    """Get contact form submissions (admin endpoint)"""
    try:
        # Build query filter
        query = {}
        if status:
            query["status"] = status
        
        # Get submissions from database
        submissions = await db.contact_submissions.find(query).sort("createdAt", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for submission in submissions:
            if "_id" in submission:
                del submission["_id"]
        
        return {
            "success": True,
            "data": submissions,
            "count": len(submissions)
        }
        
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Content API Routes (Future enhancement - return mock data for now)
@api_router.get("/testimonials")
async def get_testimonials():
    """Get active testimonials"""
    try:
        # For now, return empty array - frontend will continue using mock data
        # In future, fetch from database: testimonials = await db.testimonials.find({"isActive": True}).to_list(100)
        return {
            "success": True,
            "data": [],
            "message": "Using frontend mock data for now"
        }
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/gallery")
async def get_gallery_projects():
    """Get active gallery projects"""
    try:
        # For now, return empty array - frontend will continue using mock data  
        # In future, fetch from database: projects = await db.gallery_projects.find({"isActive": True}).to_list(100)
        return {
            "success": True,
            "data": [],
            "message": "Using frontend mock data for now"
        }
    except Exception as e:
        logger.error(f"Error fetching gallery projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Legacy Routes (keeping for compatibility)
@api_router.get("/")
async def root():
    return {"message": "OfficeTransform API is running!", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
