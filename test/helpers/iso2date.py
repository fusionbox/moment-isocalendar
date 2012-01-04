#!/usr/bin/env python
from __future__ import print_function

import sys
import datetime
import json

year, week, day, minutes = map(int, sys.argv[1:])

first_day = datetime.datetime.strptime('%04d-%02d-1' % (year, week), '%Y-%W-%w')
if datetime.date(year, 1, 4).isoweekday() > 4:
    first_day -= datetime.timedelta(days=7)

date = first_day + datetime.timedelta(days=day - 1, minutes=minutes)

ret = [
        date.year,
        date.month,
        date.day,
        date.hour,
        date.minute,
        ]

print(json.dumps(ret))
