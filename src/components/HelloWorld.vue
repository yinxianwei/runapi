<template>
    <div class="">
        <el-row type="flex" :gutter="10">
          <el-col class="w1">
              <el-select v-model="method" placeholder="请求类型">
                <el-option v-for="item in methods" :key="item" :value="item" :label="item">{{item}}</el-option>
              </el-select>
          </el-col>
          <el-col class="w100">
              <el-input v-model="url" placeholder="请求地址"></el-input>
          </el-col>
          <el-col class="w2">
              <el-button type="" @click="send">发送</el-button>
          </el-col>
        </el-row>
        <p>参数：</p>
        <el-row v-for="(item, index) in parameters" :key="index" :gutter="10" class="mb" type="flex" layout-align="start center">
          <el-col :span="11">
                <el-input v-model="item.key" placeholder="key"></el-input>
          </el-col>
          <el-col :span="11">
                <el-input v-model="item.value" placeholder="value"></el-input>
          </el-col>
            <el-col :span="2" class="cp" @click.native="removeParameter(index)">
                <i class="el-icon-delete"></i>
            </el-col>
        </el-row>
        <a href="#" @click="addParameter">添加一项</a>
        <p>cookies：</p>
        <el-row v-for="(item, index) in cookies" :key="index" :gutter="10" class="mb" type="flex" layout-align="start center">
          <el-col :span="11">
                <el-input v-model="item.key" placeholder="key"></el-input>
          </el-col>
          <el-col :span="11">
                <el-input v-model="item.value" placeholder="value"></el-input>
          </el-col>
            <el-col :span="2" class="cp" @click.native="removeCookie(index)">
                <i class="el-icon-delete"></i>
            </el-col>
        </el-row>
        <a href="#" @click="addCookie">添加一项</a>
        <p>返回参数：</p>
        <pre>
            {{json || '无'}}
        </pre>
    </div>
</template>

<script>
import api from "@/api";
export default {
  name: "HelloWorld",
  data() {
    return {
      methods: ["post", "get", "put", "delete"],
      method: "get",
      url: "",
      parameters: [],
      cookies: [],
      json: null
    };
  },
  methods: {
    addParameter() {
      this.parameters.push({
        key: "",
        value: ""
      });
    },
    removeParameter(index) {
      this.parameters.splice(index, 1);
    },
    addCookie() {
      this.cookies.push({
        key: "",
        value: ""
      });
    },
    removeCookie(index) {
      this.cookies.splice(index, 1);
    },
    send() {
      var data = {};
      this.parameters.forEach(value => {
        data[value.key] = value.value;
      });

      api(this.url, this.method, data).then(res => {
          this.json = res.data;
      }, err => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w1 {
  width: 140px;
}
.w2 {
  width: 120px;
}
.mb {
  margin-bottom: 10px;
}
.cp {
  cursor: pointer;
}
.w100 {
  width: 100%;
}
pre{
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #eee;
    background-color: #eee;
}
</style>
