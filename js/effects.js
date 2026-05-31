import { parseNumbers } from './util.js';

// Effects

const containerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = containerElement.querySelector('.effect-level__slider');
const effectLevelElement = containerElement.querySelector(
  '.effect-level__value',
);

const getFilter = (type, value, unit = '') => `${type}(${value}${unit})`;
const checkForSliderHidden = () =>
  containerElement.classList.contains('hidden');

const getSliderOptions = (min, max, step) => ({
  range: { min, max },
  start: max,
  step,
  format: {
    to: (value) =>
      Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => value,
  },
});

const EFFECTS = {
  chrome: {
    filter: (value = 1) => getFilter('grayscale', value),
    sliderOptions: getSliderOptions(0, 1, 0.1),
  },
  sepia: {
    filter: (value = 1) => getFilter('sepia', value),
    sliderOptions: getSliderOptions(0, 1, 0.1),
  },
  marvin: {
    filter: (value = 100) => getFilter('invert', value, '%'),
    sliderOptions: getSliderOptions(0, 100, 1),
  },
  phobos: {
    filter: (value = 3) => getFilter('blur', value, 'px'),
    sliderOptions: getSliderOptions(0, 3, 0.1),
  },
  heat: {
    filter: (value = 3) => getFilter('brightness', value),
    sliderOptions: getSliderOptions(1, 3, 0.1),
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
});

const clearEffects = (preview) => {
  preview.style.removeProperty('filter');
  effectLevelElement.value = '';
  document.querySelector('#effect-none').checked = true;
  if (!checkForSliderHidden()) {
    containerElement.classList.add('hidden');
  }
};

const createOnEffectChange = (preview) => (event) => {
  if (event.target.matches('input[name="effect"]')) {
    const effect = EFFECTS[event.target.value];

    if (effect) {
      preview.style.filter = effect.filter();
      effectLevelElement.value = parseNumbers(effect.filter());
      if (checkForSliderHidden()) {
        containerElement.classList.remove('hidden');
      }

      sliderElement.noUiSlider.updateOptions(effect.sliderOptions);
      sliderElement.noUiSlider.on('update', (value) => {
        preview.style.filter = effect.filter(value);
        effectLevelElement.value = value;
      });
    } else {
      if (preview.style.filter) {
        clearEffects(preview);
      }
    }
  }
};

// Scale

const SCALE = {
  up: 25,
  down: -25,
};

const updateScale = (currentScale, step) => {
  const newValue = Number(currentScale.replace('%', '')) + step;

  return {
    inputValue: `${newValue}%`,
    scale: newValue / 100,
  };
};

const createOnScaleButtonClick = (input, preview) => (event) => {
  const currentScale = input.value;
  let updatedData;

  if (
    event.target.matches('.scale__control--smaller') &&
    currentScale !== '25%'
  ) {
    updatedData = updateScale(currentScale, SCALE.down);
  } else if (
    event.target.matches('.scale__control--bigger') &&
    currentScale !== '100%'
  ) {
    updatedData = updateScale(currentScale, SCALE.up);
  }

  if (updatedData) {
    input.value = updatedData.inputValue;
    preview.style.transform = `scale(${updatedData.scale})`;
  }
};

export { createOnEffectChange, clearEffects, createOnScaleButtonClick };
