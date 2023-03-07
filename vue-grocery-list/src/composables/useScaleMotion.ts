import { useMotion, type MotionVariants } from '@vueuse/motion'
import { ref, type Ref } from 'vue'

export default function useScaleMotion(elRef: Readonly<Ref<HTMLElement | undefined>>) {
  const variants = ref<MotionVariants>({
    initial: {
      opacity: 0,
      scale: 0
    },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'linear',
        duration: 300
      }
    }
  })
  useMotion(elRef, variants)
}
