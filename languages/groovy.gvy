// from https://groovy.apache.org/blog/calculating-fibonacci-with-groovy-revisited

def fib(n) {
    if (n <= 1) return n

    def previous = n.valueOf(1), next = previous, sum
    (n-2).times {
        sum = previous
        previous = next
        next = sum + previous
    }
    next
}

// TODO: driver code