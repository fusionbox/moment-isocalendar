#!/usr/bin/env python
from __future__ import print_function

import sys
import datetime
import json

date = datetime.datetime(*map(int, sys.argv[1:]))

year, week, day = date.isocalendar()
minutes = date.hour * 60 + date.minute

ret = (year, week, day, minutes)

print(json.dumps(ret))
