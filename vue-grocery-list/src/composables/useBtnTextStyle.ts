import { useTimeoutFn } from '@vueuse/core'
import { readonly, shallowRef } from 'vue'

export default function useButtonTextStyle(onClickAction: () => void) {
  const style = shallowRef({})
  const { start, stop, isPending } = useTimeoutFn(() => {
    style.value = {}
  }, 100)
  const onClick = () => {
    if (isPending.value) stop()
    style.value = { transform: 'translateY(2px)' }
    start()
    onClickAction()
  }
  return { onClick, style: readonly(style) }
}
