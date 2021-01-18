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

class UpdateGoal(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        details = graphene.String()

    goal = graphene.Field(GoalType)
    
    def mutate(self, info, id):
        goal = Goal.objects.get(id=id)
        bound_form = self.form_class(request.POST, instance=goal)
        bound_form.save()

class CreateSugar(graphene.Mutation):
    id = graphene.Int()
    grams = graphene.Int()
    date = graphene.String()

    class Arguments:
        grams = graphene.Int()
        date = graphene.String()

    def mutate(self, info, grams, date):
        sugar = Sugar(grams=grams, date=date)
        sugar.save()



class DeleteSugar(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    sugar = graphene.Field(SugarType)

    def mutate(self, info, id):
        sugar = Sugar.objects.get(id=id)
        if sugar is not None:
            sugar.delete()

class Mutation(graphene.ObjectType):
    create_goal = CreateGoal.Field()
    delete_goal = DeleteGoal.Field()
    create_sugar = CreateSugar.Field()
    delete_sugar = DeleteSugar.Field()
    update_goal = UpdateGoal.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
