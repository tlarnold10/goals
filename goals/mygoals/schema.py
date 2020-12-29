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
    all_steps = graphene.List(StepType)

    def resolve_all_goals(root, info):
        return Goal.objects.all()

    def resolve_all_steps(root, info):
        return Step.objects.all()

class CreateGoal(graphene.Mutation):
    id = graphene.Int()
    summary = graphene.String()
    details = graphene.String()

    class Arguments:
        summary = graphene.String()
        details = graphene.String()

    def mutate(self, info, summary, details):
        goal = Goal(summary=summary, details=details)
        goal.save()

class Mutation(graphene.ObjectType):
    create_goal = CreateGoal.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)