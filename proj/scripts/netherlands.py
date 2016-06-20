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

data_list_elec = []
data_list_gas = []

def createJson(data_list, sub):
    "creating json files"
    # convert the list to JSON format
    json_str = json.dumps(data_list, indent = 4, ensure_ascii=False)
    # create JSON file
    jsonfile = '%s.json' %sub
    with open(jsonfile, 'w') as f:
        try:
            f.write(json_str)
        except csv.Error as e:
            sys.exit('file %s, line %d: %s' % (f, reader.line_num, e))

def getCommunity(code):
    "get the community from community code"
    for i in range(len(code_dict)):
        if code_dict[i][1] == code:
            return code_dict[i][0]

def getResult(data_list, input_year):
    "get data and insert it to a list"
    for i in range(len(sup_dict)):
        year = int(sup_dict[i][1])
        code = sup_dict[i][0]
        # check if there is data, if not then set on zero
        if sup_dict[i][2] != '':
            gas = int(sup_dict[i][2])
        else:
            gas = 0
        
        if sup_dict[i][3] != '':
            electricity = int(sup_dict[i][3])
        else:
            electricity = 0

        # insert data into a list
        if year == input_year:
            if electricity == 0:
                data_list_elec.append({"sjv": "Geen data beschikbaar", "color": "#F2F2F2", "community": getCommunity(code), "code": code})
            elif electricity > 0 and electricity <= 400:
                data_list_elec.append({"sjv": electricity, "color": "#f6faf4", "community": getCommunity(code), "code": code})
            elif electricity > 400 and electricity <= 800:
                data_list_elec.append({"sjv": electricity, "color": "#f7fcf5", "community": getCommunity(code), "code": code})
            elif electricity > 800 and electricity <= 1200:
                data_list_elec.append({"sjv": electricity, "color": "#e5f5e0", "community": getCommunity(code), "code": code})
            elif electricity > 1200 and electricity <= 1600:
                data_list_elec.append({"sjv": electricity, "color": "#c7e9c0", "community": getCommunity(code), "code": code})
            elif electricity > 1600 and electricity <= 2000:
                data_list_elec.append({"sjv": electricity, "color": "#a1d99b", "community": getCommunity(code), "code": code})
            elif electricity > 2000 and electricity <= 2400:
                data_list_elec.append({"sjv": electricity, "color": "#74c476", "community": getCommunity(code), "code": code})
            elif electricity > 2400 and electricity <= 2800:
                data_list_elec.append({"sjv": electricity,  "color": "#41ab5d", "community": getCommunity(code), "code": code})
            elif electricity > 2800 and electricity <= 3200:
                data_list_elec.append({"sjv": electricity, "color": "#238b45", "community": getCommunity(code), "code": code})
            elif electricity > 3200 and electricity <= 3600:
                data_list_elec.append({"sjv": electricity, "color": "#006d2c", "community": getCommunity(code), "code": code})
            elif electricity > 3600 and electricity <= 4000:
                data_list_elec.append({"sjv": electricity, "color": "#00441b", "community": getCommunity(code), "code": code})
            elif electricity > 4000:
                data_list_elec.append({"sjv": electricity, "color": "#083a1c", "community": getCommunity(code), "code": code})
            # gas list
            if gas == 0:
                data_list_gas.append({"sjv": "Geen data beschikbaar", "color": "#F2F2F2", "community": getCommunity(code), "code": code})
            elif gas > 0 and gas <= 250:
                data_list_gas.append({"sjv": gas, "color": "#fff5eb", "community": getCommunity(code), "code": code})
            elif gas > 250 and gas <= 500:
                data_list_gas.append({"sjv": gas, "color": "#fee6ce", "community": getCommunity(code), "code": code})
            elif gas > 500 and gas <= 750:
                data_list_gas.append({"sjv": gas, "color": "#fdd0a2", "community": getCommunity(code), "code": code})
            elif gas > 750 and gas <= 1000:
                data_list_gas.append({"sjv": gas, "color": "#fdae6b", "community": getCommunity(code), "code": code})
            elif gas > 1000 and gas <= 1250:
                data_list_gas.append({"sjv": gas, "color": "#fd8d3c", "community": getCommunity(code), "code": code})
            elif gas > 1250 and gas <= 1500:
                data_list_gas.append({"sjv": gas, "color": "#f16913", "community": getCommunity(code), "code": code})
            elif gas > 1500 and gas <= 1750:
                data_list_gas.append({"sjv": gas, "color": "#d94801", "community": getCommunity(code), "code": code})
            elif gas > 1750 and gas <= 2000:
                data_list_gas.append({"sjv": gas, "color": "#a63603", "community": getCommunity(code), "code": code})
            elif gas > 2000 and gas <= 2250:
                data_list_gas.append({"sjv": gas, "color": "#7f2704", "community": getCommunity(code), "code": code})
            elif gas > 2250:
                data_list_gas.append({"sjv": gas, "color": "#3f1302", "community": getCommunity(code), "code": code})

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
        # create lists
        sup_dict = list(reader)
        code_dict = list(reader2)
    except csv.Error as e:
        sys.exit('file %s, line %d: %s' % (nl_gas, reader.line_num, e))

# create electricity files
getResult(data_list_elec, 2010)
createJson(data_list_elec, "../data/netherlands/electricity/netherlands_elek_2010")
data_list_elec = []
getResult(data_list_elec, 2012)
createJson(data_list_elec, "../data/netherlands/electricity/netherlands_elek_2012")
data_list_elec = []
getResult(data_list_elec, 2014)
createJson(data_list_elec, "../data/netherlands/electricity/netherlands_elek_2014")

# create gas files
getResult(data_list_gas, 2010)
createJson(data_list_gas, "../data/netherlands/gas/netherlands_gas_2010")
data_list_gas = []
getResult(data_list_gas, 2012)
createJson(data_list_gas, "../data/netherlands/gas/netherlands_gas_2012")
data_list_gas = []
getResult(data_list_gas, 2014)
createJson(data_list_gas, "../data/netherlands/gas/netherlands_gas_2014")
data_list_gas = []
