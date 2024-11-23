<template>
  <div class="page">
    <NavBack :title="$t('draw.luckydraw')" />
    <div class="page-inner">
      <div class="red-pack" :class="{active: bonus>0}">
        <div class="front">
          <div class="red-pack-auth">
            {{detail?.userName}} {{ $t('draw.whoisDraw') }}
          </div>
          <div class="red-pack-open" @click="claimDraw">{{ $t('draw.open') }}</div>
          <div class="red-pack-tips">
            {{ $t('draw.congratulations1') }}
            {{ $t('draw.congratulations2') }}
          </div>
        </div>
        <div class="back">
          <div class="red-pack-tips">{{ $t('draw.congratulations1') }}🎉</div>
          <p class="red-pack-back-desc" v-format-to-decimal="bonus"></p>
        </div>
      </div>
      <div class="sub" @click="router.push('/')">
        {{ $t('draw.getMoreBonus') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavBack from "@/components/NavBack.vue";
import { drawDetail, joinDraw } from "@/api/api";
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detail = ref<TypesMakeDrawItem | null>(null)

const bonus = ref(0)
const claimDraw = () => {
  if(loading.value) return
  if(userStore.isLogin) {
    loading.value = true
    joinDraw(detail.value!.drawId).then((res) => {
      loading.value = false
      bonus.value = res.data
      userStore.getInfo()
    }).catch(()=>{
      loading.value = false
    })
  } else {
    router.replace(`/login?redirect=/lucky/${detail.value!.drawId}`)
  }
  
}
const onRefresh = () => {
  const id = route.params.id
  if(!id) return
  drawDetail(id as string).then(res => {
    detail.value = res.data
  })
}

onMounted(() => {
  onRefresh()
});
</script>
<style lang="less" scoped>
.page {
  overflow: hidden;
  .page-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sub {
    margin-top: 20px;
    width: 80%;
    height: 60px;
    border-radius: 32px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e2b88a;
    color: #e2b88a;
  }
  .red-pack {
    width: 300px;
    height: 420px;
    margin: 10px;
    text-align: center;
    position: relative;
  }
  .red-pack-back-desc {
    color: #e2b88a;
    padding: 0 40px;
    text-align: left;
    font-size: 36px;
    margin-top: 20px;
  }
  .front,
  .back {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    transition: transform 0.6s ease-out;
    background-color: #5b0688;
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: rotateY(180deg);
  }
   .red-pack.active {
    .front {
       transform: rotateY(180deg);
     }
     .back {
       transform: rotateY(0deg);
     }
   }

  .red-pack-open {
    background-color: #e95a0c;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    line-height: 120px;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    bottom: 25%;
    left: calc(50% - 60px);
    cursor: pointer;
    font-size: 36px;
  }
  .red-pack-auth {
    color: #e2b88a;
    font-size: 16px;
    padding-top: 60px;
  }
  .red-pack-tips {
    color: #e2b88a;
    font-size: 24px;
    padding-top: 40px;
  }
  .red-pack-desc {
    color: #e2b88a;
    position: absolute;
    width: 100%;
    bottom: 10%;
    text-align: center;
  }
}
</style>
