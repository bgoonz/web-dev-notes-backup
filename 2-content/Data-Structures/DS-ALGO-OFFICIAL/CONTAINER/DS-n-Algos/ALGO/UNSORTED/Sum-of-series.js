function sum(a, b) {
    function fn(x) {
      return 1 / (x * x)
    }
    var s = 0;
    for (; a <= b; a++) s += fn(a);
    return s;
  }