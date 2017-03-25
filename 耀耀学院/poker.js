/**
 * 德克萨斯扑克 Texas Hold'em poker
 * 扑克规则： http://news.tongbu.com/44701.html
 * github: https://github.com/chenjsh36
 * 扑克数值和牌面对应： 方块的1-K对应0-12, 梅花1-K对应13-25, 红桃1-K对应26-38, 黑桃对应39-51
 * 数值到牌面的转换
 * 牌面到数值的转换
 * 洗牌
 */
window.THPoker = function() {
    this.flower = ['方角', '梅花', '红桃', '黑桃']; // 花色
    this.letter = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; // 牌面数字或字母
    this.split = '-'; // 牌面分隔符， 如 "梅花-2"
    /*
    * 1 同花大顺（Royal Flush）：最高为Ace（一点）的同花顺
    * 2 同花顺（Straight Flush）：同一花色，顺序的牌。
    * 3 四条（Four of a Kind，亦称“铁支”、“四张”或“炸弹”）：有四张同一点数的牌。
    * 4 满堂红（Fullhouse，亦称“俘虏”、“骷髅”、“夫佬”、“葫芦”）：三张同一点数的牌，加一对其他点数的牌。
    * 5 同花（Flush，简称“花”：五张同一花色的牌。
    * 6 顺子（Straight，亦称“蛇”）：五张顺连的牌。
    * 7 三条（Three of a kind，亦称“三张”）：有三张同一点数的牌。
    * 8 两对（Two Pairs）：两张相同点数的牌，加另外两张相同点数的牌。
    * 9 一对（One Pair）：两张相同点数的牌。
    * 10 高牌（high card）：不符合上面任何一种牌型的牌型，由单牌且不连续不同花的组成，以点数决定大小。
     */
    this.pokerTypes = {
        '同花大顺': {
            cname: '同花大顺',
            ename: 'Royal Flush',
            level: 1
        },
        '同花顺': {
            cname: '同花顺',
            ename: 'Straight Flush',
            level: 2
        },
        '四条': {
            cname: '四条',
            ename: 'Four of a Kind',
            level: 3
        },
        '满堂红': {
            cname: '满堂红',
            ename: 'Fullhouse',
            level: 4
        },
        '同花': {
            cname: '同花',
            ename: 'Flush',
            level: 5
        },
        '顺子': {
            cname: '顺子',
            ename: 'Straight',
            level: 6
        },
        '三条': {
            cname: '三条',
            ename: 'Three of a kind',
            level: 7
        },
        '两对': {
            cname: '两对',
            ename: 'Two Pairs',
            level: 8
        },
        '一对': {
            cname: '一对',
            ename: 'One Pair',
            level: 9
        },
        '高牌': {
            cname: '高牌',
            ename: 'High Card',
            level: 10
        }
    }
};

/**
 * 数值到牌面的转换
 * @param  {number} value 0到51的数值
 * @return {string}       牌面
 */
THPoker.prototype.toName = function(value) {
    var index = this._valueToIndex(value);
    if (value < 0 || value > 51) {
        console.error('toName(' + value + ') 牌面值错误!');
    }
    return '' + this.flower[index.flowerIndex] + this.split + this.letter[index.letterIndex];
}

/**
 * 牌面到数值的转换
 * @param  {string} name 牌面
 * @return {number}      牌面值 0-51的数值
 */
THPoker.prototype.toValue = function(name) {
    var index = this._nameToIndex(name);

    if (index.flowerIndex === -1 || index.letterIndex === -1) {
        console.error('toValue(' + name + ') 格式错误！')
    }
    return index.flowerIndex * 13 + index.letterIndex;
}

THPoker.prototype.indexToName = function(obj) {
    var flower = this.flower[obj.flowerIndex];
    var number = this.letter[obj.letterIndex];
    return flower + this.split + number;
}
/**
 * 牌面到index的转换
 * @param  {string} name 牌面
 * @return {number}      牌面值 0-51的数值
 */
THPoker.prototype._nameToIndex = function(name) {
    var arr = name.split(this.split);
    var flowerIndex = this.flower.indexOf(arr[0]);
    var letterIndex = this.letter.indexOf(arr[1]);
    return {
        flowerIndex: flowerIndex,
        letterIndex: letterIndex
    }
}

