__author__ = 'cberman'



import io
import os
import json
import urllib
import logging
from xml.dom import minidom


def ensure_dir(f):
    d = os.path.dirname("/images/"+f)
    if not os.path.exists(d):
        os.makedirs(d)
testfile = urllib.URLopener()


file_name="C:/Users/cberman/Google Drive/Programming/appengine/Our_sailing_family/static/data/charts.xml"
f = os.path.isfile(file_name)
if f:
    xmldoc = minidom.parse(file_name)
    itemlist = xmldoc.getElementsByTagName('Key')
    for s in itemlist:
        name = s.childNodes[0].wholeText
        try:

            url = "http://earthncseamless.s3.amazonaws.com/"+name
            ensure_dir(name)
            testfile.retrieve(url,"/images/"+name)
            print str(s.childNodes[0].wholeText)
        except Exception, e:
            logging.error(e)

    print len(itemlist)