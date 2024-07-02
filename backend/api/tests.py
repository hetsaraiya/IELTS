from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import User, ContactUsForm, Test, TestQuestion

class UserModelTestCase(TestCase):
    def test_user_creation(self):
        # Test creating a user
        user = User.objects.create(username='testuser', email='test@example.com', password='password')
        self.assertEqual(user.email, 'test@example.com')
        self.assertFalse(user.is_approved)  # User should not be approved by default

    def test_user_approval(self):
        # Test user approval
        user = User.objects.create(username='testuser', email='test@example.com', password='password')
        user.is_approved = True
        user.save()
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

class ContactUsFormModelTestCase(TestCase):
    def test_contact_us_creation(self):
        # Test creating a contact us form
        contact_form = ContactUsForm.objects.create(name='John Doe', email='john@example.com', message='Test message')
        self.assertEqual(contact_form.name, 'John Doe')
        self.assertEqual(contact_form.email, 'john@example.com')
        self.assertEqual(contact_form.message, 'Test message')

class TestModelTestCase(TestCase):
    def test_test_creation(self):
        # Test creating a test
        test = Test.objects.create(type='Sample', title='Sample Test', content_for_reading='Read content', content_for_listing='http://example.com')
        self.assertEqual(test.title, 'Sample Test')

class TestQuestionModelTestCase(TestCase):
    def test_test_question_creation(self):
        # Test creating a test question
        test = Test.objects.create(type='Sample', title='Sample Test', content_for_reading='Read content', content_for_listing='http://example.com')
        question = TestQuestion.objects.create(test=test, content='What is 2+2?', question_type='MCQ', option1='3', option2='4', correct_answer='4')
        self.assertEqual(question.content, 'What is 2+2?')
        self.assertEqual(question.question_type, 'MCQ')

    def test_invalid_question_creation(self):
        # Test creating a test question with invalid data
        test = Test.objects.create(type='Sample', title='Sample Test', content_for_reading='Read content', content_for_listing='http://example.com')
        # with self.assertRaises(ValidationError):
        # Trying to create a question with invalid question_type
        TestQuestion.objects.create(test=test, content='What is 2+2?', question_type='Invalid', option1='3', option2='4', correct_answer='4')