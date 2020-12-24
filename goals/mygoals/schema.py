import graphene
from graphene_django import DjangoObjectType

from .models import Goal, Step

class GoalType(DjangoObjectType):
    class Meta:
        model = Goal
        fields = "__all__"

class StepType(DjangoObjectType):
    class Meta:
        model = Step
        fields = "__all__"

class Query(graphene.ObjectType):
    all_goals = graphene.List(GoalType)

    def resolve_all_goals(root, info):
        return Goal.objects.all()

schema = graphene.Schema(query=Query)