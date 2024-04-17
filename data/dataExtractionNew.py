import pandas as pd
import json
import re

def process_excel_to_json(excel_file):
    df = pd.read_excel(excel_file)
    sectors_json = {"sectors": {}}
    current_sector = None

    for _, row in df.iterrows():
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

        for i in range(2, min(len(row), 41), 3):
            if pd.isnull(row.iloc[i]):
                break
            indicator_text = row.iloc[i].strip()
            indicator_text = re.sub(r'\(y/n\)', '', indicator_text, flags=re.IGNORECASE).strip()
            evaluation = row.iloc[i + 1] if not pd.isnull(row.iloc[i + 1]) else ""
            comment = row.iloc[i + 2] if not pd.isnull(row.iloc[i + 2]) else ""

            if not indicator_text:
                continue

            indicator = {"text": indicator_text, "comment": comment}
            if isinstance(evaluation, (int, float)):
                indicator["evaluation"] = {
                    "type": "range",
                    "ranges": {
                        "operator": "more",
                        "comparator": evaluation,
                        "returnValue": True
                    }
                }
            elif "multi checkbox" in evaluation.lower():
                options = [line.strip()[2:] for line in indicator_text.split('\n') if line.strip().startswith('~')]
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
        for sector, content in data_json['sectors'].items():
            if subsector in content:
                for index, options in indicators.items():
                    index = int(index)
                    if index < len(content[subsector]["indicators"]):
                        content[subsector]["indicators"][index]["evaluation"]["ranges"] = options
                    else:
                        print(f"Warning: No indicator at index {index} in subsector {subsector}")
            else:
                print(f"Warning: Subsector {subsector} not found in sector {sector}")

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
