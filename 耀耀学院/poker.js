/**
 * 德克萨斯扑克 Texas Hold'em poker
 * 扑克数值和牌面对应： 方块的1-K对应0-12, 梅花1-K对应13-25, 红桃1-K对应26-38, 黑桃对应39-51
 * 数值到牌面的转换
 * 牌面到数值的转换
 * 洗牌
 */
window.THPoker = function() {
    this.flower = ['方角', '梅花', '红桃', '黑桃']; // 花色
    this.letter = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; // 牌面数字或字母
    this.split = '-'; // 牌面分隔符， 如 "梅花-2"
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

THPoker.prototype._nameToIndex = function(name) {
    var arr = name.split(this.split);
    var flowerIndex = this.flower.indexOf(arr[0]);
    var letterIndex = this.letter.indexOf(arr[1]);
    return {
        flowerIndex: flowerIndex,
        letterIndex: letterIndex
    }
}

THPoker.prototype._valueToIndex = function(value) {
    var flowerIndex = Math.floor(value / 13);
    var letterIndex = value % 13;
    return {
        flowerIndex: flowerIndex,
        letterIndex: letterIndex
    }
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
THPoker.prototype.getType = function(pokers) {
    var pokerIndexs = [];
    var flowerCount = [[], [], [], []]; // 按花色分类
    var letterCount = [[], [], [], [], [], [], [], [], [], [], [], [], []]; // 按字母分类
    var match = {};
    if (typeof pokers[0] === 'string') {
        pokers.forEach((poker) => {
            pokerIndexs.push(this._nameToIndex(poker));
        })
    } else {
        pokers.forEach((poker) => {
            pokerIndexs.push(this._valueToIndex(poker));
        })
    }

    pokerIndexs.forEach((item) => {
        flowerCount[item.flowerIndex].push(item);
        letterCount[item.letterIndex].push(item);
    });

    // 判断是否有同花
    match = this._checkFlush(flowerCount, letterCount);
    if (match.match) {
        // 判断是否为顺子
        match = this._checkStraight(flowerCount, letterCount, match.matchPokers);
        if (match.match) {
            // 判断是否为同花大顺
            match = this._checkHasAce(flowerCount, letterCount, match.matchPokers);
            if (match.match) {
                return {
                    type: this.types['同花大顺'],
                    matchPokers: match.matchPokers
                };
            }
            return {
                type: this.types['同花顺'],
                matchPokers: match.matchPokers
            }
        }
        return {
            type: this.types['同花'],
            matchPokers: match.matchPokers
        }
    }

    // 判断是否有顺子
    match = this._checkStraight(flowerCount, letterCount);
    if (match.match) {
        return {
            type: this.types['顺子'],
            matchPokers: match.matchPokers
        }
    }

    // 判断是否有四条
    match = this._checkFourOfKind(flowerCount, letterCount);
    if (match.match) {
        return {
            type: this.types['四条'],
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
                type: this.types['葫芦'],
                matchPokers: match.matchPokers
            }
        }
        return {
            type: this.types['三条'],
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
                type: this.types['两对'],
                matchPokers: match.matchPokers
            }
        }
        return {
            type: this.types['一对'],
            matchPokers: match.matchPokers
        }
    }

    match = this._checkHighCard(flowerCount, letterCount);
    return {
        type: this.types['高牌'],
        matchPokers: match.matchPokers
    }
}

/**
 * 监测是否有同花
 * @param  {Array} flowerCount 按花色分类
 * @param  {Array} letterCount 按字母分类
 * @return {Obj}             是否是且
 */
THPoker.prototype._checkFlush = function(flowerCount, letterCount) {
    var ifFlush = false;
    var len = flowerCount.length - 1;
    var matchPokers = [];
    for (; len >= 0; len--) {
        if (flowerCount[len].length === 5) {
            ifFlush = true;
            matchPokers = flowerCount[len];
            break;
        }
    }
    return {
        match: ifFlush,
        matchPokers: matchPokers
    }
}

