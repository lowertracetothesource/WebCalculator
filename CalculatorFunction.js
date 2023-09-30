function display(str0) {
    str = document.getElementById("text");
    str.value = str.value + str0;
}

function equals() {
    str = document.getElementById("text");
    let input = str.value;
    let result;

    if (input.includes('^')) {
        input = evaluateAndReplaceExponents(input);
    } 

    if (input.includes('sin') || input.includes('cos') || input.includes('tan')) {
        input = evaluateAndReplaceTrigFunctions(input);
    }

    try {
        result = eval(input);
        str.value = result;
    } catch (error) {
        str.value = "Error"; // Handle any evaluation errors
    }
}



function back() {
    str = document.getElementById("text");
    str.value = str.value.substring(0, str.value.length - 1);
}

function reset() {
    str = document.getElementById("text");
    str.value = "";
}




function evaluateAndReplaceExponents(inputString) {
    const regex = /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g;
  
    // 使用正则表达式查找所有匹配的幂运算部分
    const matches = inputString.match(regex);
  
    if (matches) {
      for (const match of matches) {
        // 提取底数和指数
        const [base, exponent] = match.split('^').map(item => parseFloat(item.trim()));
  
        // 计算幂运算的结果
        const result = Math.pow(base, exponent);
  
        // 用结果替换原始表达式中的幂运算部分
        inputString = inputString.replace(match, result);
      }
    }
  
    return inputString;
  }

  
  function evaluateAndReplaceTrigFunctions(inputString) {
    const trigFunctions = ['sin', 'cos', 'tan'];
    
    for (const functionName of trigFunctions) {
      const regex = new RegExp(`${functionName}\\(([^)]+)\\)`, 'g');
      
      // 使用正则表达式查找所有匹配的函数部分
      const matches = inputString.match(regex);
      
      if (matches) {
        for (const match of matches) {
          // 提取函数内部的表达式
          const expressionInsideFunc = match.match(/\(([^)]+)\)/)[1];
          
          // 计算函数的结果
          let result;
          if (functionName === 'sin') {
            result = Math.sin(eval(expressionInsideFunc));
          } else if (functionName === 'cos') {
            result = Math.cos(eval(expressionInsideFunc));
          } else if (functionName === 'tan') {
            result = Math.tan(eval(expressionInsideFunc));
          }
          
          // 用结果替换原始表达式中的函数部分
          inputString = inputString.replace(match, result);
        }
      }
    }
    
    return inputString;
  }