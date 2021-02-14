from django.shortcuts import render
import os
import logging
from django.http import HttpResponse
from django.views.generic import View
from django.conf import settings
import pdb

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    build`).
    """
    index_file_path = os.path.join(settings.STATICFILES_DIRS[0], 'index.html')
    def get(self, request):
        try:
            print(self.index_file_path)
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `yarn start` on the frontend/ directory
                """,
                status=501,
            )