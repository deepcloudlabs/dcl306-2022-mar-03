function * getLotteryNumbers(max,size){ // generator function
    let i=0;
    while(i < size){
        yield (Math.floor(Math.random() * max) + 1);
        console.log(i)
        i++;
    }
}

for (let number of getLotteryNumbers(60,6)){
    console.log(number);
}