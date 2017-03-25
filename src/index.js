/* ДЗ 3 - объекты и массивы */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {   
    if (!Array.isArray(array) || array.length == 0) {
        throw new Error('array error')
    }
    if (typeof fn != 'function') {
        throw new Error('fn is not a function')
    }
    for (var i = 0; i < array.length; i++) {
        fn (array[i], i, array);}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    if (!Array.isArray(array) || array.length == 0) {
        throw new Error('array error')
    }
    if (typeof fn != 'function') {
        throw new Error('fn is not a function')
    }
    var elArr;
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        elArr = fn(array[i], i, array);
        newArray.push(elArr);
    }
    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var result = initial;
    var counter = 0;
    if (arguments.length < 3) {
        result = array[0];
        counter++;
    }
    for (var i = counter; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }
    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] == prop) {
            delete obj[prop];
        }
    }
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] == prop) {
            return true;
         }
         else {return false};
    }
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var newArray = [];
    for (var prop in obj) {
        newArray.push(prop);
    }
    return newArray;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var prop = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < prop.length; i++) {
        prop[i] = prop[i].toUpperCase();
    }
    return prop;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    obj = {};
    var validator = {
        set: function(obj, prop, value) {
            obj[prop] = value * value;
            return true;
        }
    }
    return new Proxy(obj, validator);
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
