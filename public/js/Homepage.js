var containerMusic = document.querySelector('#concerts');
var searchForm = document.querySelector('#event-search-form');
var searchInput = document.querySelector('#event-search-input');
var cityInput = document.querySelector('#event-city-input');
var categoryInput = document.querySelector('#event-category-input');
var startDateInput = document.querySelector('#event-start-date-input');
var endDateInput = document.querySelector('#event-end-date-input');
var maxPriceInput = document.querySelector('#event-max-price-input');
var sortInput = document.querySelector('#event-sort-input');
var resultSummary = document.querySelector('#result-summary');
var emptyState = document.querySelector('#empty-state');

function setResultSummary(message) {
    if (resultSummary) {
        resultSummary.textContent = message;
    }
}

function setEmptyState(isVisible) {
    if (emptyState) {
        emptyState.hidden = !isVisible;
    }
}

function formatPrice(min, max) {
    if (!min && !max) {
        return 'Price unavailable';
    }

    if (min && max && min !== max) {
        return `$${min} - $${max}`;
    }

    return `From $${min || max}`;
}

function getSearchParams() {
    const params = new URLSearchParams();
    const fields = [
        ['q', searchInput],
        ['city', cityInput],
        ['category', categoryInput],
        ['startDate', startDateInput],
        ['endDate', endDateInput],
        ['sort', sortInput],
    ];

    fields.forEach(([key, field]) => {
        const value = field && field.value ? field.value.trim() : '';
        if (value) {
            params.set(key, value);
        }
    });

    return params;
}

function passesPriceFilter(eventDetails) {
    const maxPrice = maxPriceInput && maxPriceInput.value ? Number(maxPriceInput.value) : null;

    if (!maxPrice) {
        return true;
    }

    if (!eventDetails.priceRangeMin && !eventDetails.priceRangeMax) {
        return false;
    }

    return Number(eventDetails.priceRangeMin || eventDetails.priceRangeMax) <= maxPrice;
}

function normalizeEventForSave(eventDetails) {
    return {
        name: eventDetails.name,
        venue: eventDetails.venue,
        price_range_min: eventDetails.priceRangeMin || null,
        price_range_max: eventDetails.priceRangeMax || null,
        start_date: eventDetails.date || 'TBD',
        start_time: eventDetails.time || 'TBD',
        ticket_link: eventDetails.link,
        image_url: eventDetails.image || '',
    };
}

async function saveFavorite(eventDetails, button) {
    button.disabled = true;
    button.textContent = 'Saving...';

    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(normalizeEventForSave(eventDetails)),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 401) {
            document.location.replace('/login');
            return;
        }

        if (!response.ok) {
            throw new Error('Could not save favorite');
        }

        button.textContent = 'Saved';
    } catch (err) {
        console.error('saveFavorite error:', err);
        button.disabled = false;
        button.textContent = 'Save';
        alert('Could not save this event. Please try again.');
    }
}

function appendEventCard(eventDetails, index) {
    const row = document.createElement('article');
    row.setAttribute('class', 'cardRow');
    containerMusic.append(row);

    const imageConcert = document.createElement('img');
    imageConcert.setAttribute('src', eventDetails.image || '/images/ticket-scalper.png');
    imageConcert.setAttribute('id', `image${index}`);
    imageConcert.setAttribute('class', 'cardImage');
    imageConcert.setAttribute('alt', eventDetails.name);
    row.append(imageConcert);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.setAttribute('class', 'cardDescription');
    row.append(descriptionContainer);

    const title = document.createElement('h3');
    title.textContent = eventDetails.name;
    descriptionContainer.appendChild(title);

    const venueText = document.createElement('p');
    venueText.setAttribute('class', 'card-meta');
    venueText.textContent = eventDetails.venue;
    descriptionContainer.appendChild(venueText);

    const dateText = document.createElement('p');
    dateText.setAttribute('class', 'card-meta');
    dateText.textContent = `${eventDetails.date} at ${eventDetails.time}`;
    descriptionContainer.appendChild(dateText);

    const priceText = document.createElement('p');
    priceText.setAttribute('class', 'priceRange');
    priceText.textContent = formatPrice(eventDetails.priceRangeMin, eventDetails.priceRangeMax);
    descriptionContainer.appendChild(priceText);

    const description = document.createElement('p');
    description.setAttribute('class', 'cardDescription-p');
    description.textContent = eventDetails.description;
    descriptionContainer.appendChild(description);

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'cardBtnContainer');
    descriptionContainer.appendChild(buttonContainer);

    const buttonBuy = document.createElement('button');
    buttonBuy.setAttribute('class', 'buttons buy-ticket-button');
    buttonBuy.setAttribute('type', 'button');
    buttonBuy.textContent = 'Buy';
    buttonBuy.onclick = function () {
        window.location.href = eventDetails.link;
    };
    buttonContainer.appendChild(buttonBuy);

    const buttonFavorites = document.createElement('button');
    buttonFavorites.setAttribute('class', 'buttons favorite-button');
    buttonFavorites.setAttribute('type', 'button');
    buttonFavorites.textContent = 'Save';
    buttonFavorites.addEventListener('click', () => saveFavorite(eventDetails, buttonFavorites));
    buttonContainer.appendChild(buttonFavorites);
}

