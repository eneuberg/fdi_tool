import pandas as pd
import json

# Sample code with the new functionality for handling subsectors

def process_excel_to_json(excel_file):
    # Load the Excel file
    df = pd.read_excel(excel_file, skiprows=0)  # Skip the first row containing column names

    # Initialize a dictionary to hold the JSON structure
    sectors_json = {"sectors": {}}
    current_sector = None  # Keep track of the current sector as we go through the rows

    for _, row in df.iterrows():
        sector = row.iloc[0]  # Sector is in the first column
        subsector = row.iloc[1]  # Subsector is in the second column
        if pd.notnull(sector):  # Check if the sector cell is not empty
            current_sector = sector  # Update the current sector
            if sector not in sectors_json["sectors"]:  # Initialize the sector in the dictionary if not present
                sectors_json["sectors"][sector] = {}

        # Handling subsectors or direct sector indicators
        target = sectors_json["sectors"][current_sector]
        if pd.notnull(subsector):
            if subsector not in target:
                target[subsector] = []
            target = target[subsector]
        elif "{}_direct".format(current_sector) not in target:
            target["{}_direct".format(current_sector)] = []
            target = target["{}_direct".format(current_sector)]
        else:
            target = target["{}_direct".format(current_sector)]

        # Adjust the range if your indicators start or end in different columns
        for i in range(2, min(len(row), 28), 3):  # Adjusted step to 3 to include comment
            if pd.isnull(row.iloc[i]):  # Stop if we reach an empty cell
                break
            indicator_text = row.iloc[i]
            evaluation = row.iloc[i + 1]
            comment = row.iloc[i + 2]  # Get the comment from the next column
            if pd.isna(comment):
                comment = ""
            print(indicator_text)
            print(evaluation)
            print(comment)
            # Determine the evaluation type and handle it accordingly
            if not pd.isnull(evaluation) and isinstance(evaluation, (int, float)):
                indicator = {
                    "indicator": indicator_text,
                    "comment": comment,  # Now using the comment directly from the Excel
                    "evaluation": "range",
                    "rangeOptions": []  # Initialize as empty; manual addition required
                }
            elif "(y/n)" in indicator_text.lower():
                indicator = {
                    "indicator": indicator_text,
                    "comment": comment,  # Now using the comment directly from the Excel
                    "evaluation": "boolean"
                }
            else:
                indicator = {
                    "indicator": indicator_text,
                    "comment": comment,  # Now using the comment directly from the Excel
                    "evaluation": "unknown"
                }
            target.append(indicator)


    # Convert the dictionary to a JSON string (optional)
    json_str = json.dumps(sectors_json, indent=4)
    return json_str

def process_and_save_json():
    # Specify the file path to the Excel file
    excel_path = 'data.xlsx'
    
    # Process the Excel file to JSON
    json_output = process_excel_to_json(excel_path)
    
    # Save the JSON output to a file
    with open('data.json', 'w') as file:
        file.write(json_output)
    print("JSON data has been saved to data.json.")

process_and_save_json()