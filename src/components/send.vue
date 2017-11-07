<template>
    <div>
        <div layout="row">
            <el-select v-model="method" placeholder="请求类型" class="mr" @change="setItem">
                <el-option v-for="(item, index) in methods" :key="index" :value="item" :label="item"></el-option>
            </el-select>
            <el-input v-model="url" placeholder="请求地址" class="mr" @input="setItem"></el-input>
            <el-button type="" @click="send" :loading="loading">发送</el-button>
        </div>
        <p>参数：</p>
        <div v-for="(item, index) in parameterList" :key="index" class="mb" layout="row" layout-align="start center" v-show="inputType == 1">
            <div class="cp mr" @click="removeParameter(index)">
                <i class="el-icon-delete"></i>
            </div>
            <el-input v-model="item.key" placeholder="key" class="mr" @input="setItem"></el-input>
            <el-input v-model="item.value" placeholder="value" class="mr" @input="setItem"></el-input>
        </div>
        <a href="#" @click="addParameter" v-show="inputType == 1">添加一项</a>
        <el-input type="textarea" class="textarea2" placeholder="请输入内容" v-model="parameterJson" v-show="inputType == 2" @input="setItem">
        </el-input>
        <a href="#" @click="changeParameterType(2)" v-show="inputType == 1">Raw</a>
        <a href="#" @click="changeParameterType(1)" v-show="inputType == 2">Key/Value</a>
        <p>Headers：</p>
        <div v-for="(item, index) in headers" :key="index" class="mb" layout="row" layout-align="start center">
            <div class="cp mr" @click="removeHeader(index)">
                <i class="el-icon-delete"></i>
            </div>
            <el-input v-model="item.key" placeholder="key" class="mr" @input="setItem"></el-input>
            <el-input v-model="item.value" placeholder="value" class="mr" @input="setItem"></el-input>
        </div>
        <a href="#" @click="addHeader" class="mb">添加一项</a>
        <p>
            <div layout="row" class="mb">
                <el-button class="mr" :type="resType == 1 ? 'primary' : ''" @click="changeType(1)">返回结果</el-button>
                <el-button :type="resType == 2 ? 'primary' : ''" @click="changeType(2)">生成文档</el-button>
            </div>
        </p>
        <div id="jsoneditor" style="width: 500px; height: 500px;" v-show="resType === 1"></div>
        <el-input type="textarea" class="textarea" placeholder="请输入内容" v-model="markdown" v-show="resType === 2">
        </el-input>
    </div>
</template>

<script>
import api from '@/api';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

