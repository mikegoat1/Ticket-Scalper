const WATCH_TARGETS_KEY = 'ticketScalperWatchTargets';

function getTargets() {
  return JSON.parse(localStorage.getItem(WATCH_TARGETS_KEY) || '{}');
}

function setTargets(targets) {
  localStorage.setItem(WATCH_TARGETS_KEY, JSON.stringify(targets));
}

function updateWatchBadge(row, targetPrice) {
  const badge = row.querySelector('[data-watch-badge]');
  const currentPrice = Number(row.dataset.currentPrice);

  if (!badge) {
    return;
  }

  badge.classList.remove('is-good', 'is-high');

  if (!targetPrice) {
    badge.textContent = 'Set a target';
    return;
  }

  if (!currentPrice) {
    badge.textContent = `Tracking under $${targetPrice}`;
    return;
  }

  if (currentPrice <= targetPrice) {
    badge.textContent = `Below target by $${targetPrice - currentPrice}`;
    badge.classList.add('is-good');
    return;
  }

  badge.textContent = `$${currentPrice - targetPrice} above target`;
  badge.classList.add('is-high');
}

function hydrateWatchTargets() {
  const targets = getTargets();

  document.querySelectorAll('.saved-event-row').forEach((row) => {
    const eventId = row.dataset.id;
    const input = row.querySelector('.target-price-input');
    const image = row.querySelector('.saved-event-image');
    const savedTarget = targets[eventId];

    if (image && !image.getAttribute('src')) {
      image.setAttribute('src', '/images/ticket-scalper.png');
    }

    if (input && savedTarget) {
      input.value = savedTarget;
    }

    updateWatchBadge(row, Number(savedTarget));
  });
}

function saveWatchTarget(eventId) {
  const row = document.querySelector(`.saved-event-row[data-id="${eventId}"]`);
  const input = row ? row.querySelector('.target-price-input') : null;

  if (!row || !input) {
    return;
  }

  const targets = getTargets();
  const value = Number(input.value);

  if (value > 0) {
    targets[eventId] = value;
  } else {
    delete targets[eventId];
  }

  setTargets(targets);
  updateWatchBadge(row, targets[eventId]);
}

async function deleteEvent(eventId) {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 401) {
    document.location.replace('/login');
    return;
  }

  if (!response.ok) {
    alert('Could not delete this event.');
    return;
  }

  const targets = getTargets();
  delete targets[eventId];
  setTargets(targets);

  const row = document.querySelector(`.saved-event-row[data-id="${eventId}"]`);

  if (row) {
    row.remove();

    if (!document.querySelector('.saved-event-row')) {
      document.location.reload();
    }
    return;
  }

  document.location.replace('/profile');
}

document.querySelectorAll('.delete-event').forEach((button) => {
  button.addEventListener('click', () => {
    deleteEvent(button.dataset.id);
  });
});

document.querySelectorAll('.watch-save').forEach((button) => {
  button.addEventListener('click', () => {
    saveWatchTarget(button.dataset.id);
  });
});

hydrateWatchTargets();
