/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
	if (chunk == null) {
		chunk = '';
	}
	if (full == null) {
		full = '';
	}
	var fulls = full.toLowerCase();
	var chunks = chunk.toLowerCase();
	if (fulls.indexOf(chunks) > -1) {
		return true;
	}
	return false;
}

/**
 * Создает новый tr для таблицы со списком cookie
 *
 * @param name - имя cookie
 * @param value - значение cookie
 */

addButton.addEventListener('click', createCookieTr);
function createCookieTr(name, value) {
    name = addNameInput.value;
    value = addValueInput.value;
    var filter = filterNameInput.value;
    var cokasNames = document.querySelectorAll('.cookie_name');

    if (filter.length > 0) {
        if (isMatching(value, filter) == false) {
            for (var prop in cokasNames) {
                if (isMatching(cokasNames[prop].innerHTML, name) && !isMatching(cokasNames[prop].nextElementSibling.innerHTML, value)) {
                    var thisTr = cokasNames[prop].parentNode;

                    listTable.removeChild(thisTr);
                    cokasNames[prop].parentNode.style.backgroundColor = 'red';
                    document.cookie = name + '=' + value;
                    return;
                }
            }
        }
        if (isMatching(name, filter) || isMatching(value, filter)) {
            listTable.appendChild(createTr(name, value));
            document.cookie = name + '=' + value;
            return;
        } 
        if (!isMatching(name, filter)) {
            document.cookie = name + '=' + value;
            return;
        }
    }
    if (document.querySelectorAll('.cookie_name').length == 0) {
        listTable.appendChild(createTr(name, value));
        document.cookie = name + '=' + value;
        return;
    }
    if (document.querySelectorAll('.cookie_name').length > 0) {
        for (var key in document.querySelectorAll('.cookie_name')) {    
            if (document.querySelectorAll('.cookie_name')[key].innerHTML != name) {
                continue;
            } else if (document.querySelectorAll('.cookie_name')[key].innerHTML == name) {
                document.querySelectorAll('.cookie_name')[key].nextElementSibling.innerHTML = value;
                document.cookie = name + '=' + value;

                return;
            }
        }
    } 
    listTable.appendChild(createTr(name, value));
    document.cookie = name + '=' + value;
}


function createTr(name, value) {
    var Str = document.createElement('tr');

    var tdOne = document.createElement('td');
    tdOne.setAttribute('class', 'cookie_name');
    
    var tdTwo = document.createElement('td');
    tdTwo.setAttribute('class', 'cookie_value');

    var tdThree = document.createElement('td');
    tdThree.setAttribute('class', 'deleteCookies');
  
    tdOne.innerHTML = name;
    tdTwo.innerHTML = value;
 
    var button = document.createElement('button');

    button.innerHTML = 'удалить';
    button.classList.add('deleteCookies');
  
    tdThree.appendChild(button);
    Str.appendChild(tdOne);
    Str.appendChild(tdTwo);
    Str.appendChild(tdThree);

    return Str;
}

homeworkContainer.addEventListener('click', deleteTableRow);

function deleteTableRow(e) {
    if (e.target.classList.contains('deleteCookies')) {
        listTable.removeChild(e.target.parentNode.parentNode);
        var cookieNameToDelete = e.target.parentNode.parentNode.children[0].innerHTML;
        var cookieValueToDelete = e.target.parentNode.parentNode.children[1].innerHTML;
        document.cookie = cookieNameToDelete + '=' + cookieValueToDelete + ';expires=' + new Date(0);
    } 
}

filterNameInput.addEventListener('keyup', function() {
    makeTable();
});

function makeTable() {
    var x = document.cookie.split('=').join().split(';').join().split(',');
    var filterInputValue = filterNameInput.value;
    listTable.innerHTML = '';
    if (!filterInputValue) {
        for (var z = 0; z < x.length; ) {
            var p = z + 1;
            listTable.appendChild(createTr(x[z], x[p]));
            z = z + 2
        }
        return;
    }
    for (var i = 0; i < x.length; ) {
        var k = i + 1;
        if (isMatching(x[i], filterInputValue) || isMatching(x[k], filterInputValue) ) {
            listTable.appendChild(createTr(x[i], x[k]));
        }
        i = i + 2;
    }
}
makeTable();

addButton.addEventListener('click', () => {
});