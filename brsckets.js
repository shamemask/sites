
function IsStringCorrectDictionary(str)
{
    var pairs = {
        '(': ")",
        '[': "]",
        '<': ">"
    };
    var open = [];
    for (let ch of str)
    
        // console.log(`Object.values(pairs).includes("${ch}") - `+(Object.values(pairs).includes(ch)))
        // console.log(`"${ch}" in pairs - `+(ch in pairs))
        // console.log(`pairs.hasOwnProperty("${ch}") - `+pairs.hasOwnProperty(ch))
        // console.log(`pairs["${ch}"] != undefined - `+(pairs[ch] != undefined));
        //console.log(open);
        if (pairs.hasOwnProperty(ch)) {open.push(ch)}
        else if (Object.values(pairs).includes(ch))
        {
            // console.log("open.length == 0 - "+open.length == 0);
            if (open.length == 0 || pairs[open.pop()] != ch) return + (false);
        }
    
    return  + (open.length == 0);
}

console.log(IsStringCorrectDictionary("---(++++)----"));
console.log(IsStringCorrectDictionary(""));
console.log(IsStringCorrectDictionary("before ( middle []) after"));
console.log(IsStringCorrectDictionary(")("));
console.log(IsStringCorrectDictionary("<( >)"));
console.log(IsStringCorrectDictionary("( [ <> () ] <> )"));
console.log(IsStringCorrectDictionary("  (   [)"));

// a = '5'
// b = '7'
// str = "dfd7s5asdsa5"
// console.log(Math.max(str.indexOf(a),str.indexOf(b)))