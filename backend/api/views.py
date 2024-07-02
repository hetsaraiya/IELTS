import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serializers import *
from django.views import View
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from django.core.exceptions import PermissionDenied
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import user_passes_test


# Create your views here.

def adminRequired(user):
    if not user.is_authenticated:
        return False
    return user.is_staff and user.is_superuser

class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.is_approved = False
        user.is_staff = False
        user.is_superuser = False
        user.save()
        return Response({'message': 'Account created. Awaiting approval.'}, status=status.HTTP_201_CREATED)

@api_view()
def unapprovedUsers(request):
    if request.method == 'POST':
        pass
    if request.method == 'GET':
        users = User.objects.filter(is_approved=False)
        data = []
        for user in users:
            resp = {
                "email" : user.email,
                "user_id" : user.pk
            }
            data.append(resp)
        return Response(data)
    else:
        return Response({"Message" : "Invalid method"})

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def approveUser(request, pk):
    try:
        user = User.objects.get(pk=pk)
        if not adminRequired(request.user):
            raise PermissionDenied("User does not have admin privileges.")
        if request.method == "GET":
            user.is_approved = True
            user.save()
            return Response({"Message": f"{user.email} Approved"})
        else:
            return Response({"Message": "Invalid Request"})
    except User.DoesNotExist:
        return Response({"Message": "User not found"}, status=404)
    except PermissionDenied as e:
        return Response({"Message": str(e)}, status=403)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def disapproveUser(request, pk):
    try:
        user = User.objects.get(pk=pk)
        if not adminRequired(request.user):
            raise PermissionDenied("User does not have admin privileges.")
        
        if request.method == "GET":
            user.is_approved = False
            user.save()
            return Response({"Message": f"{user.email} Approved"})
        else:
            return Response({"Message": "Invalid Request"})
    except User.DoesNotExist:
        return Response({"Message": "User not found"}, status=404)
    except PermissionDenied as e:
        return Response({"Message": str(e)}, status=403)
    
@api_view(['POST'])
def login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class TestApi(APIView):
    def get(self, request):
        tests = Test.objects.all()
        data = [{'id': test.id, 'title': test.title} for test in tests]
        return Response(data)
    def post(self, request):
        type = request.POST.get("type")
        title = request.POST.get("title")
        thumbnail = request.FILES.get("thumbnail")
        content_for_reading = request.POST.get("content_for_reading")
        content_for_listing = request.POST.get("content_for_listing")
        test = Test()
        if content_for_listing is not None:
            test.type = type
            test.title = title
            test.thumbnail = thumbnail
            test.content_for_listing = content_for_listing
            test.save()
            return Response({"Message" : "Test Uploaded", "id": test.id})
        
        elif content_for_reading is not None:
            test.type = type
            test.title = title
            test.thumbnail = thumbnail
            test.content_for_reading = content_for_reading
            test.save()
            return Response({"Message" : "Test Uploaded", "id": test.id})
        else:
            return Response({"Message" : "Invalid Form"})

@api_view()
def doneer(request):
    test1 = Test.objects.create(
    title='Sample Test 1',
    type='Sample Type 1',
    content_for_reading='Sample content for reading 1',
    content_for_listing='http://example.com/sample-test-1'
    )

    test2 = Test.objects.create(
        title='Sample Test 2',
        type='Sample Type 2',
        content_for_reading='Sample content for reading 2',
        content_for_listing='http://example.com/sample-test-2'
    )

    test3 = Test.objects.create(
        title='Sample Test 3',
        type='Sample Type 3',
        content_for_reading='Sample content for reading 3',
        content_for_listing='http://example.com/sample-test-3'
    )
    return Response({"status": "Done"})

