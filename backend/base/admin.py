from django.contrib import admin
from base.models import News

# Register your models here.

class NewsModelAdmin(admin.ModelAdmin):
	list_display = ['title', 'body', 'created_at']

admin.site.register(News, NewsModelAdmin)