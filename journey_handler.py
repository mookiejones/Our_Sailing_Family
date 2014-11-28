__author__ = 'cberman'

import webapp2
import urllib2
import time
import datetime
import logging

from google.appengine.api import users
from google.appengine.ext import ndb

DEFAULT_JOURNEY='default_journey'

def get_journeys(user):
    journeys_query=Journey.query(Journey.user==user).order(-Journey.date)
    journeys=journeys_query.fetch(10)


def journey_key(journey_name=DEFAULT_JOURNEY):
    return ndb.Key('Journey',journey_name)


class Journey(ndb.Model):
    user=ndb.UserProperty()
    name=ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)


class journey_handler(webapp2.RequestHandler):
    def get(self):
        logging.info('get')

    def post(self):
        logging.info('post')