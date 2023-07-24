def fib():
	a, b = 0, 1
	while True:
		yield a
		a, b = b, a + b

string = ""
for index, fibonacci_number in zip(range(10), fib()):
	string = "".join([string, '{f:1}'.format(f=fibonacci_number), " "])

print string
