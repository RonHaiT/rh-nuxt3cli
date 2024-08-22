<template>
  <div class="login m-auto w-full h-full">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="login"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">记住我？</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { authLogin } from "~/api/user";
import rsaEncrypt from "@/utils/rsaUtil";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
  faildTimes: number;
  captchaVerification: string | null;
}

const formState = reactive<FormState>({
  username: "admin",
  password: "123456",
  captchaVerification: null,
  remember: true,
  faildTimes: 0,
});
const login = async (values: any) => {
  console.log("Success:", values);
  if (formState.faildTimes >= 3 && formState.captchaVerification == null) {
    console.log(111, "加载图片验证");

    return;
  }
  const params = {
    clientId: "fS5U7tI6LRENMjmT",
    tokenType: "pwd",
    secret: "bSawDAwZZWGEd1VarEr9S32ZUqe4lweR",
    account: "admin",
    pwd: rsaEncrypt(formState.password),
    captchaVerification: formState.captchaVerification,
  };
  await authLogin(params);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
