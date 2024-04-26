import pandas as pd
import json
import re

import pandas as pd
import re

def process_excel_to_json(excel_file):
    df = pd.read_excel(excel_file)
    sectors_json = {"sectors": {}}
    current_sector = None

    # Retrieve dimensions from the second row, adjusting indices as required
    dimensions = df.iloc[0]

    current_dimension = "unknown"  # Initialize the current dimension

    for _, row in df.iterrows():
        if df.index.get_loc(row.name) < 1: 
            continue

        sector = row.iloc[0]
        subsector = row.iloc[1]
        if pd.notnull(sector):
            current_sector = sector
            if sector not in sectors_json["sectors"]:
                sectors_json["sectors"][sector] = {}

        target = sectors_json["sectors"][current_sector]
        if pd.notnull(subsector):
            if subsector not in target:
                target[subsector] = {"indicators": []}
            target = target[subsector]["indicators"]
        else:
            if not target:
                direct_key = "{}_direct".format(current_sector)
                if direct_key not in target:
                    target[direct_key] = {"indicators": []}
                target = target[direct_key]["indicators"]

        for i in range(2, min(len(row), 56), 3):
            if pd.isnull(row.iloc[i]):
                continue

            indicator_text = row.iloc[i].strip()
            indicator_text = re.sub(r'\(y/n\)', '', indicator_text, flags=re.IGNORECASE).strip()
            evaluation = row.iloc[i + 1] if not pd.isnull(row.iloc[i + 1]) else ""
            comment = row.iloc[i + 2] if not pd.isnull(row.iloc[i + 2]) else ""
            if not pd.isnull(dimensions.iloc[i]):
                current_dimension = dimensions.iloc[i].strip().lower()

            if not indicator_text:
                continue

            indicator = {
                "text": indicator_text,
                "comment": comment,
                "dimension": current_dimension  # Include dimension information
            }

            if isinstance(evaluation, (int, float)):
                indicator["evaluation"] = {"type": "range", "rangeOptions": {}}
            elif "multi checkbox" in evaluation.lower():
                lines = indicator_text.split('\n')
                main_indicator = lines[0].strip()
                
                options = []
                current_option = ""
                
                # Iterate through each line after the main indicator
                for line in lines[1:]:
                    line = line.strip()
                    if line.startswith('~'):  # Start of a new option
                        if current_option:  # Save the previous option if it exists
                            options.append(current_option.strip())
                        current_option = line[1:].strip()  # Start new option
                    else:
                        current_option += " " + line  # Continue appending to the current option
                
                if current_option:  # Don't forget to add the last option
                    options.append(current_option.strip())
                
                indicator["text"] = main_indicator
                indicator["evaluation"] = {
                    "type": "multicheckbox",
                    "options": options
                }

            elif "y" in evaluation.lower() or "n" in evaluation.lower():
                indicator["evaluation"] = {"type": "checkbox"}
            else:
                indicator["evaluation"] = {"type": "unknown"}

            target.append(indicator)

    return sectors_json


def integrate_range_options(data_json, range_options):
    for subsector, indicators in range_options['subsectors'].items():
        subsector_found = False

        for sector, content in data_json['sectors'].items():
            if subsector in content:
                subsector_found = True

                for index, options in indicators.items():
                    index = int(index)

                    if index < len(content[subsector]["indicators"]):
                        content[subsector]["indicators"][index]["evaluation"]["rangeOptions"] = options
                    else:
                        print(f"Error: No indicator at index {index} in subsector {subsector} within sector {sector}")

        if not subsector_found:
            print(f"Warning: Subsector {subsector} not found in any sector")

    return data_json


def process_and_save_json():
    excel_path = 'data.xlsx'
    rangeOptions_path = 'rangeOptions.json'

    json_output = process_excel_to_json(excel_path)
    with open(rangeOptions_path, 'r') as file:
        ranges_json = json.load(file)

    json_modified = integrate_range_options(json_output, ranges_json)
    with open('data.json', 'w') as file:
        file.write(json.dumps(json_modified, indent=4))
    print("JSON data has been saved to data.json.")

process_and_save_json()