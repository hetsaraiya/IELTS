from rest_framework import serializers
from .models import *

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create the user and set the password
        user = User.objects.create_user(**validated_data)
        return user

