import { useMotion, type MotionVariants } from '@vueuse/motion'
import { ref, type Ref } from 'vue'
export default function useSlideUpMotion(
  elRef: Readonly<Ref<HTMLElement | undefined>>,
  delay: number
) {
  const variants = ref<MotionVariants>({
    initial: {
      opacity: 0,
      y: 100
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 300,
        type: 'spring',
        damping: 12,
        delay
      }
    }
  })
  useMotion(elRef, variants)
}
