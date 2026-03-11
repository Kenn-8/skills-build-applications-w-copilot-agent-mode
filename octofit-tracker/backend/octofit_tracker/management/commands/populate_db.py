from django.core.management.base import BaseCommand
from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Sample data
        marvel_team = {'name': 'Team Marvel'}
        dc_team = {'name': 'Team DC'}
        marvel_team_id = db.teams.insert_one(marvel_team).inserted_id
        dc_team_id = db.teams.insert_one(dc_team).inserted_id

        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team_id': marvel_team_id},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': marvel_team_id},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': dc_team_id},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team_id': dc_team_id},
        ]
        db.users.insert_many(users)

        activities = [
            {'user_email': 'spiderman@marvel.com', 'activity': 'Running', 'duration': 30},
            {'user_email': 'ironman@marvel.com', 'activity': 'Cycling', 'duration': 45},
            {'user_email': 'wonderwoman@dc.com', 'activity': 'Swimming', 'duration': 60},
            {'user_email': 'batman@dc.com', 'activity': 'Yoga', 'duration': 20},
        ]
        db.activities.insert_many(activities)

        leaderboard = [
            {'user_email': 'spiderman@marvel.com', 'points': 100},
            {'user_email': 'ironman@marvel.com', 'points': 90},
            {'user_email': 'wonderwoman@dc.com', 'points': 110},
            {'user_email': 'batman@dc.com', 'points': 95},
        ]
        db.leaderboard.insert_many(leaderboard)

        workouts = [
            {'name': 'Full Body Workout', 'suggested_for': 'marvel'},
            {'name': 'Strength Training', 'suggested_for': 'dc'},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
