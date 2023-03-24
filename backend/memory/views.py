from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .common.json import ModelEncoder
from .models import Curriculum, PracticeProblems
from accounts.models import UserAccount
import json

class CurriculumEncoder(ModelEncoder):
    model = Curriculum
    properties = [
        "curriculum",
        "name",
        "imgUrl",
        'user',
        "id",
    ]
    def get_extra_data(self, o):
        return { 'user' : o.user.email }

class ProblemEncoder(ModelEncoder):
    model = PracticeProblems
    properties = [
        "problems",
        "name",
        "imgUrl",
        "id",
    ]
    def get_extra_data(self, o):
        return { 'user' : o.user.email }

# Create your views here.
require_http_methods(['GET', 'POST'])
def listCurriculums(request):
    if request.method == 'GET':
        curriculums = Curriculum.objects.all()
        return JsonResponse({'curriculums':curriculums}, encoder=CurriculumEncoder, safe=False)
    else:
        content = json.loads(request.body)
        user_email = content.get('user')
        user_email = user_email['email']
        user = UserAccount.objects.get(email=user_email)
        content.pop('user', None)
        curriculum = Curriculum.objects.create(user=user, **content)
        return JsonResponse(curriculum, encoder=CurriculumEncoder, safe=False)


require_http_methods(['GET'])
def showCurriculum(request, id):
    if request.method == 'GET':
        curriculum = Curriculum.objects.get(id=id)
        return JsonResponse(
            curriculum,
            encoder=CurriculumEncoder,
            safe=False
        )


require_http_methods(['GET', 'POST'])
def listProblems(request):
    if request.method == 'GET':
        problems = PracticeProblems.objects.all()
        return JsonResponse({'problems':problems}, encoder=ProblemEncoder, safe=False)
    else:
        content = json.loads(request.body)
        user_email = content.get('user')
        user_email = user_email['email']
        user = UserAccount.objects.get(email=user_email)
        content.pop('user', None)
        problems = PracticeProblems.objects.create(user=user, **content)
        return JsonResponse(problems, encoder=ProblemEncoder, safe=False)


require_http_methods(['GET'])
def showProblems(request, id):
    if request.method == 'GET':
        problems = PracticeProblems.objects.get(id=id)
        return JsonResponse(
            problems,
            encoder=ProblemEncoder,
            safe=False
        )
