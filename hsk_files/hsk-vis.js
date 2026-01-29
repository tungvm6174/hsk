$(document).ready(function () {
    function drawGrid() {
        var $table = $('<table class="vis-table"></table>');
        for (var i = 1; i <= 50; i++) {
            var $tr = $('<tr class="vis-table-row"></tr>');
            for (var j = 1; j <= 100; j++) {
                var $td = $('<td class="vis-table-cell"></td>');
                $tr.append($td);
            }
            $table.append($tr);
        }
        $('.vis').append($table);
    }

    var uniqueCharacters = [];

    function checkUnique(word) {
        var characters = word.split("");
        var returnHtml = "";
        for (var i = 0; i < characters.length; i++) {
            var character = characters[i];
            if (uniqueCharacters.includes(character)) {
                returnHtml = returnHtml + character;
            } else {
                uniqueCharacters.push(character);
                returnHtml = returnHtml + '<span class="unique">' + character + '</span>';
            }
        }
        return returnHtml;
    }

    function addWordsToRegion(from, to, words, cls) {
        var k = 0;
        words = words.sort(function (a, b) {
            return a.length - b.length;
        })
        for (var i = from.y; i <= to.y; i++) {
            var $tr = $('.vis-table-row:nth-child(' + i + ')');
            for (var j = from.x; j <= to.x; j++) {
                var $td = $tr.find('.vis-table-cell:nth-child(' + j + ')');
                var wordHtml = checkUnique(words[k]);
                var $word = $('<span class="word">' + wordHtml + '</span>');
                $td.addClass(cls);
                $td.html('');
                $td.append($word);
                k++;
            }
        }
    }

    function populateHSK(type) {
        var data = HSK_DATA_SIMPLIFIED;
        if (type == 'traditional') {
            data = HSK_DATA_TRADITIONAL;
        }

        addWordsToRegion({ x: 1, y: 1 }, { x: 25, y: 6 }, data.hsk1, 'hsk1');
        addWordsToRegion({ x: 1, y: 7 }, { x: 25, y: 12 }, data.hsk2, 'hsk2');
        addWordsToRegion({ x: 1, y: 13 }, { x: 25, y: 24 }, data.hsk3, 'hsk3');
        addWordsToRegion({ x: 26, y: 1 }, { x: 50, y: 24 }, data.hsk4, 'hsk4');
        addWordsToRegion({ x: 1, y: 25 }, { x: 50, y: 50 }, data.hsk5, 'hsk5');
        addWordsToRegion({ x: 51, y: 1 }, { x: 100, y: 50 }, data.hsk6, 'hsk6');
    }

    function addClassToCell(x, y, cls) {
        var $cell = $('.vis-table-row:nth-child(' + y + ') .vis-table-cell:nth-child(' + x + ')');
        $cell.addClass(cls);
    }

    function addClassToCells(cells, cls) {
        for (var i = 0; i < cells.length; i++) {
            addClassToCell(cells[i].x, cells[i].y, cls)
        }
    }

    function applyInverted() {
        if (!localStorage.getItem('hsk-vis-inverted')) {
            var labelHSK123 = [{ x: 13, y: 1 }, { x: 13, y: 2 }, { x: 13, y: 3 }, { x: 13, y: 4 }, { x: 13, y: 5 }, { x: 13, y: 6 }, { x: 12, y: 7 }, { x: 13, y: 7 }, { x: 14, y: 7 }, { x: 11, y: 8 }, { x: 15, y: 8 }, { x: 15, y: 9 }, { x: 13, y: 10 }, { x: 14, y: 10 }, { x: 12, y: 11 }, { x: 11, y: 12 }, { x: 12, y: 12 }, { x: 13, y: 12 }, { x: 14, y: 12 }, { x: 15, y: 12 }, { x: 12, y: 16 }, { x: 13, y: 16 }, { x: 14, y: 16 }, { x: 11, y: 17 }, { x: 15, y: 17 }, { x: 15, y: 18 }, { x: 12, y: 19 }, { x: 13, y: 19 }, { x: 14, y: 19 }, { x: 15, y: 20 }, { x: 11, y: 21 }, { x: 15, y: 21 }, { x: 12, y: 22 }, { x: 13, y: 22 }, { x: 14, y: 22 }];
            var labelHSK4 = [{ x: 39, y: 9 }, { x: 38, y: 10 }, { x: 39, y: 10 }, { x: 37, y: 11 }, { x: 39, y: 11 }, { x: 36, y: 12 }, { x: 39, y: 12 }, { x: 35, y: 13 }, { x: 39, y: 13 }, { x: 35, y: 14 }, { x: 36, y: 14 }, { x: 37, y: 14 }, { x: 38, y: 14 }, { x: 39, y: 14 }, { x: 40, y: 14 }, { x: 39, y: 15 }];
            var labelHSK5 = [{ x: 13, y: 35 }, { x: 18, y: 35 }, { x: 21, y: 35 }, { x: 22, y: 35 }, { x: 23, y: 35 }, { x: 24, y: 35 }, { x: 27, y: 35 }, { x: 32, y: 35 }, { x: 34, y: 35 }, { x: 35, y: 35 }, { x: 36, y: 35 }, { x: 37, y: 35 }, { x: 38, y: 35 }, { x: 39, y: 35 }, { x: 13, y: 36 }, { x: 18, y: 36 }, { x: 20, y: 36 }, { x: 25, y: 36 }, { x: 27, y: 36 }, { x: 31, y: 36 }, { x: 34, y: 36 }, { x: 13, y: 37 }, { x: 18, y: 37 }, { x: 20, y: 37 }, { x: 27, y: 37 }, { x: 30, y: 37 }, { x: 34, y: 37 }, { x: 13, y: 38 }, { x: 14, y: 38 }, { x: 15, y: 38 }, { x: 16, y: 38 }, { x: 17, y: 38 }, { x: 18, y: 38 }, { x: 21, y: 38 }, { x: 22, y: 38 }, { x: 23, y: 38 }, { x: 24, y: 38 }, { x: 27, y: 38 }, { x: 28, y: 38 }, { x: 29, y: 38 }, { x: 35, y: 38 }, { x: 36, y: 38 }, { x: 37, y: 38 }, { x: 38, y: 38 }, { x: 13, y: 39 }, { x: 18, y: 39 }, { x: 25, y: 39 }, { x: 27, y: 39 }, { x: 30, y: 39 }, { x: 39, y: 39 }, { x: 13, y: 40 }, { x: 18, y: 40 }, { x: 20, y: 40 }, { x: 25, y: 40 }, { x: 27, y: 40 }, { x: 31, y: 40 }, { x: 34, y: 40 }, { x: 39, y: 40 }, { x: 13, y: 41 }, { x: 18, y: 41 }, { x: 21, y: 41 }, { x: 22, y: 41 }, { x: 23, y: 41 }, { x: 24, y: 41 }, { x: 27, y: 41 }, { x: 32, y: 41 }, { x: 35, y: 41 }, { x: 36, y: 41 }, { x: 37, y: 41 }, { x: 38, y: 41 }];
            var labelHSK6 = [{ x: 63, y: 21 }, { x: 68, y: 21 }, { x: 71, y: 21 }, { x: 72, y: 21 }, { x: 73, y: 21 }, { x: 74, y: 21 }, { x: 77, y: 21 }, { x: 82, y: 21 }, { x: 85, y: 21 }, { x: 86, y: 21 }, { x: 87, y: 21 }, { x: 88, y: 21 }, { x: 63, y: 22 }, { x: 68, y: 22 }, { x: 70, y: 22 }, { x: 75, y: 22 }, { x: 77, y: 22 }, { x: 81, y: 22 }, { x: 84, y: 22 }, { x: 89, y: 22 }, { x: 63, y: 23 }, { x: 68, y: 23 }, { x: 70, y: 23 }, { x: 77, y: 23 }, { x: 80, y: 23 }, { x: 84, y: 23 }, { x: 63, y: 24 }, { x: 64, y: 24 }, { x: 65, y: 24 }, { x: 66, y: 24 }, { x: 67, y: 24 }, { x: 68, y: 24 }, { x: 71, y: 24 }, { x: 72, y: 24 }, { x: 73, y: 24 }, { x: 74, y: 24 }, { x: 77, y: 24 }, { x: 78, y: 24 }, { x: 79, y: 24 }, { x: 84, y: 24 }, { x: 85, y: 24 }, { x: 86, y: 24 }, { x: 87, y: 24 }, { x: 88, y: 24 }, { x: 63, y: 25 }, { x: 68, y: 25 }, { x: 75, y: 25 }, { x: 77, y: 25 }, { x: 80, y: 25 }, { x: 84, y: 25 }, { x: 89, y: 25 }, { x: 63, y: 26 }, { x: 68, y: 26 }, { x: 70, y: 26 }, { x: 75, y: 26 }, { x: 77, y: 26 }, { x: 81, y: 26 }, { x: 84, y: 26 }, { x: 89, y: 26 }, { x: 63, y: 27 }, { x: 68, y: 27 }, { x: 71, y: 27 }, { x: 72, y: 27 }, { x: 73, y: 27 }, { x: 74, y: 27 }, { x: 77, y: 27 }, { x: 82, y: 27 }, { x: 85, y: 27 }, { x: 86, y: 27 }, { x: 87, y: 27 }, { x: 88, y: 27 }];
            var allLabels = labelHSK123.concat(labelHSK4).concat(labelHSK5).concat(labelHSK6);
            localStorage.setItem('hsk-vis-inverted', JSON.stringify(allLabels));
        }
        var inverted = JSON.parse(localStorage.getItem('hsk-vis-inverted'));
        addClassToCells(inverted, 'invert');
    }

    function saveInverted() {
        var inverted = [];
        $('.invert').each(function () {
            var y = $(this).parent().index() + 1;
            var x = $(this).index() + 1;
            inverted.push({ x: x, y: y });
        })
        localStorage.setItem('hsk-vis-inverted', JSON.stringify(inverted));
    }

    drawGrid();

    populateHSK();

    applyInverted();

    $('.vis-table-cell').click(function () {
        $(this).toggleClass('invert');
        saveInverted();
    })

    $('.simp-trad-toggle').click(function () {
        if ($(this).attr('data-current-type') == 'simplified') {
            $(this).attr('data-current-type', 'traditional');
            populateHSK('traditional');
        } else {
            $(this).attr('data-current-type', 'simplified');
            populateHSK('simplified');
        }
    })

    $('.unique-toggle').click(function () {
        $('.vis').toggleClass('highlight-unique');
    })

    $('.font-toggle').click(function () {
        var currentFont = $(this).attr('data-current-font');

        // Remove all font classes
        $('.vis').removeClass('kaiti-font ozcaramel-font lingwai-font pinyin-font');

        // Cycle through fonts: sans-serif -> kaiti -> ozcaramel -> lingwai -> pinyin -> sans-serif
        if (currentFont == 'sans-serif') {
            $(this).attr('data-current-font', 'kaiti');
            $(this).text('Toggle Font: Kaiti');
            $('.vis').addClass('kaiti-font');
        } else if (currentFont == 'kaiti') {
            $(this).attr('data-current-font', 'ozcaramel');
            $(this).text('Toggle Font: OzCaramel');
            $('.vis').addClass('ozcaramel-font');
        } else if (currentFont == 'ozcaramel') {
            $(this).attr('data-current-font', 'lingwai');
            $(this).text('Toggle Font: LingWai');
            $('.vis').addClass('lingwai-font');
        } else if (currentFont == 'lingwai') {
            $(this).attr('data-current-font', 'pinyin');
            $(this).text('Toggle Font: Pinyin (FangZheng)');
            $('.vis').addClass('pinyin-font');
        } else {
            $(this).attr('data-current-font', 'sans-serif');
            $(this).text('Toggle Font: Sans-serif');
        }
    })
});