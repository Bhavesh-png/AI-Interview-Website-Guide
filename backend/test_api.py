import urllib.request
import urllib.error
import json
import time

BASE_URL = "http://127.0.0.1:8000/api"

def print_res(name, req):
    try:
        with urllib.request.urlopen(req) as response:
            body = response.read().decode('utf-8')
            print(f"[{name}] {response.status} OK")
            print(f"Response: {body[:200]}...\n")
            return json.loads(body)
    except urllib.error.HTTPError as e:
        print(f"[{name}] Failed with status {e.code}")
        print(f"Error body: {e.read().decode('utf-8')}\n")
    except Exception as e:
        print(f"[{name}] Failed: {e}\n")
    return None

def run_tests():
    # Wait for server to start
    time.sleep(2)
    
    # 1. Test fetching HR question (from new dataset)
    print("Test 1: Fetching HR Question...")
    req_question = urllib.request.Request(f"{BASE_URL}/question/hr?difficulty=easy")
    print_res("Fetch Question", req_question)
    
    # 2. Test saving an interview
    print("Test 2: Saving Interview...")
    mock_interview = {
        "userId": "test_user_123",
        "role": "frontend",
        "difficulty": "easy",
        "questions": [
            {
                "question": "What is React?",
                "userAnswer": "A library.",
                "score": 8.5,
                "feedback": "Good.",
                "improvement": "Elaborate more."
            }
        ],
        "totalScore": 8.5
    }
    
    data = json.dumps(mock_interview).encode('utf-8')
    req_save = urllib.request.Request(f"{BASE_URL}/save-interview", data=data, method="POST")
    req_save.add_header('Content-Type', 'application/json')
    save_res = print_res("Save Interview", req_save)
    
    # 3. Test getting history for user
    print("Test 3: Fetching History...")
    req_history = urllib.request.Request(f"{BASE_URL}/history/test_user_123")
    print_res("Fetching History", req_history)
    
    # 4. Test getting average score
    print("Test 4: Fetching Average Score...")
    req_score = urllib.request.Request(f"{BASE_URL}/average-score/test_user_123")
    print_res("Average Score", req_score)

if __name__ == "__main__":
    run_tests()
