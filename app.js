(() => {
  'use strict';

  const scenes = window.HAMLET_SCENES;
  const duration = 6400;
  const total = scenes.length * duration;
  const folio = document.querySelector('.folio');
  const stage = document.querySelector('#stage');
  const scene = document.querySelector('#scene');
  const description = document.querySelector('#scene-description');
  const timeline = document.querySelector('#timeline');
  const play = document.querySelector('#play');
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  const loop = document.querySelector('#loop');
  const fullscreen = document.querySelector('#fullscreen');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reducedMotion.matches;
  let looping = false;
  let elapsed = reducedMotion.matches ? duration * .55 : 0;
  let activeIndex = -1;
  let lastFrame = performance.now();
  let dragging = false;

  stage.style.setProperty('--duration', `${duration}ms`);

  const markers = scenes.map((item, index) => {
    const button = document.createElement('button');
    button.className = 'line-marker';
    button.setAttribute('aria-label', `Line ${index + 1}: ${item.line}`);
    button.addEventListener('click', event => {
      // Pointer interaction is handled by the continuous scrubber below.
      if (event.detail === 0) goTo(index);
    });
    timeline.append(button);
    return button;
  });

  function updatePlayback() {
    folio.classList.toggle('is-playing', playing);
    play.setAttribute('aria-label', playing ? 'Pause animation' : elapsed >= total ? 'Replay animation' : 'Play animation');
  }

  function render(force = false) {
    const index = Math.min(scenes.length - 1, Math.floor(elapsed / duration));
    const localTime = Math.min(duration - 1, elapsed - index * duration);

    if (index !== activeIndex || force) {
      activeIndex = index;
      stage.style.setProperty('--offset', `${-localTime}ms`);
      scene.innerHTML = `<g class="scene motion scene--${index}">${scenes[index].art}</g>`;
      description.textContent = `${scenes[index].line} ${scenes[index].description}`;
      markers.forEach((marker, i) => {
        marker.classList.toggle('is-past', i < index);
        marker.classList.toggle('is-current', i === index);
        marker.tabIndex = i === index ? 0 : -1;
        if (i === index) marker.setAttribute('aria-current', 'step');
        else marker.removeAttribute('aria-current');
      });
      previous.disabled = index === 0;
      next.disabled = index === scenes.length - 1;
    }
    markers[index].style.setProperty('--progress', localTime / duration);
  }

  function setPlaying(value) {
    playing = value;
    lastFrame = performance.now();
    updatePlayback();
  }

  function seek(time) {
    elapsed = Math.max(0, Math.min(total, time));
    lastFrame = performance.now();
    render(true);
    updatePlayback();
  }

  function goTo(index) {
    const clamped = Math.max(0, Math.min(scenes.length - 1, index));
    // When paused, show a meaningful still instead of the scene's fade-in.
    seek(clamped * duration + (playing ? 0 : duration * .55));
  }

  function togglePlayback() {
    if (!playing && elapsed >= total) seek(0);
    setPlaying(!playing);
  }

  play.addEventListener('click', togglePlayback);
  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  document.querySelector('#restart').addEventListener('click', () => {
    seek(reducedMotion.matches && !playing ? duration * .55 : 0);
    if (!reducedMotion.matches) setPlaying(true);
  });
  loop.addEventListener('click', () => {
    looping = !looping;
    loop.setAttribute('aria-pressed', String(looping));
  });

  function scrub(event) {
    const bounds = timeline.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(.999999, (event.clientX - bounds.left) / bounds.width));
    seek(fraction * total);
  }
  timeline.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging = true;
    timeline.setPointerCapture(event.pointerId);
    scrub(event);
  });
  timeline.addEventListener('pointermove', event => { if (dragging) scrub(event); });
  timeline.addEventListener('pointerup', () => { dragging = false; });
  timeline.addEventListener('pointercancel', () => { dragging = false; });
  timeline.addEventListener('lostpointercapture', () => { dragging = false; });

  fullscreen.hidden = !folio.requestFullscreen;
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await folio.requestFullscreen();
    } catch {
      // Full-screen access can be disabled by the embedding browser.
      fullscreen.disabled = true;
    }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreen.setAttribute('aria-label', document.fullscreenElement ? 'Exit full screen' : 'Enter full screen');
  });

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.code === 'Space' && !event.target.closest('button')) {
      event.preventDefault();
      togglePlayback();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
      if (timeline.contains(document.activeElement)) markers[activeIndex].focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      goTo(event.key === 'Home' ? 0 : scenes.length - 1);
      if (timeline.contains(document.activeElement)) markers[activeIndex].focus();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) setPlaying(false);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      setPlaying(false);
      goTo(activeIndex);
    }
  });

  function tick(now) {
    if (playing) {
      elapsed += Math.max(0, now - lastFrame);
      if (elapsed >= total) {
        if (looping) {
          elapsed %= total;
          render(true);
        } else {
          elapsed = total;
          // Sample the completed final composition before pausing CSS.
          render(true);
          setPlaying(false);
        }
      }
      render();
    }
    lastFrame = now;
    requestAnimationFrame(tick);
  }

  updatePlayback();
  render();
  requestAnimationFrame(tick);
})();
