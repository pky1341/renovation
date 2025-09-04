#!/usr/bin/env python3
"""
OfficeTransform Backend API Test Suite
Tests all backend functionality including contact form API, validation, and database operations.
"""

import requests
import json
import time
from datetime import datetime
import sys
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

class BackendTester:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.test_results = []
        
    def log_test(self, test_name, passed, message=""):
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status}: {test_name}"
        if message:
            result += f" - {message}"
        print(result)
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'message': message
        })
        if passed:
            self.passed += 1
        else:
            self.failed += 1
    
    def test_health_check(self):
        """Test the health check endpoint"""
        print("\n=== Testing Health Check Endpoint ===")
        try:
            response = requests.get(f"{API_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "OfficeTransform API" in data["message"]:
                    self.log_test("Health Check", True, f"API is running: {data['message']}")
                else:
                    self.log_test("Health Check", False, f"Unexpected response format: {data}")
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    def test_valid_contact_submission(self):
        """Test valid contact form submissions"""
        print("\n=== Testing Valid Contact Form Submissions ===")
        
        # Test case 1: Complete office transformation request
        test_data_1 = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techcorp.com",
            "phone": "+1-555-0123",
            "company": "TechCorp Solutions",
            "serviceType": "complete",
            "officeSize": "5000-10000 sq ft",
            "urgency": "standard",
            "budget": "$50,000-$100,000",
            "preferredContact": "email",
            "message": "We're looking to completely transform our office space to create a modern, collaborative environment for our growing team."
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_1, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "submissionId" in data:
                    self.log_test("Valid Submission - Complete Transformation", True, f"Submission ID: {data['submissionId']}")
                else:
                    self.log_test("Valid Submission - Complete Transformation", False, f"Invalid response format: {data}")
            else:
                self.log_test("Valid Submission - Complete Transformation", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Valid Submission - Complete Transformation", False, f"Error: {str(e)}")
        
        # Test case 2: Office buyback service
        test_data_2 = {
            "name": "Michael Chen",
            "email": "m.chen@startupventures.io",
            "phone": "555-987-6543",
            "company": "Startup Ventures",
            "serviceType": "office-buyback",
            "officeSize": "1000-2500 sq ft",
            "urgency": "urgent",
            "budget": "$10,000-$25,000",
            "preferredContact": "phone",
            "message": "We need to liquidate our office furniture quickly due to relocation."
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_2, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Valid Submission - Office Buyback", True, "Successfully submitted buyback request")
                else:
                    self.log_test("Valid Submission - Office Buyback", False, f"Response: {data}")
            else:
                self.log_test("Valid Submission - Office Buyback", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Valid Submission - Office Buyback", False, f"Error: {str(e)}")
        
        # Test case 3: Minimal required fields only
        test_data_3 = {
            "name": "Emma Rodriguez",
            "email": "emma.r@freelancer.com",
            "serviceType": "consultation"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_3, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Valid Submission - Minimal Fields", True, "Successfully submitted with minimal data")
                else:
                    self.log_test("Valid Submission - Minimal Fields", False, f"Response: {data}")
            else:
                self.log_test("Valid Submission - Minimal Fields", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Valid Submission - Minimal Fields", False, f"Error: {str(e)}")
    
    def test_invalid_contact_submissions(self):
        """Test invalid contact form submissions for proper validation"""
        print("\n=== Testing Invalid Contact Form Submissions ===")
        
        # Test case 1: Missing required fields
        test_data_1 = {
            "email": "test@example.com"
            # Missing name and serviceType
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_1, timeout=10)
            if response.status_code == 422 or response.status_code == 400:
                self.log_test("Invalid Submission - Missing Required Fields", True, f"Properly rejected with status {response.status_code}")
            else:
                self.log_test("Invalid Submission - Missing Required Fields", False, f"Should reject but got status {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Submission - Missing Required Fields", False, f"Error: {str(e)}")
        
        # Test case 2: Invalid email format
        test_data_2 = {
            "name": "John Doe",
            "email": "invalid-email-format",
            "serviceType": "consultation"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_2, timeout=10)
            if response.status_code == 422 or response.status_code == 400:
                self.log_test("Invalid Submission - Invalid Email", True, f"Properly rejected invalid email with status {response.status_code}")
            else:
                self.log_test("Invalid Submission - Invalid Email", False, f"Should reject invalid email but got status {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Submission - Invalid Email", False, f"Error: {str(e)}")
        
        # Test case 3: Invalid service type
        test_data_3 = {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "serviceType": "invalid-service-type"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_3, timeout=10)
            if response.status_code == 422 or response.status_code == 400:
                self.log_test("Invalid Submission - Invalid Service Type", True, f"Properly rejected invalid service type with status {response.status_code}")
            else:
                self.log_test("Invalid Submission - Invalid Service Type", False, f"Should reject invalid service type but got status {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Submission - Invalid Service Type", False, f"Error: {str(e)}")
        
        # Test case 4: Invalid urgency level
        test_data_4 = {
            "name": "Bob Wilson",
            "email": "bob@example.com",
            "serviceType": "office-redesign",
            "urgency": "super-urgent"  # Invalid urgency
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_4, timeout=10)
            if response.status_code == 422 or response.status_code == 400:
                self.log_test("Invalid Submission - Invalid Urgency", True, f"Properly rejected invalid urgency with status {response.status_code}")
            else:
                self.log_test("Invalid Submission - Invalid Urgency", False, f"Should reject invalid urgency but got status {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Submission - Invalid Urgency", False, f"Error: {str(e)}")
        
        # Test case 5: Invalid phone number
        test_data_5 = {
            "name": "Alice Brown",
            "email": "alice@example.com",
            "serviceType": "furniture-removal",
            "phone": "invalid-phone-123abc"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact/submit", json=test_data_5, timeout=10)
            if response.status_code == 422 or response.status_code == 400:
                self.log_test("Invalid Submission - Invalid Phone", True, f"Properly rejected invalid phone with status {response.status_code}")
            else:
                self.log_test("Invalid Submission - Invalid Phone", False, f"Should reject invalid phone but got status {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Submission - Invalid Phone", False, f"Error: {str(e)}")
    
    def test_service_type_validation(self):
        """Test all valid service types"""
        print("\n=== Testing Service Type Validation ===")
        
        valid_services = ['office-buyback', 'furniture-removal', 'space-installation', 'office-redesign', 'complete', 'consultation']
        
        for service in valid_services:
            test_data = {
                "name": f"Test User {service}",
                "email": f"test.{service}@example.com",
                "serviceType": service
            }
            
            try:
                response = requests.post(f"{API_URL}/contact/submit", json=test_data, timeout=10)
                if response.status_code == 200:
                    self.log_test(f"Service Type - {service}", True, "Valid service type accepted")
                else:
                    self.log_test(f"Service Type - {service}", False, f"Valid service rejected with status {response.status_code}")
            except Exception as e:
                self.log_test(f"Service Type - {service}", False, f"Error: {str(e)}")
    
    def test_urgency_validation(self):
        """Test all valid urgency levels"""
        print("\n=== Testing Urgency Level Validation ===")
        
        valid_urgency = ['flexible', 'standard', 'urgent', 'emergency']
        
        for urgency in valid_urgency:
            test_data = {
                "name": f"Test User {urgency}",
                "email": f"test.{urgency}@example.com",
                "serviceType": "consultation",
                "urgency": urgency
            }
            
            try:
                response = requests.post(f"{API_URL}/contact/submit", json=test_data, timeout=10)
                if response.status_code == 200:
                    self.log_test(f"Urgency Level - {urgency}", True, "Valid urgency level accepted")
                else:
                    self.log_test(f"Urgency Level - {urgency}", False, f"Valid urgency rejected with status {response.status_code}")
            except Exception as e:
                self.log_test(f"Urgency Level - {urgency}", False, f"Error: {str(e)}")
    
    def test_contact_submissions_retrieval(self):
        """Test contact submissions retrieval endpoint"""
        print("\n=== Testing Contact Submissions Retrieval ===")
        
        try:
            response = requests.get(f"{API_URL}/contact/submissions", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "data" in data:
                    self.log_test("Submissions Retrieval", True, f"Retrieved {data.get('count', 0)} submissions")
                else:
                    self.log_test("Submissions Retrieval", False, f"Invalid response format: {data}")
            else:
                self.log_test("Submissions Retrieval", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Submissions Retrieval", False, f"Error: {str(e)}")
        
        # Test with status filter
        try:
            response = requests.get(f"{API_URL}/contact/submissions?status=new", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Submissions Retrieval - Status Filter", True, f"Status filter working")
                else:
                    self.log_test("Submissions Retrieval - Status Filter", False, f"Response: {data}")
            else:
                self.log_test("Submissions Retrieval - Status Filter", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Submissions Retrieval - Status Filter", False, f"Error: {str(e)}")
    
    def test_email_validation(self):
        """Test various email formats"""
        print("\n=== Testing Email Validation ===")
        
        valid_emails = [
            "user@example.com",
            "test.email@domain.co.uk",
            "user+tag@example.org",
            "firstname.lastname@company.com"
        ]
        
        invalid_emails = [
            "invalid-email",
            "@domain.com",
            "user@",
            "user..double.dot@example.com",
            "user@domain",
            ""
        ]
        
        # Test valid emails
        for email in valid_emails:
            test_data = {
                "name": "Test User",
                "email": email,
                "serviceType": "consultation"
            }
            
            try:
                response = requests.post(f"{API_URL}/contact/submit", json=test_data, timeout=10)
                if response.status_code == 200:
                    self.log_test(f"Valid Email - {email}", True, "Valid email accepted")
                else:
                    self.log_test(f"Valid Email - {email}", False, f"Valid email rejected with status {response.status_code}")
            except Exception as e:
                self.log_test(f"Valid Email - {email}", False, f"Error: {str(e)}")
        
        # Test invalid emails
        for email in invalid_emails:
            test_data = {
                "name": "Test User",
                "email": email,
                "serviceType": "consultation"
            }
            
            try:
                response = requests.post(f"{API_URL}/contact/submit", json=test_data, timeout=10)
                if response.status_code == 422 or response.status_code == 400:
                    self.log_test(f"Invalid Email - {email}", True, f"Invalid email properly rejected")
                else:
                    self.log_test(f"Invalid Email - {email}", False, f"Invalid email should be rejected but got status {response.status_code}")
            except Exception as e:
                self.log_test(f"Invalid Email - {email}", False, f"Error: {str(e)}")
    
    def test_phone_validation(self):
        """Test phone number validation"""
        print("\n=== Testing Phone Number Validation ===")
        
        valid_phones = [
            "+1-555-123-4567",
            "555-123-4567",
            "+44 20 7946 0958",
            "5551234567",
            "+1 (555) 123-4567"
        ]
        
        invalid_phones = [
            "abc-def-ghij",
            "123",
            "+",
            "phone-number"
        ]
        
        # Test valid phone numbers
        for phone in valid_phones:
            test_data = {
                "name": "Test User",
                "email": "test@example.com",
                "serviceType": "consultation",
                "phone": phone
            }
            
            try:
                response = requests.post(f"{API_URL}/contact/submit", json=test_data, timeout=10)
                if response.status_code == 200:
                    self.log_test(f"Valid Phone - {phone}", True, "Valid phone accepted")
                else:
                    self.log_test(f"Valid Phone - {phone}", False, f"Valid phone rejected with status {response.status_code}")
            except Exception as e:
                self.log_test(f"Valid Phone - {phone}", False, f"Error: {str(e)}")
        
        # Test invalid phone numbers
        for phone in invalid_phones:
            test_data = {
                "name": "Test User",
                "email": "test@example.com",
                "serviceType": "consultation",
                "phone": phone
            }
            
            try:
                response = requests.post(f"{API_URL}/contact/submit", json=test_data, timeout=10)
                if response.status_code == 422 or response.status_code == 400:
                    self.log_test(f"Invalid Phone - {phone}", True, "Invalid phone properly rejected")
                else:
                    self.log_test(f"Invalid Phone - {phone}", False, f"Invalid phone should be rejected but got status {response.status_code}")
            except Exception as e:
                self.log_test(f"Invalid Phone - {phone}", False, f"Error: {str(e)}")
    
    def test_content_endpoints(self):
        """Test content API endpoints (testimonials and gallery)"""
        print("\n=== Testing Content API Endpoints ===")
        
        # Test testimonials endpoint
        try:
            response = requests.get(f"{API_URL}/testimonials", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Testimonials Endpoint", True, "Testimonials endpoint working")
                else:
                    self.log_test("Testimonials Endpoint", False, f"Response: {data}")
            else:
                self.log_test("Testimonials Endpoint", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Testimonials Endpoint", False, f"Error: {str(e)}")
        
        # Test gallery endpoint
        try:
            response = requests.get(f"{API_URL}/gallery", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Gallery Endpoint", True, "Gallery endpoint working")
                else:
                    self.log_test("Gallery Endpoint", False, f"Response: {data}")
            else:
                self.log_test("Gallery Endpoint", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Gallery Endpoint", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting OfficeTransform Backend API Tests")
        print(f"📍 Testing against: {BASE_URL}")
        print(f"🔗 API Base URL: {API_URL}")
        print("=" * 60)
        
        # Run all test suites
        self.test_health_check()
        self.test_valid_contact_submission()
        self.test_invalid_contact_submissions()
        self.test_service_type_validation()
        self.test_urgency_validation()
        self.test_email_validation()
        self.test_phone_validation()
        self.test_contact_submissions_retrieval()
        self.test_content_endpoints()
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.passed}")
        print(f"❌ Failed: {self.failed}")
        print(f"📊 Total: {self.passed + self.failed}")
        
        if self.failed == 0:
            print("🎉 ALL TESTS PASSED!")
        else:
            print(f"⚠️  {self.failed} tests failed - see details above")
        
        return self.failed == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)