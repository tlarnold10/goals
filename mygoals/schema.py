import graphene
from graphene_django import DjangoObjectType
import datetime

from .models import Goal, Step, Sugar

class GoalType(DjangoObjectType):
    class Meta:
        model = Goal
        fields = "__all__"

class StepType(DjangoObjectType):
    class Meta:
        model = Step
        fields = "__all__"

class SugarType(DjangoObjectType):
    class Meta:
        model = Sugar
        fields = "__all__"

class Query(graphene.ObjectType):
    all_goals = graphene.List(GoalType)
    all_steps = graphene.List(StepType)
    all_sugar = graphene.List(SugarType)

    def resolve_all_goals(root, info):
        return Goal.objects.all()

    def resolve_all_steps(root, info):
        return Step.objects.all()

    def resolve_all_sugar(root, info):
        return Sugar.objects.all()

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

class DeleteGoal(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    goal = graphene.Field(GoalType)

    def mutate(self, info, id):
        goal = Goal.objects.get(id=id)
        if goal is not None:
            goal.delete()

class CreateSugar(graphene.Mutation):
    id = graphene.Int()
    grams = graphene.Int()
    date = graphene.Date()

    class Arguments:
        grams = graphene.Int()
        date = graphene.Date()

    def mutate(self, info, grams, date):
        sugar = Sugar(grams=grams, date=datetime.date.now())
        sugar.save()

class Mutation(graphene.ObjectType):
    create_goal = CreateGoal.Field()
    delete_goal = DeleteGoal.Field()
    create_sugar = CreateSugar.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)