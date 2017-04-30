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
