import json
import os
import sys

EXISTING_DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "dataset", "questions.json")
NEW_DATASET_PATH = r"C:\Users\ansar\Downloads\archive\hr_interview_questions_dataset.json"

def load_json(filepath):
    if not os.path.exists(filepath):
        print(f"Warning: File not found - {filepath}")
        return []
    print(f"Loading {filepath}...")
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return []

def transform_data(new_records):
    print("Transforming new records...")
    transformed = []
    for record in new_records:
        question_text = record.get("question")
        answer_text = record.get("ideal_answer")
        
        if not question_text or not answer_text:
            continue
            
        transformed.append({
            "role": "hr",
            "category": "behavioral",
            "difficulty": "easy",
            "question": question_text.strip(),
            "answer": answer_text.strip(),
            "tags": ["hr"]
        })
    return transformed

def merge_datasets(existing_data, new_data):
    print("Merging datasets...")
    
    # Create a set of existing questions for fast lookup (case-insensitive for better duplicate detection)
    existing_questions = {q.get("question", "").strip().lower() for q in existing_data if q.get("question")}
    
    # Find the highest existing ID
    max_id = 0
    if existing_data:
        max_id = max(q.get("id", 0) for q in existing_data)
        
    merged_data = list(existing_data)
    
    duplicates_skipped = 0
    records_added = 0
    
    for record in new_data:
        q_lower = record["question"].lower()
        if q_lower in existing_questions:
            duplicates_skipped += 1
            continue
            
        max_id += 1
        record["id"] = max_id
        merged_data.append(record)
        existing_questions.add(q_lower)
        records_added += 1
        
    return merged_data, records_added, duplicates_skipped

def save_json(filepath, data):
    print(f"Saving merged dataset to {filepath}...")
    # Ensure directory exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def main():
    existing_data = load_json(EXISTING_DATASET_PATH)
    new_data = load_json(NEW_DATASET_PATH)
    
    if not new_data:
        print("No new data to process. Exiting.")
        return
        
    print(f"Loaded {len(existing_data)} existing records.")
    print(f"Loaded {len(new_data)} new records.")
    
    transformed_new_data = transform_data(new_data)
    print(f"Transformed {len(transformed_new_data)} valid new records.")
    
    merged_data, added, skipped = merge_datasets(existing_data, transformed_new_data)
    
    save_json(EXISTING_DATASET_PATH, merged_data)
    
    print("\n--- Summary ---")
    print(f"Total new records processed: {len(new_data)}")
    print(f"Records successfully added: {added}")
    print(f"Duplicates skipped: {skipped}")
    print(f"Final dataset size: {len(merged_data)}")

if __name__ == "__main__":
    main()
