import subprocess

with open('clean_output.txt', 'w', encoding='utf-8') as f:
    f.write("=== AUTH TESTS ===\n")
    proc1 = subprocess.run(['.\\venv\\Scripts\\python.exe', 'test_auth_api.py'], capture_output=True, text=True)
    f.write(proc1.stdout)
    if proc1.stderr:
        f.write("ERRORS:\n" + proc1.stderr)
        
    f.write("\n=== MAIN SERVER TESTS ===\n")
    proc2 = subprocess.run(['.\\venv\\Scripts\\python.exe', 'test_api.py'], capture_output=True, text=True)
    f.write(proc2.stdout)
    if proc2.stderr:
        f.write("ERRORS:\n" + proc2.stderr)
