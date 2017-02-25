<<<<<<< HEAD
/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
	var c = true;
    for (var i = 0; i < array.length; i++) {
    if (!fn(array[i])) {
    c = false;}
    }
    if (typeof array !== 'object' || array.length == 0) {
   throw new Error("empty array");}
    else if (typeof fn !== 'function') {
    throw new Error("fn is not a function");}
    return c;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
		var a = false;
		for (var i = 0; i < array.length; i++) {
		if (!fn(array[i])) {
		a = true;}
		}
		if (typeof array !== 'object' || array.length == 0) {
	    throw new Error("empty array");}
		else if (typeof fn !== 'function') {
		throw new Error("fn is not a function");}
		return a;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
        
function returnBadArguments(fn) {
   var array = [];
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    for (var i = 1; i < arguments.length; i++) {
        try {
            fn(arguments[i]);
        } catch (e) {
            array.push(arguments[i]);
        }
    }
    return array;
}

/*
 Задача 4:
 Используя отладчик и точки остановки, определите в каких случаях if дает true
 Исправьте условие внутри if таким образом, чтобы функция возвращала true
 */
function findError(data1, data2) {
    return (function() {
        for (var i = 0; i < data1.length; i++) {
            if (data1.length[i] !== data2.length[i]) {
                return false;
            }
        }
        return true;
    })();
}

/*
 Задача 5:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданным аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
        var obj = {
        sum: function() {
        var result;
        for (var i = 0; i < arguments.length; i++) {
        result = number + arguments[i]; }
        return(result); },
        dif: function() {
        var result1;
        for (var i = 0; i < arguments.length; i++) {
        result1 = number - arguments[i]; }
        return(result1); },
        div: function() {
        var result2;
        for (var i = 1; i < arguments.length; i++) {
        result2 = number / arguments[i];
        if (arguments[i] === 0) {
            throw new Error ("division by 0");}
        }
        return(result2); 
        },
        mul: function() {
        var result3;
        for (var i = 1; i < arguments.length; i++) {
        result3 = number * arguments[i]; }
        return(result3); }
        }
        return obj; 
        if (typeof(number) !== number) {
               throw new Error ("number is not a number");}
}


export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    findError,
    calculator
};
=======
/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
		return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b = 100) {
		return a + b;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
	  var args = [];
	  for (var i = 0; i < arguments.length; i++) {
	  	args.push(arguments[i]);
      }
 	return args;
 }

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
	return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number = 0) {
	    return function() {
        return ++number;
    }
}
var x = returnCounter();
x();
x();

	
/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
	  	
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
>>>>>>> e400cd337312e56f855acab0781f9cf5cc170a6f
