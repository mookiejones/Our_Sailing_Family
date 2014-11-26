__author__ = 'cberman'

import urllib
import logging
import os


def ensure_dir(f):
    d = os.path.dirname("/images/"+f)
    if not os.path.exists(d):
        os.makedirs(d)


#http://earthncseamless.s3.amazonaws.com/4/6/8.png
testfile = urllib.URLopener()
for i in range(0, 20):
    for j in range(0,90):
        for k in range(0,180):
            dl_path = "/"+str(i)+"/"+str(j)+"/"+str(k)+".png"
            url = "http://earthncseamless.s3.amazonaws.com"+dl_path
            ensure_dir(dl_path)
            try:
                dir = os.path.dirname(url)
                testfile.retrieve(url,"/images/"+dl_path)
                print 'downloaded'
                logging.info('downloaded')
            except Exception,e:
                error = e
                #not found
                #logging.error(str(e))