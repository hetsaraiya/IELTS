from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from .views import *

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('approve/<int:pk>/', approveUser, name='user-approval'),
    path('disapprove/<int:pk>/', disapproveUser, name='user-approval'),
    path('find/', unapprovedUsers, name='user-approval'),
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('login/', login, name='api-login'),
    path('test/', TestApi.as_view(), name='test'),
    path('done/', doneer, name='done'),
    path('test-questions/', TestQuestionListCreate.as_view(), name='test-question-list-create'),
    path('test-questions/<int:pk>/', TestQuestionRetrieveUpdateDestroy.as_view(), name='test-question-detail'),
    path('getTestQuestions/', getTestQuestions, name="getTestQuestions"),
    path('tests/<int:pk>/delete/', TestDeleteView.as_view(), name='test-delete'),
]

