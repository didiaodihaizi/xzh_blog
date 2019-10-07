# new Date(aTIme) - new Date(bTime)引发的思考

## 事情发生场景
一刚入行的朋友，问我一些今天遇到的问题，然后解答完毕，并优化了该段代码
```
// 优化前
arr.sort((a, b) => {
    let aTime = new Date(a.time).getTime()
    let bTime = new Date(b.time).getTime()
    return aTime - bTIme
})

// 优化后
arr.sort((a, b) => new Date(a.time) - new Date(b.time))
```
然后就在想，不加getTime也能运行是浏览器自己转的吗，会有兼容问题吗，于是上了mdn上一查：Date.prototype.getTime与valueof一致，所以能确认这个不会有浏览器的问题

## 什么是valueof
以下是mdn的内容：
```
JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。

默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。

JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。
不同类型对象的valueOf()方法的返回值
对象	    返回值
Array	    返回数组对象本身。
Boolean	    布尔值。
Date	    存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。
Function	函数本身。
Number	    数字值。
Object	    对象本身。这是默认情况。
String	    字符串值。
 	Math 和 Error 对象没有 valueOf 方法。
你可以在自己的代码中使用valueOf将内置对象转换为原始值。 创建自定义对象时，可以覆盖Object.prototype.valueOf()来调用自定义方法，而不是默认Object方法。
```

简而言之，valueOf我们很少会主动调用它，一般是js里自动调用，在需要用到对象原始值时（一般在做运算时）。

## 重写valueof
写了个例子，简单阐述了valueOf是否自动调用
```
var a = {}, b = 1
console.log(a + b) // [object Object]1
a.valueOf = function(){return 1}
console.log(a + b)  // 2
b.valueOf = function () {return 2}
console.log(a + b)  // 2 数字在进行运算时不会执行valeof

``` 
可以看到最后打印出的是2，所以a+1时自动调用了a的valueOf

## 总结
valueOf一般是js内部自己调用的，一般不需要js显示调用，直到它的用处和原理，可以更好的简化代码～