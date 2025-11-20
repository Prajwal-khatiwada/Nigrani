import requests
import json
import time

BASE_URL = "http://localhost:5000"

def test_auth():
    # 1. Register
    print("Testing Register...")
    email = f"test_{int(time.time())}@example.com"
    password = "password123"
    
    try:
        resp = requests.post(f"{BASE_URL}/register", json={"email": email, "password": password})
        print(f"Register Status: {resp.status_code}")
        try:
            print(f"Register Response: {resp.json()}")
        except:
            print(f"Register Response Text: {resp.text}")
            
    except Exception as e:
        print(f"Register Failed: {e}")
        return

    # 2. Login
    print("\nTesting Login...")
    try:
        resp = requests.post(f"{BASE_URL}/login", json={"email": email, "password": password})
        print(f"Login Status: {resp.status_code}")
        try:
            print(f"Login Response: {resp.json()}")
        except:
            print(f"Login Response Text: {resp.text}")
    except Exception as e:
        print(f"Login Failed: {e}")

if __name__ == "__main__":
    test_auth()
