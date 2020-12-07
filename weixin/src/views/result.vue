<template>
  <div class="result-page">
    <van-dialog v-model="show" show-cancel-button @confirm="emailOk">
      <Email ref="sendEmail" />
    </van-dialog>
    <van-dialog v-model="successSend" @confirm="emailOk">
      <img src="../assets/img/successSend.png" alt="" class="success-img">
      <div class="success-tip">邮件已发送请注意查收</div>
    </van-dialog>
    <div class="echarts">
      <vChart :option="option"></vChart>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import Email from '@/components/common/email'
export default {
  data() {
    return {
      show: false,
      successSend: true,
      option: {
        backgroundColor: '#2c343c',

        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      }

    }
  },
  components: {
    Email,
    vChart: ECharts
  },
  methods: {
    emailOk() {
      this.$refs.sendEmail.save()
    }
  }
}
</script>
<style lang="less" scoped>
.result-page {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 300px;
}
.success-img {
  display: block;
  width: 178px;
  padding-top: 40px;
  margin: 0 auto;
}
.success-tip {
  font-size: 16px;
  line-height: 68px;
  margin-bottom: 13px;
  text-align: center;
}
</style>