THPoker.prototype._checkOnePair = function(flowerCount, letterCount) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];
    var pairIndex = []; // 匹配的对 对应的 Index
    
    for (; len >= 0; len--) {
        if (letterCount[len].length === 2) {
            pairIndex.push(len);
            break;
        }
    }

    // 最多有三对，根据从 A K Q 。。。 4 3 2 的顺序取最大的
    if (pairIndex >= 1) {
        match = true;
        if (pairIndex.indexOf(0) !== -1) { // 有A取A, A肯定在最后
            matchPokers = letterCount[pairIndex.length - 1];
        } else { // 无 A 取第一个
            matchPokers = letterCount[pairIndex[0]];
        }
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

THPoker.prototype._checkTwoPair = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];
    var pairIndex = []; // 匹配的对 对应的 Index
    
    for (; len >= 0; len--) {
        if (letterCount[len].length === 2) {
            pairIndex.push(len);
            break;
        }
    }

    // 最多有三对，取前两对
    if (pairIndex >= 2) {
        match = true;
        if (pairIndex.indexOf(0) !== -1) { // 有A取A, A肯定在最后
            matchPokers = letterCount[pairIndex.length - 1].concat(letterCount[pairIndex[0]]);
        } else { // 无 A 取前两对
            matchPokers = letterCount[pairIndex[0]].concat(letterCount[pairIndex[1]]);
        }
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

THPoker.prototype._checkFourOfKind = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var matchPokers = matchPokers || [];
    var len = letterCount.length - 1;

    for (; len >= 0; len--) {
        if (letterCount[len].length === 4) {
            match = true;
            matchPokers = letterCount[len];
            break;
        }
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

THPoker.prototype._checkThreeOfKind = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];
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
            matchPokers = letterCount[pairIndex.length - 1];
        } else { // 无 A 取第一个
            matchPokers = letterCount[pairIndex[0]];
        }
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}

THPoker.prototype._checkFullHouse = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var matchPokers = matchPokers || [];

    var matchOnePair = this._checkOnePair(flowerCount, letterCount);
    var matchThreeOfKind = this._checkThreeOfKind(flowerCount, letterCount);

    if (matchOnePair.match && matchThreeOfKind.match) {
        matchPokers = matchOnePair.matchPokers.concat[matchThreeOfKind.matchPokers];
    }

    return {
        match: match,
        matchPokers: matchPokers
    }
}

THPoker.prototype._checkStraight = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var len = letterCount.length - 1;
    var i = 0;
    var count = 0;
    var straightArr = [];
    var matchPokers = matchPokers || [];

    for (; i <= len; i++) {
        if (letterCount[i].length > 0) {
            count++;
            straightArr.push(letterCount[i][0]); // 取该字母数组的第一张
        } else {
            count = 0;
            straightArr = [];
        }
    }

    if (count === 4 && letterCount[0].length > 0) {
        count++;
        straightArr.push(letterCount[0][0]); // 取A字母数组的第一张
    }

    if (count === 5) {
        match = true;
        matchPokers = straightArr;
    }

    return {
        match: match,
        matchPokers: matchPokers
    }
}


THPoker.prototype._checkStraightFlush = function(flowerCount, letterCount, matchPokers) {
    var match = false;
    var matchPokers = matchPokers || [];
    var matchFlush = this._checkFlush(flowerCount, letterCount);
    var matchStaight = this._checkStraight(flowerCount, letterCount);
    var matchFlower = '';

    if (matchFlush.match && matchStaight.match) {
        matchFlower = matchFlush.matchPokers[0].flowerIndex;
        matchPokers = [];
        matchStaight.forEach((poker) => {
            matchPokers.push({
                flowerIndex: matchFlower,
                letterIndex: poker.letterIndex
            })
        })
    }
    return {
        match: match,
        matchPokers: matchPokers
    }
}


THPoker.prototype._checkAceStraightFlush = function(flowerCount, letterCount, matchPokers) {
    // Todo 。。。
}