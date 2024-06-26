from django.urls import path
from .views import NoteListCreate,NoteDelete,NoteUpdate

urlpatterns = [
  path("notes/", NoteListCreate.as_view(), name="note-list"),
  path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note"),
  path("notes/update/<int:pk>/", NoteUpdate.as_view(), name="update-note"),
]