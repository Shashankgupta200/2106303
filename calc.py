from flask import Flask, jsonify
import requests
import time
from collections import deque

app = Flask(__name__)

W = 10
NU = {'p': 'http://20.244.56.144/test/primes', 'f': 'http://20.244.56.144/test/fibo', 'e': 'http://20.244.56.144/test/even', 'r': 'http://20.244.56.144/test/rand'}
numbers_buffer = deque(maxlen=W)

def fetch_nums(num_type):
    url = NU.get(num_type)
    if url:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.json().get('numbers', [])
        except requests.exceptions.RequestException as e:
            print(f"Error fetching numbers: {e}")
    return []


def calc_avg(nums):
    if nums:
        return sum(nums) / len(nums)
    return 0.0


@app.route('/numbers/<num_type>')
def process_request(num_type):
    start_time = time.time()
    fetched_nums = fetch_nums(num_type)
    for n in fetched_nums:
        if n not in numbers_buffer:
            numbers_buffer.append(n)
    if len(numbers_buffer) >= W:
        avg = calc_avg(numbers_buffer)
    else:
        avg = None
    response = {"windowPrevState": list(numbers_buffer), "windowCurrState": [], "numbers": fetched_nums, "avg": avg}
    response["windowCurrState"] = list(numbers_buffer)
    elapsed_time = time.time() - start_time
    if elapsed_time > 0.5:
        print(f"Warning: Response time exceeded 500ms: {elapsed_time}s")
    return jsonify(response)


if __name__ == '__main__':
    app.run(port=9876)
