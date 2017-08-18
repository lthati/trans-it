#!/usr/local/bin/python

import pprint
import json

with open ('./out3.txt', 'r') as fl:
    buff = fl.readlines()
    data = {}
    for line in buff:
        kw = line.split()[0]
        ts = line.split()[1]
        if kw in data.keys():
            data[kw].append(ts)
        else:
            data[kw] = [ts]

#{"Sort": ["20.000000", "25.000000", "30.000000", "35.000000"], "Equally": ["25.000000"], "Sorting": ["10.000000", "15.000000"], "Decent.": ["30.000000", "35.000000"], "Insertion": ["25.000000"], "Bubble.": ["25.000000"], "Overview": ["10.000000", "15.000000"], "QI/Ip": ["10.000000"], "bad": ["25.000000"], "Merge": ["30.000000"], "as": ["25.000000"], "t/l\ufb01": ["15.000000", "25.000000"], "Algorithms": ["10.000000", "15.000000"], "Bad!": ["20.000000"], "Quick": ["10.000000", "15.000000", "35.000000"], "Bubble": ["20.000000"], "\u00ablug": ["20.000000", "30.000000", "35.000000"], "Really": ["20.000000"]}


fdlist=[]
wccountlist=[]
for (key,value) in data.iteritems():
    fdata={}
    wcl=[]
    fdata['keyword'] = key
    fdata['timestamps'] = value
    fdlist.append(fdata)
    wcl.append(key)
    wcl.append(len(value))
    wccountlist.append(wcl)

x = json.dumps(fdlist)
y = json.dumps(wccountlist)
print x
print y
#print fdlist

