let arr = ["apple", "banana", "orange"];


const removeByValue = (value) => {
    let indexOf = arr.indexOf(value);

    for(i=0; i < arr.length; i++) {
        if(value == arr[i]) {
            console.log(`value: ${value} arr[i]: ${arr[i]}`)
            let spliceByIndex = arr.splice(indexOf, 1);
            console.log(`Spliced value: ${spliceByIndex}`)
        }
    }
    
    

    return arr + console.log(`Array values: ${arr}`)
    
    
}

removeByValue("banana")