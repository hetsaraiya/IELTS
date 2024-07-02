from django.db import models
from django.core import exceptions, validators
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

no_special_chars_validator = validators.RegexValidator(
    regex=r'^[^\s@#$%]+$',
    message='Special characters like @, #, $, % are not allowed.'
)

def validate_username(value):
    invalid_characters = ["_", ".", ",", "&", "-", " ", "@", "#", "$", "%", "^"]
    for char in invalid_characters:
        if char in value:
            raise exceptions.ValidationError(f"Username cannot include '{char}'.")
        
class User(AbstractUser):
    is_approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_approved:
            self.is_superuser = True
            self.is_staff = True
        else:
            self.is_superuser = False
            self.is_staff = False
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email
    
class ContactUsForm(models.Model):
    name = models.CharField(max_length=40, default="")
    email = models.EmailField(max_length=200, default="")
    message = models.TextField(max_length=200, default="")

    def __str__(self):
        return self.name

class Test(models.Model):
    type = models.CharField(max_length=20, default="")
    title = models.CharField(max_length=20, default="")
    thumbnail = models.ImageField(upload_to='images/')
    content_for_reading = models.TextField(default="", blank=True)
    content_for_listing = models.URLField(blank=True, default="", max_length=255)

    def __str__(self):
        return self.title
    
class TestQuestion(models.Model):
    QUESTION_TYPES = (
        ('Sentence Completion MCQ', 'Sentence Completion MCQ'),
        ('MCQ', 'MCQ'),
        ('Matching Heading', 'Matching Heading'),
        ('Matching Information', 'Matching Information'),
        ('True False', 'True False'),
        ('Yes No', 'Yes No'),
        ('Summary Completion', 'Summary Completion'),
        ('Diagram', 'Diagram')
    )
    test = models.ForeignKey('Test', on_delete=models.CASCADE)
    howToSolve = models.TextField(default="", blank=True)
    qno = models.CharField(default="", max_length=100, blank=False)
    content = models.TextField()
    diagram = models.ImageField(upload_to="images/", default="", blank=True)
    question_type = models.CharField(max_length=30, choices=QUESTION_TYPES)
    option1 = models.CharField(max_length=100, blank=True)
    option2 = models.CharField(max_length=100, blank=True)
    option3 = models.CharField(max_length=100, blank=True)
    option4 = models.CharField(max_length=100, blank=True)
    option5 = models.CharField(max_length=100, blank=True)
    answer = models.TextField(max_length=255, blank=True)
    answer2 = models.CharField(max_length=100, blank=True)
    answer3 = models.CharField(max_length=100, blank=True)
    answer4 = models.CharField(max_length=100, blank=True)
    answer5 = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f'{self.test.title} - {self.content[:50]}'

    def is_mcq(self):
        return self.question_type == 'MCQ'

    def is_sentence_completion_mcq(self):
        return self.question_type == 'Sentence Completion MCQ'
    
    def is_matching_heading(self):
        return self.question_type == 'Matching Heading'
    
    def is_matching_information(self):
        return self.question_type == 'Matching Information'
    
    def is_true_false(self):
        return self.question_type == 'True False'
    
    def is_yes_no(self):
        return self.question_type == 'Yes No'
    
    def is_summary_completion(self):
        return self.question_type == 'Summary Completion'
    
    def is_diagram(self):
        return self.question_type == 'Diagram'