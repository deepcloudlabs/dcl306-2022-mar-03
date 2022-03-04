function getLotteryNumbers(max,size){
    let numbers = [];
    while(numbers.length < size){
        let number = Math.floor(Math.random() * max) + 1;
        if (numbers.includes(number)) continue;
        numbers.push(number);
    }
    numbers.sort((u,v)=>u-v);
    return numbers;
}

function asyncGetLotteryNumbers(max,size){
    return new Promise(
        (accept,reject)=>{
            let numbers = [];
            while(numbers.length < size){
                let number = Math.floor(Math.random() * max) + 1;
                if (numbers.includes(number)) continue;
                numbers.push(number);
            }
            numbers.sort((u,v)=>u-v);
            accept(numbers);
        }
    );
}

asyncGetLotteryNumbers(60,6)
                .then( numbers => console.log(numbers));

async function getNumbers(max,size){
    let numbers = [];
    while(numbers.length < size){
        let number = Math.floor(Math.random() * max) + 1;
        if (numbers.includes(number)) continue;
        numbers.push(number);
    }
    numbers.sort((u,v)=>u-v);
    return numbers;
}

getNumbers(60,6).then(console.log)

let lotteryNums = await getNumbers(60,6);
