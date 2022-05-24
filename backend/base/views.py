from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.decorators import api_view

from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import News
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from base.serializers import NewsModelSerializers, MyTokenObtainPairSerializer


# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class AllNewsApiView(generics.ListAPIView):
    serializer_class = NewsModelSerializers
    permission_classes = [IsAuthenticated]
    model = News
    queryset = News.objects.all()
    paginate_by = 10

