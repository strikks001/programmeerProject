# 
# netherlands.py
# 
# Computer Science 50
# Programmeer Project 2016
# Energy Knowledge
# 
# Sanne Strikkers
# 11170816
# 
import csv, sys, json
from json_generator import json_generator
# searching for provinces, towns, latitude en longitude
def getProvince(zipcode):
    place_info = list()
    for i in range(len(code_dict)):
        if int(code_dict[i][0]) == int(zipcode):
            place_info = [code_dict[i][1], code_dict[i][2], code_dict[i][3], code_dict[i][4]]
            return place_info

# open csv file and read it into a dictionary
nl_sjv = 'csv/nl_sjv.csv'
nl_codes = 'csv/nl_codes.csv'
with open(nl_sjv, 'r') as sjv, open(nl_codes, 'r') as code:
    reader_sjv = csv.reader(sjv, delimiter=';')
    reader_code = csv.reader(code, delimiter=';')
    # ignore first line
    next(reader_sjv, None)
    next(reader_code, None)
    try:
        sjv_dict = list(reader_sjv)
        code_dict = list(reader_code)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_sjv, reader.line_num, e))

sjv_data = []
for i in range(len(sjv_dict)):
    street = sjv_dict[i][0]
    zipcode_from = sjv_dict[i][1]
    zipcode_to = sjv_dict[i][2]
    place = sjv_dict[i][3]
    product = sjv_dict[i][4]
    sjv = sjv_dict[i][5]

    sjv_data.append({"type": "Feature", "properties": {"street": street, "zipcode_from": zipcode_from, "zipcode_to": zipcode_to, "place": place, "product": product, "sjv":sjv, "province": getProvince(sjv_dict[i][1][:4]), "town": getProvince(sjv_dict[i][2][:4])}, "geometry": {"type": "MultiPolygon"}})

createJson(sjv_data, "/data/sjv_nl")


