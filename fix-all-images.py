#!/usr/bin/env python3
import os
import re

# Mapping of broken paths to correct paths
fix_mapping = {
    "Diverse senior couple 202604031711.png": "Diverse_senior_couple_202604031711.png",
    "couple discussing 202604031706.png": "Senior_couple_discussing_202604031706.png",
    "Middle Eastern senior 202604031656.png": "Middle_Eastern_senior_202604031656.png",
    "Daughter helping aging 202604031710.png": "Daughter_helping_aging_202604031710.png",
    "meeting with 202604031708.png": "Senior_meeting_with_202604031708.png",
    "woman doing 202604031708.png": "Senior_woman_doing_202604031708.png",
    "enjoying garden 202604031709.png": "Senior_enjoying_garden_202604031709.png",
    "group of 202604031659.png": "Diverse_group_of_202604031659.png"
}

# Fix all HTML files
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r') as f:
            content = f.read()
        
        # Replace all broken image paths
        for broken, correct in fix_mapping.items():
            content = content.replace(f"images-approved/{broken}", f"images-approved/{correct}")
        
        with open(filename, 'w') as f:
            f.write(content)
        
        print(f"Fixed {filename}")