class TestQuestionListCreate(APIView):
    def get(self, request):
        question_id = request.GET.get('id')
        if question_id is not None:
            test_question = get_object_or_404(TestQuestion, id=question_id)
            data = {
                "id": test_question.id,
                "test_id": test_question.test.id,
                "qno": test_question.qno,
                "howToSolve": test_question.howToSolve,
                "content": test_question.content,
                "diagram": test_question.diagram.url if test_question.diagram else '',
                "question_type": test_question.question_type,
                "option1": test_question.option1 or '',
                "option2": test_question.option2 or '',
                "option3": test_question.option3 or '',
                "option4": test_question.option4 or '',
                "option5": test_question.option5 or '',
                "answer": test_question.answer or '',
                "answer2": test_question.answer2 or '',
                "answer3": test_question.answer3 or '',
                "answer4": test_question.answer4 or '',
                "answer5": test_question.answer5 or '',
            }
        else:
            data = []
            tests = Test.objects.all()
            print(tests)
            for test in tests:
                tqtype = []
                tt = TestQuestion.objects.filter(test=test.pk)
                for t in tt:
                    tqtype.append(t.question_type)
                data.append({
                    "id": test.id,
                    "type": test.type,
                    "title": test.title,
                    "thumbnail": test.thumbnail.url,
                    "content_for_reading": test.content_for_reading,
                    "content_for_listing": test.content_for_listing,
                    "test_question_type": tqtype
                })
        
        return Response(data)

    def post(self, request):
        try:
            test_question = TestQuestion.objects.create(
                test = Test.objects.get(pk=request.POST.get('test_id')),
                qno=request.POST.get('qno'),
                content=request.POST.get('content', ''),
                diagram=request.FILES.get("diagram"),
                howToSolve= request.POST.get('howToSolve', ''),
                question_type=request.POST.get('question_type', ''),
                option1=request.POST.get('option1', ''),
                option2=request.POST.get('option2', ''),
                option3=request.POST.get('option3', ''),
                option4=request.POST.get('option4', ''),
                option5=request.POST.get('option5', ''),
                answer=request.POST.get('answer', ''),
                answer2=request.POST.get('answer2', ''),
                answer3=request.POST.get('answer3', ''),
                answer4=request.POST.get('answer4', ''),
                answer5=request.POST.get('answer5', ''),
            )
            return JsonResponse({
                "id": test_question.id,
                "test_id": test_question.test.id,
                "qno": test_question.qno,
                "content": test_question.content,
                "diagram": test_question.diagram.url if test_question.diagram else '',
                "howToSolve": test_question.howToSolve,
                "question_type": test_question.question_type,
                "option1": test_question.option1 or '',
                "option2": test_question.option2 or '',
                "option3": test_question.option3 or '',
                "option4": test_question.option4 or '',
                "option5": test_question.option5 or '',
                "answer": test_question.answer or '',
                "answer2": test_question.answer2 or '',
                "answer3": test_question.answer3 or '',
                "answer4": test_question.answer4 or '',
                "answer5": test_question.answer5 or ''
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

class TestQuestionRetrieveUpdateDestroy(View):
    def get(self, request, pk):
        try:
            test_question = TestQuestion.objects.get(pk=pk)
            data = {
                "id": test_question.id,
                "test_id": test_question.test.id,
                "qno": test_question.qno,
                "content": test_question.content,
                "diagram": test_question.diagram.url if test_question.diagram else '',
                "howToSolve": test_question.howToSolve,
                "question_type": test_question.question_type,
                "option1": test_question.option1 or '',
                "option2": test_question.option2 or '',
                "option3": test_question.option3 or '',
                "option4": test_question.option4 or '',
                "option5": test_question.option5 or '',
                "answer": test_question.answer or '',
                "answer2": test_question.answer2 or '',
                "answer3": test_question.answer3 or '',
                "answer4": test_question.answer4 or '',
                "answer5": test_question.answer5 or ''
            }
            return Response(data)
        except TestQuestion.DoesNotExist:
            return Response({"error": "TestQuestion not found"}, status=404)

    def put(self, request, pk):
        try:
            data = json.loads(request.body)
            test_question = TestQuestion.objects.get(pk=pk)
            test_question.test_id = data.get('test_id', test_question.test.id)
            test_question.qno = data.get('qno', test_question.qno)
            test_question.content = data.get('content', test_question.content)
            test_question.diagram = data.get('diagram', test_question.diagram.url)
            test_question.howToSolve = data.get("howToSolve", test_question.howToSolve)
            test_question.question_type = data.get('question_type', test_question.question_type)
            test_question.option1 = data.get('option1', test_question.option1)
            test_question.option2 = data.get('option2', test_question.option2)
            test_question.option3 = data.get('option3', test_question.option3)
            test_question.option4 = data.get('option4', test_question.option4)
            test_question.option5 = data.get('option5', test_question.option5)
            test_question.answer = data.get('answer', test_question.answer)
            test_question.answer2 = data.get('answer2', test_question.answer2)
            test_question.answer3 = data.get('answer3', test_question.answer3)
            test_question.answer4 = data.get('answer4', test_question.answer4)
            test_question.answer5 = data.get('answer5', test_question.answer5)
            test_question.save()
            data = {
                "id": test_question.id,
                "test_id": test_question.test.id,
                "qno": test_question.qno,
                "content": test_question.content,
                "diagram": test_question.diagram.url if test_question.diagram else '',
                "howToSolve": test_question.howToSolve or '',
                "question_type": test_question.question_type,
                "option1": test_question.option1 or '',
                "option2": test_question.option2 or '',
                "option3": test_question.option3 or '',
                "option4": test_question.option4 or '',
                "option5": test_question.option5 or '',
                "answer": test_question.answer or '',
                "answer2": test_question.answer2 or '',
                "answer3": test_question.answer3 or '',
                "answer4": test_question.answer4 or '',
                "answer5": test_question.answer5 or ''
            }
            return Response(data)
        except TestQuestion.DoesNotExist:
            return Response({"error": "TestQuestion not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def delete(self, request, pk):
        try:
            test_question = TestQuestion.objects.get(pk=pk)
            test_question.delete()
            return HttpResponse(status=204)
        except TestQuestion.DoesNotExist:
            return JsonResponse({"error": "TestQuestion not found"}, status=404)

class TestDeleteView(APIView):
    def delete(self, request, pk):
        try:
            # Get the test object
            test = get_object_or_404(Test, pk=pk)

            # Delete associated test questions
            TestQuestion.objects.filter(test=test).delete()

            # Delete the test itself
            test.delete()

            return Response({"Message": "Test and its questions deleted successfully"}, status=204)
        except Test.DoesNotExist:
            return Response({"Message": "Test not found"}, status=404)
        except Exception as e:
            return Response({"Message": str(e)}, status=400)


def getTestQuestions(request):
    question_id = request.GET.get('id')
    test_id = request.GET.get('test_id')
    
    if question_id is not None:
        test_question = get_object_or_404(TestQuestion, id=question_id)

        data = {
            "id": test_question.id,
            "test_id": test_question.test.id,
            "qno": test_question.qno,
            "content": test_question.content,
            "diagram": test_question.diagram.url if test_question.diagram else '',
            "howToSolve": test_question.howToSolve,
            "question_type": test_question.question_type,
            "option1": test_question.option1 or '',
            "option2": test_question.option2 or '',
            "option3": test_question.option3 or '',
            "option4": test_question.option4 or '',
            "option5": test_question.option5 or '',
            "answer": test_question.answer or '',
            "answer2": test_question.answer2 or '',
            "answer3": test_question.answer3 or '',
            "answer4": test_question.answer4 or '',
            "answer5": test_question.answer5 or ''
        }
        return JsonResponse(data)
    elif test_id is not None:
        test_questions = TestQuestion.objects.filter(test_id=test_id).select_related('test')
        data = []
        for question in test_questions:
            question_data = {
                "id": question.id,
                "test_id": question.test_id,
                "qno": question.qno,
                "content": question.content,
                "diagram": question.diagram.url if question.diagram else '',
                "question_type": question.question_type,
                "option1": question.option1,
                "option2": question.option2,
                "option3": question.option3,
                "option4": question.option4,
                "option5": question.option5,
                "answer": question.answer,
                "answer2": question.answer2,
                "answer3": question.answer3 or '',
                "answer4": question.answer4 or '',
                "answer5": question.answer5 or ''
            }
            if question.test.type == "Reading":
                question_data["test_content"] = question.test.content_for_reading
            elif question.test.type == "Listening":
                question_data["test_content"] = question.test.content_for_listing
            data.append(question_data)
        
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "No valid identifier provided"}, status=400)