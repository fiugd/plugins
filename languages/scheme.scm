; scheme loves parenthesis tails

(define range
	(lambda (n . m)
		(let
			((n (if (null? m) 0 n)) (m (if (null? m) n (car m))))
			(cond
		((= n m) (list n))
		(else (cons n (range ((if (< n m) + -) n 1) m)))))))

(define (fib n)
	(cond
		((= n 0) 0)
		((= n 1) 1)
		(else
		(+ (fib (- n 1))
				(fib (- n 2)))))
)

(define (fibMany numbers)
	(if (null? numbers) '()
	(cons (fib (car numbers)) (fibMany (cdr numbers)))))

(fibMany (range 9))
