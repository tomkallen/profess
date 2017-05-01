# Profess  
### test your code as you write it

## Usage:  

```
profess
    .suite("weird integer testing")
    .want(1)
    .toBeEqual(1)

    .want(42)
    .toBeEqual(42)

    .test()

    .suite("add more odd testing")
    .want(true)
    .toBeEqual(false)
    .test()
```

### add global coverage info to your tests:  

```
profess.withCoverage();
///run your tests here
profess.result();
```

## Tests:  

#### Fast checking:  
`profess.fast(value)(expectedValue)`  
```
profess.fast(100)(100);
```   

result:
```
Fast checking:
100 equals 100
type = "number"
```
`profess.fast(2)("2")`

result:
```
Fast checking:
2 equals 2 but types are different: 2 is not of the type string as it should be
```  
note that you do not need suite() or anything else to perform fast checking  

#### Equality with type check:  
`toBeEqual(value)`  
```
profess.want(1).toBeEqual(2).test(); // fail  
```  

#### Type matching:  
`toMatchTypes(value)`  
```
const test = "Some string";
profess.want("testing this").toMatchTypes(test).test(); // Pass
```  
#### Range check:  
`toBeInRange(min, max)`  
```
const value = 1337;
profess.want(value).toBeInRange(42, 9001).test(); // Pass
```  
#### Existence check:  
`toExist()`  
```
let doesNotExist;
profess
    .want(0).toExist() // Pass
    .want(null).toExist() // Pass
    .want('').toExist() // Pass
    .want(doesNotExist).toExist()  // Fail
    .test()
```  
note that this is not a _falsy_ test  
