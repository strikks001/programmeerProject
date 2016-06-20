# 
# world.py
# 
# Computer Science 50
# Programmeer Project 2016
# Energy Knowledge
# 
# Sanne Strikkers
# 11170816
# 
import csv, sys, json

def createJson(data_list, sub):
    "creating json files"
    # convert the list to JSON format
    json_str = json.dumps(data_list, indent = 4)

    # create json file
    jsonfile = '%s.json' %sub
    with open(jsonfile, 'w') as f:
        try:
            f.write(json_str)
        except csv.Error as e:
            sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

def getCode(country):
    "searching for country code"
    for i in range(len(code_dict)):
        if code_dict[i][0].lower() == country.lower():
            return code_dict[i][1]

def getResult(year, num, data_list):
    "Selecting specific data and push it to an array"
    for i in range(len(sjv_dict)):
        # standaard jaar verbruik
        sjv = int(sjv_dict[i][num])
        country = sjv_dict[i][0]
        if sjv == 0:
            data_list.append({getCode(country):{"country": country, "data": "Geen data beschikbaar", "fillKey": "low", "year": year}})
        elif sjv > 0 and sjv<= 1000:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "low", "year": year}})
        elif sjv > 1000 and sjv <= 2500:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "low2", "year": year}})
        elif sjv > 2500 and sjv <= 4000:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "low3", "year": year}})
        elif sjv > 4000 and sjv <= 5500:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "mid", "year": year}})
        elif sjv > 5500 and sjv <= 7000:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "mid2", "year": year}})
        elif sjv > 7000 and sjv <= 8500:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "mid3", "year": year}})
        elif sjv > 8500 and sjv <= 10000:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "high", "year": year}})
        elif sjv > 10000 and sjv <= 20000:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "high2", "year": year}})
        elif sjv > 20000:
            data_list.append({getCode(country):{"country": country, "data": sjv, "fillKey": "high3", "year": year}})
    return data_list

# open csv file and read it into a dictionary
world_sjv = 'csv/energyuse_world.csv'
country_codes = 'csv/country_codes.csv'
with open(world_sjv, 'r') as sjv, open(country_codes, 'r') as code:
    # read in the files
    reader_sjv = csv.reader(sjv, delimiter=';')
    reader_code = csv.reader(code, delimiter=';')
    # ignore first line
    next(reader_sjv, None)
    next(reader_code, None)
    
    try:
        # push it to an array
        sjv_dict = list(reader_sjv)
        code_dict = list(reader_code)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_sjv, reader.line_num, e))

# creating seperate files for different years
sjv_data_2000 = []
createJson(getResult("2000", 1, sjv_data_2000), "../data/world/sjv_world_2000")

sjv_data_2005 = []
createJson(getResult("2005", 2, sjv_data_2005), "../data/world/sjv_world_2005")

sjv_data_2010 = []
createJson(getResult("2010", 3, sjv_data_2010), "../data/world/sjv_world_2010")

sjv_data_2014 = []
createJson(getResult("2014", 7, sjv_data_2014), "../data/world/sjv_world_2014")


