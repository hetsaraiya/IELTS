from django.contrib import admin
from .models import *
from import_export.admin import ExportActionMixin
# Register your models here.

class UserAdmin(ExportActionMixin,admin.ModelAdmin):
    list_display = ("pk", "is_approved", "email")
    list_editable = ["is_approved"]

admin.site.register(User, UserAdmin)
admin.site.register(TestQuestion)
admin.site.register(Test)