/**
 * 数值到index的转换
 * @param  {number} value 0到51的数值
 * @return {string}       牌面
 */
THPoker.prototype._valueToIndex = function(value) {
    var flowerIndex = Math.floor(value / 13);
    var letterIndex = value % 13;
    return {
        flowerIndex: flowerIndex,
        letterIndex: letterIndex
    }
}

THPoker.prototype._ListToIndexList = function(pokers) {
    var pokerIndexs = [];

    if (typeof pokers[0] === 'string') {
        pokers.forEach((poker) => {
            pokerIndexs.push(this._nameToIndex(poker));
        })
    } else {
        pokers.forEach((poker) => {
            pokerIndexs.push(this._valueToIndex(poker));
        })
    }
    return pokerIndexs;
}

/**
 * 根据7张牌返回牌型
 * 1 同花大顺（Royal Flush）：最高为Ace（一点）的同花顺
 * 2 同花顺（Straight Flush）：同一花色，顺序的牌。
 * 3 四条（Four of a Kind，亦称“铁支”、“四张”或“炸弹”）：有四张同一点数的牌。
 * 4 满堂红（Fullhouse，亦称“俘虏”、“骷髅”、“夫佬”、“葫芦”）：三张同一点数的牌，加一对其他点数的牌。
 * 5 同花（Flush，简称“花”：五张同一花色的牌。
 * 6 顺子（Straight，亦称“蛇”）：五张顺连的牌。
 * 7 三条（Three of a kind，亦称“三张”）：有三张同一点数的牌。
 * 8 两对（Two Pairs）：两张相同点数的牌，加另外两张相同点数的牌。
 * 9 一对（One Pair）：两张相同点数的牌。
 * 10 高牌（high card）：不符合上面任何一种牌型的牌型，由单牌且不连续不同花的组成，以点数决定大小。
 * @param  {Array} pokers 7张牌 ['梅花-A',]
 * @return {type}      牌型
 */
THPoker.prototype.getPokerType = function(pokers) {
    var pokerIndexs = this._ListToIndexList(pokers);
    var flowerCount = [[], [], [], []]; // 按花色分类
    var letterCount = [[], [], [], [], [], [], [], [], [], [], [], [], []]; // 按字母分类
    var match = {};

    pokerIndexs.forEach((item) => {
        flowerCount[item.flowerIndex].push(item);
        letterCount[item.letterIndex].push(item);
    });

    // 判断是否有同花
    match = this._checkFlush(flowerCount, letterCount);
    if (match.match) {
        // 判断是否为顺子
        match = this._checkStraightFlush(flowerCount, letterCount, match.matchPokers);
        if (match.match) {
            // 判断是否为同花大顺
            match = this._checkAceStraightFlush(flowerCount, letterCount, match.matchPokers);
            if (match.match) {
                return {
                    type: this.pokerTypes['同花大顺'],
                    matchPokers: match.matchPokers
                };
            }
            return {
                type: this.pokerTypes['同花顺'],
                matchPokers: match.matchPokers
            }
        }
        return {
            type: this.pokerTypes['同花'],
            matchPokers: match.matchPokers
        }
    }

    // 判断是否有顺子
    match = this._checkStraight(flowerCount, letterCount);
    if (match.match) {
        return {
            type: this.pokerTypes['顺子'],
            matchPokers: match.matchPokers
        }
    }

    // 判断是否有四条
    match = this._checkFourOfKind(flowerCount, letterCount);
    if (match.match) {
        return {
            type: this.pokerTypes['四条'],
            matchPokers: match.matchPokers
        }
    }

    // 判断是否有三条
    match = this._checkThreeOfKind(flowerCount, letterCount);
    if (match.match) {
        // 判断是否为葫芦
        match = this._checkFullHouse(flowerCount, letterCount, match.matchPokers);
        if (match.match) {
            return {
                type: this.pokerTypes['满堂红'],
                matchPokers: match.matchPokers
            }
        }
        return {
            type: this.pokerTypes['三条'],
            matchPokers: match.matchPokers
        }
    }

    // 判断是否有一对
    match = this._checkOnePair(flowerCount, letterCount);
    if (match.match) {
        // 判断是否有两对
        match = this._checkTwoPair(flowerCount, letterCount, match.matchPokers);
        if (match.match) {
            return {
                type: this.pokerTypes['两对'],
                matchPokers: match.matchPokers
            }
        }
        return {
            type: this.pokerTypes['一对'],
            matchPokers: match.matchPokers
        }
    }

    match = this._checkHighCard(flowerCount, letterCount, [], 5);
    return {
        type: this.pokerTypes['高牌'],
        matchPokers: match.matchPokers
    }
}