export default {
    name: 'send',
    data() {
        return {
            methods: ['POST', 'GET', 'PUT', 'DELETE'],
            method: 'GET',
            url: '',
            parameterList: [],
            headers: [],
            response: null,
            markdown: '',
            resType: 1,
            editor: null,
            loading: false,
            parameterJson: '',
            inputType: 1,
            config: {}
        };
    },
    mounted() {
        var container = document.getElementById('jsoneditor');
        var options = {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'],
            onChange: this.changeJson
        };
        this.editor = new JSONEditor(container, options);
        if (process.env.NODE_ENV === 'development') {
            var data = JSON.parse(localStorage.getItem('runapi_data'));
            if (data) {
                this.method = data.method;
                this.url = data.url;
                this.parameterList = data.parameterList;
                this.headers = data.headers;
                this.parameterJson = data.parameterJson;
                this.inputType = data.inputType;
            }
        } else {
            chrome.storage.local.get('runapi_data', result => {
                if (result) {
                    var data = JSON.parse(result['runapi_data']);
                    this.method = data.method;
                    this.url = data.url;
                    this.parameterList = data.parameterList;
                    this.headers = data.headers;
                    this.parameterJson = data.parameterJson;
                    this.inputType = data.inputType;
                }
            });
        }
    },
    computed: {
        localData() {
            return {
                method: this.method,
                url: this.url,
                parameterList: this.parameterList,
                headers: this.headers,
                parameterJson: this.parameterJson,
                inputType: this.inputType
            }
        }
    },
    methods: {
        changeJson() {
            try {
                this.response = this.editor.get();
            } catch (error) {
            }
        },
        setItem() {
            if (process.env.NODE_ENV === 'development') {
                localStorage.setItem('runapi_data', JSON.stringify(this.localData))
            } else {
                chrome.storage.local.set({
                    'runapi_data': JSON.stringify(this.localData)
                })
            }
        },
        addParameter() {
            this.parameterList.push({
                key: '',
                value: ''
            });
            this.setItem();
        },
        removeParameter(index) {
            this.parameterList.splice(index, 1);
            this.setItem();
        },
        addHeader() {
            if (!this.headers) {
                this.headers = [];
            }
            this.headers.push({
                key: '',
                value: ''
            });
            this.setItem();
        },
        removeHeader(index) {
            this.headers.splice(index, 1);
            this.setItem();
        },
        changeParameterType(type) {
            this.inputType = type;
            if (type == 2) {
                var data = {};
                this.parameterList.forEach(value => {
                    if (value.key) {
                        data[value.key] = value.value;
                    }
                });
                this.parameterJson = JSON.stringify(data);
            } else {
                this.parameterList = [];
                try {
                    var data = JSON.parse(this.parameterJson);
                    for (var key in data) {
                        this.parameterList.push({
                            key: key,
                            value: data[key]
                        })
                    }
                } catch (e) { }
            }
            this.setItem();
        },
        streamline(data) {
            if (data instanceof Array) {
                for (var item of data) {
                    this.streamline(item);
                }
            } else if (data) {
                for (var key in data) {
                    var val = data[key];
                    if (val instanceof Array && val.length) {
                        val.splice(1, val.length);
                        this.streamline(val[0]);
                    }
                }
            }
        },
        send() {
            if (!this.url) {
                return;
            }
            this.loading = true;
            var data = {};
            this.parameterList.forEach(value => {
                if (value.key) {
                    data[value.key] = value.value;
                }
            });
            this.parameter = data;
            var header = {};
             this.headers.forEach(value => {
                if (value.key) {
                    header[value.key] = value.value;
                }
            });
            console.log(header);
            api(this.url, this.method, this.parameter, header).then(res => {
                this.streamline(res.data.data);
                this.response = res.data.data;
                this.config = res.config;
                this.dataFormat();
                this.loading = false;
            }, err => {
                this.loading = false;
                this.response = err;
                this.changeType(1);
            });
        },
        changeType(type) {
            this.resType = type;
            this.dataFormat();
        },
        formatData(list, markdown = '', formatType = 1) {
            var temp = [];
            var table = [];
            for (var i = 0; i < list.length; i++) {
                var map = [];
                var item = list[i];
                for (var key in item.value) {
                    var val = item.value[key];
                    var type = val == null ? 'unknown' : typeof val;
                    if (val instanceof Array) {
                        type = 'array';
                    }
                    map.push({
                        key: key,
                        type: type,
                        value: val
                    })
                    if (val instanceof Array && val.length) {
                        if (typeof val[0] == 'object') {
                            temp.push({
                                name: key,
                                value: val[0]
                            })
                        }
                    } else if (val instanceof Object) {
                        temp.push({
                            name: key,
                            value: val
                        })
                    }
                }
                table.push({
                    name: item.name,
                    value: map
                })
            }
            for (var item of table) {
                markdown += `\n\n**${item.name}：**\n\n`
                if (item.value && item.value.length) {
                    markdown += `|参数名${formatType === 1 ? '| 必选' : ''}|类型|说明|\n|:----    ${formatType === 1 ? '|:---' : ''}|:----- |-----   |`
                    for (var val of item.value) {
                        markdown += `\n| ${val.key} ${formatType === 1 ? '| 是' : ''} | ${val.type} | 无 |`
                    }
                } else {
                    markdown += '无'
                }
            }
            if (temp.length) {
                return this.formatData(temp, markdown, formatType);
            }
            return markdown;
        },
        dataFormat() {
            if (!this.response) {
                this.markdown = '';
                return;
            }
            if (!this.config.data) {
                this.markdown = this.formatData([{ name: '参数说明', value: this.response }], '', 2);
                return;
            }
            this.editor.set(this.response);

            this.markdown = `
**简要描述：** 

- 描述

**请求URL：** 

- \`${this.url}\`

**请求方式：**
- ${this.method}
${this.formatData([{ name: '参数说明', value: this.config.data ? JSON.parse(this.config.data) : '' }])}

 **返回示例**

\`\`\` 
${this.editor.getText()}
\`\`\`
${this.formatData([{ name: '返回参数说明', value: this.response }], '', 2)}

 **备注** 

- 更多返回错误代码请看首页的错误代码描述`;
        }
    }
};
</script>

<style>
.w1 {
  width: 140px;
}
.w2 {
  width: 120px;
}
.mb {
  margin-bottom: 10px;
}
.mr {
  margin-right: 10px;
}
.cp {
  cursor: pointer;
}
.w100 {
  width: 100%;
}
.textarea textarea {
  height: 500px;
  font-size: 12px;
}
.textarea2 textarea {
  height: 300px;
  font-size: 12px;
}
</style>
