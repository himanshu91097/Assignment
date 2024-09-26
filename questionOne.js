function addNumberSum(num, result) {
    const number = {};

    for (let i = 0; i < num.length; i++) {
        const arr = result - num[i]; 

        if (arr in number) {
            return [number[arr], i];
        }
        number[num[i]] = i;
    }
    return [];
}

const num = [2, 7, 11, 15];
const result = 9;
console.log(addNumberSum(num, result));