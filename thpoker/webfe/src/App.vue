<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@lightBlue: #58B7FF;
@blue: #20A0FF;
@darkBlue: #1D8CE0;

@info: #20A0FF;
@success: #13CE66;
@warning: #F7BA2A;
@danger: #FF4949;

@black: #1F2D3D;
@lightBlack: #324057;
@extraLightBlack: #475669;

@silver: #8492A6;
@lightSilver: #99A9BF;
@extraLightSilver: #C0CCDA;

@gray: #D3DCE6;
@lightGray: #E5E9F2;
@ExtraLightGray: #EFF2F7;

@darkWhite: #F9FAFC;
@white: #FFFFFF;

* {
    margin: 0;
    padding: 0;
}
.bg-blue-light {
    background-color: @lightBlue;
}
.bg-blue {
    background-color: @blue;
}
.bg-blue-dark {
    background-color: @darkBlue;
}
.bg-info {
    background-color: @info;
}
.bg-success {
    background-color: @success;
}
.bg-warning {
    background-color: @warning;
}
.bg-danger {
    background-color: @danger;
}
.bg-black {
    background-color: @black;
}
.bg-light-black {
    background-color: @lightBlack;
}
.bg-extra-light-black {
    background-color: @extraLightBlack;
}
.bg-silver {
    background-color: @silver;
}
.bg-light-silver {
    background-color: @lightSilver;
}
.bg-extra-silver {
    background-color: @extraLightSilver;
}
.bg-gray {
    background-color: @gray;
}
.bg-light-gray {
    background-color: @lightGray;
}
.bg-extra-light-gray {
    background-color: @ExtraLightGray;
}
.bg-dark-white {
    background-color: @darkWhite;
}
.bg-white {
    background-color: @white;
}


.font-blue-light {
    color: @lightBlue;
}
.font-blue {
    color: @blue;
}
.font-blue-dark {
    color: @darkBlue;
}
.font-info {
    color: @info;
}
.font-success {
    color: @success;
}
.font-warning {
    color: @warning;
}
.font-danger {
    color: @danger;
}
.font-black {
    color: @black;
}
.font-light-black {
    color: @lightBlack;
}
.font-extra-light-black {
    color: @extraLightBlack;
}
.font-silver {
    color: @silver;
}
.font-light-silver {
    color: @lightSilver;
}
.font-extra-silver {
    color: @extraLightSilver;
}
.font-gray {
    color: @gray;
}
.font-light-gray {
    color: @lightGray;
}
.font-extra-light-gray {
    color: @ExtraLightGray;
}
.font-dark-white {
    color: @darkWhite;
}
.font-white {
    color: @white;
}

</style>
