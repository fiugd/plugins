// from: https://blog.genuine.com/2019/05/fibonacci-in-scala-tailrec-memoized/ 

def fib(n: Int): BigInt = n match {
  case 0 => 0
  case 1 => 1
  case _ => fib(n-2) + fib(n-1)
}

(0 to 9).foreach(n => print(fib(n) + " "))
