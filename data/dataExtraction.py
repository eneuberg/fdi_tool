import pandas as pd
import json
import re

# Sample code with the new functionality for handling subsectors

def process_excel_to_json(excel_file):
    # Load the Excel file
    df = pd.read_excel(excel_file, skiprows=0)  # Skip the first row containing column names

    # Initialize a dictionary to hold the JSON structure
    sectors_json = {"sectors": {}}
    current_sector = None  # Keep track of the current sector as we go through the rows

    for _, row in df.iterrows():
        sector = row.iloc[0]
        subsector = row.iloc[1]
        if pd.notnull(sector):  # Check if the sector cell is not empty
            current_sector = sector  # Update the current sector
            if sector not in sectors_json["sectors"]:  # Initialize the sector in the dictionary if not present
                sectors_json["sectors"][sector] = {}

        target = sectors_json["sectors"][current_sector]
        if pd.notnull(subsector):
            if subsector not in target:
                target[subsector] = []  # Initialize subsector list if not exist
            target = target[subsector]
        else:
            # Only use '_direct' if there are absolutely no subsectors defined in the sector
            if not any(target):  # This checks if the sector dictionary is still empty (no subsectors)
                if "{}_direct".format(current_sector) not in target:
                    target["{}_direct".format(current_sector)] = []
                target = target["{}_direct".format(current_sector)]

        # Process indicators...


        # Adjust the range if your indicators start or end in different columns
        for i in range(2, min(len(row), 41), 3):  # Ensuring it covers up to column AO
            if pd.isnull(row.iloc[i]):  # Stop if the indicator text cell is empty
                break
            indicator_text = row.iloc[i].strip()
            indicator_text = re.sub(r'\(y/n\)', '', indicator_text, flags=re.IGNORECASE).strip()
            evaluation = row.iloc[i + 1] if not pd.isnull(row.iloc[i + 1]) else ""
            comment = row.iloc[i + 2] if not pd.isnull(row.iloc[i + 2]) else ""
        
            # Skip the creation of an indicator object if there's no actual indicator text
            if not indicator_text:
                continue
        
            # Determine evaluation type based on non-null and non-empty checks
            if isinstance(evaluation, (int, float)):
                indicator = {
                    "indicator": indicator_text,
                    "comment": comment,
                    "evaluation": "range",
                    "rangeOptions": []
                }
            elif "multi checkbox" in evaluation.lower():
                lines = indicator_text.split('\n')
                main_indicator = lines[0].strip()
                checkboxes = [line.strip()[2:] for line in lines[1:] if line.strip().startswith('~')]
                indicator = {
                    "indicator": main_indicator,
                    "comment": comment,
                    "evaluation": "multicheckbox",
                    "checkboxes": checkboxes
                }
            elif "y" in evaluation.lower() or "n" in evaluation.lower():
                indicator = {
                    "indicator": indicator_text,
                    "comment": comment,
                    "evaluation": "checkbox"
                }
            else:
                indicator = {
                    "indicator": indicator_text,
                    "comment": comment,
                    "evaluation": "unknown"
                }
            target.append(indicator)


    return sectors_json


def integrate_range_options(data_json, range_options):
    for subsector, indicators in range_options['subsectors'].items():
        for sector, content in data_json['sectors'].items():
            if subsector in content:  # Checks if the subsector exists within the sector
                for index, options in indicators.items():
                    index = int(index)  # Ensure index is an integer
                    if index < len(content[subsector]):
                        content[subsector][index]['rangeOptions'] = options
                    else:
                        print(f"Warning: No indicator at index {index} in subsector {subsector}")
            else:
                print(f"Warning: Subsector {subsector} not found in sector {sector}")

    return data_json


def process_and_save_json():
    # Specify the file path to the Excel file
    excel_path = 'data.xlsx'
    rangeOptions_path = 'rangeOptions.json'

    # Process the Excel file to JSON
    json_output = process_excel_to_json(excel_path)

    with open('rangeOptions.json', 'r') as file:
        ranges_json = json.load(file)

    json_modified = integrate_range_options(json_output, ranges_json)
    
    # Save the JSON output to a file
    with open('data.json', 'w') as file:
        file.write(json.dumps(json_modified, indent=4))  # Make sure to convert dictionary to JSON string
    print("JSON data has been saved to data.json.")

process_and_save_json()
