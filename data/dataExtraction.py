import pandas as pd
import json

# Load the Excel file
excel_file = '../dataModified.xlsx'
df = pd.read_excel(excel_file, skiprows=0)  # Skip the first row containing column names

# Initialize a dictionary to hold the JSON structure
sectors_json = {"sectors": {}}
current_sector = None  # Keep track of the current sector as we go through the rows

for _, row in df.iterrows():
    sector = row.iloc[0]  # Use iloc to access by index position
    if pd.notnull(sector):  # Check if the sector cell is not empty
        current_sector = sector  # Update the current sector
        if sector not in sectors_json["sectors"]:  # Initialize the sector in the dictionary if not present
            sectors_json["sectors"][sector] = []

    indicators = sectors_json["sectors"].get(current_sector, [])
    # Adjust the range if your indicators start or end in different columns
    for i in range(2, min(len(row), 28), 2):  # Process up to column index 28 (column AC), exclusive
        if pd.isnull(row.iloc[i]):  # Stop if we reach an empty cell
            break
        indicator_text = row.iloc[i]
        evaluation = row.iloc[i+1]
        # Determine if evaluation is "range", "boolean", or default to "unknown"
        if not pd.isnull(evaluation) and isinstance(evaluation, (int, float)):
            indicator = {
                "indicator": indicator_text,
                "comment": "",  # Add an empty comment field
                "evaluation": "range",
                "rangeOptions": []  # Initialize as empty; manual addition required
            }
        elif "(y/n)" in indicator_text.lower():
            indicator = {
                "indicator": indicator_text,
                "comment": "",  # Add an empty comment field
                "evaluation": "boolean"
            }
        else:
            indicator = {
                "indicator": indicator_text,
                "comment": "",  # Add an empty comment field
                "evaluation": "unknown"
            }
        
        indicators.append(indicator)

    if current_sector:  # Update the sector's indicators in the dictionary
        sectors_json["sectors"][current_sector] = indicators

# Convert the dictionary to a JSON string (optional)
json_str = json.dumps(sectors_json, indent=4)
print(json_str)

# Optionally, save the JSON to a file
with open('data.json', 'w') as f:
    f.write(json_str)