/**
 * 对牌组对象进行比较返回最大的牌型数组
 * @param  {Array} pokerTypes 牌型数组，通过 getPockerType 获得每一个牌型对象
 * @return {Array}            最大牌型数组
 */
THPoker.prototype.comparePokers = function(pokerTypes) {
    var highList = [];
    var level = Infinity;

    // 过滤出牌型最高的数组
    pokerTypes.forEach(function(item, index) {
        if (item.type.level < level) {
            level = item.type.level;
            highList = [item];
        } else if (item.type.level === level) {
            highList.push(item);
        }
    });

    // 等级最高的只有一个的情况
    if (highList.length === 1) {
        return {
            highList: highList,
        }
    }

    // 等级最高的有多个时
    return this._compareSamePType(highList, level);
}

// 同花监测，返回组合中最大的同花
THPoker.prototype._checkFlush = function(flowerCount, letterCount) {
    var ifFlush = false;
    var len = flowerCount.length - 1;
    var matchPokers = [];
    var matchAllPockers = [];
    var tmpPokers = [];

    for (; len >= 0; len--) {
        if (flowerCount[len].length >= 5) {
            ifFlush = true;
            // 对同种花色的牌进行排序，取最大的五张作为组合
            flowerCount[len].sort(function(a, b) {
                if (a.letterIndex === 0) return -1;
                if (b.letterIndex === 0) return 1;
                return a.letterIndex >= b.letterIndex ? -1 : 1;
            })
            matchPokers = flowerCount[len].slice(0, 5);
            matchAllPockers = flowerCount[len];
            break;
        }
    }
    return {
        match: ifFlush,
        matchPokers: matchPokers,
        matchAllPockers: matchAllPockers
    }
}

// 一对监测，返回组合中最大的一对
THPoker.prototype._checkOnePair = function(flowerCount, letterCount, initMatchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = initMatchPokers || [];
    var matchExactPokers = [];
    var matchOtherPokers = [];
    var pairIndex = []; // 匹配的对 对应的 Index
    
    for (; len >= 0; len--) {
        if (letterCount[len].length === 2) {
            pairIndex.push(len);
            break;
        }
    }

    // 最多有三对，根据从 A K Q 。。。 4 3 2 的顺序取最大的
    if (pairIndex.length >= 1) {
        match = true;
        if (pairIndex.indexOf(0) !== -1) { // 有A取A, A肯定在最后
            matchExactPokers = letterCount[pairIndex.length - 1];
        } else { // 无 A 取第一个
            matchExactPokers = letterCount[pairIndex[0]];
        }
        matchOtherPokers = (this._checkHighCard(flowerCount, letterCount, matchExactPokers, 3)).matchPokers;
        matchPokers = matchPokers.concat(matchOtherPokers); // 一对加上其三三张杂牌
    }

    return {
        match: match,
        matchPokers: matchPokers,
        matchExactPokers: matchExactPokers
    }
}