function renderEvents(eventDetails, sourceLabel) {
    const events = eventDetails.filter(passesPriceFilter);

    containerMusic.replaceChildren();
    setEmptyState(events.length === 0);
    setResultSummary(events.length
        ? `${events.length} ${sourceLabel} event${events.length === 1 ? '' : 's'} found`
        : 'No matching events found');

    events.forEach((eventData, index) => appendEventCard(eventData, index));
}

function formatTicketmasterEvent(eventData) {
    const venue = eventData._embedded && eventData._embedded.venues && eventData._embedded.venues[0]
        ? eventData._embedded.venues[0].name
        : 'Venue TBD';
    const image = Array.isArray(eventData.images) && eventData.images[0] ? eventData.images[0].url : '';
    const start = eventData.dates && eventData.dates.start ? eventData.dates.start : {};
    const priceRange = Array.isArray(eventData.priceRanges) && eventData.priceRanges[0]
        ? eventData.priceRanges[0]
        : {};

    return {
        name: eventData.name || 'Untitled event',
        venue,
        description: eventData.name || 'Ticketmaster event',
        date: start.localDate || 'TBD',
        time: start.localTime || 'TBD',
        link: eventData.url,
        image,
        priceRangeMin: priceRange.min || null,
        priceRangeMax: priceRange.max || null,
    };
}

function formatSeatGeekEvent(eventData) {
    const performer = eventData.performers && eventData.performers[0];
    const startDate = new Date(eventData.datetime_local).toLocaleDateString('en-US');
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(eventData.datetime_local).toLocaleTimeString('en-US', timeOptions);
    const stats = eventData.stats || {};

    return {
        name: performer && performer.name ? performer.name : eventData.title || 'Untitled event',
        venue: eventData.venue && eventData.venue.name ? eventData.venue.name : 'Venue TBD',
        description: eventData.title || 'SeatGeek event',
        date: startDate,
        time: formattedTime,
        link: eventData.url,
        image: performer ? performer.image : '',
        priceRangeMin: stats.lowest_price || stats.average_price || null,
        priceRangeMax: stats.highest_price || stats.average_price || null,
    };
}

if (containerMusic) {
    renderConcertInfo();
}

if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        setResultSummary('Searching events...');
        setEmptyState(false);

        const response = await searchBar();
        if (!response) {
            return;
        }

        const data = await response.json();
        const events = data._embedded && Array.isArray(data._embedded.events)
            ? data._embedded.events.map(formatTicketmasterEvent)
            : [];

        renderEvents(events, 'filtered');
    });
}

async function renderConcertInfo() {
    try {
        setResultSummary('Loading recommended events...');
        const response = await fetch('/api/proxy/events', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        });
        if (!response.ok) {
            console.error('Failed to load events:', response.status);
            setResultSummary('Could not load recommended events.');
            return;
        }
        const data = await response.json();
        const events = Array.isArray(data.events)
            ? data.events.filter((eventData) => eventData.type === 'concert').map(formatSeatGeekEvent)
            : [];

        renderEvents(events, 'recommended');
    } catch (err) {
        console.error('renderConcertInfo error:', err);
        setResultSummary('Could not load recommended events.');
    }
}

async function searchBar() {
    try {
        const params = getSearchParams();
        const response = await fetch(`/api/proxy/search?${params.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            alert('Nothing to search');
            setResultSummary('Search failed. Try another query.');
            return null;
        }
        return response;
    } catch (err) {
        console.error('searchBar error:', err);
        setResultSummary('Search failed. Try another query.');
        return null;
    }
}
