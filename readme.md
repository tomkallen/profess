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

#### Equality with type checking:  
`toBeEqual(value)`  
```
profess.want(1).toBeEqual(2).test(); // fail
```  

#### Type matching:  
`toMatchTypes(value)`  
```
const test = "Some string";
profess.want("testing this").toMatchTypes(test).test() // Pass
```  
