__author__ = 'charles.heath.berman@gmail.com (Charles Berman)'


import logging
import webapp2
import os

from google.appengine.api import memcache
from google.appengine.api import urlfetch

import httplib2
from apiclient import errors
from apiclient.http import BatchHttpRequest
from oauth2client.appengine import StorageByKeyName
from model import Credentials
import util
from datetime import datetime,timedelta
from model import Credentials
from google.appengine.api import mail

BIRTHDAY = datetime(year=1973,month=9,day=12,hour=1)

REPLY_VALUE=''
SUMMARY_HTML="""
<article class='auto-paginate'>
</article>
"""

class _BatchCallback(object):
  """Class used to track batch request responses."""

  def __init__(self):
    """Initialize a new _BatchCallback object."""
    self.success = 0
    self.failure = 0

  def callback(self, request_id, response, exception):
    """Method called on each HTTP Response from a batch request.

    For more information, see
      https://developers.google.com/api-client-library/python/guide/batch
    """
    if exception is None:
      self.success += 1
    else:
      self.failure += 1
      logging.error('Failed to insert item for user %s: %s', request_id, exception)


email_sender = "Our Sailing Family <owner@sailing-project.appspotmail.com>"



def getReply(value):
    return"""
        <article class="author">
          <img src="http://1.bp.blogspot.com/-fTy4xrJpFgI/U9F9xWA6SBI/AAAAAAAAAAc/iYLe6TtndB8/s1600/IMG_2392.JPG" width="100%" height="100%">
          <div class="overlay-full"/>
          <header>
            <img src="https://lh5.googleusercontent.com/-6TWDSsmtI4E/U9vXlOuPP3I/AAAAAAAAAB0/28jwkaOabo8/s705-no/603176f0-a671-4fb7-b670-2c893f29a2ae"/>
            <h1>Our Sailing Family</h1>
          </header>
          <section>
            <p class="text-auto-size">""" +str(value)+""" of your life.</p>
          </section>
        </article>
        """

def getEmail(value):
    return"""
        <article class="author">
          <div class="overlay-full"/>
          <header>
            <img src="https://lh5.googleusercontent.com/-6TWDSsmtI4E/U9vXlOuPP3I/AAAAAAAAAB0/28jwkaOabo8/s705-no/603176f0-a671-4fb7-b670-2c893f29a2ae" width="20%" height="20%"/>
            <h1>Our Sailing Family</h1>
          </header>
          <section>
            <p class="text-auto-size">""" +str(value)+""" .</p>
          </section>
        </article>
        """


def sendMessage(html):
    REPLY_HTML = getReply(html)
    body = {
            'html': REPLY_HTML,
            'notification': {'level': 'DEFAULT'}
        }

    users = Credentials.all()
    batch_responses = _BatchCallback()
    batch = BatchHttpRequest(callback=batch_responses.callback)
    for user in users:
      creds = StorageByKeyName(
          Credentials, user.key().name(), 'credentials').get()
      mirror_service = util.create_service('mirror', 'v1', creds)
      batch.add(
          mirror_service.timeline().insert(body=body),
          request_id=user.key().name())

    batch.execute(httplib2.Http())
    return 'Successfully sent cards to %d users (%d failed).' % (
        batch_responses.success, batch_responses.failure)


class SummaryHandler(webapp2.RequestHandler):
    def get(self):
        """Get amount of time on planet"""
        logging.info('starting summary task')
        now = datetime.now();
        span=now-BIRTHDAY
        days = span.days
        hours = days * 24
        return sendMessage("Today is day "+str(days))


class HourlyHandler(webapp2.RequestHandler):
    def get(self):
        now = datetime.now();
        span=now-BIRTHDAY
        days = span.days
        hours = days * 24
        REPLY_VALUE=sendMessage("you have been around for " + str(hours)+ " hours ")

class MailHandler(webapp2.RequestHandler):
    def get(self):
        email =  mail.EmailMessage()

        email.sender=email_sender
        email.to="Charles.heath.Berman@gmail.com"
        email.subject="fyi"
        email.html=getEmail("Im right here")
        
        
        try:
            email.send()
        except Exception,e:
            logging.error(str(e))





TASK_ROUTES =[
    ('/tasks/summary',SummaryHandler),
    ('/tasks/hourly',HourlyHandler),
    ('/tasks/mail',MailHandler),

]