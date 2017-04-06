<template>
    <div class="register-container">
        <h2>登录</h2>
        <el-form ref="form" :model="registerForm">
            <el-form-item label="">
                <el-input placeholder="用户名" v-model="registerForm.name"></el-input>
            </el-form-item>            
            <el-form-item label="">
                <el-input placeholder="密码" v-model="registerForm.password"></el-input>
            </el-form-item>            
            <el-form-item label="">
                <el-input placeholder="重复密码" v-model="registerForm.rpassword"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input placeholder="邮箱" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRegister">注册</el-button>
            </el-form-item>
        </el-form>
        <router-link to="/user/signin">已有账号，前往登录</router-link>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        data () {
            return {
                test: 'xxx',
                registerForm: {
                    name: 'cjs',
                    password: '123456',
                    rpassword: '123456',
                    email: '793494356@qq.com'
                }
            }
        },
        methods: {
            handleRegister() {
                if (this.registerForm.name === '' || this.registerForm.password === '' ||
                    this.registerForm.rpassword === '') {
                    alert('请填充表单');
                    return;
                }
                var sendData = {
                    name: this.registerForm.name,
                    password: this.registerForm.password,
                    rpassword: this.registerForm.rpassword,
                    email: this.registerForm.email
                };
                this.ajaxSignin(sendData)
                .then((data) => {
                    if (data.code !== 0) {
                        this.$message({
                            type: 'warning',
                            message: `注册失败：${data.msg}`
                        })
                        return;
                    }
                    this.$message('注册成功');
                    this.$router.push({
                        path: '/user/signin'
                    })
                })
            },
            ajaxSignin(sendData) {
                var def = $.Deferred();

                $.ajax({
                    url: '/ife/thpoker/api/user/register',
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
    .register-container {
        position: relative;
        height: auto;
        width: 300px;
        padding: 30px 20px;
        background-color: #eee;

    }
</style>
