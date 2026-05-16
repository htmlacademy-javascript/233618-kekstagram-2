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

function getSliderOptions(min, max, step) {
  return {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return value;
      },
    },
  };
}

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
  if (!checkForSliderHidden()) {
    containerElement.classList.add('hidden');
  }
};

function onEffectChange(preview) {
  return function (evt) {
    if (evt.target.matches('input[name="effect"]')) {
      const effect = EFFECTS[evt.target.value];

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
}

// Scale

const updateScale = (currentScale, direction) => {
  const value = currentScale.replace('%', '');
  const step = direction === 'bigger' ? 25 : -25;
  const newValue = Number(value) + step;

  return {
    inputValue: `${newValue}%`,
    scale: newValue / 100,
  };
};

function onScaleBtnClick(input, preview) {
  return function (evt) {
    const currentScale = input.value;
    let updatedData;

    if (
      evt.target.matches('.scale__control--smaller') &&
      currentScale !== '25%'
    ) {
      updatedData = updateScale(currentScale, 'smaller');
    } else if (
      evt.target.matches('.scale__control--bigger') &&
      currentScale !== '100%'
    ) {
      updatedData = updateScale(currentScale, 'bigger');
    }

    if (updatedData) {
      input.value = updatedData.inputValue;
      preview.style.transform = `scale(${updatedData.scale})`;
    }
  };
}

export { onEffectChange, clearEffects, onScaleBtnClick };
