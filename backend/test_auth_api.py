import urllib.request
import urllib.error
import json
import time

BASE_URL = "http://127.0.0.1:8000/api/auth"

def print_res(name, req):
    try:
        with urllib.request.urlopen(req) as response:
            body = response.read().decode('utf-8')
            print(f"[{name}] {response.status} OK")
            print(f"Response: {body}\n")
            return json.loads(body)
    except urllib.error.HTTPError as e:
        print(f"[{name}] Failed with status {e.code}")
        print(f"Error body: {e.read().decode('utf-8')}\n")
    except Exception as e:
        print(f"[{name}] Failed: {e}\n")
    return None

def run_tests():
    # 1. Test Register
    print("Test 1: Register User...")
    mock_user = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123"
    }
    data = json.dumps(mock_user).encode('utf-8')
    req_register = urllib.request.Request(f"{BASE_URL}/register", data=data, method="POST")
    req_register.add_header('Content-Type', 'application/json')
    print_res("Register User", req_register)
    
    # 2. Test Login
    print("Test 2: Login User...")
    login_user = {
        "email": "test@example.com",
        "password": "password123"
    }
    login_data = json.dumps(login_user).encode('utf-8')
    req_login = urllib.request.Request(f"{BASE_URL}/login", data=login_data, method="POST")
    req_login.add_header('Content-Type', 'application/json')
    print_res("Login User", req_login)

if __name__ == "__main__":
    run_tests()
