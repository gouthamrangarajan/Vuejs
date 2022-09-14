### Multi step form using Vue & Tailwind CSS

#### Features

- Form elements like input and button using tailwind css utility class (transition, ring etc.)
- Step indicator using Tailwind CSS utility class

#### Code for Layout Animation for step indicator

```html
<div
  :class="[
        'h-2 w-1/3 bg-purple-600 rounded-full absolute top-0  transition-all duration-300',
        indicatorClass,
      ]"
></div>
```

```javascript
const indicatorClass = ref("-left-3");
watch(
  () => props.step,
  (newVal, _) => {
    switch (newVal) {
      case 1: {
        indicatorClass.value = "-left-3";
        break;
      }
      case 2: {
        indicatorClass.value = "left-[31%]";
        break;
      }
      case 3: {
        indicatorClass.value = "left-[65%]";
        break;
      }
    }
  }
);
```

#### Screenshot

![Screenshot](https://github.com/gouthamrangarajan/vuejs/blob/master/tailwind-multi-step-form/screenshot.gif)