// 两对监测，返回组合中最大的两对
THPoker.prototype._checkTwoPair = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];
    var matchOtherPokers = [];
    var pairIndex = []; // 匹配的对 对应的 Index
    
    for (; len >= 0; len--) {
        if (letterCount[len].length === 2) {
            pairIndex.push(len);
            // break;
        }
    }

    // 最多有三对，取前两对
    if (pairIndex.length >= 2) {
        match = true;
        if (pairIndex.indexOf(0) !== -1) { // 有A取A, A肯定在最后
            matchPokers = letterCount[pairIndex.length - 1].concat(letterCount[pairIndex[0]]);
        } else { // 无 A 取前两对
            matchPokers = letterCount[pairIndex[0]].concat(letterCount[pairIndex[1]]);
        }
        matchOtherPokers = (this._checkHighCard(flowerCount, letterCount, matchPokers, 1)).matchPokers;
        matchPokers = matchPokers.concat(matchOtherPokers);
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

// 四条监测，返回组合中最大的四条
THPoker.prototype._checkFourOfKind = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var matchPokers = matchPokers || [];
    var matchOtherPokers = [];
    var len = letterCount.length - 1;

    for (; len >= 0; len--) {
        if (letterCount[len].length === 4) {
            match = true;
            matchPokers = letterCount[len];
            matchOtherPokers = this._checkHighCard(flowerCount, letterCount, matchPokers, 1);
            matchPokers = matchPokers.concat(matchOtherPokers.matchPokers);
            break;
        }
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

// 三条监测，返回组合中最大的三条
THPoker.prototype._checkThreeOfKind = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];
    var matchExactPokers = [];
    var matchOtherPokers = [];
    var pairIndex = []; // 匹配的对 对应的 Index
    
    for (; len >= 0; len--) {
        if (letterCount[len].length === 3) {
            pairIndex.push(len);
            break;
        }
    }

    // 最多有三对，根据从 A K Q 。。。 4 3 2 的顺序取最大的
    if (pairIndex >= 1) {
        match = true;
        if (pairIndex.indexOf(0) !== -1) { // 有A取A, A肯定在最后
            matchExactPokers = letterCount[pairIndex.length - 1];
        } else { // 无 A 取第一个
            matchExactPokers = letterCount[pairIndex[0]];
        }
        matchOtherPokers = (this._checkHighCard(flowerCount, letterCount, matchExactPokers, 2)).matchPokers;
        matchPokers = matchExactPokers.concat(matchOtherPokers);
    }
    return {
        match: match,
        matchPokers: matchPokers,
        matchExactPokers: matchExactPokers
    }
}

