<template>
    <div class="signin-container">
        <h2>登录</h2>
        <el-form ref="form" :model="signinForm">
            <el-form-item label="">
                <el-input placeholder="用户名" v-model="signinForm.username"></el-input>
            </el-form-item>            
            <el-form-item label="">
                <el-input placeholder="密码" v-model="signinForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSignin">登录</el-button>
            </el-form-item>
        </el-form>
        <router-link to="/user/register">注册</router-link>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        data () {
            return {
                test: 'xxx',
                signinForm: {
                    username: 'cjs',
                    password: '123456'
                }
            }
        },
        methods: {
            handleSignin() {
                if (this.signinForm.username === '' || this.signinForm.password === '') {
                    alert('请填充表单');
                    return;
                }
                var sendData = {
                    username: this.signinForm.username,
                    password: this.signinForm.password
                };
                this.ajaxSignin(sendData)
                .then((data) => {
                    if (data.code !== 0) {
                        this.$message({
                            type: 'warning',
                            message: `登录失败: ${data.msg}`
                        })
                        return;
                    }
                    this.$router.push('/');
                })
            },
            ajaxSignin(sendData) {
                var def = $.Deferred();

                $.ajax({
                    url: '/ife/thpoker/api/user/signin',
                    type: 'post',
                    data: sendData
                }).done((data) => {
                    def.resolve(data);
                }).fail(() => {
                    def.resolve({
                        code: 500,
                        msg: '请刷新重试'
                    })
                });
                return def.promise();
            }
        }
    }
</script>

<style scoped>
    .signin-container {
        position: relative;
        height: auto;
        width: 300px;
        padding: 30px 20px;
        background-color: #eee;

    }
</style>
