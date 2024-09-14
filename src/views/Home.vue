<template>
  <van-pull-refresh class="home-page" v-model="loading" @refresh="onRefresh">
    <div class="home-banner">
      <p>{{ $t('home.get2') }}</p>
      <p><span class="usd">$1,000,000</span> {{ $t('home.bonus') }}</p>
      <p class="desc">{{ $t('home.tobeRich') }}</p>
    </div>
    <div class="container">
      <div class="fast-entry">
        <div class="free-spin" @click="navigateFn('/freespin')">
          <img class="img-turntable" src="data:image/png;base64,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" alt="">
          <p>{{ $t('home.freespin') }}</p>
        </div>
        <div class="fast-entry-other">
          <div class="bonus-item huge-bonus" @click="navigateFn('/square?type=1')">
            <svg-icon name="Lottery" class="bonus-item-icon" />
            <p class="bonus-item-desc">{{ $t('home.hugebonus') }}</p>
          </div>
          <div class="bonus-item random-bonus" @click="navigateFn('/square?type=2')">
            <svg-icon name="UltimateDice" class="bonus-item-icon" />
            <p class="bonus-item-desc">{{ $t('home.hightrate') }}</p>
          </div>
        </div>
      </div>
      <div class="game-class-wrap" v-for="child in gameClassifyData" :key="child.category">
        <div class="game-class">
          <div class="game-class-aside">
            <svg-icon :name="child.icon" class="game-class-icon" />
            <span class="txt">{{ $t(child.label) }}</span>
          </div>
          <span class="game-class-nav" @click="navigateFn(child.path)">{{ $t('home.viewall') }}</span>
        </div>
        <div class="game-list">
          <session-item v-for="(item, index) in child.list" :key="index" :class="[child.className]" v-bind="item"></session-item>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import SessionItem from "@/components/SessionItem.vue";
import { useRouter } from 'vue-router';
import { getHomeRecommand } from '@/api/api'
import { onMounted, ref } from "vue";
import { SessionType } from '@/constant'

const router = useRouter()
const gameClassifyData = ref<TypeHomeRecommandSessionList[]>(
  [
  {
    category: SessionType.hot,
    label: 'home.popular',
    icon: "HotGame",
    className: "purple",
    path: "/square?type=3",
    list: [],
  },
  {
    category: SessionType.hugebonus,
    label: 'home.hugebonus',
    icon: "NewReleases",
    className: "green",
    path: "/square?type=1",
    list: [],
  },
  {
    category: SessionType.hightwrate,
    label: 'home.hightwrate',
    icon: "Like",
    className: "orange",
    path: "/square?type=2",
    list: [],
  },
])
function navigateFn(path: string) {
  router.push(path)
}
const loading = ref(false)
const onRefresh = () => {
  getHomeRecommand().then(res => {
    gameClassifyData.value = gameClassifyData.value.map(e => {
      return {
        ...e,
        list: res.data[e.category]
      }
    })
    loading.value = false
  })
}
onMounted(()=> {
  onRefresh()
})
</script>
<style lang="less" scoped>
.home-page {
  padding: 17px 10px;
  .home-banner {
    p {
      font-size: 24px;
      font-weight: 700;
      text-transform: uppercase;
      .usd {
        font-size: 34px;
        font-weight: 700;
        color: var(--primary-color);
      }
      &.desc {
        font-size: 14px;
        color: #98A7B5;
      }
    }
  }
  .container {
    margin-top: 17px;
    .fast-entry {
      display: flex;
      .free-spin {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        border-radius: 4px;
        background: linear-gradient(26.79deg, rgba(109, 43, 255, .480402) 1.86%, rgba(109, 43, 255, .04) 85.25%, rgba(109, 43, 255, .04) 85.25%), rgba(216, 216, 216, .05);
        .img-turntable {
          animation: rotate-infinite 2s infinite linear;
        }
        p{
          font-size: 16px;
          font-weight: 600;
          margin-left: 5px;
          text-transform: uppercase;
        }
      }
      &-other {
        flex: 1;
        margin-left: 10px;
        margin-left: 10px;
        .bonus-item {
          display: flex;
          align-items: center;
          padding: 0 0 0 20px;
          height: 40px;
          border-radius: 4px;
          &-desc {
            font-size: 14px;
            font-weight: 600;
            margin-left: 5px;
            text-transform: uppercase;
          }
          
        }
        .huge-bonus {
          background: linear-gradient(19.92deg, rgb(236 155 83 / 0.8) -6.45%, rgba(175, 13, 132, .04) 78.77%), rgba(216, 216, 216, .05);
          .bonus-item-icon {
            fill: #ea6518;
          }
        }
        .random-bonus {
          margin-top: 10px;
          background: linear-gradient(26.79deg, rgba(109, 43, 255, .480402) 1.86%, rgba(109, 43, 255, .04) 85.25%, rgba(109, 43, 255, .04) 85.25%), rgba(216, 216, 216, .05);
          .bonus-item-icon {
            fill: #3bc116;
          }
        }
      }
    }
  }
  .game-class-wrap{
    margin-top: 17px;
    margin-bottom: 10px;
    .game-class {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      &-aside{
        flex: 1;
        display: flex;
        align-items: center;
        .txt{
          font-size: 16px;
          font-weight: 700;
          padding-left: 5px;
        }
      }
      &-nav {
        font-size: 12px;
        font-weight: 700;
        color: var(--primary-color);
      }
    }
    .game-list {
      --grid-gap: 5px;
      --grid-num: 2.5;
      display: grid;
      grid-template-rows: repeat(1,1fr);
      grid-auto-flow: column;
      grid-auto-columns: calc(100% / var(--grid-num) - (var(--grid-num) - 1) * var(--grid-gap) / var(--grid-num));
      gap: var(--grid-gap);
      position: relative;
      -webkit-scroll-snap-type: x mandatory;
      -moz-scroll-snap-type: x mandatory;
      -ms-scroll-snap-type: x mandatory;
      scroll-snap-type: x mandatory;
      -webkit-scroll-behavior: smooth;
      -moz-scroll-behavior: smooth;
      -ms-scroll-behavior: smooth;
      scroll-behavior: smooth;
      overflow-x: auto;
      overflow-y: hidden;
      
    }
    .game-list::-webkit-scrollbar {
        display: none
    }

    .game-list>* {
        width: 100%;
        -webkit-flex: none;
        -ms-flex: none;
        flex: none;
        -webkit-scroll-snap-align: start;
        -moz-scroll-snap-align: start;
        -ms-scroll-snap-align: start;
        scroll-snap-align: start
    }
  }

}
</style>