// 满堂红监测，返回组合中最大的满堂红
THPoker.prototype._checkFullHouse = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];

    var matchOnePair = this._checkOnePair(flowerCount, letterCount);
    var matchThreeOfKind = this._checkThreeOfKind(flowerCount, letterCount);

    if (matchOnePair.match && matchThreeOfKind.match) {
        match = true;
        matchPokers = matchThreeOfKind.matchExactPokers.concat(matchOnePair.matchExactPokers);
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

// 顺子检测， 返回所给的同花牌中最大的顺子
THPoker.prototype._checkStraight2 = function(initPockers) {
    var match = false;
    var matchPokers = initPockers;
    var i = 0;
    var len = matchPokers.length;
    var count = 0;
    var straightArr = [];
    var letterIndexMap = [[], [], [], [], [], [], [], [], [], [], [], [], [], []]; // 根据 letter index 进行填坑

    matchPokers.forEach(function(item) {
        letterIndexMap[item.letterIndex] = [item];
        if (item.letterIndex === 0) {
            letterIndexMap[13] = [item]; // 如果有A的话
        }
    })

    for (len = letterIndexMap.length; i < len; i++) {
        if (letterIndexMap[i].length > 0) {
            count++;
            straightArr.push(letterIndexMap[i][0]);
        } else {
            if (count < 5) {
                count = 0;
                straightArr = [];                
            }
            else { // 如果已经连续五张以上，那么没必要继续了，因为后面也无法在连成顺子了
                break;
            }
        }
    }
    if (count >= 5) {
        match = true;
        straightArr.reverse();
        matchPokers = straightArr.splice(0, 5);
    } else {
        straightArr = [];
    }

    return {
        match: match,
        matchPokers: matchPokers,
        matchAllPockers: straightArr
    }
}

// 顺子监测，返回组合中最大的顺子
THPoker.prototype._checkStraight = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var i = 0;
    var count = 0;
    var straightArr = [];
    var matchPokers = matchPokers || [];
    var ifABig = false; // A 代表最大还是最小

    for (; i <= len; i++) {
        if (letterCount[i].length > 0) {
            count++;
            straightArr.push(letterCount[i][0]); // 取该字母数组的第一张
        } else {
            count = 0;
            straightArr = [];
        }
    }

    if (count >= 4 && letterCount[0].length > 0 && letterCount[12].length > 0) {
        ifABig = true; // 此时 A 为最大
        count++;
        straightArr.push(letterCount[0][0]); // 取A字母数组的第一张
    }

    if (count >= 5) {
        match = true;
        straightArr.sort(function(a, b) {
            if (ifABig === false) {
                return a.letterIndex > b.letterIndex ? -1 : 1;
            }
            if (a.letterIndex === 0) return -1;
            if (b.letterIndex === 0) return 1;
            return a.letterIndex > b.letterIndex ? -1 : 1;
        })
        matchPokers = straightArr.slice(0, 5);
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

// 同花顺监测，返回组合中最大的同花顺
// THPoker.prototype._checkStraightFlush = function(flowerCount, letterCount, matchPokers) {
//     var match = false;
//     var matchPokers = matchPokers || [];
//     var matchFlush = this._checkFlush(flowerCount, letterCount);
//     var matchStraight = this._checkStraight(flowerCount, letterCount);
//     var matchFlower = '';

//     if (matchFlush.match && matchStraight.match) {
//         // 需要判断顺子的花色是否都是同花的花色!!!
//         match = true;
//         matchFlower = matchFlush.matchPokers[0].flowerIndex;
//         matchStraight.matchPokers.forEach((poker) => {
//             if (poker.flowerIndex !== matchFlower) {
//                 match = false;
//             }
//         })

//         if (match === true) {
//             matchPokers = [];
//             matchStraight.matchPokers.forEach((poker) => {
//                 matchPokers.push({
//                     flowerIndex: matchFlower,
//                     letterIndex: poker.letterIndex
//                 })
//             })            
//         }

//     }
//     return {
//         match: match,
//         matchPokers: matchPokers
//     }
// }

// 同花顺检测，返回组合中最大的同花顺
THPoker.prototype._checkStraightFlush = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var matchPokers = matchPokers || [];
    var matchFlush = this._checkFlush(flowerCount, letterCount);
    var matchAllPockers = [];
    var matchStraight = {};

    // 检测同花
    if (matchFlush.match) {
        // 取同花的所有牌，判断其中是否有顺子
        matchAllPockers = matchFlush.matchAllPockers;
        matchStraight = this._checkStraight2(matchAllPockers);
        if (matchStraight.match) {
            match = true;
            matchPokers = matchStraight.matchPokers
        }
    }

    return {
        match: match,
        // 返回最大的顺子
        matchPokers: matchPokers 
    }
}



// 同花大顺监测，返回组合中最大的同花大顺
THPoker.prototype._checkAceStraightFlush = function(flowerCount, letterCount, initPockers) {
    var match = false;
    var matchPokers = initPockers || [];

    var matchStraightFlush = this._checkStraightFlush(flowerCount, letterCount);
    var matchStraightFlushPockers = [];

    var matchHasAce = {};
    var matchHasKing = {};

    if (matchStraightFlush.match) {
        // 是否同时有King 和 Ace
        matchStraightFlushPockers = matchStraightFlush.matchPokers
        matchHasAce = this._checkHasLetterIndex(matchStraightFlushPockers, 0);
        matchHasKing = this._checkHasLetterIndex(matchStraightFlushPockers, 12);
        if (matchHasAce.match && matchHasKing.match) {
            match = true;
            matchPokers = matchStraightFlushPockers;
        }
    }

    // var tmpPokers = [];
    // var matchFlush = this._checkFlush(flowerCount, letterCount);
    // var matchStraight = this._checkStraight(flowerCount, letterCount);
    // var matchHasAce = {};
    // var matchFlower = '';

    // // 是否为同花顺
    // if (matchFlush.match && matchStraight.match) {
    //     matchFlower = matchFlush.matchPokers[0].flowerIndex;
    //     tmpPokers = [];
    //     matchStraight.matchPokers.forEach((poker) => {
    //         tmpPokers.push({
    //             flowerIndex: matchFlower,
    //             letterIndex: poker.letterIndex
    //         })
    //     });
    //     // 是否为皇家同花顺
    //     matchHasAce = this._checkHasAce(tmpPokers);
    //     if (matchHasAce.match) {
    //         match = true;
    //         matchPokers = tmpPokers;
    //     }
    // }

    return {
        match: match,
        matchPokers: matchPokers
    }
}

// 监测是否有 某个字母
THPoker.prototype._checkHasLetterIndex = function(letterCount, letterIndex) {
    var match = false;
    var len = letterCount.length;
    var i = 0;
    for (; i < len; i++) {
        if (letterCount[i].letterIndex === letterIndex) {
            match = true;
            break;
        }
    }
    return {
        match: match,
        matchPokers: letterCount
    }
}

/**
 * 返回除了 initPockers 外的 initNum 张最高牌
 * @param  {Array} flowerCount 花色分类的牌
 * @param  {Array} letterCount 字母分类的牌
 * @param  {Array} initPockers 排除掉的牌
 * @param  {Number} num 返回多少张
 * @return {Obj}             最高牌
 */
THPoker.prototype._checkHighCard = function(flowerCount, letterCount, initPockers, initNum) {
    var match = true;
    var matchPokers = initPockers || [];
    var num = initNum || 1;
    var len = 0;
    var matchIndex = -1;
    
    var oldPokers = flowerCount[0].concat(flowerCount[1], flowerCount[2], flowerCount[3]); // 一维扑克数组
    var filterPokers = [];
    var i = 0;
    var ilen = oldPokers.length;
    var j = 0;
    var jlen = matchPokers.length;
    var tmpPocker = {};
    for (; i < ilen; i++) {
        tmpPocker = oldPokers[i];
        filterPokers.push(tmpPocker);
        j = 0;
        for (; j < jlen; j++) {
            if (tmpPocker.flowerIndex === matchPokers[j].flowerIndex && tmpPocker.letterIndex === matchPokers[j].letterIndex) {
                filterPokers.pop();
                break;
            }
        }
    }
    filterPokers.sort(function(a, b) {
        if (a.letterIndex === b.letterIndex) {
            return a.flowerIndex > b.flowerIndex ? -1 : 1;
        }
        if (a.letterIndex === 0) return -1;
        if (b.letterIndex === 0) return 1;
        return a.letterIndex > b.letterIndex ? -1 : 1;
    })
    return {
        match: match,
        matchPokers: filterPokers.slice(0, num)
    }
}

// THPoker.prototype._getNOfHighCard = function(flowerCount, letterCount, matchPokers, initNum) {
//     var num = initNum || (5 - matchPokers.length);
//     return matchPokers.concat((this._checkHighCard(flowerCount, letterCount, matchPokers, num)).matchPokers);
// }

/**
 * 比较同一类型的牌大小
 * @param  {Array} pokerTypes 牌型
 * @param  {Number} level      牌型等级
 * @return {Array}            牌型最大，可能有平手的情况
 */
THPoker.prototype._compareSamePType = function(pokerTypes, level) {
    if (level === 1) return pokerTypes;
    if (level === 2) return this._compareStraightFlush(pokerTypes);
    if (level === 3) return this._compareFourOfKind(pokerTypes);
    if (level === 4) return this._compareFullhouse(pokerTypes);
    if (level === 5) return this._compareFlush(pokerTypes);
    if (level === 6) return this._compareStraight(pokerTypes);
    if (level === 7) return this._compareThreeOfKind(pokerTypes);
    if (level === 8) return this._compareTwoPairs(pokerTypes);
    if (level === 9) return this._compareOnePair(pokerTypes);
    if (level === 10) return this._compareHighCard(pokerTypes);
}

/**
 * 根据牌组数组里第 index 张的大小进行排序
 * @param  {Array} pokerTypes 牌组数组
 * @param  {Number} index      第n张牌
 * @return {Array}            最大的牌组数组
 */
THPoker.prototype._compareIndexPock = function(pokerTypes, index) {
    var indexValue = []; 
    var max = -Infinity;
    var tmp = 0;
    var retPokers = []; // 比较后的牌组

    // 标记每组牌最大的值
    pokerTypes.forEach(function(item) {
        tmp = item.matchPokers[index].letterIndex === 0 ? 14 : item.matchPokers[index].letterIndex;
        max = max < tmp ? tmp : max;
        indexValue.push(tmp);
    });

    pokerTypes.forEach(function(item, i) {
        if (indexValue[i] >= max) {
            retPokers.push(item);
        }
    })

    return retPokers;
}

// 比较同花顺: 两个同花顺相比，排位较高的同花顺胜利, 所以对于从大到小拍好的牌组，比较第一张就可以了
THPoker.prototype._compareStraightFlush = function(pokerTypes) {
    return this._compareIndexPock(pokerTypes, 0);
}

// 比较四条：?如果两副牌型都为四条，四张点数相同的牌的点数较高的为大，如果两个或两个以上玩家拥有相同的四条，由单独的那一张牌来决定大小， 所以对于排好序的牌组，比较第一张和最后一张就可以了
THPoker.prototype._compareFourOfKind = function(pokerTypes) {
    var firstCp = this._compareIndexPock(pokerTypes, 0);
    if (firstCp.length === 1) {
        return firstCp;
    }
    return this._compareIndexPock(firstCp, 4);
}

// 比较葫芦 先比较三张牌 在比较两张牌
THPoker.prototype._compareFullhouse = function(pokerTypes) {
    var firstCp = this._compareIndexPock(pokerTypes, 0);
    if (firstCp.length === 1) {
        return firstCp;
    }
    return this._compareIndexPock(firstCp, 4);
}

// 比较同花 两组同花相比时，由最大的牌点来决定胜负；如果最大的牌是相同的，就取决于第二大的牌点；如果相同，就比较第三位的；以此类推。
THPoker.prototype._compareFlush = function(pokerTypes) {
    var retCp = pokerTypes;
    var index = 0;

    // 循环比较第一到第五张，直到结果剩下一组或者循环完毕
    do {
        retCp = this._compareIndexPock(retCp, index);
        index++;
    } while (index <= 4 && retCp.length >= 1)

    return retCp;
}

// 比较顺子 和同花顺一样
THPoker.prototype._compareStraight = function(pokerTypes) {
    return this._compareIndexPock(pokerTypes, 0);
}

// 比较三条 两幅三条相比，将取决于排位较高的那副 比较第 1 、4、5张
THPoker.prototype._compareThreeOfKind = function(pokerTypes) {
    var cpIndexs = [0, 3, 4];
    var retCp = pokerTypes;
    var len = cpIndexs.length;
    var i = 0;
    for (; i < len; i++) {
        retCp = this._compareIndexPock(retCp, cpIndexs[i]);
        if (retCp.length === 1) {
            break;
        }
    }
    return retCp;
}

// 比较两对 两副两队的牌型相比，将取决于较高的对子，将不考虑较低的对子。如果较高的对子相同的话，将胜负将取决于较低的对子。最后，如果两对都相同的话，将比较最后一张单牌。比较第1 第3 第5 张
THPoker.prototype._compareTwoPairs = function(pokerTypes) {
    var cpIndexs = [0, 2, 4];
    var retCp = pokerTypes;
    var len = cpIndexs.length;
    var i = 0;
    for (; i < len; i++) {
        retCp = this._compareIndexPock(retCp, cpIndexs[i]);
        if (retCp.length === 1) {
            break;
        }
    }
    return retCp;
}

// 比较一对 对子相比的话，对子排列较高的获胜。如果对子相同的话，较比较单牌的大小。比较第1 第3 第4 第5 张
THPoker.prototype._compareOnePairs = function(pokerTypes) {
    var cpIndexs = [0, 2, 3, 4];
    var retCp = pokerTypes;
    var len = cpIndexs.length;
    var i = 0;
    for (; i < len; i++) {
        retCp = this._compareIndexPock(retCp, cpIndexs[i]);
        if (retCp.length === 1) {
            break;
        }
    }
    return retCp;
}

// 比较高牌 五张牌没有任何排列，两幅杂牌相比的话，将从最大的点数开始，以此类推。
THPoker.prototype._compareHighCard = function(pokerTypes) {
    // 和同花比较一样
    return this._compareFlush(pokerTypes);
}