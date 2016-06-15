# 
# suppliers.py
# 
# Computer Science 50
# Programmeer Project 2016
# Energy Knowledge
# 
# Sanne Strikkers
# 11170816
# 
import csv, sys, json

data_list_stroom = []
data_list_gas = []

# creating json files
def createJson(data_list, sub):
        # convert the list to JSON format
        json_str = json.dumps(data_list, indent = 4, ensure_ascii=False)

        jsonfile = '%s.json' %sub
        with open(jsonfile, 'w') as f:
            try:
                f.write(json_str)
            except csv.Error as e:
                sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

def getcommunity(code):
    for i in range(len(code_dict)):
        if code_dict[i][1] == code:
            return code_dict[i][0]

# searching for provinces, towns, latitude en longitude
def getResult(data_list, input_year):
    for i in range(len(sup_dict)):
        year = int(sup_dict[i][1])
        code = sup_dict[i][0]
        if sup_dict[i][2] != '':
            gas = int(sup_dict[i][2])
        else:
            gas = 0
        
        if sup_dict[i][3] != '':
            stroom = int(sup_dict[i][3])
        else:
            stroom = 0

        if year == input_year:
            if stroom <= 400:
                data_list_stroom.append({"sjv": stroom, "color": "#ffffff", "community": getcommunity(code), "code": code})
            elif stroom > 400 and stroom <= 800:
                data_list_stroom.append({"sjv": stroom, "color": "#fff5eb", "community": getcommunity(code), "code": code})
            elif stroom > 800 and stroom <= 1200:
                data_list_stroom.append({"sjv": stroom, "color": "#fee6ce", "community": getcommunity(code), "code": code})
            elif stroom > 1200 and stroom <= 1600:
                data_list_stroom.append({"sjv": stroom, "color": "#fdd0a2", "community": getcommunity(code), "code": code})
            elif stroom > 1600 and stroom <= 2000:
                data_list_stroom.append({"sjv": stroom, "color": "#fdae6b", "community": getcommunity(code), "code": code})
            elif stroom > 2000 and stroom <= 2400:
                data_list_stroom.append({"sjv": stroom, "color": "#fd8d3c", "community": getcommunity(code), "code": code})
            elif stroom > 2400 and stroom <= 2800:
                data_list_stroom.append({"sjv": stroom,  "color": "#f16913", "community": getcommunity(code), "code": code})
            elif stroom > 2800 and stroom <= 3200:
                data_list_stroom.append({"sjv": stroom, "color": "#d94801", "community": getcommunity(code), "code": code})
            elif stroom > 3200 and stroom <= 3600:
                data_list_stroom.append({"sjv": stroom, "color": "#a63603", "community": getcommunity(code), "code": code})
            elif stroom > 3600 and stroom <= 4000:
                data_list_stroom.append({"sjv": stroom, "color": "#7f2704", "community": getcommunity(code), "code": code})
            elif stroom > 4000:
                data_list_stroom.append({"sjv": stroom, "color": "#3f1302", "community": getcommunity(code), "code": code})
        
            if gas <= 250:
                data_list_gas.append({"sjv": gas, "color": "#fff5eb", "community": getcommunity(code), "code": code})
            elif gas > 250 and gas <= 500:
                data_list_gas.append({"sjv": gas, "color": "#fee6ce", "community": getcommunity(code), "code": code})
            elif gas > 500 and gas <= 750:
                data_list_gas.append({"sjv": gas, "color": "#fdd0a2", "community": getcommunity(code), "code": code})
            elif gas > 750 and gas <= 1000:
                data_list_gas.append({"sjv": gas, "color": "#fdae6b", "community": getcommunity(code), "code": code})
            elif gas > 1000 and gas <= 1250:
                data_list_gas.append({"sjv": gas, "color": "#fd8d3c", "community": getcommunity(code), "code": code})
            elif gas > 1250 and gas <= 1500:
                data_list_gas.append({"sjv": gas, "color": "#f16913", "community": getcommunity(code), "code": code})
            elif gas > 1500 and gas <= 1750:
                data_list_gas.append({"sjv": gas, "color": "#d94801", "community": getcommunity(code), "code": code})
            elif gas > 1750 and gas <= 2000:
                data_list_gas.append({"sjv": gas, "color": "#a63603", "community": getcommunity(code), "code": code})
            elif gas > 2000 and gas <= 2250:
                data_list_gas.append({"sjv": gas, "color": "#7f2704", "community": getcommunity(code), "code": code})
            elif gas > 2250:
                data_list_gas.append({"sjv": gas, "color": "#3f1302", "community": getcommunity(code), "code": code})

# open csv file and read it into a dictionary
energy_use = 'csv/nl_sjv.csv'
community_code = 'csv/gemeente_codes.csv'
with open(energy_use, 'r') as sjv, open(community_code, 'r') as code:
    reader = csv.reader(sjv, delimiter=';')
    reader2 = csv.reader(code, delimiter=';')
    # ignore first line
    next(reader, None)
    next(reader2, None)
    try:
        sup_dict = list(reader)
        code_dict = list(reader2)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_gas, reader.line_num, e))

getResult(data_list_stroom, 2010)
createJson(data_list_stroom, "../data/netherlands/electricity/netherlands_elek_2010")
data_list_stroom = []
getResult(data_list_stroom, 2012)
createJson(data_list_stroom, "../data/netherlands/electricity/netherlands_elek_2012")
data_list_stroom = []
getResult(data_list_stroom, 2014)
createJson(data_list_stroom, "../data/netherlands/electricity/netherlands_elek_2014")

getResult(data_list_gas, 2010)
createJson(data_list_gas, "../data/netherlands/gas/netherlands_gas_2010")
data_list_gas = []
getResult(data_list_gas, 2012)
createJson(data_list_gas, "../data/netherlands/gas/netherlands_gas_2012")
data_list_gas = []
getResult(data_list_gas, 2014)
createJson(data_list_gas, "../data/netherlands/gas/netherlands_gas_2014")
data_list_gas = []
