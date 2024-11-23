import { type Directive } from 'vue';

// 格式化函数
function formatToTwoDecimalPlaces(number: number): string {
  return (Math.round((number + Number.EPSILON) * 100) / 100).toFixed(2);
}

// 定义指令
const formatToTwoDecimalPlacesDirective: Directive<HTMLElement, number> = {
  beforeMount(el, binding) {
    const value = binding.value;
    if (typeof value === 'number') {
      el.textContent = formatToTwoDecimalPlaces(value);
    } else {
      console.warn('v-format-to-decimal: 提供的值不是数字类型');
    }
  },
  updated(el, binding) {
    const value = binding.value;
    if (typeof value === 'number') {
      el.textContent = formatToTwoDecimalPlaces(value);
    }
  }
};

export default formatToTwoDecimalPlacesDirective;
