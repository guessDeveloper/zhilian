<template>
  <div class="page-box" v-show="init">
    <div class="result-box" v-show="list.length!=0">
      <div class="btn-box">
        <button class="btn-result" :disabled="result.length == 0" @click="createResult">生成结果</button>
      </div>
      <div class="chose-all-box">
        <van-checkbox shape="square" v-model="checkeALL" @click="checkChange" ref="all" class="persion">全选</van-checkbox>
        <div class="date-name">提交日期</div>
      </div>
      <van-checkbox-group ref="checkboxGroup" v-model="result" @change="singleChange" class="persion">
        <div class="chose-line" v-for="(item,index) in list" :key="index">
          <div class="persion-box">
            <van-checkbox :name="index" shape="square" class="persion"></van-checkbox>
            <div class="persion-img">
              <img :src="item.person_head" alt="">
            </div>
            <div class="name-box">
              <div class="name">{{item.nick_name}}</div>
              <div class="sex">{{item.person_gender==1?'男':'女'}}</div>
            </div>
          </div>
          <div class="date">
            {{item.submit_time}}
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <div class="empty" v-show="list.length==0">
      <img src="../assets/img/persion-empty.png" alt="" class="img">
      <div class="tip">
        暂无项目人员
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  data() {
    return {
      checkeALL: true,
      result: [],
      list: [],
      pro_id: '',
      init: false

    }
  },
  mounted() {
    this.pro_id = this.$route.query.pro_id
    this.getPersionList();

  },
  methods: {
    checkChange() {
      // this.checkeALL = !this.checkeALL
      this.$refs.checkboxGroup.toggleAll(this.checkeALL)
    },
    //获取人员列表
    async getPersionList() {
      const loading = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let resoult = await this.$https.post(this.$api.selectperson, {
        pro_id: this.pro_id,
        identify: this.$util.Md5(this.pro_id + 'map')
      })
      console.log(resoult)
      if (resoult.data.status == 0) {
        this.list = resoult.data.result_list
        this.$nextTick(() => {
          this.$refs.checkboxGroup.toggleAll(this.checkeALL)
        })
      } else {

      }
      loading.clear()
      this.init = true

    },
    singleChange(res) {
      console.log(res)
      if (res.length !== this.list.length) {
        this.checkeALL = false
      } else {
        this.checkeALL = true
      }
    },
    //生成结果
    createResult() {
      let resultObject = [];
      this.result.forEach(Element => {
        resultObject.push(this.list[Element].person_id)
      })
      sessionStorage.setItem('persion', resultObject)
      this.$router.push(`/result?pro_id=${this.pro_id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.page-box {
  width: 100%;
  height: 100%;
  .result-box {
    min-height: 100%;
    background: #fff;
  }
  .btn-box {
    border-top: 8px solid @body_color;
    overflow: hidden;
  }
  .btn-result {
    display: block;
    margin: 15px auto 0;
    width: 345px;
    height: 46px;
    border: 1px solid @main_color;
    border-radius: 6px;
    color: @main_color;
    font-size: 14px;
    &:disabled {
      border-color: #ccc;
      color: #ccc;
    }
  }
}
.chose-all-box {
  .flexbox;
  padding-left: 15px;
  line-height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid #f3f5f9;
  .date-name {
    width: 132px;
    font-size: 16px;
    text-align: center;
  }
}
.chose-line {
  .flexbox;
  justify-content: space-between;
  height: 78px;
  border-bottom: 1px solid #f3f5f9;
  .persion-box {
    .flexbox;
    padding-left: 15px;
    align-items: center;
    .persion-img {
      width: 48px;
      height: 48px;
      border-radius: 48px;
      background: #ccc;
      margin-left: 15px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .name-box {
      margin-left: 16px;
      .name {
        width: 120px;
        .onelineText;
        font-size: 14px;
        line-height: 20px;
      }
      .sex {
        font-size: 14px;
        line-height: 18px;
        color: @subtitle_color;
      }
    }
  }
  .date {
    width: 132px;
    font-size: 12px;
    text-align: center;
    color: #666666;
    line-height: 78px;
  }
}
.empty {
  padding-top: 123px;
  .img {
    display: block;
    width: 152px;
    margin: 0 auto 0;
  }
  .tip {
    text-align: center;
    font-size: 16px;
    color: @cancle_color;
    line-height: 80px;
  }
}
</style>